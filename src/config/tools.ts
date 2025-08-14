import { ToolConfig, ToolCategory } from '@/types/tools';

export const TOOL_CATEGORIES: Record<ToolCategory, { name: string; description: string }> = {
  'time': {
    name: 'Time & Date',
    description: 'Convert timestamps, timezones, and create countdowns'
  },
  'finance': {
    name: 'Finance',
    description: 'Currency conversion, loan calculations, and tax tools'
  },
  'unit': {
    name: 'Unit & Measurement',
    description: 'Convert between different units of measurement'
  },
  'media': {
    name: 'File & Media',
    description: 'Convert file formats and process media files'
  },
  'color': {
    name: 'Color & Design',
    description: 'Color conversion and design utilities'
  },
  'health': {
    name: 'Health & Fitness',
    description: 'Health calculators and fitness tools'
  },
  'science': {
    name: 'Science & Engineering',
    description: 'Scientific calculations and engineering tools'
  },
  'auto': {
    name: 'auto',
    description: 'Engine performance, drivetrain, and auto calculations'
  }
};

export const TOOLS_CONFIG: ToolConfig[] = [
  // Time & Date Tools
  {
    id: 'timestamp-converter',
    name: 'Timestamp Converter',
    description: 'Convert Unix timestamps to human-readable dates and vice versa. Free, accurate, and instant conversion with timezone support.',
    category: 'time',
    keywords: [
      'timestamp converter',
      'unix timestamp converter',
      'epoch converter',
      'unix time converter',
      'timestamp to date',
      'epoch time converter',
      'posix time converter',
      'unix timestamp converter online free',
      'epoch time to date converter',
      'timestamp to human readable date'
    ],
    path: '/time/timestamp-converter',
    isActive: true,
    searchVolume: 45000,
    difficulty: 2,
    icon: '🕐'
  },
  {
    id: 'countdown-timer',
    name: 'Countdown Timer',
    description: 'Create countdown timers for events and deadlines',
    category: 'time',
    keywords: ['countdown', 'timer', 'event', 'deadline', 'clock', 'time'],
    path: '/time/countdown-timer',
    isActive: true,
    searchVolume: 82000,
    difficulty: 2,
    icon: '⏰'
  },
  {
    id: 'date-difference-calculator',
    name: 'Date Difference Calculator',
    description: 'Calculate the difference between two dates in days, months, and years',
    category: 'time',
    keywords: ['date', 'difference', 'calculator', 'days', 'between', 'duration'],
    path: '/time/date-difference-calculator',
    isActive: true,
    searchVolume: 52000,
    difficulty: 2,
    icon: '📅'
  },

  // Currency & Finance Tools
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Convert between different currencies with real-time exchange rates. Free, accurate, and up-to-date conversion for 150+ currencies.',
    category: 'finance',
    keywords: [
      'currency converter',
      'exchange rate converter',
      'money converter',
      'forex converter',
      'currency exchange calculator',
      'real time currency converter',
      'live exchange rate converter',
      'currency converter no ads',
      'accurate currency converter online',
      'foreign exchange converter'
    ],
    path: '/finance/currency-converter',
    isActive: true,
    searchVolume: 165000,
    difficulty: 3,
    icon: '💱'
  },
  {
    id: 'loan-calculator',
    name: 'Loan Calculator',
    description: 'Calculate monthly payments, interest, and amortization schedules',
    category: 'finance',
    keywords: ['loan', 'mortgage', 'payment', 'interest', 'calculator', 'finance'],
    path: '/finance/loan-calculator',
    isActive: true,
    searchVolume: 74000,
    difficulty: 2,
    icon: '🏦'
  },
  {
    id: 'tax-calculator',
    name: 'Tax Calculator',
    description: 'Calculate income tax and estimate tax liability',
    category: 'finance',
    keywords: ['tax', 'income', 'calculator', 'irs', 'refund', 'liability'],
    path: '/finance/tax-calculator',
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
    category: 'unit',
    keywords: ['unit', 'converter', 'metric', 'imperial', 'measurement', 'length'],
    path: '/unit/unit-converter',
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
    category: 'media',
    keywords: ['pdf', 'word', 'doc', 'docx', 'converter', 'document'],
    path: '/media/pdf-to-word-converter',
    isActive: true,
    searchVolume: 201000,
    difficulty: 4,
    icon: '📄'
  },
  {
    id: 'jpg-to-png-converter',
    name: 'JPG to PNG Converter',
    description: 'Convert JPG images to PNG format with transparency support',
    category: 'media',
    keywords: ['jpg', 'jpeg', 'png', 'image', 'converter', 'photo'],
    path: '/media/jpg-to-png-converter',
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
    category: 'color',
    keywords: ['hex', 'rgb', 'color', 'converter', 'css', 'design'],
    path: '/color/hex-to-rgb-converter',
    isActive: true,
    searchVolume: 67000,
    difficulty: 1,
    icon: '🎨'
  },

  // Health & Fitness Tools
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate Body Mass Index and get health recommendations. Free BMI calculator with weight status interpretation and health tips.',
    category: 'health',
    keywords: [
      'bmi calculator',
      'body mass index calculator',
      'bmi chart calculator',
      'ideal weight calculator',
      'healthy weight calculator',
      'weight status calculator',
      'bmi calculator adults',
      'body mass index chart',
      'bmi calculation formula',
      'weight category calculator'
    ],
    path: '/health/bmi-calculator',
    isActive: true,
    searchVolume: 135000,
    difficulty: 1,
    icon: '⚖️'
  },
  // Automotive Tools
  {
    id: 'carburetor-cfm-calculator',
    name: 'Carburetor CFM Calculator',
    description: 'Calculate the correct carburetor CFM for your engine based on displacement and modification level. Professional carburetor sizing tool for optimal performance.',
    category: 'auto',
    keywords: [
      'carburetor cfm calculator',
      'carburetor sizing calculator',
      'engine airflow calculator',
      'cfm requirements calculator',
      'carburetor selection tool',
      'carburetor cfm calculator engine size',
      'carb sizing calculator',
      'engine cfm calculator',
      'carburetor calculator online',
      'auto cfm calculator'
    ],
    path: '/auto/carburetor-cfm-calculator',
    isActive: true,
    searchVolume: 12000,
    difficulty: 2,
    icon: '🏎️'
  },
  {
    id: 'compression-ratio-calculator',
    name: 'Compression Ratio Calculator',
    description: 'Calculate horsepower changes from compression ratio modifications',
    category: 'auto',
    keywords: ['compression', 'ratio', 'horsepower', 'engine', 'performance'],
    path: '/auto/compression-ratio-calculator',
    isActive: true,
    searchVolume: 8500,
    difficulty: 3,
    icon: '⚙️'
  },
  {
    id: 'engine-size-converter',
    name: 'Engine Size Converter',
    description: 'Convert engine displacement between cubic inches and liters',
    category: 'auto',
    keywords: ['engine', 'displacement', 'cubic inches', 'liters', 'conversion'],
    path: '/auto/engine-size-converter',
    isActive: true,
    searchVolume: 15000,
    difficulty: 1,
    icon: '🔧'
  },
  {
    id: 'gear-ratio-calculator',
    name: 'Gear Ratio Calculator',
    description: 'Calculate gear ratios and optimal ratios for performance',
    category: 'auto',
    keywords: ['gear', 'ratio', 'differential', 'performance', 'transmission'],
    path: '/auto/gear-ratio-calculator',
    isActive: true,
    searchVolume: 18000,
    difficulty: 2,
    icon: '⚙️'
  },
  {
    id: 'power-to-weight-ratio',
    name: 'Power to Weight Ratio Calculator',
    description: 'Calculate horsepower to weight ratio for performance analysis',
    category: 'auto',
    keywords: ['power', 'weight', 'ratio', 'horsepower', 'performance'],
    path: '/auto/power-to-weight-ratio',
    isActive: true,
    searchVolume: 9500,
    difficulty: 1,
    icon: '💪'
  },
  {
    id: 'ram-air-calculator',
    name: 'Ram Air Calculator',
    description: 'Calculate horsepower gains from ram air induction systems',
    category: 'auto',
    keywords: ['ram air', 'horsepower', 'induction', 'performance', 'pontiac'],
    path: '/auto/ram-air-calculator',
    isActive: true,
    searchVolume: 4500,
    difficulty: 3,
    icon: '💨'
  },
  {
    id: 'rpm-calculator',
    name: 'RPM Calculator',
    description: 'Calculate engine RPM based on speed, gear ratio, and tire size',
    category: 'auto',
    keywords: ['rpm', 'speed', 'gear ratio', 'tire', 'engine'],
    path: '/auto/rpm-calculator',
    isActive: true,
    searchVolume: 22000,
    difficulty: 2,
    icon: '🌀'
  },
  {
    id: 'speed-converter',
    name: 'Speed Converter',
    description: 'Convert between MPH and KPH for auto applications',
    category: 'auto',
    keywords: ['speed', 'mph', 'kph', 'conversion', 'auto'],
    path: '/auto/speed-converter',
    isActive: true,
    searchVolume: 35000,
    difficulty: 1,
    icon: '🏁'
  },
  {
    id: 'supercharger-calculator',
    name: 'Supercharger Calculator',
    description: 'Calculate horsepower gains and CFM requirements for superchargers',
    category: 'auto',
    keywords: ['supercharger', 'horsepower', 'boost', 'psi', 'performance'],
    path: '/auto/supercharger-calculator',
    isActive: true,
    searchVolume: 7500,
    difficulty: 3,
    icon: '🌪️'
  },
  {
    id: 'auto-temperature-converter',
    name: 'Temperature Converter',
    description: 'Convert between Fahrenheit and Celsius for auto use',
    category: 'auto',
    keywords: ['temperature', 'fahrenheit', 'celsius', 'conversion', 'auto'],
    path: '/auto/temperature-converter',
    isActive: true,
    searchVolume: 28000,
    difficulty: 1,
    icon: '🌡️'
  },
  {
    id: 'tire-calculator',
    name: 'Tire Calculator',
    description: 'Calculate tire diameter effects on speed and performance',
    category: 'auto',
    keywords: ['tire', 'diameter', 'speed', 'rpm', 'performance'],
    path: '/auto/tire-calculator',
    isActive: true,
    searchVolume: 16000,
    difficulty: 2,
    icon: '🛞'
  },
  {
    id: 'torque-horsepower-calculator',
    name: 'Torque & Horsepower Calculator',
    description: 'Convert between torque and horsepower at different RPMs',
    category: 'auto',
    keywords: ['torque', 'horsepower', 'rpm', 'conversion', 'engine'],
    path: '/auto/torque-horsepower-calculator',
    isActive: true,
    searchVolume: 19000,
    difficulty: 2,
    icon: '🔩'
  },
  {
    id: 'volumetric-efficiency-calculator',
    name: 'Volumetric Efficiency Calculator',
    description: 'Calculate engine volumetric efficiency for performance tuning',
    category: 'auto',
    keywords: ['volumetric efficiency', 've', 'engine', 'performance', 'tuning'],
    path: '/auto/volumetric-efficiency-calculator',
    isActive: true,
    searchVolume: 3500,
    difficulty: 4,
    icon: '📊'
  },
  {
    id: 'engine-volume-calculator',
    name: 'Engine Volume Calculator',
    description: 'Calculate cylinder volume and engine displacement',
    category: 'auto',
    keywords: ['volume', 'cylinder', 'displacement', 'bore', 'stroke'],
    path: '/auto/engine-volume-calculator',
    isActive: true,
    searchVolume: 11000,
    difficulty: 2,
    icon: '📐'
  },
  {
    id: 'auto-fluid-calculator',
    name: 'Automotive Fluid Calculator',
    description: 'Calculate volume and weight conversions for auto fluids',
    category: 'auto',
    keywords: ['fluid', 'volume', 'weight', 'gasoline', 'oil', 'transmission'],
    path: '/auto/fluid-weight-calculator',
    isActive: true,
    searchVolume: 6500,
    difficulty: 1,
    icon: '🛢️'
  },
  {
    id: 'auto-weight-converter',
    name: 'Automotive Weight Converter',
    description: 'Convert between different weight units for auto applications',
    category: 'auto',
    keywords: ['weight', 'conversion', 'pounds', 'kilograms', 'ounces', 'grams'],
    path: '/auto/weight-converter',
    isActive: true,
    searchVolume: 8000,
    difficulty: 1,
    icon: '⚖️'
  },


  {
    id: 'engine-displacement-calculator',
    name: 'Engine Displacement Calculator',
    description: 'Calculate engine displacement from bore, stroke, and cylinder count',
    category: 'auto',
    keywords: ['displacement', 'bore', 'stroke', 'engine', 'cubic', 'inches'],
    path: '/auto/engine-displacement-calculator',
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