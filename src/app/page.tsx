'use client'

import { IconName, Icons } from '@/components/icon/icons'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import LandingView from '@/components/view/landing-view'
import ImageUploader from '@/components/widget/image-uploader'
import { searchEngines } from '@/data/searchEngines'
import { useImageUpload } from '@/hooks/useImageUpload'
import { Loader2, Search, Sparkles, Upload } from 'lucide-react'
import Image from 'next/image'
import * as React from 'react'

const getIconComponent = (iconName: IconName) => {
  return Icons[iconName] || null
}

export default function Page() {
  const searchAreaRef = React.useRef<HTMLDivElement>(null)

  const handleScrollToSearchArea = () => {
    searchAreaRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const {
    imagePreview,
    imageUrl,
    isLoading,
    searchQuery,
    isQueryImageUrl,
    handleFileSelect,
    resetState,
    setSearchQuery,
    handleSearch
  } = useImageUpload({ onReset: handleScrollToSearchArea })

  const handleSearchAll = () => {
    searchEngines.forEach((engine) => {
      let url = ''

      const baseUrl = window.location.origin

      if (imageUrl && engine.url) {
        url = `${engine.url}${baseUrl}${imageUrl}`
      }

      if (searchQuery && engine.textSearchUrl) {
        url = `${engine.textSearchUrl}/${searchQuery}`
      }

      if (url) {
        window.open(url, '_blank')
      }
    })
  }

  const showResults = imagePreview || (searchQuery && !isQueryImageUrl)

  return (
    <div className="flex w-full flex-col bg-background">
      <section id="hero" className="py-20">
        <div className="container flex flex-col items-center px-4 text-center md:px-6">
          <h1 className="font-headline text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Find Any Image, Fast
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Reverse search with an image, URL, or text to find what you&#39;re
            looking for across the web&#39;s top image search engines.
          </p>

          <div className="mt-8 w-full max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Describe an image or paste an image URL..."
                className="h-14 w-full rounded-[15px] pl-12 pr-4 text-base shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Or</p>

          <div
            ref={searchAreaRef}
            className="mt-4 flex w-full flex-col items-center justify-center gap-8"
          >
            {isLoading ? (
              <div className="relative flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-card p-12 text-center">
                <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
                <p className="font-headline text-xl font-semibold text-foreground">
                  Uploading Image...
                </p>
                <p className="text-sm text-muted-foreground">
                  This will just take a moment.
                </p>
              </div>
            ) : showResults ? (
              <Card className="w-full max-w-2xl border-primary/20 shadow-xl duration-500 animate-in fade-in-50 zoom-in-95">
                <CardContent className="space-y-6 p-4 sm:p-6">
                  {imagePreview && (
                    <div className="relative flex max-h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border shadow-inner">
                      <Image
                        src={imagePreview}
                        width={500}
                        height={500}
                        alt="Uploaded preview"
                        className="h-auto max-h-[500px] w-full rounded-md object-contain"
                      />
                    </div>
                  )}

                  {searchQuery && !imagePreview && (
                    <div className="p-6 text-center">
                      <p className="break-all text-lg font-medium text-foreground">
                        Searching for:{' '}
                        <span className="font-bold text-primary">
                          {searchQuery}
                        </span>
                      </p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <Button
                      onClick={handleSearchAll}
                      className="h-14 w-full text-lg font-bold"
                      disabled={isLoading || (!imageUrl && !searchQuery)}
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      Search All Engines
                    </Button>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {searchEngines.map((engine) => {
                        const IconComponent = getIconComponent(engine.icon)
                        return (
                          <Button
                            key={engine.name}
                            variant="outline"
                            className="group h-12 transform border-border/50 bg-card text-base font-semibold transition-all duration-300 hover:border-primary hover:bg-muted/50 hover:text-black"
                            disabled={Boolean(
                              isLoading ||
                                (!imageUrl && !searchQuery) ||
                                (searchQuery &&
                                  !engine.textSearchUrl &&
                                  !isQueryImageUrl) ||
                                (imageUrl && !engine.url)
                            )}
                            onClick={() => handleSearch(engine)}
                          >
                            {IconComponent && (
                              <IconComponent className="h-6 w-6 text-foreground transition-transform duration-300 group-hover:scale-110" />
                            )}
                            <span>{engine.name}</span>
                          </Button>
                        )
                      })}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={resetState}
                    className="w-full text-primary hover:bg-primary/10 hover:text-primary"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Start New Search
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <ImageUploader
                onFileSelect={handleFileSelect}
                disabled={isLoading}
              />
            )}
          </div>
        </div>
      </section>

      <LandingView />
    </div>
  )
}
