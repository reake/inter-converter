/**
 * SEO Optimization Configuration for Tool Pages
 * Optimized for Google SEO best practices and long-tail keywords
 */

export interface ToolSEOConfig {
  title: string; // ≤50 characters
  description: string; // ≤150 characters
  keywords: string[];
  ogImage: string;
  twitterImage: string;
}

export const TOOL_SEO_CONFIG: Record<string, ToolSEOConfig> = {
  // Automotive Tools
  'carburetor-cfm-calculator': {
    title: 'Carburetor CFM Calculator | Free Engine Sizing Tool',
    description: 'Calculate carburetor CFM for your engine displacement. Free carb sizing calculator for stock & modified engines. Get accurate airflow requirements.',
    keywords: [
      'carburetor cfm calculator',
      'carb cfm calculator',
      'carburetor sizing calculator',
      'engine cfm calculator',
      'carburetor airflow calculator',
      'carb sizing tool',
      'holley cfm calculator',
      'edelbrock cfm calculator',
      'quadrajet cfm calculator',
      'carburetor selection calculator',
      'engine airflow requirements',
      'cfm calculation formula',
      'carburetor cfm chart',
      'engine displacement cfm',
      'performance carburetor sizing'
    ],
    ogImage: '/images/carburetor-cfm-calculator-og.jpg',
    twitterImage: '/images/carburetor-cfm-calculator-twitter.jpg'
  },
  
  'compression-ratio-calculator': {
    title: 'Compression Ratio Calculator | Engine CR Tool Free',
    description: 'Calculate engine compression ratio from bore, stroke, head volume. Free CR calculator for performance engines. Includes octane recommendations.',
    keywords: [
      'compression ratio calculator',
      'engine compression calculator',
      'cr calculator',
      'compression ratio formula',
      'engine cr calculator',
      'compression calculator',
      'piston compression calculator',
      'engine compression ratio',
      'compression ratio chart',
      'high compression calculator',
      'low compression calculator',
      'compression ratio octane',
      'engine performance calculator',
      'compression ratio tool',
      'engine building calculator'
    ],
    ogImage: '/images/compression-ratio-calculator-og.jpg',
    twitterImage: '/images/compression-ratio-calculator-twitter.jpg'
  },

  'supercharger-calculator': {
    title: 'Supercharger HP Calculator | Free Boost PSI Tool',
    description: 'Calculate supercharger horsepower gains from boost PSI. Free online tool for turbo, blower & forced induction power calculations. Get instant results.',
    keywords: [
      'supercharger calculator',
      'supercharger horsepower calculator',
      'boost psi calculator',
      'turbo hp calculator',
      'forced induction calculator',
      'blower calculator',
      'supercharger cfm calculator',
      'boost horsepower gain',
      'turbocharger calculator',
      'centrifugal supercharger calculator',
      'roots blower calculator',
      'twin screw supercharger calculator',
      'boost pressure calculator',
      'forced induction hp gain',
      'supercharger sizing calculator'
    ],
    ogImage: '/images/supercharger-calculator-og.jpg',
    twitterImage: '/images/supercharger-calculator-twitter.jpg'
  },

  'gear-ratio-calculator': {
    title: 'Gear Ratio Calculator | RPM Speed Calculator Free',
    description: 'Calculate gear ratios, RPM, and speed for transmissions and differentials. Free gear ratio calculator for performance and racing applications.',
    keywords: [
      'gear ratio calculator',
      'transmission gear ratio calculator',
      'differential gear ratio calculator',
      'rpm calculator',
      'speed calculator',
      'gear ratio formula',
      'final drive ratio calculator',
      'transmission calculator',
      'gear ratio chart',
      'performance gear calculator',
      'racing gear calculator',
      'gear ratio tool',
      'drivetrain calculator',
      'gear speed calculator',
      'transmission ratio calculator'
    ],
    ogImage: '/images/gear-ratio-calculator-og.jpg',
    twitterImage: '/images/gear-ratio-calculator-twitter.jpg'
  },

  'engine-displacement-calculator': {
    title: 'Engine Displacement Calculator | Bore Stroke Tool',
    description: 'Calculate engine displacement from bore and stroke. Free engine size calculator for cubic inches and liters. Includes cylinder count options.',
    keywords: [
      'engine displacement calculator',
      'engine size calculator',
      'bore stroke calculator',
      'engine volume calculator',
      'cubic inch calculator',
      'liter displacement calculator',
      'engine capacity calculator',
      'displacement formula calculator',
      'engine bore calculator',
      'engine stroke calculator',
      'cylinder displacement calculator',
      'engine cc calculator',
      'motor displacement calculator',
      'engine building calculator',
      'displacement Converters calculator'
    ],
    ogImage: '/images/engine-displacement-calculator-og.jpg',
    twitterImage: '/images/engine-displacement-calculator-twitter.jpg'
  },

  'torque-horsepower-calculator': {
    title: 'Torque HP Calculator | Power Converters Tool Free',
    description: 'Convert between torque and horsepower at any RPM. Free torque to HP calculator with instant results. Includes power curve calculations.',
    keywords: [
      'torque horsepower calculator',
      'torque to hp calculator',
      'horsepower calculator',
      'torque calculator',
      'power calculator',
      'hp to torque calculator',
      'torque hp Converters',
      'engine power calculator',
      'torque horsepower formula',
      'power torque calculator',
      'rpm power calculator',
      'engine torque calculator',
      'horsepower torque converter',
      'power curve calculator',
      'engine performance calculator'
    ],
    ogImage: '/images/torque-horsepower-calculator-og.jpg',
    twitterImage: '/images/torque-horsepower-calculator-twitter.jpg'
  },

  // Finance Tools
  'currency-converter': {
    title: 'Currency Converter | Live Exchange Rates Free Tool',
    description: 'Convert currencies with live exchange rates. Free online currency converter for 150+ currencies including USD, EUR, GBP, JPY. Real-time rates.',
    keywords: [
      'currency converter',
      'exchange rate converter',
      'live currency converter',
      'real time currency converter',
      'free currency converter',
      'usd to eur converter',
      'gbp to usd converter',
      'jpy to usd converter',
      'forex converter',
      'money converter',
      'currency exchange calculator',
      'foreign exchange converter',
      'currency rate calculator',
      'international currency converter',
      'multi currency converter'
    ],
    ogImage: '/images/currency-converter-og.jpg',
    twitterImage: '/images/currency-converter-twitter.jpg'
  },

  // Time Tools
  'timestamp-converter': {
    title: 'Timestamp Converter | Unix Time Converter Free Tool',
    description: 'Convert Unix timestamps to human readable dates. Free timestamp converter for epoch time, milliseconds, and date formats. Instant Converters.',
    keywords: [
      'timestamp converter',
      'unix timestamp converter',
      'epoch time converter',
      'unix time converter',
      'timestamp to date converter',
      'date to timestamp converter',
      'epoch converter',
      'unix epoch converter',
      'milliseconds timestamp converter',
      'timestamp calculator',
      'unix time calculator',
      'epoch time calculator',
      'timestamp decoder',
      'unix timestamp decoder',
      'time converter online'
    ],
    ogImage: '/images/timestamp-converter-og.jpg',
    twitterImage: '/images/timestamp-converter-twitter.jpg'
  },

  // Unit Tools
  'unit-converter': {
    title: 'Unit Converter | Free Measurement Converters Tool',
    description: 'Convert units of measurement instantly. Free online unit converter for length, weight, temperature, volume, area, and more. Accurate Converterss.',
    keywords: [
      'unit converter',
      'measurement converter',
      'metric converter',
      'imperial converter',
      'length converter',
      'weight converter',
      'temperature converter',
      'volume converter',
      'area converter',
      'distance converter',
      'mass converter',
      'Converters calculator',
      'unit Converters tool',
      'measurement calculator',
      'metric imperial converter'
    ],
    ogImage: '/images/unit-converter-og.jpg',
    twitterImage: '/images/unit-converter-twitter.jpg'
  },

  // Color Tools
  'hex-to-rgb-converter': {
    title: 'Hex to RGB Converter | Color Code Converter Free',
    description: 'Convert hex color codes to RGB values instantly. Free color converter tool for web design, CSS, and digital art. Includes color preview.',
    keywords: [
      'hex to rgb converter',
      'color converter',
      'hex color converter',
      'rgb converter',
      'color code converter',
      'hex rgb calculator',
      'color picker converter',
      'css color converter',
      'web color converter',
      'html color converter',
      'color palette converter',
      'hex code converter',
      'rgb color converter',
      'color format converter',
      'digital color converter'
    ],
    ogImage: '/images/hex-to-rgb-converter-og.jpg',
    twitterImage: '/images/hex-to-rgb-converter-twitter.jpg'
  },

  // Health Tools
  'bmi-calculator': {
    title: 'BMI Calculator | Body Mass Index Calculator Free',
    description: 'Calculate your BMI (Body Mass Index) instantly. Free BMI calculator with health categories and recommendations. Track your healthy weight range.',
    keywords: [
      'bmi calculator',
      'body mass index calculator',
      'bmi chart calculator',
      'weight calculator',
      'healthy weight calculator',
      'obesity calculator',
      'bmi index calculator',
      'body fat calculator',
      'ideal weight calculator',
      'weight loss calculator',
      'health calculator',
      'fitness calculator',
      'bmi scale calculator',
      'weight status calculator',
      'body weight calculator'
    ],
    ogImage: '/images/bmi-calculator-og.jpg',
    twitterImage: '/images/bmi-calculator-twitter.jpg'
  }
};

/**
 * Generate optimized metadata for a tool page
 */
export function generateOptimizedMetadata(toolId: string, baseUrl: string = 'https://interconverter.com') {
  const config = TOOL_SEO_CONFIG[toolId];
  if (!config) {
    throw new Error(`SEO config not found for tool: ${toolId}`);
  }

  const toolPath = getToolPath(toolId);
  const canonicalUrl = `${baseUrl}${toolPath}`;

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    openGraph: {
      title: config.title,
      description: config.description,
      type: 'website' as const,
      url: canonicalUrl,
      siteName: 'InterConverter',
      images: [
        {
          url: config.ogImage,
          width: 1200,
          height: 630,
          alt: `${config.title} - Free Online Tool`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: config.title,
      description: config.description,
      images: [config.twitterImage]
    },
    alternates: {
      canonical: canonicalUrl
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
    }
  };
}

/**
 * Get the URL path for a tool based on its ID
 */
function getToolPath(toolId: string): string {
  // Map tool IDs to their category paths
  const toolPaths: Record<string, string> = {
    // Auto tools
    'carburetor-cfm-calculator': '/auto/carburetor-cfm-calculator',
    'compression-ratio-calculator': '/auto/compression-ratio-calculator',
    'supercharger-calculator': '/auto/supercharger-calculator',
    'gear-ratio-calculator': '/auto/gear-ratio-calculator',
    'engine-displacement-calculator': '/auto/engine-displacement-calculator',
    'torque-horsepower-calculator': '/auto/torque-horsepower-calculator',
    
    // Finance tools
    'currency-converter': '/finance/currency-converter',
    
    // Time tools
    'timestamp-converter': '/time/timestamp-converter',
    
    // Unit tools
    'unit-converter': '/unit/unit-converter',
    
    // Color tools
    'hex-to-rgb-converter': '/color/hex-to-rgb-converter',
    
    // Health tools
    'bmi-calculator': '/health/bmi-calculator'
  };

  return toolPaths[toolId] || `/${toolId}`;
}
