import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import FeetToMetersOnlyConverter from '@/components/converters/unit/FeetToMetersOnlyConverter';

// Force static generation
export const dynamic = 'force-static';
export const metadata: Metadata = generateToolMetadata(
  'Feet to Meters Converter',
  'Convert feet to meters instantly. Free length converter with common measurements, conversion formula, and usage guide for construction, sports, and international use.',
  'feet-to-meters-converter',
  [
    'feet to meters converter',
    'ft to m converter',
    'length converter',
    'feet meters calculator',
    'ft to meters conversion',
    'length conversion tool',
    'feet to meters chart',
    'distance converter',
    'construction length converter',
    'sports field converter',
    'imperial to metric length',
    'feet meters formula',
    'length conversion calculator',
    'ft to m conversion chart',
    'height converter'
  ],
  'unit'
);

export default function FeetToMetersConverterPage() {
  return (
    <ToolLayout
      title="Feet to Meters Converter"
      description="Convert length from feet to meters with precision. Includes conversion formula, common length references, and instant calculations for construction, sports, and travel."
      toolId="feet-to-meters-converter"
      category="unit"
      emoji="📏"
      customHowToUse={[
        "Enter length in feet in the input field",
        "View the instant meters conversion result",
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
      <FeetToMetersOnlyConverter />
    </ToolLayout>
  );
}
