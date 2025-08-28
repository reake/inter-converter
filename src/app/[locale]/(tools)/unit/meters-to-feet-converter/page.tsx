import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import MetersToFeetConverter from '@/components/converters/unit/MetersToFeetConverter';

// Force static generation
export const dynamic = 'force-static';
export const metadata: Metadata = generateToolMetadata(
  'Meters to Feet Converter',
  'Convert meters to feet instantly. Free length converter with common measurements, conversion formula, and usage guide for construction, sports, and international use.',
  'meters-to-feet-converter',
  [
    'meters to feet converter',
    'm to ft converter',
    'length converter',
    'meters feet calculator',
    'm to feet conversion',
    'length conversion tool',
    'meters to feet chart',
    'distance converter',
    'construction length converter',
    'sports field converter',
    'metric to imperial length',
    'meters feet formula',
    'length conversion calculator',
    'm to ft conversion chart',
    'height converter'
  ],
  'unit'
);

export default function MetersToFeetConverterPage() {
  return (
    <ToolLayout
      title="Meters to Feet Converter"
      description="Convert length from meters to feet with precision. Includes conversion formula, common length references, and instant calculations for construction, sports, and travel."
      toolId="meters-to-feet-converter"
      category="unit"
      emoji="📏"
      customHowToUse={[
        "Enter length in meters in the input field",
        "View the instant feet conversion result",
        "Use the common lengths tab for quick reference",
        "Copy results or use the conversion formula"
      ]}
      customFeatures={[
        "Bidirectional length conversion",
        "Common length reference table",
        "Precise conversion formulas",
        "Construction and engineering applications",
        "Sports and athletics support"
      ]}
    >
      <MetersToFeetConverter />
    </ToolLayout>
  );
}
