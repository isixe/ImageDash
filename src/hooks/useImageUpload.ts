'use client'
import type { SearchEngine } from '@/data/searchEngines'
import { uploadImage } from '@/utils/upload'
import * as React from 'react'
import { useToast } from './useToast'

// Supported MIME types for file validation
const SUPPORTED_IMAGE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/gif',
  'image/tiff',
  'image/tif',
  'image/bmp',
  'image/svg+xml',
  'image/x-icon',
  'image/vnd.microsoft.icon',
  'image/avif',
  'image/heic',
  'image/heif'
]

// Human-readable format names for error messages
const SUPPORTED_FORMATS =
  'PNG, JPG, JPEG, WEBP, GIF, TIFF, BMP, SVG, ICO, AVIF, HEIC, HEIF'

type UseImageSearchProps = {
  onReset?: () => void
}

export function useImageUpload({ onReset }: UseImageSearchProps = {}) {
  const [imagePreview, setImagePreview] = React.useState<string | null>(null)
  const [imageUrl, setImageUrl] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [isQueryImageUrl, setIsQueryImageUrl] = React.useState(false)
  const { toast } = useToast()

  const isImageUrl = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.src = url
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)

      const timeout = setTimeout(() => {
        resolve(false)
      }, 5000)

      img.onload = () => {
        clearTimeout(timeout)
        resolve(true)
      }

      img.onerror = () => {
        clearTimeout(timeout)
        resolve(false)
      }
    })
  }

  React.useEffect(() => {
    const checkImageUrl = async () => {
      const isUrl = await isImageUrl(searchQuery)
      const wasUrlBefore = isQueryImageUrl

      setIsQueryImageUrl(isUrl)

      if (isUrl) {
        setImagePreview(searchQuery)
        setImageUrl(searchQuery)
      } else if (wasUrlBefore) {
        // It was a URL before, but now it's not. Reset image states.
        setImagePreview(null)
        setImageUrl(null)
      }
    }

    checkImageUrl()
  }, [searchQuery, isQueryImageUrl])

  const isValidImageType = (fileType: string): boolean => {
    return SUPPORTED_IMAGE_TYPES.includes(fileType.toLowerCase())
  }

  const handleFileSelect = async (file: File) => {
    if (!isValidImageType(file.type)) {
      toast({
        title: 'Invalid File Type',
        description: `Please upload a valid image file (${SUPPORTED_FORMATS}).`,
        variant: 'destructive'
      })
      return
    }

    // Reset previous state and start loading
    setImagePreview(null)
    setImageUrl(null)
    setSearchQuery('')
    setIsLoading(true)

    try {
      const filename = await uploadImage(file)
      const imageUrl = `/api/upload?filename=${filename}`
      setImagePreview(imageUrl)
      setImageUrl(imageUrl)
      onReset?.()
    } catch (error: unknown) {
      toast({
        title: 'Upload Error',
        description: (error as Error).message || 'An unknown error occurred.',
        variant: 'destructive'
      })
      resetState()
    } finally {
      setIsLoading(false)
    }
  }

  const resetState = () => {
    setImagePreview(null)
    setImageUrl(null)
    setIsLoading(false)
    setSearchQuery('')
    onReset?.()
  }

  const handleSearch = (engine: SearchEngine) => {
    const baseUrl = window.location.origin

    if (imageUrl && engine.url) {
      if (imageUrl.startsWith('http')) {
        window.open(`${engine.url}${imageUrl}`, '_blank')
        return
      }
      const url = `${engine.url}${baseUrl}${imageUrl}`
      window.open(url, '_blank')
      return
    }

    if (searchQuery && engine.textSearchUrl) {
      const url = `${engine.textSearchUrl}${searchQuery}`
      window.open(url, '_blank')
    }
  }

  return {
    imagePreview,
    imageUrl,
    isLoading,
    searchQuery,
    isQueryImageUrl,
    handleFileSelect,
    resetState,
    setSearchQuery,
    handleSearch,
    supportedFormats: SUPPORTED_FORMATS,
    supportedTypes: SUPPORTED_IMAGE_TYPES
  }
}
