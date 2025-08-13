import { Metadata } from 'next';
import { AutomotiveToolLayout } from '@/components/automotive/AutomotiveToolLayout';
import { PowerToWeightCalculator } from '@/components/automotive/PowerToWeightCalculator';

export const metadata: Metadata = {
  title: 'Power to Weight Ratio Calculator - HP per Pound | InterConverter',
  description: 'Calculate power to weight ratio for automotive performance analysis. Compare horsepower per pound and pounds per horsepower.',
  keywords: 'power to weight ratio, horsepower per pound, automotive performance, hp/lb calculator',
};

export default function PowerToWeightRatioPage() {
  return (
    <AutomotiveToolLayout
      title="Power to Weight Ratio Calculator"
      description="Calculate horsepower to weight ratio for performance analysis"
      toolId="power-to-weight-ratio"
    >
      <PowerToWeightCalculator />
    </AutomotiveToolLayout>
  );
}
