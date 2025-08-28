import { Metadata } from 'next';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { AutoWeightConverter } from '@/components/converters/automotive/AutoWeightConverter';




// Force static generation
export const dynamic = 'force-static';
const title = 'Automotive Weight Converter';
const description = 'Convert between pounds, kilograms, ounces, and grams for automotive applications. Essential for weight reduction and performance calculations.';
const keywordsArr = [
  'weight converter',
  'pounds to kilograms',
  'ounces to grams',
  'automotive weight',
  'weight conversion',
  'performance calculator'
];

export const metadata: Metadata = {
  title: `${title} | InterConverter`,
  description,
  keywords: keywordsArr.join(', '),
  openGraph: {
    title: `${title} | InterConverter`,
    description,
    type: 'website',
  },
  alternates: { canonical: '/auto/weight-converter' }
};

export default function AutoWeightConverterPage() {
  return (
    <ToolLayout
      title="Auto Weight Converter"
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
      <AutoWeightConverter />
    </ToolLayout>
  );
}
