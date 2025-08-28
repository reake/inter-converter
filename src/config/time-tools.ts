import { ToolConfig } from '@/types/tools';

export const TIME_TOOLS_CONFIG: ToolConfig[] = [
  {
    id: 'timestamp-converter',
    name: 'Unix Timestamp Converter',
    description: 'Convert Unix timestamps to human-readable dates and vice versa. Free timestamp conversion tool with timezone support.',
    category: 'time',
    keywords: [
      'timestamp converter',
      'unix timestamp converter',
      'epoch converter',
      'unix time converter',
      'timestamp to date',
      'epoch time converter',
      'posix time converter',
      'unix timestamp online',
      'epoch time to date',
      'timestamp calculator'
    ],
    path: '/time/timestamp-converter',
    isActive: true,
    searchVolume: 185000,
    difficulty: 1,
    icon: '🕐'
  },
  {
    id: 'timezone-converter',
    name: 'Time Zone Converter',
    description: 'Convert time between different time zones worldwide. Free timezone converter with daylight saving time support.',
    category: 'time',
    keywords: [
      'timezone converter',
      'time zone converter',
      'world time converter',
      'timezone calculator',
      'time conversion tool',
      'world clock converter',
      'timezone tool',
      'time zone calculator',
      'global time converter',
      'international time tool'
    ],
    path: '/time/timezone-converter',
    isActive: true,
    searchVolume: 225000,
    difficulty: 2,
    icon: '🌍'
  },
  {
    id: 'date-calculator',
    name: 'Date Calculator',
    description: 'Calculate the difference between two dates in days, weeks, months, and years. Advanced date calculation tool.',
    category: 'time',
    keywords: [
      'date calculator',
      'date difference calculator',
      'days between dates',
      'date duration calculator',
      'time between dates',
      'date math calculator',
      'calendar calculator',
      'date interval calculator',
      'age calculator dates',
      'date arithmetic tool'
    ],
    path: '/time/date-calculator',
    isActive: true,
    searchVolume: 165000,
    difficulty: 1,
    icon: '📅'
  },
  {
    id: 'working-days-calculator',
    name: 'Working Days Calculator',
    description: 'Calculate business days between two dates excluding weekends and holidays. Professional workday calculator.',
    category: 'time',
    keywords: [
      'working days calculator',
      'business days calculator',
      'workdays calculator',
      'weekdays calculator',
      'business day counter',
      'work day calculator',
      'weekday counter',
      'business calendar',
      'working time calculator',
      'office days calculator'
    ],
    path: '/time/working-days',
    isActive: true,
    searchVolume: 85000,
    difficulty: 2,
    icon: '💼'
  },
  {
    id: 'countdown-timer',
    name: 'Countdown Timer',
    description: 'Create customizable countdown timers for events, deadlines, and special occasions. Online countdown clock.',
    category: 'time',
    keywords: [
      'countdown timer',
      'countdown clock',
      'event countdown',
      'timer countdown',
      'deadline timer',
      'countdown widget',
      'online countdown',
      'event timer',
      'countdown calculator',
      'time countdown'
    ],
    path: '/time/countdown-timer',
    isActive: true,
    searchVolume: 145000,
    difficulty: 1,
    icon: '⏰'
  },
  {
    id: 'stopwatch',
    name: 'Stopwatch',
    description: 'Online stopwatch with lap times and precision timing. Professional digital stopwatch for sports and activities.',
    category: 'time',
    keywords: [
      'stopwatch',
      'online stopwatch',
      'digital stopwatch',
      'timer stopwatch',
      'lap timer',
      'precision timer',
      'sports timer',
      'chronometer',
      'time tracker',
      'interval timer'
    ],
    path: '/time/stopwatch',
    isActive: true,
    searchVolume: 125000,
    difficulty: 1,
    icon: '⏱️'
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate exact age in years, months, days, hours, and minutes from birth date. Precise age calculation tool.',
    category: 'time',
    keywords: [
      'age calculator',
      'calculate age',
      'age from birth date',
      'exact age calculator',
      'age in days calculator',
      'birthday calculator',
      'age counter',
      'how old am i',
      'age calculation tool',
      'birth date calculator'
    ],
    path: '/time/age-calculator',
    isActive: true,
    searchVolume: 195000,
    difficulty: 1,
    icon: '🎂'
  },
  {
    id: 'world-clock',
    name: 'World Clock',
    description: 'Display current time in major cities worldwide. Real-time world clock with multiple timezone support.',
    category: 'time',
    keywords: [
      'world clock',
      'world time',
      'global clock',
      'international time',
      'city time zones',
      'world time zones',
      'current time worldwide',
      'timezone clock',
      'global time display',
      'international clock'
    ],
    path: '/time/world-clock',
    isActive: true,
    searchVolume: 155000,
    difficulty: 2,
    icon: '🌐'
  }
];

export const getTimeToolById = (id: string): ToolConfig | undefined => {
  return TIME_TOOLS_CONFIG.find(tool => tool.id === id);
};

export const getPopularTimeTools = (limit: number = 5): ToolConfig[] => {
  return TIME_TOOLS_CONFIG
    .filter(tool => tool.isActive)
    .sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0))
    .slice(0, limit);
};
