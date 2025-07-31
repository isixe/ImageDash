import { encode } from '@jsquash/webp'

/**
 * Calculate the SHA-256 hash of the file and return the first 10 characters.
 */
async function getFileHash(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const hashBuffer = await crypto.subtle.digest('SHA-1', arrayBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

/**
 * 压缩图片为 webp 格式
 */
async function compressToWebp(file: File): Promise<Blob> {
  const img = document.createElement('img')
  img.src = URL.createObjectURL(file)
  await new Promise((resolve, reject) => {
    img.onload = resolve
    img.onerror = reject
  })
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)
  const imageData = ctx.getImageData(0, 0, img.width, img.height)
  const webpBuffer = await encode(imageData, { quality: 10 })
  return new Blob([webpBuffer], { type: 'image/webp' })
}

/**
 * Upload the image file to the server and return its public URL.
 * The file name is named using the first 10 characters of the file hash.
 */
export async function uploadImage(
  file: File,
  apiPath: string = '/api/upload'
): Promise<string> {
  const hash = await getFileHash(file)
  const filename = hash
  const compressedBlob = await compressToWebp(file)

  const response = await fetch(
    `${apiPath}?filename=${encodeURIComponent(filename)}`,
    {
      method: 'POST',
      body: compressedBlob
    }
  )

  let result
  try {
    result = await response.json()
  } catch {
    throw new Error('Server response format error.')
  }

  if (!response.ok) {
    throw new Error(result?.message || `HTTP error! status: ${response.status}`)
  }

  if (!result.key) {
    throw new Error('Server response missing image key.')
  }

  return result.key
}
