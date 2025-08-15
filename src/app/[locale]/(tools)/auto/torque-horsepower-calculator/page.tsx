import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { TorqueHorsepowerCalculator } from '@/components/automotive/TorqueHorsepowerCalculator';




// Force static generation
export const dynamic = 'force-static';
export const metadata: Metadata = generateToolMetadata(
  'Torque & Horsepower Calculator',
  'Convert between torque and horsepower at different RPMs. Calculate engine power and torque relationships.',
  'torque-horsepower-calculator',
  ['torque calculator', 'horsepower calculator', 'hp to torque', 'torque to hp', 'engine power', 'rpm calculator', 'automotive power'],
  'auto'
);

export default function TorqueHorsepowerCalculatorPage() {
  return (
    <ToolLayout
      title="Torque & Horsepower Calculator"
      description="Convert between torque and horsepower at different RPMs"
      toolId="torque-horsepower-calculator"
      category="auto"
      emoji="⚡"
      customHowToUse={[
        "Enter torque value in lb-ft or Nm",
        "Input RPM (revolutions per minute)",
        "View calculated horsepower automatically",
        "Switch between metric and imperial units"
      ]}
      customFeatures={[
        "Torque to horsepower conversion",
        "Support for multiple unit systems",
        "Real-time RPM calculations",
        "Engine performance analysis"
      ]}
    >
      <TorqueHorsepowerCalculator />
    </ToolLayout>
  );
}
