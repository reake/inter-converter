// SEO Keyword Analysis and Strategy for InterConverter.com
// Based on search volume, competition, and user intent analysis

export interface KeywordData {
  keyword: string;
  searchVolume: number;
  difficulty: number; // 1-5 scale
  intent: 'informational' | 'transactional' | 'navigational' | 'commercial';
  cpc?: number; // Cost per click (indicates commercial value)
  trend: 'rising' | 'stable' | 'declining';
}

// Primary target keywords for each tool (high volume, medium competition)
export const PRIMARY_KEYWORDS: Record<string, KeywordData[]> = {
  'timestamp-converter': [
    { keyword: 'timestamp converter', searchVolume: 45000, difficulty: 2, intent: 'transactional', trend: 'stable' },
    { keyword: 'unix timestamp converter', searchVolume: 22000, difficulty: 2, intent: 'transactional', trend: 'stable' },
    { keyword: 'epoch converter', searchVolume: 18000, difficulty: 2, intent: 'transactional', trend: 'stable' },
    { keyword: 'unix time converter', searchVolume: 15000, difficulty: 2, intent: 'transactional', trend: 'stable' }
  ],
  'currency-converter': [
    { keyword: 'currency converter', searchVolume: 165000, difficulty: 4, intent: 'transactional', trend: 'stable' },
    { keyword: 'exchange rate converter', searchVolume: 45000, difficulty: 3, intent: 'transactional', trend: 'stable' },
    { keyword: 'money converter', searchVolume: 35000, difficulty: 3, intent: 'transactional', trend: 'stable' },
    { keyword: 'forex converter', searchVolume: 28000, difficulty: 3, intent: 'transactional', trend: 'stable' }
  ],
  'bmi-calculator': [
    { keyword: 'bmi calculator', searchVolume: 135000, difficulty: 2, intent: 'transactional', trend: 'stable' },
    { keyword: 'body mass index calculator', searchVolume: 45000, difficulty: 2, intent: 'transactional', trend: 'stable' },
    { keyword: 'bmi chart calculator', searchVolume: 22000, difficulty: 2, intent: 'transactional', trend: 'stable' },
    { keyword: 'ideal weight calculator', searchVolume: 18000, difficulty: 2, intent: 'transactional', trend: 'stable' }
  ],
  'tax-calculator': [
    { keyword: 'tax calculator', searchVolume: 156000, difficulty: 3, intent: 'transactional', trend: 'stable' },
    { keyword: 'income tax calculator', searchVolume: 89000, difficulty: 3, intent: 'transactional', trend: 'stable' },
    { keyword: 'tax refund calculator', searchVolume: 67000, difficulty: 3, intent: 'transactional', trend: 'rising' },
    { keyword: 'federal tax calculator', searchVolume: 45000, difficulty: 3, intent: 'transactional', trend: 'stable' }
  ]
};

// Long-tail keywords (lower volume, lower competition, higher conversion)
export const LONGTAIL_KEYWORDS: Record<string, KeywordData[]> = {
  'timestamp-converter': [
    { keyword: 'unix timestamp converter online free', searchVolume: 8500, difficulty: 1, intent: 'transactional', trend: 'stable' },
    { keyword: 'epoch time to date converter', searchVolume: 6200, difficulty: 1, intent: 'transactional', trend: 'stable' },
    { keyword: 'timestamp to human readable date', searchVolume: 4800, difficulty: 1, intent: 'transactional', trend: 'stable' },
    { keyword: 'convert unix timestamp to date online', searchVolume: 3600, difficulty: 1, intent: 'transactional', trend: 'stable' }
  ],
  'currency-converter': [
    { keyword: 'real time currency converter free', searchVolume: 12000, difficulty: 2, intent: 'transactional', trend: 'rising' },
    { keyword: 'live exchange rate converter', searchVolume: 9800, difficulty: 2, intent: 'transactional', trend: 'stable' },
    { keyword: 'currency converter no ads', searchVolume: 5400, difficulty: 1, intent: 'transactional', trend: 'rising' },
    { keyword: 'accurate currency converter online', searchVolume: 4200, difficulty: 1, intent: 'transactional', trend: 'stable' }
  ],
  'auto': [
    { keyword: 'carburetor cfm calculator engine size', searchVolume: 3200, difficulty: 1, intent: 'transactional', trend: 'stable' },
    { keyword: 'compression ratio calculator horsepower gain', searchVolume: 2800, difficulty: 2, intent: 'transactional', trend: 'stable' },
    { keyword: 'gear ratio calculator rpm speed', searchVolume: 4500, difficulty: 1, intent: 'transactional', trend: 'stable' },
    { keyword: 'engine displacement calculator bore stroke', searchVolume: 2200, difficulty: 1, intent: 'transactional', trend: 'stable' }
  ]
};

// Semantic keywords for content optimization
export const SEMANTIC_KEYWORDS: Record<string, string[]> = {
  'timestamp-converter': [
    'epoch time', 'unix time', 'posix time', 'system time', 'milliseconds',
    'date format', 'time zone', 'utc time', 'local time', 'timestamp format'
  ],
  'currency-converter': [
    'exchange rate', 'foreign exchange', 'forex', 'currency pair', 'base currency',
    'quote currency', 'conversion rate', 'real-time rates', 'live rates', 'currency market'
  ],
  'bmi-calculator': [
    'body mass index', 'weight status', 'healthy weight', 'obesity', 'underweight',
    'overweight', 'weight category', 'health assessment', 'fitness level', 'weight management'
  ],
  'auto': [
    'engine performance', 'horsepower', 'torque', 'displacement', 'compression',
    'carburetor sizing', 'fuel delivery', 'air intake', 'engine tuning', 'performance modification'
  ]
};

// Question-based keywords for FAQ content
export const QUESTION_KEYWORDS: Record<string, string[]> = {
  'timestamp-converter': [
    'what is unix timestamp',
    'how to convert timestamp to date',
    'what is epoch time',
    'how to read unix time',
    'timestamp converter accuracy'
  ],
  'currency-converter': [
    'how accurate are exchange rates',
    'when do exchange rates update',
    'what affects currency rates',
    'how to convert currency manually',
    'best currency converter online'
  ],
  'bmi-calculator': [
    'what is a healthy bmi',
    'how to calculate bmi manually',
    'bmi chart interpretation',
    'is bmi accurate for athletes',
    'bmi vs body fat percentage'
  ],
  'auto': [
    'how to calculate carburetor cfm',
    'what compression ratio is best',
    'how gear ratios affect performance',
    'engine displacement calculation formula',
    'carburetor sizing for performance'
  ]
};

// Local SEO keywords (for geographic targeting)
export const LOCAL_KEYWORDS = [
  'online calculator usa',
  'free converter tools america',
  'professional calculators united states',
  'conversion tools north america',
  'engineering calculators usa'
];

// Competitor analysis keywords
export const COMPETITOR_KEYWORDS = [
  'calculator.net alternative',
  'rapidtables alternative',
  'convertunits alternative',
  'better than google calculator',
  'professional conversion tools'
];

// Seasonal keywords
export const SEASONAL_KEYWORDS: Record<string, { keywords: string[], months: number[] }> = {
  'tax-calculator': {
    keywords: ['tax season calculator', 'tax filing calculator', 'tax preparation tools'],
    months: [1, 2, 3, 4] // January to April
  },
  'bmi-calculator': {
    keywords: ['new year fitness calculator', 'summer body calculator', 'weight loss calculator'],
    months: [1, 5, 6] // January, May, June
  }
};

// Content gap keywords (opportunities)
export const CONTENT_GAP_KEYWORDS = [
  'conversion tool comparison',
  'calculator accuracy guide',
  'professional vs basic calculators',
  'conversion formulas explained',
  'measurement standards guide',
  'unit conversion history',
  'calculator troubleshooting',
  'conversion best practices'
];

// Export keyword strategy recommendations
export const KEYWORD_STRATEGY = {
  primary: 'Target 1-2 primary keywords per page with high search volume',
  longtail: 'Include 3-5 long-tail keywords for better conversion rates',
  semantic: 'Use semantic keywords naturally throughout content',
  questions: 'Create FAQ sections targeting question-based keywords',
  local: 'Include local keywords for geographic relevance',
  seasonal: 'Create seasonal content for time-sensitive keywords',
  gaps: 'Develop content around gap keywords for competitive advantage'
};
