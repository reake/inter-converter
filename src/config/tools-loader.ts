import { ToolConfig, ToolCategory } from '@/types/tools';

// Import JSON data files
import unitTools from '@/data/tools/unit.json';
import timeTools from '@/data/tools/time.json';
import colorTools from '@/data/tools/color.json';
import financeTools from '@/data/tools/finance.json';
import autoTools from '@/data/tools/auto.json';
import healthTools from '@/data/tools/health.json';
import mediaTools from '@/data/tools/media.json';
import unitToolsZh from '@/data/tools/unit-zh.json';
import timeToolsZh from '@/data/tools/time-zh.json';
import colorToolsZh from '@/data/tools/color-zh.json';
import financeToolsZh from '@/data/tools/finance-zh.json';
import autoToolsZh from '@/data/tools/auto-zh.json';
import healthToolsZh from '@/data/tools/health-zh.json';
import mediaToolsZh from '@/data/tools/media-zh.json';

type ToolConfigInput = Partial<ToolConfig> & {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  path: string;
  keywords?: string[];
};

// Type assertion to ensure JSON data matches ToolConfig interface
const validateToolConfig = (tools: ToolConfigInput[]): ToolConfig[] => {
  return tools.map((tool) => ({
    id: tool.id,
    name: tool.name,
    description: tool.description,
    category: tool.category as ToolCategory,
    keywords: tool.keywords || [],
    path: tool.path,
    isActive: tool.isActive !== false, // Default to true if not specified
    searchVolume: tool.searchVolume || 0,
    difficulty: tool.difficulty || 1,
    icon: tool.icon || '🔧'
  }));
};

// Load and validate all tools
const UNIT_TOOLS_CONFIG = validateToolConfig(unitTools as ToolConfigInput[]);
const TIME_TOOLS_CONFIG = validateToolConfig(timeTools as ToolConfigInput[]);
const COLOR_TOOLS_CONFIG = validateToolConfig(colorTools as ToolConfigInput[]);
const FINANCE_TOOLS_CONFIG = validateToolConfig(financeTools as ToolConfigInput[]);
const AUTO_TOOLS_CONFIG = validateToolConfig(autoTools as ToolConfigInput[]);
const HEALTH_TOOLS_CONFIG = validateToolConfig(healthTools as ToolConfigInput[]);
const MEDIA_TOOLS_CONFIG = validateToolConfig(mediaTools as ToolConfigInput[]);
const UNIT_TOOLS_CONFIG_ZH = validateToolConfig(unitToolsZh as ToolConfigInput[]);
const TIME_TOOLS_CONFIG_ZH = validateToolConfig(timeToolsZh as ToolConfigInput[]);
const COLOR_TOOLS_CONFIG_ZH = validateToolConfig(colorToolsZh as ToolConfigInput[]);
const FINANCE_TOOLS_CONFIG_ZH = validateToolConfig(financeToolsZh as ToolConfigInput[]);
const AUTO_TOOLS_CONFIG_ZH = validateToolConfig(autoToolsZh as ToolConfigInput[]);
const HEALTH_TOOLS_CONFIG_ZH = validateToolConfig(healthToolsZh as ToolConfigInput[]);
const MEDIA_TOOLS_CONFIG_ZH = validateToolConfig(mediaToolsZh as ToolConfigInput[]);

// Combine all tools
export const TOOLS_CONFIG: ToolConfig[] = [
  ...UNIT_TOOLS_CONFIG,
  ...TIME_TOOLS_CONFIG,
  ...COLOR_TOOLS_CONFIG,
  ...FINANCE_TOOLS_CONFIG,
  ...AUTO_TOOLS_CONFIG,
  ...HEALTH_TOOLS_CONFIG,
  ...MEDIA_TOOLS_CONFIG
];

const TOOLS_CONFIG_ZH: ToolConfig[] = [
  ...UNIT_TOOLS_CONFIG_ZH,
  ...TIME_TOOLS_CONFIG_ZH,
  ...COLOR_TOOLS_CONFIG_ZH,
  ...FINANCE_TOOLS_CONFIG_ZH,
  ...AUTO_TOOLS_CONFIG_ZH,
  ...HEALTH_TOOLS_CONFIG_ZH,
  ...MEDIA_TOOLS_CONFIG_ZH
];

// Tool categories configuration
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
    name: 'Automotive',
    description: 'Engine performance, drivetrain, and auto calculations'
  }
};

const TOOL_CATEGORIES_ZH: Record<ToolCategory, { name: string; description: string }> = {
  'time': {
    name: '时间与日期',
    description: '时间戳、时区转换与倒计时工具'
  },
  'finance': {
    name: '金融',
    description: '贷款、房贷、投资、税务等金融计算器'
  },
  'unit': {
    name: '单位与测量',
    description: '不同测量单位之间的转换'
  },
  'media': {
    name: '文件与媒体',
    description: '文件格式转换与媒体处理工具'
  },
  'color': {
    name: '颜色与设计',
    description: '颜色转换与设计辅助工具'
  },
  'health': {
    name: '健康与健身',
    description: '健康计算器与健身工具'
  },
  'science': {
    name: '科学与工程',
    description: '科学计算与工程工具'
  },
  'auto': {
    name: '汽车',
    description: '发动机性能、传动与汽车计算'
  }
};

// Helper functions
const getToolsByLocale = (locale: string = 'en'): ToolConfig[] => {
  return locale.toLowerCase() === 'zh' ? TOOLS_CONFIG_ZH : TOOLS_CONFIG;
};

export const getToolCategories = (locale: string = 'en') => {
  return locale.toLowerCase() === 'zh' ? TOOL_CATEGORIES_ZH : TOOL_CATEGORIES;
};

export const getToolById = (id: string, locale: string = 'en'): ToolConfig | undefined => {
  return getToolsByLocale(locale).find(tool => tool.id === id);
};

export const getToolsByCategory = (category: ToolCategory, limit?: number, locale: string = 'en'): ToolConfig[] => {
  const tools = getToolsByLocale(locale).filter(tool => tool.category === category && tool.isActive);
  return limit ? tools.slice(0, limit) : tools;
};

export const getPopularTools = (limit: number = 5, locale: string = 'en'): ToolConfig[] => {
  return getToolsByLocale(locale)
    .filter(tool => tool.isActive)
    .sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0))
    .slice(0, limit);
};

export const getToolsBySearch = (query: string, locale: string = 'en'): ToolConfig[] => {
  const searchTerm = query.toLowerCase();
  return getToolsByLocale(locale).filter(tool => 
    tool.isActive && (
      tool.name.toLowerCase().includes(searchTerm) ||
      tool.description.toLowerCase().includes(searchTerm) ||
      tool.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
    )
  );
};

// Category-specific helper functions
export const getUnitTools = (limit?: number, locale: string = 'en'): ToolConfig[] => {
  const tools = getToolsByCategory('unit', undefined, locale);
  return limit ? tools.slice(0, limit) : tools;
};

export const getTimeTools = (limit?: number, locale: string = 'en'): ToolConfig[] => {
  const tools = getToolsByCategory('time', undefined, locale);
  return limit ? tools.slice(0, limit) : tools;
};

export const getFinanceTools = (limit?: number, locale: string = 'en'): ToolConfig[] => {
  const tools = getToolsByCategory('finance', undefined, locale);
  return limit ? tools.slice(0, limit) : tools;
};

export const getAutoTools = (limit?: number, locale: string = 'en'): ToolConfig[] => {
  const tools = getToolsByCategory('auto', undefined, locale);
  return limit ? tools.slice(0, limit) : tools;
};

export const getColorTools = (limit?: number, locale: string = 'en'): ToolConfig[] => {
  const tools = getToolsByCategory('color', undefined, locale);
  return limit ? tools.slice(0, limit) : tools;
};

export const getHealthTools = (limit?: number, locale: string = 'en'): ToolConfig[] => {
  const tools = getToolsByCategory('health', undefined, locale);
  return limit ? tools.slice(0, limit) : tools;
};

export const getMediaTools = (limit?: number, locale: string = 'en'): ToolConfig[] => {
  const tools = getToolsByCategory('media', undefined, locale);
  return limit ? tools.slice(0, limit) : tools;
};

// Get featured tools for each category (top 5 by search volume)
export const getFeaturedToolsByCategory = (locale: string = 'en'): Record<ToolCategory, ToolConfig[]> => {
  const categories: ToolCategory[] = ['unit', 'time', 'finance', 'auto', 'color', 'health', 'media'];
  const featured: Record<string, ToolConfig[]> = {};
  
  categories.forEach(category => {
    featured[category] = getToolsByCategory(category, undefined, locale)
      .sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0))
      .slice(0, 5);
  });
  
  return featured as Record<ToolCategory, ToolConfig[]>;
};

// Get tools by all categories with limit
export const getToolsByAllCategories = (limit: number = 10, locale: string = 'en'): Record<ToolCategory, ToolConfig[]> => {
  const categories: ToolCategory[] = ['unit', 'time', 'finance', 'auto', 'color', 'health', 'media'];
  const result: Record<string, ToolConfig[]> = {};
  
  categories.forEach(category => {
    const categoryTools = getToolsByCategory(category, limit, locale);
    if (categoryTools.length > 0) {
      result[category] = categoryTools;
    }
  });
  
  return result as Record<ToolCategory, ToolConfig[]>;
};

// Export individual category configs for backward compatibility
export {
  UNIT_TOOLS_CONFIG,
  TIME_TOOLS_CONFIG,
  COLOR_TOOLS_CONFIG,
  FINANCE_TOOLS_CONFIG,
  AUTO_TOOLS_CONFIG,
  HEALTH_TOOLS_CONFIG,
  MEDIA_TOOLS_CONFIG
};
