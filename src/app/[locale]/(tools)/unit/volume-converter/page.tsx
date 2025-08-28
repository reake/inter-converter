import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { VolumeConverter } from '@/components/converters/unit/VolumeConverter';

// Force static generation
export const dynamic = 'force-static';
export const metadata: Metadata = generateToolMetadata(
  'Volume Converter',
  'Convert between different volume units including liters, gallons, cups, milliliters, and more. Accurate volume conversion tool.',
  'volume-converter',
  [
    'volume converter',
    'liters to gallons',
    'milliliters to cups',
    'cubic meters',
    'volume conversion',
    'liquid measurement',
    'unit conversion',
    'cooking measurements'
  ],
  'unit'
);

export default function VolumeConverterPage() {
  return (
    <ToolLayout
      title="Volume Converter"
      description="Convert between different volume units with precision"
      toolId="volume-converter"
      category="unit"
      emoji="🥤"
      customHowToUse={[
        "Enter the volume value to convert",
        "Select the source unit (liters, gallons, cups, etc.)",
        "Choose the target volume unit",
        "View the converted volume instantly"
      ]}
      customFeatures={[
        "Milliliters, liters, cubic meters",
        "Teaspoons, tablespoons, cups, pints, quarts, gallons",
        "Fluid ounces conversion",
        "Real-time conversion updates",
        "Copy result to clipboard"
      ]}
    >
      <VolumeConverter />
    </ToolLayout>
  );
}
