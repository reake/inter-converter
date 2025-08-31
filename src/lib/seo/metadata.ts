import { Metadata } from 'next';

interface MetadataOptions {
  title: string;
  description: string;
  locale: string;
  pathname: string;
  keywords?: string[];
  ogImage?: string;
}

export function generateMetadata({
  title,
  description,
  locale,
  pathname,
  keywords = [],
  ogImage
}: MetadataOptions): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://interconverter.com';
  const canonicalUrl = `${baseUrl}${locale === 'en' ? '' : `/${locale}`}${pathname}`;
  const defaultOgImage = `${baseUrl}/icons/icon-512x512.png`;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'InterConverter',
      images: [
        {
          url: ogImage || defaultOgImage,
          width: 512,
          height: 512,
          alt: title,
        },
      ],
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage || defaultOgImage],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}${pathname}`,
        'zh': `${baseUrl}/zh${pathname}`,
        'x-default': `${baseUrl}${pathname}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Helper function to load tool-specific content
export async function loadToolContent(category: string, toolId: string, locale: string) {
  try {
    const content = await import(`@/data/tools/${category}/${toolId}-${locale}.json`);
    return content.default;
  } catch (error) {
    // Fallback to global configuration if tool-specific content doesn't exist
    return null;
  }
}

// Helper function to load category content
export async function loadCategoryContent(category: string, locale: string) {
  try {
    const content = await import(`@/data/tools/${category}/${category}-${locale}.json`);
    return content.default;
  } catch (error) {
    return null;
  }
}
