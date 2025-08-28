import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import WeightConverter from '@/components/converters/unit/WeightConverter';

// Force static generation
export const dynamic = 'force-static';
export const metadata: Metadata = generateToolMetadata(
  'Weight Converter',
  'Convert between different weight units including kilograms, pounds, ounces, grams, and more. Accurate weight conversion tool.',
  'weight-converter',
  [
    'weight converter',
    'kg to lbs',
    'pounds to kg',
    'grams to ounces',
    'mass converter',
    'metric to imperial weight',
    'unit conversion',
    'weight measurement'
  ],
  'unit'
);

export default function WeightConverterPage() {
  return (
    <ToolLayout
      title="Weight Converter"
      description="Convert between different weight units with precision"
      toolId="weight-converter"
      category="unit"
      emoji="⚖️"
      customHowToUse={[
        "Enter the weight value to convert",
        "Select the source unit (kg, lbs, grams, etc.)",
        "Choose the target unit for conversion",
        "View the converted weight instantly"
      ]}
      customFeatures={[
        "Support for metric and imperial units",
        "Milligrams, grams, kilograms, metric tons",
        "Ounces, pounds conversion",
        "Real-time conversion updates",
        "Copy result to clipboard"
      ]}
    >
      <WeightConverter />
    </ToolLayout>
  );
}
