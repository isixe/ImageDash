import { type MetadataRoute } from 'next';

const URL = 'https://imagedash.com'; // Replace with your actual domain

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: URL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ];
}
