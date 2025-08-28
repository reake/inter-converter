import { ToolConfig, ToolCategory } from '@/types/tools';

// Import JSON data files
import unitTools from '@/data/tools/unit.json';
import timeTools from '@/data/tools/time.json';
import colorTools from '@/data/tools/color.json';
import financeTools from '@/data/tools/finance.json';
import autoTools from '@/data/tools/auto.json';
import healthTools from '@/data/tools/health.json';
import mediaTools from '@/data/tools/media.json';

// Type assertion to ensure JSON data matches ToolConfig interface
const validateToolConfig = (tools: any[]): ToolConfig[] => {
  return tools.map(tool => ({
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
const UNIT_TOOLS_CONFIG = validateToolConfig(unitTools);
const TIME_TOOLS_CONFIG = validateToolConfig(timeTools);
const COLOR_TOOLS_CONFIG = validateToolConfig(colorTools);
const FINANCE_TOOLS_CONFIG = validateToolConfig(financeTools);
const AUTO_TOOLS_CONFIG = validateToolConfig(autoTools);
const HEALTH_TOOLS_CONFIG = validateToolConfig(healthTools);
const MEDIA_TOOLS_CONFIG = validateToolConfig(mediaTools);

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

// Helper functions
export const getToolById = (id: string): ToolConfig | undefined => {
  return TOOLS_CONFIG.find(tool => tool.id === id);
};

export const getToolsByCategory = (category: ToolCategory): ToolConfig[] => {
  return TOOLS_CONFIG.filter(tool => tool.category === category && tool.isActive);
};

export const getPopularTools = (limit: number = 5): ToolConfig[] => {
  return TOOLS_CONFIG
    .filter(tool => tool.isActive)
    .sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0))
    .slice(0, limit);
};

export const getToolsBySearch = (query: string): ToolConfig[] => {
  const searchTerm = query.toLowerCase();
  return TOOLS_CONFIG.filter(tool => 
    tool.isActive && (
      tool.name.toLowerCase().includes(searchTerm) ||
      tool.description.toLowerCase().includes(searchTerm) ||
      tool.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
    )
  );
};

// Category-specific helper functions
export const getUnitTools = (limit?: number): ToolConfig[] => {
  const tools = getToolsByCategory('unit');
  return limit ? tools.slice(0, limit) : tools;
};

export const getTimeTools = (limit?: number): ToolConfig[] => {
  const tools = getToolsByCategory('time');
  return limit ? tools.slice(0, limit) : tools;
};

export const getFinanceTools = (limit?: number): ToolConfig[] => {
  const tools = getToolsByCategory('finance');
  return limit ? tools.slice(0, limit) : tools;
};

export const getAutoTools = (limit?: number): ToolConfig[] => {
  const tools = getToolsByCategory('auto');
  return limit ? tools.slice(0, limit) : tools;
};

export const getColorTools = (limit?: number): ToolConfig[] => {
  const tools = getToolsByCategory('color');
  return limit ? tools.slice(0, limit) : tools;
};

export const getHealthTools = (limit?: number): ToolConfig[] => {
  const tools = getToolsByCategory('health');
  return limit ? tools.slice(0, limit) : tools;
};

export const getMediaTools = (limit?: number): ToolConfig[] => {
  const tools = getToolsByCategory('media');
  return limit ? tools.slice(0, limit) : tools;
};

// Get featured tools for each category (top 5 by search volume)
export const getFeaturedToolsByCategory = (): Record<ToolCategory, ToolConfig[]> => {
  const categories: ToolCategory[] = ['unit', 'time', 'finance', 'auto', 'color', 'health', 'media'];
  const featured: Record<string, ToolConfig[]> = {};
  
  categories.forEach(category => {
    featured[category] = getToolsByCategory(category)
      .sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0))
      .slice(0, 5);
  });
  
  return featured as Record<ToolCategory, ToolConfig[]>;
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
