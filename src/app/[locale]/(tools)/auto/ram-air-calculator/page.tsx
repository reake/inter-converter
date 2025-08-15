import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { RamAirCalculator } from '@/components/converters/automotive/RamAirCalculator';




// Force static generation
export const dynamic = 'force-static';
export const metadata: Metadata = generateToolMetadata(
  'Ram Air Calculator',
  'Calculate horsepower gains from ram air induction systems. Determine PSI increase and total horsepower output based on vehicle speed and engine power.',
  'ram-air-calculator',
  [
    'ram air calculator',
    'ram air induction',
    'horsepower gain',
    'pontiac ram air',
    'cold air intake',
    'performance calculator',
    'automotive calculator'
  ],
  'auto'
);

export default function RamAirCalculatorPage() {
  return (
    <ToolLayout
      title="Ram Air Calculator"
      description="Calculate horsepower gains from ram air induction systems. Determine PSI increase and total horsepower output based on vehicle speed and engine power"
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
