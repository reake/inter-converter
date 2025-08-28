import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import ColorPickerTool from '@/components/converters/color/ColorPickerTool';

// Force static generation
export const dynamic = 'force-static';
export const metadata: Metadata = generateToolMetadata(
  'Online Color Picker Tool',
  'Professional color picker with HSL controls, color palettes, and history. Generate RGB, HEX, and HSL color codes for web design, graphic design, and development projects.',
  'color-picker-tool',
  [
    'color picker',
    'color picker tool',
    'hsl color picker',
    'rgb color picker',
    'hex color picker',
    'color palette generator',
    'web color picker',
    'design color tool',
    'css color picker',
    'color wheel picker',
    'color selector',
    'color chooser',
    'graphic design colors',
    'web design colors',
    'color code generator'
  ],
  'color'
);

export default function ColorPickerToolPage() {
  return (
    <ToolLayout
      title="Online Color Picker Tool"
      description="Professional color picker with HSL sliders, preset palettes, and color history. Generate precise RGB, HEX, and HSL color codes for your design projects."
      toolId="color-picker-tool"
      category="color"
      emoji="🌈"
      customHowToUse={[
        "Use HSL sliders to adjust Hue, Saturation, and Lightness",
        "Select from preset color palettes for inspiration",
        "View real-time color preview and multiple format outputs",
        "Save colors to history and copy codes for your project"
      ]}
      customFeatures={[
        "HSL slider controls for precise color selection",
        "Preset color palettes (warm, cool, neutral)",
        "Color history for recently used colors",
        "Multiple format output (RGB, HEX, HSL)",
        "Real-time color preview"
      ]}
    >
      <ColorPickerTool />
    </ToolLayout>
  );
}
