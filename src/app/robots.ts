import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers()
  const protocol = headersList.get('x-forwarded-proto')
  const host = headersList.get('host')
  const baseUrl = `${protocol}://${host}`

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/*', '/_next/*']
    },
    sitemap: `${baseUrl}/sitemap.xml`
  }
}
