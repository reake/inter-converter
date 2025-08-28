import { ToolConfig, ToolCategory } from '@/types/tools';
import { UNIT_TOOLS_CONFIG } from './unit-tools';
import { COLOR_TOOLS_CONFIG } from './color-tools';
import { TIME_TOOLS_CONFIG } from './time-tools';

export const TOOL_CATEGORIES: Record<ToolCategory, { name: string; description: string }> = {
  'time': {
    name: 'Time & Date',
    description: 'Convert timestamps, timezones, and create countdowns'
  },
  'finance': {
    name: 'Finance',
    description: '77+ financial calculators for loans, mortgages, investments, taxes, and more'
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
    description: 'Color Converters and design utilities'
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
  // Import all tools from separate config files
  ...TIME_TOOLS_CONFIG,
  ...UNIT_TOOLS_CONFIG,
  ...COLOR_TOOLS_CONFIG,
  
  // Currency & Finance Tools
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Convert between different currencies with real-time exchange rates. Free, accurate, and up-to-date Converters for 150+ currencies.',
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
  {
    id: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    description: 'Calculate mortgage payments, taxes, insurance, and total costs',
    category: 'finance',
    keywords: ['mortgage', 'home loan', 'payment', 'interest', 'calculator', 'real estate'],
    path: '/finance/mortgage-calculator',
    isActive: true,
    searchVolume: 380000,
    difficulty: 2,
    icon: '🏠'
  },
  {
    id: 'auto-loan-calculator',
    name: 'Auto Loan Calculator',
    description: 'Calculate car loan payments, interest costs, and financing options',
    category: 'finance',
    keywords: ['auto loan', 'car loan', 'vehicle financing', 'payment calculator'],
    path: '/finance/auto-loan-calculator',
    isActive: true,
    searchVolume: 180000,
    difficulty: 1,
    icon: '🚗'
  },
  {
    id: 'credit-card-payoff-calculator',
    name: 'Credit Card Payoff Calculator',
    description: 'Calculate time and cost to pay off credit card debt',
    category: 'finance',
    keywords: ['credit card', 'debt payoff', 'payment calculator', 'interest'],
    path: '/finance/credit-card-payoff-calculator',
    isActive: true,
    searchVolume: 195000,
    difficulty: 1,
    icon: '💳'
  },
  {
    id: 'savings-calculator',
    name: 'Savings Calculator',
    description: 'Calculate savings growth with compound interest and regular deposits',
    category: 'finance',
    keywords: ['savings', 'compound interest', 'deposit', 'growth calculator'],
    path: '/finance/savings-calculator',
    isActive: true,
    searchVolume: 220000,
    difficulty: 1,
    icon: '💰'
  },
  {
    id: '401k-calculator',
    name: '401(k) Calculator',
    description: 'Calculate 401(k) contributions and retirement savings',
    category: 'finance',
    keywords: ['401k', 'retirement', 'savings', 'contribution calculator'],
    path: '/finance/401k-calculator',
    isActive: true,
    searchVolume: 85000,
    difficulty: 2,
    icon: '🏛️'
  },
  {
    id: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    description: 'Calculate the power of compound interest over time',
    category: 'finance',
    keywords: ['compound interest', 'investment', 'growth', 'calculator'],
    path: '/finance/compound-interest-calculator',
    isActive: true,
    searchVolume: 135000,
    difficulty: 1,
    icon: '📈'
  },
  {
    id: 'retirement-calculator',
    name: 'Retirement Calculator',
    description: 'Calculate retirement savings needs and timeline',
    category: 'finance',
    keywords: ['retirement', 'savings', 'planning', 'calculator'],
    path: '/finance/retirement-calculator',
    isActive: true,
    searchVolume: 185000,
    difficulty: 3,
    icon: '🌅'
  },
  {
    id: 'investment-calculator',
    name: 'Investment Calculator',
    description: 'Calculate investment returns and portfolio growth',
    category: 'finance',
    keywords: ['investment', 'returns', 'portfolio', 'calculator'],
    path: '/finance/investment-calculator',
    isActive: true,
    searchVolume: 145000,
    difficulty: 2,
    icon: '📊'
  },
  {
    id: 'home-affordability-calculator',
    name: 'Home Affordability Calculator',
    description: 'Calculate how much house you can afford based on income and debts',
    category: 'finance',
    keywords: ['home affordability', 'house price', 'income', 'calculator'],
    path: '/finance/home-affordability-calculator',
    isActive: true,
    searchVolume: 125000,
    difficulty: 2,
    icon: '🏡'
  },
  {
    id: 'debt-payoff-calculator',
    name: 'Debt Payoff Calculator',
    description: 'Calculate debt payoff strategies using snowball or avalanche methods',
    category: 'finance',
    keywords: ['debt payoff', 'snowball', 'avalanche', 'calculator'],
    path: '/finance/debt-payoff-calculator',
    isActive: true,
    searchVolume: 85000,
    difficulty: 2,
    icon: '❄️'
  },
  {
    id: 'income-tax-calculator',
    name: 'Income Tax Calculator',
    description: 'Calculate federal and state income tax liability',
    category: 'finance',
    keywords: ['income tax', 'federal tax', 'state tax', 'calculator'],
    path: '/finance/income-tax-calculator',
    isActive: true,
    searchVolume: 150000,
    difficulty: 2,
    icon: '💼'
  },
  {
    id: 'cost-of-living-calculator',
    name: 'Cost of Living Calculator',
    description: 'Compare cost of living between cities and states',
    category: 'finance',
    keywords: ['cost of living', 'city comparison', 'expenses', 'calculator'],
    path: '/finance/cost-of-living-calculator',
    isActive: true,
    searchVolume: 165000,
    difficulty: 2,
    icon: '🏙️'
  },
  {
    id: 'bitcoin-calculator',
    name: 'Bitcoin Calculator',
    description: 'Calculate Bitcoin investment returns and analyze crypto strategies',
    category: 'finance',
    keywords: ['bitcoin', 'cryptocurrency', 'investment', 'calculator'],
    path: '/finance/bitcoin-calculator',
    isActive: true,
    searchVolume: 125000,
    difficulty: 3,
    icon: '₿'
  },

  // Unit & Measurement Tools
  {
    id: 'fahrenheit-to-celsius-converter',
    name: 'Fahrenheit to Celsius Converter',
    description: 'Convert temperatures between Fahrenheit and Celsius with accurate formulas and common temperature references',
    category: 'unit',
    keywords: [
      'fahrenheit to celsius converter',
      'temperature converter',
      'f to c converter',
      'celsius fahrenheit converter',
      'temperature conversion calculator',
      'fahrenheit celsius formula',
      'weather temperature converter',
      'cooking temperature converter',
      'body temperature converter',
      'fahrenheit celsius chart'
    ],
    path: '/unit/fahrenheit-to-celsius-converter',
    isActive: true,
    searchVolume: 245000,
    difficulty: 1,
    icon: '🌡️'
  },
  {
    id: 'pounds-to-kg-converter',
    name: 'Pounds to Kg Converter',
    description: 'Convert weight between pounds and kilograms with precise calculations and body weight references',
    category: 'unit',
    keywords: [
      'pounds to kg converter',
      'lbs to kg converter',
      'weight converter',
      'pounds kilograms converter',
      'body weight converter',
      'lbs kg conversion',
      'weight conversion calculator',
      'pounds to kilograms formula',
      'imperial metric weight',
      'weight unit converter'
    ],
    path: '/unit/pounds-to-kg-converter',
    isActive: true,
    searchVolume: 198000,
    difficulty: 1,
    icon: '⚖️'
  },
  {
    id: 'celsius-to-fahrenheit-converter',
    name: 'Celsius to Fahrenheit Converter',
    description: 'Convert temperatures from Celsius to Fahrenheit with weather conditions and temperature ranges',
    category: 'unit',
    keywords: [
      'celsius to fahrenheit converter',
      'c to f converter',
      'temperature converter celsius',
      'celsius fahrenheit calculator',
      'weather temperature conversion',
      'celsius to fahrenheit formula',
      'metric imperial temperature',
      'temperature conversion chart',
      'celsius fahrenheit table',
      'body temperature celsius fahrenheit'
    ],
    path: '/unit/celsius-to-fahrenheit-converter',
    isActive: true,
    searchVolume: 189000,
    difficulty: 1,
    icon: '🌡️'
  },
  {
    id: 'feet-to-meters-converter',
    name: 'Feet to Meters Converter',
    description: 'Convert length between feet and meters with height references and architectural measurements',
    category: 'unit',
    keywords: [
      'feet to meters converter',
      'ft to m converter',
      'height converter',
      'feet meters conversion',
      'length converter',
      'imperial metric length',
      'feet to meters formula',
      'height conversion calculator',
      'building height converter',
      'feet meters chart'
    ],
    path: '/unit/feet-to-meters-converter',
    isActive: true,
    searchVolume: 185000,
    difficulty: 1,
    icon: '📏'
  },
  {
    id: 'meters-to-feet-converter',
    name: 'Meters to Feet Converter',
    description: 'Convert length between meters and feet with height references and architectural measurements',
    category: 'unit',
    keywords: [
      'meters to feet converter',
      'm to ft converter',
      'height converter',
      'meters feet conversion',
      'length converter',
      'metric imperial length',
      'meters to feet formula',
      'height conversion calculator',
      'building height converter',
      'meters feet chart'
    ],
    path: '/unit/meters-to-feet-converter',
    isActive: true,
    searchVolume: 165000,
    difficulty: 1,
    icon: '📏'
  },
  {
    id: 'inches-to-cm-converter',
    name: 'Inches to CM Converter',
    description: 'Convert length between inches and centimeters with screen sizes and measurement references',
    category: 'unit',
    keywords: [
      'inches to cm converter',
      'inch to cm converter',
      'inches centimeters converter',
      'screen size converter',
      'length conversion calculator',
      'inches cm conversion',
      'imperial metric converter',
      'inches to centimeters formula',
      'measurement converter',
      'inches cm chart'
    ],
    path: '/unit/inches-to-cm-converter',
    isActive: true,
    searchVolume: 156000,
    difficulty: 1,
    icon: '📐'
  },
  {
    id: 'cm-to-inches-converter',
    name: 'CM to Inches Converter',
    description: 'Convert centimeters to inches instantly with our accurate length conversion calculator. Free online tool for cm to inches conversion with formula and examples.',
    category: 'unit',
    keywords: [
      'cm to inches',
      'centimeters to inches',
      'cm inches conversion',
      'length converter',
      'cm to in',
      'centimeter inch calculator',
      'length conversion tool',
      'cm inches converter'
    ],
    path: '/unit/cm-to-inches-converter',
    isActive: true,
    searchVolume: 142000,
    difficulty: 1,
    icon: '📐'
  },
  {
    id: 'kg-to-pounds-converter',
    name: 'Kg to Pounds Converter',
    description: 'Convert kilograms to pounds instantly with our accurate weight conversion calculator. Free online tool for kg to lbs conversion with formula and examples.',
    category: 'unit',
    keywords: [
      'kg to pounds',
      'kg to lbs',
      'kilograms to pounds',
      'weight converter',
      'kg pounds conversion',
      'kilogram pound calculator',
      'weight conversion tool',
      'kg lbs converter'
    ],
    path: '/unit/kg-to-pounds-converter',
    isActive: true,
    searchVolume: 175000,
    difficulty: 1,
    icon: '⚖️'
  },
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
    id: 'rgb-to-hex-converter',
    name: 'RGB to HEX Converter',
    description: 'Convert RGB color values to HEX codes and vice versa with color preview',
    category: 'color',
    keywords: ['rgb', 'hex', 'color', 'converter', 'css', 'design', 'web', 'palette'],
    path: '/color/rgb-to-hex-converter',
    isActive: true,
    searchVolume: 85000,
    difficulty: 1,
    icon: '🎨'
  },
  {
    id: 'color-picker-tool',
    name: 'Color Picker Tool',
    description: 'Professional color picker with HSL controls, palettes and color history',
    category: 'color',
    keywords: ['color', 'picker', 'hsl', 'palette', 'design', 'web', 'css', 'tool'],
    path: '/color/color-picker-tool',
    isActive: true,
    searchVolume: 78000,
    difficulty: 2,
    icon: '🌈'
  },
  {
    id: 'hex-to-rgb-converter',
    name: 'HEX to RGB Converter',
    description: 'Convert HEX color codes to RGB values and vice versa with color preview and validation',
    category: 'color',
    keywords: ['hex', 'rgb', 'color', 'converter', 'css', 'design', 'hex to rgb', 'color code converter'],
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
    keywords: ['engine', 'displacement', 'cubic inches', 'liters', 'Converters'],
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
    keywords: ['speed', 'mph', 'kph', 'Converters', 'auto'],
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
    keywords: ['temperature', 'fahrenheit', 'celsius', 'Converters', 'auto'],
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
    keywords: ['torque', 'horsepower', 'rpm', 'Converters', 'engine'],
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
    description: 'Calculate volume and weight Converterss for auto fluids',
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
    keywords: ['weight', 'Converters', 'pounds', 'kilograms', 'ounces', 'grams'],
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
  {
    id: 'tire-speed-calculator',
    name: 'Tire Speed Calculator',
    description: 'Calculate vehicle speed based on tire diameter, gear ratio, and RPM',
    category: 'auto',
    keywords: ['tire speed calculator', 'tire diameter speed', 'gear ratio speed', 'rpm speed calculator', 'vehicle speed calculator'],
    path: '/auto/tire-speed-calculator',
    isActive: true,
    searchVolume: 12000,
    difficulty: 2
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