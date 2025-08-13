import { Metadata } from 'next';
import { AutomotiveToolLayout } from '@/components/automotive/AutomotiveToolLayout';
import { RPMCalculator } from '@/components/automotive/RPMCalculator';

export const metadata: Metadata = {
  title: 'RPM Calculator - Engine Speed Calculator | InterConverter',
  description: 'Calculate engine RPM based on vehicle speed, gear ratio, and tire diameter. Free automotive RPM calculator.',
  keywords: 'rpm calculator, engine speed, gear ratio, tire diameter, automotive calculator',
};

export default function RPMCalculatorPage() {
  return (
    <AutomotiveToolLayout
      title="RPM Calculator"
      description="Calculate engine RPM based on speed, gear ratio, and tire size"
      toolId="rpm-calculator"
    >
      <RPMCalculator />
    </AutomotiveToolLayout>
  );
}
