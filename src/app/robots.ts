import { MetadataRoute } from 'next';

// Static export configuration
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://interconverter.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
        ],
        disallow: [
          '/api/',
          '/_next/',
          '*.json',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
