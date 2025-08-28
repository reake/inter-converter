import { Metadata } from 'next';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { RamAirCalculator } from '@/components/converters/automotive/RamAirCalculator';




// Force static generation
export const dynamic = 'force-static';
const keywords = [
  'ram air calculator',
  'ram air induction',
  'horsepower gain',
  'pontiac ram air',
  'cold air intake',
  'performance calculator',
  'automotive calculator',
];

export const metadata: Metadata = {
  title: 'Ram Air Calculator',
  description:
    'Calculate horsepower gains from ram air induction systems. Determine PSI increase and total horsepower output based on vehicle speed and engine power.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Ram Air Calculator',
    description:
      'Calculate horsepower gains from ram air induction systems. Determine PSI increase and total horsepower output based on vehicle speed and engine power.',
    type: 'website',
  },
  alternates: {
    canonical: '/auto/ram-air-calculator',
  },
};

export default function RamAirCalculatorPage() {
  return (
    <ToolLayout
      title="Ram Air Calculator"
      description="Calculate horsepower gains from ram air induction systems. Determine PSI increase and total horsepower output based on vehicle speed and engine power"
      keywords={keywords}
      toolId="ram-air-calculator"
      category="auto"
      emoji="💨"
      customHowToUse={[
        "Enter base engine horsepower",
        "Input vehicle speed in MPH",
        "View calculated ram air pressure increase",
        "See total horsepower with ram air effect"
      ]}
      customFeatures={[
        "Ram air pressure calculations",
        "Speed-based horsepower gains",
        "Pontiac Ram Air system analysis",
        "Cold air intake comparisons"
      ]}
    >
      <RamAirCalculator />
    </ToolLayout>
  );
}
