import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import KgToPoundsConverter from '@/components/converters/unit/KgToPoundsConverter';

export const metadata: Metadata = generateToolMetadata(
  'Kg to Pounds Converter',
  'Convert kilograms to pounds instantly with our accurate weight conversion calculator. Free online tool for kg to lbs conversion with formula and examples.',
  'kg-to-pounds-converter',
  [
    'kg to pounds',
    'kg to lbs',
    'kilograms to pounds',
    'weight converter',
    'kg pounds conversion',
    'kilogram pound calculator',
    'weight conversion tool',
    'kg lbs converter'
  ],
  'unit'
);

export default function KgToPoundsConverterPage() {
  return (
    <ToolLayout
      title="Kg to Pounds Converter"
      description="Convert kilograms to pounds instantly with our accurate weight conversion calculator"
      toolId="kg-to-pounds-converter"
      category="unit"
      emoji="⚖️"
      customHowToUse={[
        'Enter the weight in kilograms in the input field',
        'The equivalent weight in pounds will be calculated automatically',
        'Use the swap button to convert pounds to kilograms instead',
        'Copy the result or use it for your calculations'
      ]}
      customFeatures={[
        'Instant kg to pounds conversion',
        'Bidirectional conversion (kg ↔ lbs)',
        'High precision calculations',
        'Common weight reference values',
        'Copy results to clipboard',
        'Mobile-friendly interface'
      ]}
    >
      <KgToPoundsConverter />
    </ToolLayout>
  );
}
