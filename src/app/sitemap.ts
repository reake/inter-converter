import { MetadataRoute } from 'next';
import { TOOLS_CONFIG } from '@/config/tools';
import { routing } from '@/i18n/routing';

// Static export configuration
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://interconverter.com';
  const currentDate = new Date();
  
  // Base pages
  const basePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Category pages (these are in the (tools) route group)
  const categories = ['unit', 'time', 'finance', 'auto', 'color', 'health', 'media'];
  const categoryPages: MetadataRoute.Sitemap = categories.map(category => ({
    url: `${baseUrl}/${category}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Tool pages
  const toolPages: MetadataRoute.Sitemap = TOOLS_CONFIG
    .filter(tool => tool.isActive)
    .map(tool => ({
      url: `${baseUrl}${tool.path}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: tool.searchVolume && tool.searchVolume > 50000 ? 0.9 : 0.7,
    }));

  // Localized pages for non-default locales
  const localizedPages: MetadataRoute.Sitemap = [];
  routing.locales.forEach(locale => {
    if (locale !== routing.defaultLocale) {
      // Add localized base pages
      basePages.forEach(page => {
        localizedPages.push({
          ...page,
          url: `${baseUrl}/${locale}${page.url.replace(baseUrl, '')}`,
          priority: (page.priority || 0.5) * 0.8, // Slightly lower priority for non-default locales
        });
      });

      // Add localized tool pages
      toolPages.forEach(page => {
        localizedPages.push({
          ...page,
          url: `${baseUrl}/${locale}${page.url.replace(baseUrl, '')}`,
          priority: (page.priority || 0.5) * 0.8,
        });
      });
    }
  });

  return [...basePages, ...categoryPages, ...toolPages, ...localizedPages];
}
