export interface SEOToolConfig {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  canonicalPath: string;
  structuredData?: {
    '@type': string;
    name: string;
    description: string;
    url: string;
    applicationCategory: string;
    operatingSystem: string;
    offers?: {
      '@type': string;
      price: string;
      priceCurrency: string;
    };
  };
}

// Unit Tools SEO Configuration
export const UNIT_TOOLS_SEO: SEOToolConfig[] = [
  {
    id: 'length-converter',
    title: 'Length Converter - Convert Meters, Feet, Inches & More | InterConverter',
    description: 'Free online length converter. Convert between meters, feet, inches, centimeters, miles, kilometers and more. Accurate metric to imperial conversion calculator.',
    keywords: [
      'length converter', 'distance converter', 'meter to feet', 'feet to meter', 
      'inch to cm', 'cm to inch', 'mile to km', 'length conversion calculator',
      'measurement converter', 'metric imperial converter'
    ],
    canonicalPath: '/unit/length-converter',
    structuredData: {
      '@type': 'WebApplication',
      name: 'Length Converter',
      description: 'Convert between different units of length and distance',
      url: 'https://interconverter.com/unit/length-converter',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  },
  {
    id: 'weight-converter',
    title: 'Weight Converter - Convert Kg, Pounds, Grams & More | InterConverter',
    description: 'Free weight converter tool. Convert between kilograms, pounds, grams, ounces, stones and more. Accurate mass conversion calculator for all units.',
    keywords: [
      'weight converter', 'mass converter', 'kg to lbs', 'pounds to kg',
      'gram to ounce', 'weight conversion calculator', 'body weight converter',
      'metric imperial weight', 'mass conversion tool'
    ],
    canonicalPath: '/unit/weight-converter'
  },
  {
    id: 'temperature-converter',
    title: 'Temperature Converter - Celsius, Fahrenheit & Kelvin | InterConverter',
    description: 'Convert temperatures between Celsius, Fahrenheit, and Kelvin. Free online temperature conversion calculator with weather references and formulas.',
    keywords: [
      'temperature converter', 'celsius to fahrenheit', 'fahrenheit to celsius',
      'kelvin converter', 'temperature conversion calculator', 'weather temperature',
      'cooking temperature', 'celsius fahrenheit kelvin'
    ],
    canonicalPath: '/unit/temperature-converter'
  },
  {
    id: 'area-converter',
    title: 'Area Converter - Square Meters, Feet, Acres & More | InterConverter',
    description: 'Convert area units including square meters, square feet, acres, hectares. Professional area conversion calculator for land and property measurements.',
    keywords: [
      'area converter', 'square meter converter', 'square feet converter',
      'acre to hectare', 'area conversion calculator', 'land area converter',
      'surface area converter', 'property area calculator'
    ],
    canonicalPath: '/unit/area-converter'
  },
  {
    id: 'volume-converter',
    title: 'Volume Converter - Liters, Gallons, Cubic Meters | InterConverter',
    description: 'Convert volume units between liters, gallons, cubic meters, milliliters and more. Accurate liquid volume conversion calculator.',
    keywords: [
      'volume converter', 'liter to gallon', 'gallon to liter',
      'cubic meter converter', 'milliliter converter', 'volume conversion calculator',
      'liquid volume converter', 'capacity converter'
    ],
    canonicalPath: '/unit/volume-converter'
  }
];

// Color Tools SEO Configuration
export const COLOR_TOOLS_SEO: SEOToolConfig[] = [
  {
    id: 'hex-to-rgb-converter',
    title: 'HEX to RGB Converter - Color Code Converter | InterConverter',
    description: 'Convert HEX color codes to RGB values instantly. Free online color converter with live preview and CSS code generation for web design.',
    keywords: [
      'hex to rgb converter', 'color converter', 'hex color converter',
      'rgb converter', 'color code converter', 'css color converter',
      'web color converter', 'design color tool'
    ],
    canonicalPath: '/color/hex-to-rgb',
    structuredData: {
      '@type': 'WebApplication',
      name: 'HEX to RGB Converter',
      description: 'Convert HEX color codes to RGB values',
      url: 'https://interconverter.com/color/hex-to-rgb',
      applicationCategory: 'DesignApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  },
  {
    id: 'color-picker-tool',
    title: 'Color Picker Tool - Online Color Selector | InterConverter',
    description: 'Professional online color picker with HSL controls, color palettes, and history. Free web-based color selection tool for designers.',
    keywords: [
      'color picker', 'online color picker', 'color selector',
      'color chooser', 'web color picker', 'html color picker',
      'css color picker', 'design color tool'
    ],
    canonicalPath: '/color/color-picker'
  },
  {
    id: 'gradient-generator',
    title: 'CSS Gradient Generator - Create Beautiful Gradients | InterConverter',
    description: 'Create beautiful CSS gradients with live preview. Professional gradient maker for web design and UI development with instant CSS code.',
    keywords: [
      'gradient generator', 'css gradient generator', 'gradient maker',
      'linear gradient generator', 'radial gradient generator', 'gradient tool',
      'web gradient creator', 'css gradient tool'
    ],
    canonicalPath: '/color/gradient-generator'
  },
  {
    id: 'contrast-checker',
    title: 'Color Contrast Checker - WCAG Accessibility Tool | InterConverter',
    description: 'Check color contrast ratios for WCAG accessibility compliance. Ensure your designs meet AA and AAA web accessibility standards.',
    keywords: [
      'contrast checker', 'color contrast checker', 'wcag contrast checker',
      'accessibility checker', 'color accessibility tool', 'contrast ratio calculator',
      'web accessibility tool', 'aa aaa compliance'
    ],
    canonicalPath: '/color/contrast-checker'
  }
];

// Time Tools SEO Configuration
export const TIME_TOOLS_SEO: SEOToolConfig[] = [
  {
    id: 'timestamp-converter',
    title: 'Unix Timestamp Converter - Epoch Time Converter | InterConverter',
    description: 'Convert Unix timestamps to human-readable dates and vice versa. Free timestamp conversion tool with timezone support for developers.',
    keywords: [
      'timestamp converter', 'unix timestamp converter', 'epoch converter',
      'unix time converter', 'timestamp to date', 'epoch time converter',
      'posix time converter', 'unix timestamp online'
    ],
    canonicalPath: '/time/timestamp-converter',
    structuredData: {
      '@type': 'WebApplication',
      name: 'Unix Timestamp Converter',
      description: 'Convert Unix timestamps to readable dates',
      url: 'https://interconverter.com/time/timestamp-converter',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  },
  {
    id: 'timezone-converter',
    title: 'Time Zone Converter - World Time Converter | InterConverter',
    description: 'Convert time between different time zones worldwide. Free timezone converter with daylight saving time support for global business.',
    keywords: [
      'timezone converter', 'time zone converter', 'world time converter',
      'timezone calculator', 'time conversion tool', 'world clock converter',
      'timezone tool', 'global time converter'
    ],
    canonicalPath: '/time/timezone-converter'
  },
  {
    id: 'age-calculator',
    title: 'Age Calculator - Calculate Exact Age from Birth Date | InterConverter',
    description: 'Calculate exact age in years, months, days, hours from birth date. Free age calculation tool with precise results and birthday countdown.',
    keywords: [
      'age calculator', 'calculate age', 'age from birth date',
      'exact age calculator', 'age in days calculator', 'birthday calculator',
      'age counter', 'how old am i'
    ],
    canonicalPath: '/time/age-calculator'
  },
  {
    id: 'countdown-timer',
    title: 'Countdown Timer - Online Event Countdown Clock | InterConverter',
    description: 'Create customizable countdown timers for events, deadlines, and special occasions. Free online countdown clock with alarm and notifications.',
    keywords: [
      'countdown timer', 'countdown clock', 'event countdown',
      'timer countdown', 'deadline timer', 'countdown widget',
      'online countdown', 'event timer'
    ],
    canonicalPath: '/time/countdown-timer'
  }
];

// Category Landing Pages SEO
export const CATEGORY_PAGES_SEO: SEOToolConfig[] = [
  {
    id: 'unit-category',
    title: 'Unit & Measurement Converters - Free Online Tools | InterConverter',
    description: 'Convert between different units of measurement including length, weight, temperature, area, volume, speed, pressure, energy, power, and data storage. Free, accurate conversion tools.',
    keywords: [
      'unit converter', 'measurement converter', 'length converter', 'weight converter',
      'temperature converter', 'area converter', 'volume converter', 'speed converter',
      'pressure converter', 'energy converter', 'power converter', 'data converter',
      'metric imperial converter', 'measurement tools', 'conversion calculator'
    ],
    canonicalPath: '/unit'
  },
  {
    id: 'color-category',
    title: 'Color & Design Tools - Free Online Color Converters | InterConverter',
    description: 'Professional color conversion tools including HEX to RGB, color picker, gradient generator, palette creator, and contrast checker. Free web design tools.',
    keywords: [
      'color converter', 'hex to rgb converter', 'rgb to hex converter', 'color picker',
      'gradient generator', 'color palette generator', 'contrast checker', 'web design tools',
      'css color tools', 'color code converter', 'design tools', 'accessibility tools'
    ],
    canonicalPath: '/color'
  },
  {
    id: 'time-category',
    title: 'Time & Date Tools - Free Online Converters & Calculators | InterConverter',
    description: 'Professional time and date tools including timestamp converter, timezone converter, date calculator, age calculator, countdown timer, and world clock.',
    keywords: [
      'timestamp converter', 'timezone converter', 'date calculator', 'age calculator',
      'countdown timer', 'world clock', 'unix timestamp', 'epoch converter',
      'time zone conversion', 'date difference calculator', 'working days calculator'
    ],
    canonicalPath: '/time'
  }
];

// Helper function to get SEO config by tool ID
export const getSEOConfigByToolId = (toolId: string): SEOToolConfig | undefined => {
  const allConfigs = [...UNIT_TOOLS_SEO, ...COLOR_TOOLS_SEO, ...TIME_TOOLS_SEO, ...CATEGORY_PAGES_SEO];
  return allConfigs.find(config => config.id === toolId);
};

// Helper function to generate structured data JSON-LD
export const generateStructuredData = (config: SEOToolConfig) => {
  if (!config.structuredData) return null;
  
  return {
    '@context': 'https://schema.org',
    ...config.structuredData
  };
};
