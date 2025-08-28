import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import CmToInchesConverter from '@/components/converters/unit/CmToInchesConverter';

export const metadata: Metadata = generateToolMetadata(
  'CM to Inches Converter',
  'Convert centimeters to inches instantly with our accurate length conversion calculator. Free online tool for cm to inches conversion with formula and examples.',
  'cm-to-inches-converter',
  [
    'cm to inches',
    'centimeters to inches',
    'cm inches conversion',
    'length converter',
    'cm to in',
    'centimeter inch calculator',
    'length conversion tool',
    'cm inches converter'
  ],
  'unit'
);

export default function CmToInchesConverterPage() {
  return (
    <ToolLayout
      title="CM to Inches Converter"
      description="Convert centimeters to inches instantly with our accurate length conversion calculator"
      toolId="cm-to-inches-converter"
      category="unit"
      emoji="📐"
      customHowToUse={[
        'Enter the length in centimeters in the input field',
        'The equivalent length in inches will be calculated automatically',
        'Use the swap button to convert inches to centimeters instead',
        'Copy the result or use it for your measurements'
      ]}
      customFeatures={[
        'Instant cm to inches conversion',
        'Bidirectional conversion (cm ↔ inches)',
        'High precision calculations',
        'Common length reference values',
        'Copy results to clipboard',
        'Mobile-friendly interface'
      ]}
    >
      <CmToInchesConverter />
    </ToolLayout>
  );
}
