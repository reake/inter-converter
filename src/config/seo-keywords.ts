// SEO-optimized keyword generation for different tool categories
// Following Google SEO best practices with primary + long-tail keywords

export interface SEOKeywords {
  primary: string[];
  longTail: string[];
  semantic: string[];
  local: string[];
}

// Automotive Tools Keywords
export const AUTOMOTIVE_KEYWORDS: Record<string, SEOKeywords> = {
  'temperature-converter': {
    primary: ['temperature converter', 'fahrenheit to celsius', 'automotive temperature'],
    longTail: [
      'car engine temperature converter',
      'coolant temperature fahrenheit celsius',
      'automotive temperature conversion tool',
      'engine operating temperature converter',
      'car thermostat temperature conversion'
    ],
    semantic: ['engine temperature', 'coolant temperature', 'thermostat', 'overheating', 'engine diagnostics'],
    local: ['automotive temperature converter online', 'free car temperature tool']
  },
  'carburetor-cfm-calculator': {
    primary: ['carburetor cfm calculator', 'carb cfm calculator', 'carburetor sizing'],
    longTail: [
      'how to calculate carburetor cfm',
      'engine displacement cfm calculator',
      'carburetor airflow requirements',
      'holley carburetor cfm calculator',
      'performance carburetor sizing tool'
    ],
    semantic: ['airflow', 'engine performance', 'fuel delivery', 'throttle response', 'engine tuning'],
    local: ['carburetor cfm calculator online free', 'carb sizing tool']
  },
  'power-to-weight-calculator': {
    primary: ['power to weight calculator', 'horsepower per pound', 'hp to weight ratio'],
    longTail: [
      'car power to weight ratio calculator',
      'vehicle performance calculator',
      'horsepower per pound calculator',
      'automotive power weight ratio',
      'engine power to weight analysis'
    ],
    semantic: ['acceleration', 'performance', 'horsepower', 'vehicle weight', 'speed'],
    local: ['power to weight ratio calculator online', 'free hp calculator']
  }
};

// Unit Conversion Keywords
export const UNIT_KEYWORDS: Record<string, SEOKeywords> = {
  'temperature-converter': {
    primary: ['temperature converter', 'celsius to fahrenheit', 'fahrenheit to celsius'],
    longTail: [
      'celsius fahrenheit kelvin converter',
      'temperature conversion calculator',
      'cooking temperature converter',
      'weather temperature conversion',
      'scientific temperature converter'
    ],
    semantic: ['degrees', 'thermometer', 'weather', 'cooking', 'science'],
    local: ['temperature converter online free', 'celsius fahrenheit calculator']
  },
  'weight-converter': {
    primary: ['weight converter', 'kg to lbs', 'pounds to kg'],
    longTail: [
      'kilograms to pounds converter',
      'body weight converter',
      'mass conversion calculator',
      'metric imperial weight converter',
      'grams ounces converter'
    ],
    semantic: ['mass', 'scale', 'measurement', 'fitness', 'health'],
    local: ['weight converter online free', 'kg lbs calculator']
  }
};

// Finance Keywords
export const FINANCE_KEYWORDS: Record<string, SEOKeywords> = {
  'mortgage-calculator': {
    primary: ['mortgage calculator', 'home loan calculator', 'monthly payment calculator'],
    longTail: [
      'mortgage payment calculator with taxes insurance',
      'home affordability calculator',
      'mortgage amortization calculator',
      'refinance calculator',
      'first time home buyer calculator'
    ],
    semantic: ['home buying', 'real estate', 'interest rate', 'down payment', 'closing costs'],
    local: ['mortgage calculator online free', 'home loan payment calculator']
  },
  'compound-interest-calculator': {
    primary: ['compound interest calculator', 'investment calculator', 'savings calculator'],
    longTail: [
      'compound interest formula calculator',
      'retirement savings calculator',
      'investment growth calculator',
      'compound annual growth rate calculator',
      'future value calculator'
    ],
    semantic: ['investing', 'retirement', 'savings', 'financial planning', 'wealth building'],
    local: ['compound interest calculator online free', 'investment growth tool']
  }
};

// Color Tools Keywords
export const COLOR_KEYWORDS: Record<string, SEOKeywords> = {
  'hex-to-rgb-converter': {
    primary: ['hex to rgb converter', 'color converter', 'hex color converter'],
    longTail: [
      'hex to rgb css converter',
      'color code converter online',
      'web color converter tool',
      'html color code converter',
      'design color converter'
    ],
    semantic: ['web design', 'css', 'html', 'color codes', 'digital design'],
    local: ['hex rgb converter online free', 'color code tool']
  }
};

// Generate optimized keywords for a tool
export function generateOptimizedKeywords(
  toolId: string, 
  category: string,
  toolName: string
): string[] {
  const categoryKeywords = {
    'auto': AUTOMOTIVE_KEYWORDS,
    'unit': UNIT_KEYWORDS,
    'finance': FINANCE_KEYWORDS,
    'color': COLOR_KEYWORDS
  };

  const keywords = categoryKeywords[category as keyof typeof categoryKeywords]?.[toolId];
  
  if (!keywords) {
    // Fallback keywords based on tool name
    return [
      toolName.toLowerCase(),
      `${toolName.toLowerCase()} online`,
      `free ${toolName.toLowerCase()}`,
      `${toolName.toLowerCase()} tool`,
      `${toolName.toLowerCase()} calculator`,
      'online converter',
      'free tool',
      'calculator online'
    ];
  }

  // Combine all keyword types with proper weighting
  return [
    ...keywords.primary,
    ...keywords.longTail.slice(0, 3), // Limit long-tail keywords
    ...keywords.semantic.slice(0, 2), // Limit semantic keywords
    ...keywords.local,
    // Add generic high-value keywords
    'online tool',
    'free calculator',
    'no registration'
  ];
}
