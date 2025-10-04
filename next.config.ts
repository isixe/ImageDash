import type { NextConfig } from 'next'

export const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      },
      {
        protocol: 'http',
        hostname: '**'
      }
    ]
  }
}

import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'

// Export an async default function that returns the NextConfig.
// Next supports the config being a Promise, so we can run async
// setup here without using top-level await or an IIFE.
export default async function (): Promise<NextConfig> {
  if (process.env.NODE_ENV === 'development') {
    await setupDevPlatform()
  }

  return nextConfig
}
