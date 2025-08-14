import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { WeightConverter } from '@/components/converters/automotive/WeightConverter';



// Cloudflare Pages Edge Runtime 配置
export const runtime = 'edge';
export const metadata: Metadata = generateToolMetadata(
  'Automotive Weight Converter',
  'Convert between pounds, kilograms, ounces, and grams for automotive applications. Essential for weight reduction and performance calculations.',
  'weight-converter',
  [
    'weight converter',
    'pounds to kilograms',
    'ounces to grams',
    'automotive weight',
    'weight conversion',
    'performance calculator'
  ],
  'auto'
);

export default function WeightConverterPage() {
  return (
    <ToolLayout
      title="Automotive Weight Converter"
      description="Convert between pounds, kilograms, ounces, and grams for automotive applications"
      toolId="weight-converter"
      category="auto"
      emoji="⚖️"
      customHowToUse={[
        "Enter weight value in any supported unit",
        "Select source and target weight units",
        "View instant conversion results",
        "Use for automotive weight calculations"
      ]}
      customFeatures={[
        "Multiple weight unit support",
        "Pounds to kilograms conversion",
        "Ounces to grams conversion",
        "Automotive weight calculations"
      ]}
    >
      <WeightConverter />
    </ToolLayout>
  );
}
