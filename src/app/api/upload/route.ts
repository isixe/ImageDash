import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
})

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('filename') || `${Date.now()}.png`

    const buffer = await request.arrayBuffer()
    const base64 = arrayBufferToBase64(buffer)
    const contentType =
      request.headers.get('content-type') || guessMimeTypeFromFilename(filename)

    await redis.set(
      filename,
      JSON.stringify({ data: base64, type: contentType }),
      { ex: 300 }
    )

    return NextResponse.json({ key: filename })
  } catch (error) {
    console.error('Error storing image:', error)
    return NextResponse.json(
      { error: 'Failed to store image' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const filename = searchParams.get('filename')

  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 })
  }

  try {
    const raw = await redis.get(filename)
    if (!raw) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    let base64Image: string
    let contentType = guessMimeTypeFromFilename(filename)

    try {
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
      if (parsed && parsed.data) {
        base64Image = parsed.data
        if (parsed.type) contentType = parsed.type
      } else {
        base64Image = String(raw)
      }
    } catch {
      base64Image = String(raw)
    }

    const bytes = base64ToUint8Array(base64Image)

    const response = new Response(bytes, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=300'
      }
    })
    return response
  } catch (error) {
    console.error('Error processing image:', error)
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    )
  }
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  const chunkSize = 0x8000
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize))
  }
  return btoa(binary)
}

function base64ToUint8Array(base64: string): Uint8Array {
  const binary = atob(base64)
  const len = binary.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

function guessMimeTypeFromFilename(name: string | null): string {
  if (!name) return 'application/octet-stream'
  const lower = name.toLowerCase()
  if (lower.endsWith('.png')) return 'image/png'
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg'
  if (lower.endsWith('.gif')) return 'image/gif'
  if (lower.endsWith('.webp')) return 'image/webp'
  return 'application/octet-stream'
}
