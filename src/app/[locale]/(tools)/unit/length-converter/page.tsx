import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LengthConverter } from '@/components/converters/unit/LengthConverter';

// Force static generation
export const dynamic = 'force-static';
export const metadata: Metadata = generateToolMetadata(
  'Length Converter',
  'Convert between different length units including meters, feet, inches, kilometers, miles, yards, and more. Fast and accurate length conversion tool.',
  'length-converter',
  [
    'length converter',
    'meters to feet',
    'inches to cm',
    'kilometers to miles',
    'distance converter',
    'metric to imperial',
    'unit conversion',
    'measurement converter'
  ],
  'unit'
);

export default function LengthConverterPage() {
  return (
    <ToolLayout
      title="Length Converter"
      description="Convert between different length units with precision"
      toolId="length-converter"
      category="unit"
      emoji="📏"
      customHowToUse={[
        "Enter the value you want to convert",
        "Select the source unit (meters, feet, inches, etc.)",
        "Choose the target unit for conversion",
        "View the converted result instantly"
      ]}
      customFeatures={[
        "Support for metric and imperial units",
        "Millimeters, centimeters, meters, kilometers",
        "Inches, feet, yards, miles",
        "Real-time conversion updates",
        "Copy result to clipboard"
      ]}
    >
      <LengthConverter />
    </ToolLayout>
  );
}
