import { Metadata } from 'next';
import { ToolConfig } from '@/types/tools';
import { TOOL_CATEGORIES } from './tools';

export const SEO_CONFIG = {
  siteName: 'InterConverter',
  siteUrl: 'https://interconverter.com',
  // Optimized homepage title (≤60 chars) with brand + core keywords
  defaultTitle: 'InterConverter - Free Online Converters & Calculators Tools',
  defaultDescription: 'Convert and calculate anything online with InterConverter. Free tools for currency, units, colors, time, health, and more – fast and easy to use.',
  // Alternative homepage title option
  alternativeTitle: 'InterConverter - Convert Anything Online | Free Tools & Calculators',
  defaultKeywords: [
    'online converter',
    'free calculator',
    'unit converter',
    'currency converter',
    'measurement tools',
    'professional calculators',
    'conversion tools',
    'online tools',
    'free tools',
    'web calculator',
    'instant converter',
    'no registration converter',
    'professional converters',
    'accurate calculator online'
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
    'epoch time to date converter tool',
    'countdown timer with notifications',
    'date difference calculator days hours',
    'time zone converter world clock',
    'timestamp to date converter instant',
    'epoch converter milliseconds seconds',
    'date calculator business days'
  ],
  'finance': [
    'real time currency converter live rates',
    'loan payment calculator monthly interest',
    'income tax calculator 2024 free',
    'mortgage payment calculator with taxes',
    'exchange rate converter historical data',
    'currency converter 150 currencies',
    'loan calculator with extra payments',
    'tax calculator federal state'
  ],
  'unit': [
    'metric to imperial converter accurate',
    'feet to meters calculator precise',
    'celsius to fahrenheit converter instant',
    'weight converter pounds kilograms',
    'length converter online free tool',
    'temperature converter celsius fahrenheit',
    'volume converter liters gallons',
    'area converter square feet meters'
  ],
  'media': [
    'pdf to word converter online free',
    'jpg to png converter transparent',
    'image format converter online tool',
    'document converter free no limit',
    'file format converter batch',
    'image converter jpg png gif',
    'pdf converter online free',
    'file type converter online'
  ],
  'color': [
    'hex to rgb color converter css',
    'color code converter hex rgb hsl',
    'hex color picker converter tool',
    'rgb to hex converter online free',
    'color palette converter generator',
    'css color converter hex rgb',
    'color picker hex rgb converter',
    'web color converter tool'
  ],
  'health': [
    'bmi calculator body mass index accurate',
    'ideal weight calculator height age',
    'calorie calculator daily needs bmr',
    'body fat percentage calculator online',
    'fitness calculator online free',
    'bmi calculator metric imperial',
    'weight calculator ideal healthy',
    'health calculator bmi body fat'
  ],
  'auto': [
    'carburetor cfm calculator engine size',
    'compression ratio calculator horsepower',
    'gear ratio calculator performance tuning',
    'engine displacement calculator bore stroke',
    'automotive calculator tools free',
    'horsepower calculator engine specs',
    'rpm calculator gear ratio speed',
    'automotive conversion tools'
  ]
};

// Generate optimized tool titles with scenario/benefit keywords
function generateOptimizedToolTitle(toolName: string, category: string): string {
  // Define scenario/benefit keywords for each tool type
  const titleOptimizations: Record<string, Record<string, string>> = {
    'color': {
      'HEX to RGB Converter': 'HEX to RGB Converter – Instant Color Code Conversion | InterConverter',
      'RGB to HEX Converter': 'RGB to HEX Converter – Fast Color Code Generator | InterConverter',
      'Color Picker': 'Color Picker – Professional Color Selection Tool | InterConverter',
      'Color Palette Generator': 'Color Palette Generator – Create Beautiful Color Schemes | InterConverter'
    },
    'finance': {
      'Currency Converter': 'Currency Converter – Live Exchange Rates & Calculator | InterConverter',
      'Loan Calculator': 'Loan Calculator – Monthly Payment & Interest Calculator | InterConverter',
      'Mortgage Calculator': 'Mortgage Calculator – Home Loan Payment Estimator | InterConverter',
      'Tax Calculator': 'Tax Calculator – Income Tax Estimation Tool | InterConverter',
      'Investment Calculator': 'Investment Calculator – ROI & Growth Projections | InterConverter'
    },
    'health': {
      'BMI Calculator': 'BMI Calculator – Fast & Accurate Body Mass Index Tool | InterConverter',
      'Calorie Calculator': 'Calorie Calculator – Daily Caloric Needs Estimator | InterConverter',
      'Body Fat Calculator': 'Body Fat Calculator – Precise Body Composition Tool | InterConverter',
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
      'Countdown Timer': 'Countdown Timer – Event Countdown & Alerts | InterConverter'
    },
    'auto': {
      'Compression Ratio Calculator': 'Compression Ratio Calculator – Engine Performance Tool | InterConverter',
      'Gear Ratio Calculator': 'Gear Ratio Calculator – Automotive Tuning Tool | InterConverter',
      'Horsepower Calculator': 'Horsepower Calculator – Engine Power Estimation | InterConverter',
      'Fuel Economy Calculator': 'Fuel Economy Calculator – MPG & Efficiency Tool | InterConverter'
    },
    'media': {
      'PDF Converter': 'PDF Converter – Document Format Conversion Tool | InterConverter',
      'Image Converter': 'Image Converter – JPG, PNG, GIF Format Tool | InterConverter',
      'File Converter': 'File Converter – Multi-Format Conversion Tool | InterConverter'
    }
  };

  // Get optimized title if available, otherwise generate generic one
  const categoryOptimizations = titleOptimizations[category];
  if (categoryOptimizations && categoryOptimizations[toolName]) {
    return categoryOptimizations[toolName];
  }

  // Fallback: generate generic optimized title
  const scenarioKeywords: Record<string, string> = {
    'color': 'Professional Color Tool',
    'finance': 'Financial Calculator & Tool',
    'health': 'Health & Fitness Calculator',
    'unit': 'Unit Conversion Tool',
    'time': 'Time & Date Calculator',
    'auto': 'Automotive Calculator Tool',
    'media': 'File Conversion Tool'
  };

  const scenario = scenarioKeywords[category] || 'Professional Tool';
  return `${toolName} – ${scenario} | InterConverter`;
}

// Generate SEO metadata for tool pages
export function generateToolMetadata(tool: ToolConfig, locale: string = 'en'): Metadata {
  const categoryInfo = TOOL_CATEGORIES[tool.category as keyof typeof TOOL_CATEGORIES];
  const longtailKeywords = CATEGORY_LONGTAIL_KEYWORDS[tool.category as keyof typeof CATEGORY_LONGTAIL_KEYWORDS] || [];

  // Optimized title format: Tool Name + Scenario/Benefit + Brand
  // Examples: "HEX to RGB Converter – Instant Color Code Conversion | InterConverter"
  //          "Currency Converter – Live Exchange Rates & Calculator | InterConverter"
  //          "BMI Calculator – Fast & Accurate Body Mass Index Tool | InterConverter"
  const title = generateOptimizedToolTitle(tool.name, tool.category);

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
  const title = `${toolCount}+ Free Online ${categoryInfo.name} Tools & Calculators | InterConverter`;
  const alternativeTitle = `${categoryInfo.name} Tools Online – ${toolCount}+ Free Calculators at InterConverter`;

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
