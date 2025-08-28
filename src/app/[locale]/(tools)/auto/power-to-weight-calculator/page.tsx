import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { PowerToWeightCalculator } from '@/components/converters/automotive/PowerToWeightCalculator';




// Force static generation
export const dynamic = 'force-static';
export const metadata: Metadata = generateToolMetadata(
  'Power to Weight Calculator',
  'Calculate power-to-weight ratio for automotive performance analysis. Compare horsepower per pound and performance metrics for cars.',
  'power-to-weight-calculator',
  [
    'power to weight calculator',
    'horsepower per pound',
    'automotive performance calculator',
    'hp/lb calculator',
    'car performance analysis',
    'power weight ratio',
    'vehicle performance metrics',
    'automotive calculator'
  ],
  'auto'
);

export default function PowerToWeightCalculatorPage() {
  return (
    <ToolLayout
      title="Power to Weight Calculator"
      description="Calculate power-to-weight ratio for automotive performance analysis"
      toolId="power-to-weight-calculator"
      category="auto"
      emoji="⚡"
      customHowToUse={[
        "Enter vehicle horsepower (HP)",
        "Input vehicle weight in pounds or kilograms",
        "View power-to-weight ratio calculations instantly",
        "Compare results with other vehicles for performance analysis"
      ]}
      customFeatures={[
        "HP per pound calculation",
        "Pounds per HP calculation",
        "Multiple unit support (lbs/kg)",
        "Performance comparison metrics",
        "Real-time calculation updates"
      ]}
    >
      <PowerToWeightCalculator />
    </ToolLayout>
  );
}
