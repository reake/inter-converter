// Re-export everything from the new tools loader
export {
  TOOLS_CONFIG,
  TOOL_CATEGORIES,
  getToolById,
  getToolsByCategory,
  getPopularTools,
  getToolsBySearch,
  getFeaturedToolsByCategory,
  // Category-specific exports
  getUnitTools,
  getTimeTools,
  getFinanceTools,
  getAutoTools,
  getColorTools,
  getHealthTools,
  getMediaTools,
  // Individual category configs for backward compatibility
  UNIT_TOOLS_CONFIG,
  TIME_TOOLS_CONFIG,
  COLOR_TOOLS_CONFIG,
  FINANCE_TOOLS_CONFIG,
  AUTO_TOOLS_CONFIG,
  HEALTH_TOOLS_CONFIG,
  MEDIA_TOOLS_CONFIG
} from './tools-loader';