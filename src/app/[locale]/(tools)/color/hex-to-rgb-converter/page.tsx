import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { ColorConverter } from '@/components/converters/ColorConverter';




// Force static generation
export const dynamic = 'force-static';
export const metadata: Metadata = generateToolMetadata(
  'HEX to RGB Converter',
  'Convert HEX color codes to RGB values and vice versa. Free color converter with color picker and preview.',
  'hex-to-rgb-converter',
  ['hex', 'rgb', 'color', 'converter', 'css', 'design', 'web', 'html', 'picker'],
  'color'
);

export default function HexToRgbConverterPage() {
  return (
    <ToolLayout
      title="HEX to RGB Converter"
      description="Convert HEX color codes to RGB values and vice versa. Perfect for web designers, developers, and digital artists."
      toolId="hex-to-rgb-converter"
      category="color"
      emoji="🎨"
      customHowToUse={[
        "Enter a HEX color code (e.g., #FF0000)",
        "Or enter RGB values (e.g., 255, 0, 0)",
        "Use the color picker to select colors visually",
        "Copy the converted values for your project"
      ]}
      customFeatures={[
        "Convert HEX to RGB and RGB to HEX",
        "Visual color preview and picker",
        "Support for HSL color format",
        "CSS-ready color values"
      ]}
    >
      <ColorConverter />
    </ToolLayout>
  );
}