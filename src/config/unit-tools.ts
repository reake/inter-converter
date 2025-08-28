import { ToolConfig } from '@/types/tools';

export const UNIT_TOOLS_CONFIG: ToolConfig[] = [
  {
    id: 'length-converter',
    name: 'Length Converter',
    description: 'Convert between meters, feet, inches, miles, and other length units. Free online length conversion calculator with precise measurements.',
    category: 'unit',
    keywords: [
      'length converter',
      'distance converter',
      'meter to feet converter',
      'feet to meter converter',
      'inch to cm converter',
      'cm to inch converter',
      'mile to km converter',
      'length conversion calculator',
      'measurement converter',
      'metric imperial converter'
    ],
    path: '/unit/length-converter',
    isActive: true,
    searchVolume: 185000,
    difficulty: 1,
    icon: '📏'
  },
  {
    id: 'weight-converter',
    name: 'Weight Converter',
    description: 'Convert between kilograms, pounds, grams, ounces, and other weight units. Accurate weight conversion calculator for all measurements.',
    category: 'unit',
    keywords: [
      'weight converter',
      'mass converter',
      'kg to lbs converter',
      'pounds to kg converter',
      'gram to ounce converter',
      'weight conversion calculator',
      'body weight converter',
      'metric imperial weight',
      'mass conversion tool',
      'weight unit converter'
    ],
    path: '/unit/weight-converter',
    isActive: true,
    searchVolume: 198000,
    difficulty: 1,
    icon: '⚖️'
  },
  {
    id: 'temperature-converter',
    name: 'Temperature Converter',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin temperature scales. Free temperature conversion calculator with weather references.',
    category: 'unit',
    keywords: [
      'temperature converter',
      'celsius to fahrenheit converter',
      'fahrenheit to celsius converter',
      'kelvin converter',
      'temperature conversion calculator',
      'weather temperature converter',
      'cooking temperature converter',
      'celsius fahrenheit kelvin',
      'temperature scale converter',
      'thermal conversion tool'
    ],
    path: '/unit/temperature-converter',
    isActive: true,
    searchVolume: 245000,
    difficulty: 1,
    icon: '🌡️'
  },
  {
    id: 'area-converter',
    name: 'Area Converter',
    description: 'Convert between square meters, square feet, acres, hectares, and other area units. Professional area conversion calculator.',
    category: 'unit',
    keywords: [
      'area converter',
      'square meter converter',
      'square feet converter',
      'acre to hectare converter',
      'area conversion calculator',
      'land area converter',
      'surface area converter',
      'property area calculator',
      'area measurement tool',
      'square unit converter'
    ],
    path: '/unit/area-converter',
    isActive: true,
    searchVolume: 125000,
    difficulty: 1,
    icon: '📐'
  },
  {
    id: 'volume-converter',
    name: 'Volume Converter',
    description: 'Convert between liters, gallons, cubic meters, milliliters, and other volume units. Accurate volume conversion calculator.',
    category: 'unit',
    keywords: [
      'volume converter',
      'liter to gallon converter',
      'gallon to liter converter',
      'cubic meter converter',
      'milliliter converter',
      'volume conversion calculator',
      'liquid volume converter',
      'capacity converter',
      'fluid measurement tool',
      'volume unit converter'
    ],
    path: '/unit/volume-converter',
    isActive: true,
    searchVolume: 145000,
    difficulty: 1,
    icon: '🥤'
  },
  {
    id: 'speed-converter',
    name: 'Speed Converter',
    description: 'Convert between km/h, mph, knots, m/s, and other speed units. Professional speed conversion calculator for all velocities.',
    category: 'unit',
    keywords: [
      'speed converter',
      'velocity converter',
      'mph to kmh converter',
      'kmh to mph converter',
      'knots converter',
      'speed conversion calculator',
      'velocity conversion tool',
      'automotive speed converter',
      'aviation speed converter',
      'speed unit converter'
    ],
    path: '/unit/speed-converter',
    isActive: true,
    searchVolume: 165000,
    difficulty: 1,
    icon: '🏃'
  },
  {
    id: 'pressure-converter',
    name: 'Pressure Converter',
    description: 'Convert between Pascal, Bar, PSI, atm, and other pressure units. Professional pressure conversion calculator for engineering.',
    category: 'unit',
    keywords: [
      'pressure converter',
      'psi converter',
      'bar to psi converter',
      'pascal converter',
      'atmospheric pressure converter',
      'pressure conversion calculator',
      'tire pressure converter',
      'hydraulic pressure converter',
      'pressure unit converter',
      'engineering pressure tool'
    ],
    path: '/unit/pressure-converter',
    isActive: true,
    searchVolume: 85000,
    difficulty: 2,
    icon: '🔧'
  },
  {
    id: 'energy-converter',
    name: 'Energy Converter',
    description: 'Convert between calories, joules, kWh, BTU, and other energy units. Professional energy conversion calculator for science.',
    category: 'unit',
    keywords: [
      'energy converter',
      'calorie converter',
      'joule converter',
      'kwh converter',
      'btu converter',
      'energy conversion calculator',
      'thermal energy converter',
      'electrical energy converter',
      'energy unit converter',
      'physics energy tool'
    ],
    path: '/unit/energy-converter',
    isActive: true,
    searchVolume: 75000,
    difficulty: 2,
    icon: '⚡'
  },
  {
    id: 'power-converter',
    name: 'Power Converter',
    description: 'Convert between watts, kilowatts, horsepower, and other power units. Professional power conversion calculator for engineering.',
    category: 'unit',
    keywords: [
      'power converter',
      'watt converter',
      'kilowatt converter',
      'horsepower converter',
      'power conversion calculator',
      'electrical power converter',
      'mechanical power converter',
      'engine power converter',
      'power unit converter',
      'hp to kw converter'
    ],
    path: '/unit/power-converter',
    isActive: true,
    searchVolume: 95000,
    difficulty: 2,
    icon: '💪'
  },
  {
    id: 'data-converter',
    name: 'Data Converter',
    description: 'Convert between KB, MB, GB, TB, and other data storage units. Digital storage conversion calculator for computing.',
    category: 'unit',
    keywords: [
      'data converter',
      'storage converter',
      'gb to mb converter',
      'mb to gb converter',
      'tb converter',
      'data size converter',
      'file size converter',
      'digital storage calculator',
      'computer storage converter',
      'data unit converter'
    ],
    path: '/unit/data-converter',
    isActive: true,
    searchVolume: 135000,
    difficulty: 1,
    icon: '💾'
  }
];

export const getUnitToolById = (id: string): ToolConfig | undefined => {
  return UNIT_TOOLS_CONFIG.find(tool => tool.id === id);
};

export const getPopularUnitTools = (limit: number = 5): ToolConfig[] => {
  return UNIT_TOOLS_CONFIG
    .filter(tool => tool.isActive)
    .sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0))
    .slice(0, limit);
};
