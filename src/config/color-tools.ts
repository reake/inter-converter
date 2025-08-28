import { ToolConfig } from '@/types/tools';

export const COLOR_TOOLS_CONFIG: ToolConfig[] = [
  {
    id: 'hex-to-rgb-converter',
    name: 'HEX to RGB Converter',
    description: 'Convert HEX color codes to RGB values instantly. Free online color converter with live preview and CSS code generation.',
    category: 'color',
    keywords: [
      'hex to rgb converter',
      'color converter',
      'hex color converter',
      'rgb converter',
      'color code converter',
      'css color converter',
      'web color converter',
      'design color tool',
      'hex rgb conversion',
      'color format converter'
    ],
    path: '/color/hex-to-rgb',
    isActive: true,
    searchVolume: 85000,
    difficulty: 1,
    icon: '🎨'
  },
  {
    id: 'rgb-to-hex-converter',
    name: 'RGB to HEX Converter',
    description: 'Convert RGB color values to HEX codes with color preview. Professional color conversion tool for web designers and developers.',
    category: 'color',
    keywords: [
      'rgb to hex converter',
      'color converter',
      'rgb color converter',
      'hex converter',
      'web color tool',
      'css color generator',
      'design color converter',
      'color code generator',
      'rgb hex conversion',
      'web design tool'
    ],
    path: '/color/rgb-to-hex',
    isActive: true,
    searchVolume: 78000,
    difficulty: 1,
    icon: '🌈'
  },
  {
    id: 'hex-to-hsl-converter',
    name: 'HEX to HSL Converter',
    description: 'Convert HEX colors to HSL format with hue, saturation, and lightness values. Advanced color conversion for designers.',
    category: 'color',
    keywords: [
      'hex to hsl converter',
      'hsl converter',
      'color converter',
      'hue saturation lightness',
      'color space converter',
      'design color tool',
      'advanced color converter',
      'color theory tool',
      'hex hsl conversion',
      'color format tool'
    ],
    path: '/color/hex-to-hsl',
    isActive: true,
    searchVolume: 45000,
    difficulty: 2,
    icon: '🎭'
  },
  {
    id: 'color-picker-tool',
    name: 'Color Picker Tool',
    description: 'Professional online color picker with HSL controls, color palettes, and history. Free web-based color selection tool.',
    category: 'color',
    keywords: [
      'color picker',
      'online color picker',
      'color selector',
      'color chooser',
      'web color picker',
      'html color picker',
      'css color picker',
      'design color tool',
      'color palette generator',
      'color wheel tool'
    ],
    path: '/color/color-picker',
    isActive: true,
    searchVolume: 125000,
    difficulty: 1,
    icon: '🎯'
  },
  {
    id: 'gradient-generator',
    name: 'Gradient Generator',
    description: 'Create beautiful CSS gradients with live preview. Professional gradient maker for web design and UI development.',
    category: 'color',
    keywords: [
      'gradient generator',
      'css gradient generator',
      'gradient maker',
      'linear gradient generator',
      'radial gradient generator',
      'gradient tool',
      'web gradient creator',
      'css gradient tool',
      'background gradient',
      'gradient designer'
    ],
    path: '/color/gradient-generator',
    isActive: true,
    searchVolume: 95000,
    difficulty: 2,
    icon: '🌅'
  },
  {
    id: 'color-palette-generator',
    name: 'Color Palette Generator',
    description: 'Generate harmonious color palettes from images or create custom color schemes. AI-powered palette extraction tool.',
    category: 'color',
    keywords: [
      'color palette generator',
      'color scheme generator',
      'palette creator',
      'color harmony tool',
      'image color extractor',
      'color combination tool',
      'design palette maker',
      'color theory generator',
      'brand color palette',
      'website color scheme'
    ],
    path: '/color/palette-generator',
    isActive: true,
    searchVolume: 75000,
    difficulty: 2,
    icon: '🎨'
  },
  {
    id: 'contrast-checker',
    name: 'Contrast Checker',
    description: 'Check color contrast ratios for WCAG accessibility compliance. Ensure your designs meet web accessibility standards.',
    category: 'color',
    keywords: [
      'contrast checker',
      'color contrast checker',
      'wcag contrast checker',
      'accessibility checker',
      'color accessibility tool',
      'contrast ratio calculator',
      'web accessibility tool',
      'aa aaa compliance checker',
      'text contrast checker',
      'design accessibility'
    ],
    path: '/color/contrast-checker',
    isActive: true,
    searchVolume: 65000,
    difficulty: 2,
    icon: '♿'
  }
];

export const getColorToolById = (id: string): ToolConfig | undefined => {
  return COLOR_TOOLS_CONFIG.find(tool => tool.id === id);
};

export const getPopularColorTools = (limit: number = 5): ToolConfig[] => {
  return COLOR_TOOLS_CONFIG
    .filter(tool => tool.isActive)
    .sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0))
    .slice(0, limit);
};
