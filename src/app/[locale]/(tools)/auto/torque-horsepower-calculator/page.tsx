import { Metadata } from 'next';
import { ToolLayout } from '@/components/tools/ToolLayout';
import TorqueHorsepowerCalculator from '@/components/converters/automotive/TorqueHorsepowerCalculator';




// Force static generation
export const dynamic = 'force-static';
const title = 'Torque & Horsepower Calculator';
const description = 'Convert between torque and horsepower at different RPMs. Calculate engine power and torque relationships.';
const keywordsArr = ['torque calculator', 'horsepower calculator', 'hp to torque', 'torque to hp', 'engine power', 'rpm calculator', 'automotive power'];

export const metadata: Metadata = {
  title: `${title} | InterConverter`,
  description,
  keywords: keywordsArr.join(', '),
  openGraph: {
    title: `${title} | InterConverter`,
    description,
    type: 'website',
  },
  alternates: { canonical: '/auto/torque-horsepower-calculator' }
};

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
