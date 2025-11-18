import { MetadataRoute } from 'next';

// Static export configuration
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  // Prefer env for preview/staging correctness, fall back to production domain
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://interconverter.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        // Keep critical assets crawlable; forbid only internal/runtime paths
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
