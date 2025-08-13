import { Metadata } from 'next';
import { AutomotiveToolLayout } from '@/components/automotive/AutomotiveToolLayout';
import { TorqueHorsepowerCalculator } from '@/components/automotive/TorqueHorsepowerCalculator';

export const metadata: Metadata = {
  title: 'Torque & Horsepower Calculator - Convert HP to Torque | InterConverter',
  description: 'Convert between torque and horsepower at different RPMs. Calculate engine power and torque relationships.',
  keywords: 'torque calculator, horsepower calculator, hp to torque, torque to hp, engine power',
};

export default function TorqueHorsepowerCalculatorPage() {
  return (
    <AutomotiveToolLayout
      title="Torque & Horsepower Calculator"
      description="Convert between torque and horsepower at different RPMs"
      toolId="torque-horsepower-calculator"
    >
      <TorqueHorsepowerCalculator />
    </AutomotiveToolLayout>
  );
}
