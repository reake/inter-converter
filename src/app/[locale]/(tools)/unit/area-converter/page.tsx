import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { AreaConverter } from '@/components/converters/unit/AreaConverter';

// Force static generation
export const dynamic = 'force-static';
export const metadata: Metadata = generateToolMetadata(
  'Area Converter',
  'Convert between different area units including square meters, square feet, acres, hectares, and more. Accurate area conversion tool.',
  'area-converter',
  [
    'area converter',
    'square meters to square feet',
    'acres to hectares',
    'square kilometers',
    'area conversion',
    'land area calculator',
    'unit conversion',
    'area measurement'
  ],
  'unit'
);

export default function AreaConverterPage() {
  return (
    <ToolLayout
      title="Area Converter"
      description="Convert between different area units with precision"
      toolId="area-converter"
      category="unit"
      emoji="⬜"
      customHowToUse={[
        "Enter the area value to convert",
        "Select the source unit (sq meters, sq feet, acres, etc.)",
        "Choose the target area unit",
        "View the converted area instantly"
      ]}
      customFeatures={[
        "Square millimeters, centimeters, meters, kilometers",
        "Square inches, feet, yards, miles",
        "Acres and hectares conversion",
        "Real-time conversion updates",
        "Copy result to clipboard"
      ]}
    >
      <AreaConverter />
    </ToolLayout>
  );
}
