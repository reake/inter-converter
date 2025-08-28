import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import InchesToCmConverter from '@/components/converters/unit/InchesToCmConverter';

// Force static generation
export const dynamic = 'force-static';
export const metadata: Metadata = generateToolMetadata(
  'Inches to Centimeters Converter',
  'Convert inches to centimeters (in to cm) instantly. Free length converter with common sizes, conversion formula, and usage guide for design, manufacturing, and measurements.',
  'inches-to-cm-converter',
  [
    'inches to cm converter',
    'in to cm converter',
    'length converter',
    'inches centimeters calculator',
    'in to cm conversion',
    'size conversion tool',
    'inches to cm chart',
    'measurement converter',
    'design measurement converter',
    'manufacturing size converter',
    'imperial to metric length',
    'inches cm formula',
    'size conversion calculator',
    'in to cm conversion chart',
    'screen size converter'
  ],
  'unit'
);

export default function InchesToCmConverterPage() {
  return (
    <ToolLayout
      title="Inches to Centimeters Converter"
      description="Convert length from inches to centimeters with precision. Includes conversion formula, common size references, and instant calculations for design, manufacturing, and measurements."
      toolId="inches-to-cm-converter"
      category="unit"
      emoji="📐"
      customHowToUse={[
        "Enter length in inches in the input field",
        "View the instant centimeters conversion result",
        "Use the common sizes tab for quick reference",
        "Copy results or use the conversion formula"
      ]}
      customFeatures={[
        "Bidirectional length conversion",
        "Common size reference table",
        "Precise conversion formulas",
        "Design and manufacturing applications",
        "Screen and display measurements"
      ]}
    >
      <InchesToCmConverter />
    </ToolLayout>
  );
}
