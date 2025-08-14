import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { UnitConverter } from '@/components/converters/UnitConverter';

export const metadata: Metadata = generateToolMetadata(
  'Unit Converter',
  'Convert units of measurement instantly. Free online unit converter for length, weight, temperature, volume, area, and more. Accurate conversions.',
  'unit-converter',
  [
    'unit converter',
    'measurement converter',
    'metric converter',
    'imperial converter',
    'length converter',
    'weight converter',
    'temperature converter',
    'volume converter',
    'area converter',
    'distance converter',
    'mass converter',
    'conversion calculator',
    'unit conversion tool',
    'measurement calculator',
    'metric imperial converter'
  ],
  'unit'
);

export default function UnitConverterPage() {
  return (
    <ToolLayout
      title="Unit Converter"
      description="Convert between different units of measurement including length, weight, temperature, area, volume, and more. Support for metric and imperial systems."
      toolId="unit-converter"
      category="unit"
      emoji="📏"
      customHowToUse={[
        "Select the category of units you want to convert",
        "Choose the source unit (what you have)",
        "Choose the target unit (what you want)",
        "Enter the value to convert and view results"
      ]}
      customFeatures={[
        "Convert between metric and imperial units",
        "Real-time conversion as you type",
        "High precision calculations",
        "Support for scientific notation"
      ]}
    >
      <UnitConverter />
    </ToolLayout>
  );
}