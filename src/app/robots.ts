import { MetadataRoute } from 'next';

// Cloudflare Pages Edge Runtime 配置
export const runtime = 'edge';

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
