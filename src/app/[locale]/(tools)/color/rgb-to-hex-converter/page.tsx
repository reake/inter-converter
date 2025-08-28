import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import RgbToHexConverter from '@/components/converters/color/RgbToHexConverter';

// Force static generation
export const dynamic = 'force-static';
export const metadata: Metadata = generateToolMetadata(
  'RGB to HEX Color Converter',
  'Convert RGB to HEX color codes instantly. Free color converter with preview, common colors, web-safe palette, and CSS code generation for web design and development.',
  'rgb-to-hex-converter',
  [
    'rgb to hex converter',
    'color converter',
    'rgb hex calculator',
    'color code converter',
    'css color converter',
    'web color converter',
    'rgb to hex chart',
    'color picker tool',
    'hex color generator',
    'web design color tool',
    'css color codes',
    'color palette generator',
    'rgb hex conversion',
    'web safe colors',
    'color code generator'
  ],
  'color'
);

export default function RgbToHexConverterPage() {
  return (
    <ToolLayout
      title="RGB to HEX Color Converter"
      description="Convert RGB color values to HEX codes with real-time preview. Includes common colors, web-safe palette, and CSS code generation for web designers and developers."
      toolId="rgb-to-hex-converter"
      category="color"
      emoji="🎨"
      customHowToUse={[
        "Enter RGB values (0-255) for Red, Green, and Blue",
        "View the instant HEX color code conversion",
        "Use the color preview to see the actual color",
        "Copy HEX codes or CSS properties for your project"
      ]}
      customFeatures={[
        "Bidirectional RGB ↔ HEX conversion",
        "Real-time color preview",
        "Common colors reference table",
        "Web-safe color palette",
        "CSS code generation"
      ]}
    >
      <RgbToHexConverter />
    </ToolLayout>
  );
}
