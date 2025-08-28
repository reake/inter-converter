import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import PoundsToKgConverter from '@/components/converters/unit/PoundsToKgConverter';

// Force static generation
export const dynamic = 'force-static';
export const metadata: Metadata = generateToolMetadata(
  'Pounds to Kilograms Converter',
  'Convert pounds to kilograms (lbs to kg) instantly. Free weight converter with common values, conversion formula, and usage guide for fitness, shipping, and cooking.',
  'pounds-to-kg-converter',
  [
    'pounds to kg converter',
    'lbs to kg converter',
    'weight converter',
    'pounds kilograms calculator',
    'lbs kg conversion',
    'weight conversion tool',
    'pounds to kilograms chart',
    'weight unit converter',
    'fitness weight converter',
    'shipping weight converter',
    'cooking weight converter',
    'pounds kg formula',
    'weight conversion calculator',
    'imperial to metric weight',
    'body weight converter'
  ],
  'unit'
);

export default function PoundsToKgConverterPage() {
  return (
    <ToolLayout
      title="Pounds to Kilograms Converter"
      description="Convert weight from pounds to kilograms with precision. Includes conversion formula, common weight references, and instant calculations for fitness, shipping, and cooking."
      toolId="pounds-to-kg-converter"
      category="unit"
      emoji="⚖️"
      customHowToUse={[
        "Enter weight in pounds in the input field",
        "View the instant kilograms conversion result",
        "Use the common weights tab for quick reference",
        "Copy results or use the conversion formula"
      ]}
      customFeatures={[
        "Bidirectional weight conversion",
        "Common weight reference table",
        "Precise conversion formulas",
        "Fitness and health applications",
        "Shipping and logistics support"
      ]}
    >
      <PoundsToKgConverter />
    </ToolLayout>
  );
}
