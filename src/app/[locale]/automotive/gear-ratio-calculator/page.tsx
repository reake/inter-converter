import { Metadata } from 'next';
import { AutomotiveToolLayout } from '@/components/automotive/AutomotiveToolLayout';
import { GearRatioCalculator } from '@/components/automotive/GearRatioCalculator';

export const metadata: Metadata = {
  title: 'Gear Ratio Calculator - Ring & Pinion Calculator | InterConverter',
  description: 'Calculate gear ratios from ring and pinion teeth, find optimal ratios for performance. Free automotive gear ratio calculator.',
  keywords: 'gear ratio calculator, ring pinion, differential ratio, automotive performance, gear calculator',
};

export default function GearRatioCalculatorPage() {
  return (
    <AutomotiveToolLayout
      title="Gear Ratio Calculator"
      description="Calculate gear ratios and find optimal ratios for performance"
      toolId="gear-ratio-calculator"
    >
      <GearRatioCalculator />
    </AutomotiveToolLayout>
  );
}
