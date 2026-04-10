import { Metadata } from 'next';
import { ToolConfig } from '@/types/tools';
import { TOOL_CATEGORIES } from './tools';

export const SEO_CONFIG = {
  siteName: 'InterConverter',
  siteUrl: 'https://interconverter.com',
  defaultTitle: 'Free Online Converters and Calculators | InterConverter',
  defaultDescription: 'Free online converters and calculators for unit, time, color, and automotive reference tasks, with browser-based workflows and no account required.',
  alternativeTitle: 'InterConverter - Converters & Calculators Online',
  defaultKeywords: [
    'online converter',
    'online calculator',
    'unit converter',
    'currency converter',
    'measurement tools',
    'conversion tools',
    'online tools',
    'calculator tools',
    'web calculator',
    'reference calculator',
    'formula-based calculator',
    'unit conversion tool'
  ],
  author: 'InterConverter Team',
  twitterHandle: '@interconverter',
  locale: 'en_US',
  type: 'website'
};

// High-value long-tail keywords for each category
export const CATEGORY_LONGTAIL_KEYWORDS = {
  'time': [
    'unix timestamp converter online',
    'epoch time to date converter tool',
    'countdown timer with notifications',
    'date difference calculator days hours',
    'time zone converter world clock',
    'timestamp to date converter online',
    'epoch converter milliseconds seconds',
    'date calculator business days'
  ],
  'finance': [
    'currency converter exchange rates',
    'loan payment calculator monthly interest',
    'income tax calculator 2024',
    'mortgage payment calculator with taxes',
    'exchange rate converter historical data',
    'currency converter 150 currencies',
    'loan calculator with extra payments',
    'tax calculator federal state'
  ],
  'unit': [
    'metric to imperial converter online',
    'feet to meters calculator online',
    'celsius to fahrenheit converter online',
    'weight converter pounds kilograms',
    'length converter online tool',
    'temperature converter celsius fahrenheit',
    'volume converter liters gallons',
    'area converter square feet meters'
  ],
  'media': [
    'pdf to word converter online',
    'jpg to png converter transparent',
    'image format converter online tool',
    'document converter online tool',
    'file format converter batch',
    'image converter jpg png gif',
    'pdf converter online',
    'file type converter online'
  ],
  'color': [
    'hex to rgb color converter css',
    'color code converter hex rgb hsl',
    'hex color picker converter tool',
    'rgb to hex converter online',
    'color palette converter generator',
    'css color converter hex rgb',
    'color picker hex rgb converter',
    'web color converter tool'
  ],
  'health': [
    'bmi calculator body mass index online',
    'ideal weight calculator height age',
    'calorie calculator daily needs bmr',
    'body fat percentage calculator online',
    'fitness calculator online',
    'bmi calculator metric imperial',
    'weight calculator ideal healthy',
    'health calculator bmi body fat'
  ],
  'auto': [
    'carburetor cfm calculator engine size',
    'compression ratio calculator engine fuel',
    'gear ratio calculator drivetrain reference',
    'engine displacement calculator bore stroke',
    'automotive calculator tools',
    'horsepower calculator engine specs',
    'rpm calculator gear ratio speed',
    'automotive conversion tools'
  ]
};

// Generate tool titles with scenario keywords
function generateToolTitle(toolName: string, category: string): string {
  // Define scenario/benefit keywords for each tool type
  const curatedTitles: Record<string, Record<string, string>> = {
    'color': {
      'HEX to RGB Converter': 'HEX to RGB Converter – Color Code Conversion Tool | InterConverter',
      'RGB to HEX Converter': 'RGB to HEX Converter – Color Code Generator Tool | InterConverter',
      'Color Picker': 'Color Picker – Color Selection Tool | InterConverter',
      'Color Palette Generator': 'Color Palette Generator – Color Scheme Builder | InterConverter'
    },
    'finance': {
      'Currency Converter': 'Currency Converter – Exchange Rate Reference Tool | InterConverter',
      'Loan Calculator': 'Loan Calculator – Monthly Payment & Interest Calculator | InterConverter',
      'Mortgage Calculator': 'Mortgage Calculator – Home Loan Estimate Tool | InterConverter',
      'Tax Calculator': 'Tax Calculator – Income Tax Estimation Tool | InterConverter',
      'Investment Calculator': 'Investment Calculator – Return Estimate Tool | InterConverter'
    },
    'health': {
      'BMI Calculator': 'BMI Calculator – Body Mass Index Reference Tool | InterConverter',
      'Calorie Calculator': 'Calorie Calculator – Daily Calorie Estimate Tool | InterConverter',
      'Body Fat Calculator': 'Body Fat Calculator – Body Composition Reference Tool | InterConverter',
      'Ideal Weight Calculator': 'Ideal Weight Calculator – Healthy Weight Range Tool | InterConverter'
    },
    'unit': {
      'Length Converter': 'Length Converter – Meters, Feet, Inches & More | InterConverter',
      'Weight Converter': 'Weight Converter – Pounds, Kilograms & Units | InterConverter',
      'Temperature Converter': 'Temperature Converter – Celsius, Fahrenheit & Kelvin | InterConverter',
      'Area Converter': 'Area Converter – Square Feet, Meters & Acres | InterConverter',
      'Volume Converter': 'Volume Converter – Liters, Gallons & Cubic Units | InterConverter'
    },
    'time': {
      'Unix Timestamp Converter': 'Unix Timestamp Converter – Epoch Time to Date Tool | InterConverter',
      'Date Calculator': 'Date Calculator – Days Between Dates & Age Calculator | InterConverter',
      'Time Zone Converter': 'Time Zone Converter – World Clock & Time Zones | InterConverter',
      'Countdown Timer': 'Countdown Timer – Event Countdown Tool | InterConverter'
    },
    'auto': {
      'Compression Ratio Calculator': 'Compression Ratio Calculator – Engine Reference Tool | InterConverter',
      'Gear Ratio Calculator': 'Gear Ratio Calculator – Automotive Ratio Tool | InterConverter',
      'Horsepower Calculator': 'Horsepower Calculator – Engine Output Estimate | InterConverter',
      'Fuel Economy Calculator': 'Fuel Economy Calculator – MPG Reference Tool | InterConverter'
    },
    'media': {
      'PDF Converter': 'PDF Converter – Document Format Conversion Tool | InterConverter',
      'Image Converter': 'Image Converter – JPG, PNG, GIF Format Tool | InterConverter',
      'File Converter': 'File Converter – Multi-Format Conversion Tool | InterConverter'
    }
  };

  // Use a predefined title when available, otherwise generate a generic one
  const categoryTitles = curatedTitles[category];
  if (categoryTitles && categoryTitles[toolName]) {
    return categoryTitles[toolName];
  }

  // Fallback: generate a generic title
  const scenarioKeywords: Record<string, string> = {
    'color': 'Color Tool',
    'finance': 'Financial Calculator',
    'health': 'Health Calculator',
    'unit': 'Unit Conversion Tool',
    'time': 'Time & Date Calculator',
    'auto': 'Automotive Calculator',
    'media': 'File Conversion Tool'
  };

  const scenario = scenarioKeywords[category] || 'Reference Tool';
  return `${toolName} – ${scenario} | InterConverter`;
}

// Generate SEO metadata for tool pages
export function generateToolMetadata(tool: ToolConfig, locale: string = 'en'): Metadata {
  const longtailKeywords = CATEGORY_LONGTAIL_KEYWORDS[tool.category as keyof typeof CATEGORY_LONGTAIL_KEYWORDS] || [];

  // Title format: Tool Name + Scenario + Brand
  const title = generateToolTitle(tool.name, tool.category);

  const description = `${tool.description} Useful for reference, comparison, and review-oriented workflows.`;

  const keywords = [
    ...tool.keywords,
    ...longtailKeywords.slice(0, 3),
    `${tool.name.toLowerCase()} online`,
    `${tool.name.toLowerCase()} calculator`,
    `${tool.name.toLowerCase()} reference`,
    'formula-based results',
    'reference tool'
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
  const localePrefix = locale === 'en' ? '' : `/${locale}`;

  if (!categoryInfo) {
    return {};
  }

  // Get tool count for this category (you may need to import TOOLS_CONFIG and filter)
  // For now, using placeholder numbers - you can update this with actual counts
  const toolCounts: Record<string, number> = {
    'color': 8,
    'finance': 12,
    'health': 6,
    'unit': 15,
    'time': 7,
    'auto': 9,
    'media': 5
  };

  const toolCount = toolCounts[category] || 10;
  const title = `${toolCount}+ ${categoryInfo.name} Tools & Calculators | InterConverter`;
  const description = `${categoryInfo.description} Includes selected reference workflows and practical calculation pages for comparison and review.`;

  return {
    title,
    description,
    keywords: [
      ...longtailKeywords,
      `${categoryInfo.name.toLowerCase()} tools`,
      `${categoryInfo.name.toLowerCase()} calculator`,
      `online ${categoryInfo.name.toLowerCase()} converter`,
      'reference tools',
      'formula-based calculator'
    ].join(', '),
    openGraph: {
      title,
      description,
      url: `${SEO_CONFIG.siteUrl}${localePrefix}/${category}`,
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
    },
    alternates: {
      canonical: `${SEO_CONFIG.siteUrl}${localePrefix}/${category}`,
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
          alt: 'InterConverter - Online Conversion Tools',
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
