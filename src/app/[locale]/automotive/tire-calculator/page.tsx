import { Metadata } from 'next';
import { AutomotiveToolLayout } from '@/components/automotive/AutomotiveToolLayout';
import { TireCalculator } from '@/components/automotive/TireCalculator';

export const metadata: Metadata = {
  title: 'Tire Calculator - Tire Size Effects on Speed & RPM | InterConverter',
  description: 'Calculate how tire diameter changes affect vehicle speed, RPM, and performance. Tire size comparison calculator.',
  keywords: 'tire calculator, tire diameter, speed difference, rpm change, tire size comparison',
};

export default function TireCalculatorPage() {
  return (
    <AutomotiveToolLayout
      title="Tire Calculator"
      description="Calculate tire diameter effects on speed and performance"
      toolId="tire-calculator"
    >
      <TireCalculator />
    </AutomotiveToolLayout>
  );
}
