import { ToolConfig, ToolCategory } from '@/types/tools';

export const TOOL_CATEGORIES: Record<ToolCategory, { name: string; description: string }> = {
  'time-date': {
    name: 'Time & Date',
    description: 'Convert timestamps, timezones, and create countdowns'
  },
  'currency-finance': {
    name: 'Currency & Finance',
    description: 'Currency conversion, loan calculations, and tax tools'
  },
  'unit-measurement': {
    name: 'Unit & Measurement',
    description: 'Convert between different units of measurement'
  },
  'file-media': {
    name: 'File & Media',
    description: 'Convert file formats and process media files'
  },
  'color-design': {
    name: 'Color & Design',
    description: 'Color conversion and design utilities'
  },
  'health-fitness': {
    name: 'Health & Fitness',
    description: 'Health calculators and fitness tools'
  },
  'science-engineering': {
    name: 'Science & Engineering',
    description: 'Scientific calculations and engineering tools'
  },
  'automotive': {
    name: 'Automotive',
    description: 'Engine performance, drivetrain, and automotive calculations'
  }
};

export const TOOLS_CONFIG: ToolConfig[] = [
  // Time & Date Tools
  {
    id: 'timestamp-converter',
    name: 'Timestamp Converter',
    description: 'Convert Unix timestamps to human-readable dates and vice versa',
    category: 'time-date',
    keywords: ['timestamp', 'unix', 'date', 'time', 'converter', 'epoch'],
    path: '/time-date/timestamp-converter',
    isActive: true,
    searchVolume: 45000,
    difficulty: 2,
    icon: '🕐'
  },
  {
    id: 'countdown-timer',
    name: 'Countdown Timer',
    description: 'Create countdown timers for events and deadlines',
    category: 'time-date',
    keywords: ['countdown', 'timer', 'event', 'deadline', 'clock', 'time'],
    path: '/time-date/countdown-timer',
    isActive: true,
    searchVolume: 82000,
    difficulty: 2,
    icon: '⏰'
  },
  {
    id: 'date-difference-calculator',
    name: 'Date Difference Calculator',
    description: 'Calculate the difference between two dates in days, months, and years',
    category: 'time-date',
    keywords: ['date', 'difference', 'calculator', 'days', 'between', 'duration'],
    path: '/time-date/date-difference-calculator',
    isActive: true,
    searchVolume: 52000,
    difficulty: 2,
    icon: '📅'
  },

  // Currency & Finance Tools
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Convert between different currencies with real-time exchange rates',
    category: 'currency-finance',
    keywords: ['currency', 'exchange', 'rate', 'money', 'converter', 'forex'],
    path: '/currency-finance/currency-converter',
    isActive: true,
    searchVolume: 165000,
    difficulty: 3,
    icon: '💱'
  },
  {
    id: 'loan-calculator',
    name: 'Loan Calculator',
    description: 'Calculate monthly payments, interest, and amortization schedules',
    category: 'currency-finance',
    keywords: ['loan', 'mortgage', 'payment', 'interest', 'calculator', 'finance'],
    path: '/currency-finance/loan-calculator',
    isActive: true,
    searchVolume: 74000,
    difficulty: 2,
    icon: '🏦'
  },
  {
    id: 'tax-calculator',
    name: 'Tax Calculator',
    description: 'Calculate income tax and estimate tax liability',
    category: 'currency-finance',
    keywords: ['tax', 'income', 'calculator', 'irs', 'refund', 'liability'],
    path: '/currency-finance/tax-calculator',
    isActive: true,
    searchVolume: 156000,
    difficulty: 3,
    icon: '🧾'
  },

  // Unit & Measurement Tools
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between different units of length, weight, and temperature',
    category: 'unit-measurement',
    keywords: ['unit', 'converter', 'metric', 'imperial', 'measurement', 'length'],
    path: '/unit-measurement/unit-converter',
    isActive: true,
    searchVolume: 98000,
    difficulty: 2,
    icon: '📏'
  },

  // File & Media Tools
  {
    id: 'pdf-to-word-converter',
    name: 'PDF to Word Converter',
    description: 'Convert PDF files to editable Word documents',
    category: 'file-media',
    keywords: ['pdf', 'word', 'doc', 'docx', 'converter', 'document'],
    path: '/file-media/pdf-to-word-converter',
    isActive: true,
    searchVolume: 201000,
    difficulty: 4,
    icon: '📄'
  },
  {
    id: 'jpg-to-png-converter',
    name: 'JPG to PNG Converter',
    description: 'Convert JPG images to PNG format with transparency support',
    category: 'file-media',
    keywords: ['jpg', 'jpeg', 'png', 'image', 'converter', 'photo'],
    path: '/file-media/jpg-to-png-converter',
    isActive: true,
    searchVolume: 89000,
    difficulty: 2,
    icon: '🖼️'
  },

  // Color & Design Tools
  {
    id: 'hex-to-rgb-converter',
    name: 'HEX to RGB Converter',
    description: 'Convert HEX color codes to RGB values and vice versa',
    category: 'color-design',
    keywords: ['hex', 'rgb', 'color', 'converter', 'css', 'design'],
    path: '/color-design/hex-to-rgb-converter',
    isActive: true,
    searchVolume: 67000,
    difficulty: 1,
    icon: '🎨'
  },

  // Health & Fitness Tools
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate Body Mass Index and get health recommendations',
    category: 'health-fitness',
    keywords: ['bmi', 'body', 'mass', 'index', 'health', 'calculator'],
    path: '/health-fitness/bmi-calculator',
    isActive: true,
    searchVolume: 135000,
    difficulty: 1,
    icon: '⚖️'
  },
  // Automotive Tools
  {
    id: 'carburetor-cfm-calculator',
    name: 'Carburetor CFM Calculator',
    description: 'Calculate the correct carburetor CFM for your engine based on displacement',
    category: 'automotive',
    keywords: ['carburetor', 'cfm', 'airflow', 'engine', 'performance', 'tuning'],
    path: '/automotive/carburetor-cfm-calculator',
    isActive: true,
    searchVolume: 12000,
    difficulty: 2,
    icon: '🏎️'
  },
  {
    id: 'compression-ratio-calculator',
    name: 'Compression Ratio Calculator',
    description: 'Calculate horsepower changes from compression ratio modifications',
    category: 'automotive',
    keywords: ['compression', 'ratio', 'horsepower', 'engine', 'performance'],
    path: '/automotive/compression-ratio-calculator',
    isActive: true,
    searchVolume: 8500,
    difficulty: 3,
    icon: '⚙️'
  },
  {
    id: 'engine-size-converter',
    name: 'Engine Size Converter',
    description: 'Convert engine displacement between cubic inches and liters',
    category: 'automotive',
    keywords: ['engine', 'displacement', 'cubic inches', 'liters', 'conversion'],
    path: '/automotive/engine-size-converter',
    isActive: true,
    searchVolume: 15000,
    difficulty: 1,
    icon: '🔧'
  },
  {
    id: 'gear-ratio-calculator',
    name: 'Gear Ratio Calculator',
    description: 'Calculate gear ratios and optimal ratios for performance',
    category: 'automotive',
    keywords: ['gear', 'ratio', 'differential', 'performance', 'transmission'],
    path: '/automotive/gear-ratio-calculator',
    isActive: true,
    searchVolume: 18000,
    difficulty: 2,
    icon: '⚙️'
  },
  {
    id: 'power-to-weight-ratio',
    name: 'Power to Weight Ratio Calculator',
    description: 'Calculate horsepower to weight ratio for performance analysis',
    category: 'automotive',
    keywords: ['power', 'weight', 'ratio', 'horsepower', 'performance'],
    path: '/automotive/power-to-weight-ratio',
    isActive: true,
    searchVolume: 9500,
    difficulty: 1,
    icon: '💪'
  },
  {
    id: 'ram-air-calculator',
    name: 'Ram Air Calculator',
    description: 'Calculate horsepower gains from ram air induction systems',
    category: 'automotive',
    keywords: ['ram air', 'horsepower', 'induction', 'performance', 'pontiac'],
    path: '/automotive/ram-air-calculator',
    isActive: true,
    searchVolume: 4500,
    difficulty: 3,
    icon: '💨'
  },
  {
    id: 'rpm-calculator',
    name: 'RPM Calculator',
    description: 'Calculate engine RPM based on speed, gear ratio, and tire size',
    category: 'automotive',
    keywords: ['rpm', 'speed', 'gear ratio', 'tire', 'engine'],
    path: '/automotive/rpm-calculator',
    isActive: true,
    searchVolume: 22000,
    difficulty: 2,
    icon: '🌀'
  },
  {
    id: 'speed-converter',
    name: 'Speed Converter',
    description: 'Convert between MPH and KPH for automotive applications',
    category: 'automotive',
    keywords: ['speed', 'mph', 'kph', 'conversion', 'automotive'],
    path: '/automotive/speed-converter',
    isActive: true,
    searchVolume: 35000,
    difficulty: 1,
    icon: '🏁'
  },
  {
    id: 'supercharger-calculator',
    name: 'Supercharger Calculator',
    description: 'Calculate horsepower gains and CFM requirements for superchargers',
    category: 'automotive',
    keywords: ['supercharger', 'horsepower', 'boost', 'psi', 'performance'],
    path: '/automotive/supercharger-calculator',
    isActive: true,
    searchVolume: 7500,
    difficulty: 3,
    icon: '🌪️'
  },
  {
    id: 'automotive-temperature-converter',
    name: 'Temperature Converter',
    description: 'Convert between Fahrenheit and Celsius for automotive use',
    category: 'automotive',
    keywords: ['temperature', 'fahrenheit', 'celsius', 'conversion', 'automotive'],
    path: '/automotive/temperature-converter',
    isActive: true,
    searchVolume: 28000,
    difficulty: 1,
    icon: '🌡️'
  },
  {
    id: 'tire-calculator',
    name: 'Tire Calculator',
    description: 'Calculate tire diameter effects on speed and performance',
    category: 'automotive',
    keywords: ['tire', 'diameter', 'speed', 'rpm', 'performance'],
    path: '/automotive/tire-calculator',
    isActive: true,
    searchVolume: 16000,
    difficulty: 2,
    icon: '🛞'
  },
  {
    id: 'torque-horsepower-calculator',
    name: 'Torque & Horsepower Calculator',
    description: 'Convert between torque and horsepower at different RPMs',
    category: 'automotive',
    keywords: ['torque', 'horsepower', 'rpm', 'conversion', 'engine'],
    path: '/automotive/torque-horsepower-calculator',
    isActive: true,
    searchVolume: 19000,
    difficulty: 2,
    icon: '🔩'
  },
  {
    id: 'volumetric-efficiency-calculator',
    name: 'Volumetric Efficiency Calculator',
    description: 'Calculate engine volumetric efficiency for performance tuning',
    category: 'automotive',
    keywords: ['volumetric efficiency', 've', 'engine', 'performance', 'tuning'],
    path: '/automotive/volumetric-efficiency-calculator',
    isActive: true,
    searchVolume: 3500,
    difficulty: 4,
    icon: '📊'
  },
  {
    id: 'engine-volume-calculator',
    name: 'Engine Volume Calculator',
    description: 'Calculate cylinder volume and engine displacement',
    category: 'automotive',
    keywords: ['volume', 'cylinder', 'displacement', 'bore', 'stroke'],
    path: '/automotive/engine-volume-calculator',
    isActive: true,
    searchVolume: 11000,
    difficulty: 2,
    icon: '📐'
  },
  {
    id: 'automotive-fluid-calculator',
    name: 'Automotive Fluid Calculator',
    description: 'Calculate volume and weight conversions for automotive fluids',
    category: 'automotive',
    keywords: ['fluid', 'volume', 'weight', 'gasoline', 'oil', 'transmission'],
    path: '/automotive/automotive-fluid-calculator',
    isActive: true,
    searchVolume: 6500,
    difficulty: 1,
    icon: '🛢️'
  },
  {
    id: 'automotive-weight-converter',
    name: 'Automotive Weight Converter',
    description: 'Convert between different weight units for automotive applications',
    category: 'automotive',
    keywords: ['weight', 'conversion', 'pounds', 'kilograms', 'ounces', 'grams'],
    path: '/automotive/automotive-weight-converter',
    isActive: true,
    searchVolume: 8000,
    difficulty: 1,
    icon: '⚖️'
  },


  {
    id: 'engine-displacement-calculator',
    name: 'Engine Displacement Calculator',
    description: 'Calculate engine displacement from bore, stroke, and cylinder count',
    category: 'automotive',
    keywords: ['displacement', 'bore', 'stroke', 'engine', 'cubic', 'inches'],
    path: '/automotive/engine-displacement-calculator',
    isActive: true,
    searchVolume: 9500,
    difficulty: 2,
    icon: '🔧'
  },

];

export const getToolById = (id: string): ToolConfig | undefined => {
  return TOOLS_CONFIG.find(tool => tool.id === id);
};

export const getToolsByCategory = (category: ToolCategory): ToolConfig[] => {
  return TOOLS_CONFIG.filter(tool => tool.category === category);
};

export const getPopularTools = (limit: number = 5): ToolConfig[] => {
  return TOOLS_CONFIG
    .filter(tool => tool.isActive)
    .sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0))
    .slice(0, limit);
};

// Re-export search functions from the search engine
export { searchTools, getSearchSuggestions } from '@/lib/search-engine';