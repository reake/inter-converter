import { Metadata } from 'next';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { GearRatioCalculator } from '@/components/converters/automotive/GearRatioCalculator';




// Force static generation
export const dynamic = 'force-static';
const title = 'Gear Ratio Calculator';
const description = 'Calculate gear ratios from ring and pinion teeth, find optimal ratios for performance. Free automotive gear ratio calculator.';
const keywordsArr = ['gear ratio calculator', 'ring pinion', 'differential ratio', 'automotive performance', 'gear calculator', 'drivetrain', 'transmission'];

export const metadata: Metadata = {
  title: `${title} | InterConverter`,
  description,
  keywords: keywordsArr.join(', '),
  openGraph: {
    title: `${title} | InterConverter`,
    description,
    type: 'website',
  },
  alternates: { canonical: '/auto/gear-ratio-calculator' }
};

export default function GearRatioCalculatorPage() {
  return (
    <ToolLayout
      title="Gear Ratio Calculator"
      description="Calculate gear ratios and find optimal ratios for performance"
      toolId="gear-ratio-calculator"
      category="auto"
      emoji="⚙️"
      customHowToUse={[
        "Enter number of ring gear teeth",
        "Input number of pinion gear teeth",
        "View calculated gear ratio automatically",
        "Compare different ratio options for performance"
      ]}
      customFeatures={[
        "Ring and pinion calculations",
        "Performance ratio analysis",
        "Differential gear ratios",
        "Drivetrain optimization"
      ]}
    >
      <GearRatioCalculator />
    </ToolLayout>
  );
}
