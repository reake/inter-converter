import { Metadata } from 'next';
import { ToolConfig } from '@/types/tools';
import { TOOL_CATEGORIES } from './tools';

export const SEO_CONFIG = {
  siteName: 'InterConverter',
  siteUrl: 'https://interconverter.com',
  defaultTitle: 'InterConverter - Free Online Conversion Tools & Calculators', 
  defaultDescription: 'Professional-grade conversion tools and calculators. Convert currencies, units, colors, files, automotive calculations, and more. Free, fast, and privacy-focused.',
  defaultKeywords: [
    'online converter',
    'free calculator',
    'unit conversion',
    'currency converter',
    'measurement tools',
    'professional calculators',
    'conversion tools',
    'online tools',
    'free tools',
    'web calculator'
  ],
  author: 'InterConverter Team',
  twitterHandle: '@interconverter',
  locale: 'en_US',
  type: 'website'
};

// High-value long-tail keywords for each category
export const CATEGORY_LONGTAIL_KEYWORDS = {
  'time': [
    'unix timestamp converter online free',
    'epoch time to date converter',
    'countdown timer with notifications',
    'date difference calculator days',
    'time zone converter world clock'
  ],
  'finance': [
    'real time currency converter',
    'loan payment calculator monthly',
    'income tax calculator 2024',
    'mortgage payment calculator',
    'exchange rate converter live'
  ],
  'unit': [
    'metric to imperial converter',
    'feet to meters calculator',
    'celsius to fahrenheit converter',
    'weight converter pounds kilograms',
    'length converter online free'
  ],
  'media': [
    'pdf to word converter online free',
    'jpg to png converter transparent',
    'image format converter online',
    'document converter free',
    'file format converter'
  ],
  'color': [
    'hex to rgb color converter',
    'color code converter css',
    'hex color picker converter',
    'rgb to hex converter online',
    'color palette converter'
  ],
  'health': [
    'bmi calculator body mass index',
    'ideal weight calculator height',
    'calorie calculator daily needs',
    'body fat percentage calculator',
    'fitness calculator online'
  ],
  'auto': [
    'carburetor cfm calculator engine',
    'compression ratio calculator horsepower',
    'gear ratio calculator performance',
    'engine displacement calculator',
    'automotive calculator tools'
  ]
};

// Generate SEO metadata for tool pages
export function generateToolMetadata(tool: ToolConfig, locale: string = 'en'): Metadata {
  const categoryInfo = TOOL_CATEGORIES[tool.category as keyof typeof TOOL_CATEGORIES];
  const longtailKeywords = CATEGORY_LONGTAIL_KEYWORDS[tool.category as keyof typeof CATEGORY_LONGTAIL_KEYWORDS] || [];
  
  // Enhanced title with power words and benefits
  const title = `${tool.name} - Free Online ${categoryInfo?.name || 'Tool'} | InterConverter`;
  
  // Enhanced description with benefits and call-to-action
  const description = `${tool.description} Free, accurate, and instant results. No registration required. Professional-grade ${tool.name.toLowerCase()} for developers, engineers, and professionals.`;
  
  // Comprehensive keywords combining tool-specific and long-tail
  const keywords = [
    ...tool.keywords,
    ...longtailKeywords.slice(0, 3),
    `${tool.name.toLowerCase()} online`,
    `free ${tool.name.toLowerCase()}`,
    `${tool.name.toLowerCase()} calculator`,
    `professional ${tool.name.toLowerCase()}`,
    'no registration required',
    'instant results'
  ];

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: SEO_CONFIG.author }],
    creator: SEO_CONFIG.author,
    publisher: SEO_CONFIG.siteName,
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
    openGraph: {
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      url: `${SEO_CONFIG.siteUrl}${tool.path}`,
      siteName: SEO_CONFIG.siteName,
      title,
      description,
      images: [
        {
          url: `${SEO_CONFIG.siteUrl}/og-images/${tool.id}.png`,
          width: 1200,
          height: 630,
          alt: `${tool.name} - ${tool.description}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: SEO_CONFIG.twitterHandle,
      creator: SEO_CONFIG.twitterHandle,
      title,
      description,
      images: [`${SEO_CONFIG.siteUrl}/og-images/${tool.id}.png`],
    },
    alternates: {
      canonical: `${SEO_CONFIG.siteUrl}${tool.path}`,
      languages: {
        'en': `${SEO_CONFIG.siteUrl}${tool.path}`,
        'zh': `${SEO_CONFIG.siteUrl}/zh${tool.path}`,
      },
    },
    other: {
      'application-name': SEO_CONFIG.siteName,
      'apple-mobile-web-app-title': SEO_CONFIG.siteName,
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'format-detection': 'telephone=no',
      'mobile-web-app-capable': 'yes',
      'msapplication-TileColor': '#2563eb',
      'theme-color': '#2563eb',
    },
  };
}

// Generate SEO metadata for category pages
export function generateCategoryMetadata(category: string, locale: string = 'en'): Metadata {
  const categoryInfo = TOOL_CATEGORIES[category as keyof typeof TOOL_CATEGORIES];
  const longtailKeywords = CATEGORY_LONGTAIL_KEYWORDS[category as keyof typeof CATEGORY_LONGTAIL_KEYWORDS] || [];
  
  if (!categoryInfo) {
    return {};
  }

  const title = `${categoryInfo.name} Tools - Free Online Calculators & Converters | InterConverter`;
  const description = `${categoryInfo.description} Professional ${categoryInfo.name.toLowerCase()} tools including ${longtailKeywords.slice(0, 3).join(', ')}. Free, accurate, and instant results.`;

  return {
    title,
    description,
    keywords: [
      ...longtailKeywords,
      `${categoryInfo.name.toLowerCase()} tools`,
      `free ${categoryInfo.name.toLowerCase()} calculator`,
      `online ${categoryInfo.name.toLowerCase()} converter`,
      'professional tools',
      'no registration required'
    ].join(', '),
    openGraph: {
      title,
      description,
      url: `${SEO_CONFIG.siteUrl}/${category}`,
      type: 'website',
    },
    alternates: {
      canonical: `${SEO_CONFIG.siteUrl}/${category}`,
    },
  };
}

// Generate home page metadata
export function generateHomeMetadata(locale: string = 'en'): Metadata {
  return {
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    keywords: SEO_CONFIG.defaultKeywords.join(', '),
    authors: [{ name: SEO_CONFIG.author }],
    creator: SEO_CONFIG.author,
    publisher: SEO_CONFIG.siteName,
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
    openGraph: {
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      url: SEO_CONFIG.siteUrl,
      siteName: SEO_CONFIG.siteName,
      title: SEO_CONFIG.defaultTitle,
      description: SEO_CONFIG.defaultDescription,
      images: [
        {
          url: `${SEO_CONFIG.siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'InterConverter - Free Online Conversion Tools',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: SEO_CONFIG.twitterHandle,
      creator: SEO_CONFIG.twitterHandle,
      title: SEO_CONFIG.defaultTitle,
      description: SEO_CONFIG.defaultDescription,
      images: [`${SEO_CONFIG.siteUrl}/og-image.png`],
    },
    alternates: {
      canonical: SEO_CONFIG.siteUrl,
      languages: {
        'en': SEO_CONFIG.siteUrl,
        'zh': `${SEO_CONFIG.siteUrl}/zh`,
      },
    },
  };
}
