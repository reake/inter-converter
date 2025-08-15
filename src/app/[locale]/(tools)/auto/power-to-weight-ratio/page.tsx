import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { PowerToWeightCalculator } from '@/components/automotive/PowerToWeightCalculator';




// Force static generation
export const dynamic = 'force-static';
export const metadata: Metadata = generateToolMetadata(
  'Power to Weight Ratio Calculator',
  'Calculate power to weight ratio for automotive performance analysis. Compare horsepower per pound and pounds per horsepower.',
  'power-to-weight-ratio',
  ['power to weight ratio', 'horsepower per pound', 'automotive performance', 'hp/lb calculator', 'performance analysis'],
  'auto'
);

export default function PowerToWeightRatioPage() {
  return (
    <ToolLayout
      title="Power to Weight Ratio Calculator"
      description="Calculate horsepower to weight ratio for performance analysis"
      toolId="power-to-weight-ratio"
      category="auto"
      emoji="💪"
      customHowToUse={[
        "Enter vehicle horsepower",
        "Input vehicle weight in pounds or kg",
        "View power-to-weight ratio automatically",
        "Compare with other vehicles for performance analysis"
      ]}
      customFeatures={[
        "HP per pound calculation",
        "Pounds per HP calculation",
        "Performance comparison metrics",
        "Multiple unit support"
      ]}
    >
      <PowerToWeightCalculator />
    </ToolLayout>
  );
}
