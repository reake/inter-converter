import { Metadata } from 'next';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { VolumetricEfficiencyCalculator } from '@/components/converters/automotive/VolumetricEfficiencyCalculator';




// Force static generation
export const dynamic = 'force-static';
const keywords = [
  'volumetric efficiency calculator',
  'VE calculator',
  'engine breathing',
  'engine efficiency',
  'performance tuning',
  'automotive calculator',
];

export const metadata: Metadata = {
  title: 'Volumetric Efficiency Calculator',
  description:
    'Calculate engine volumetric efficiency (VE) from horsepower, displacement, and RPM. Essential for engine tuning and performance analysis.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Volumetric Efficiency Calculator',
    description:
      'Calculate engine volumetric efficiency (VE) from horsepower, displacement, and RPM. Essential for engine tuning and performance analysis.',
    type: 'website',
  },
  alternates: {
    canonical: '/auto/volumetric-efficiency-calculator',
  },
};

export default function VolumetricEfficiencyCalculatorPage() {
  return (
    <ToolLayout
      title="Volumetric Efficiency Calculator"
      description="Calculate engine volumetric efficiency (VE) from horsepower, displacement, and RPM. Essential for engine tuning and performance analysis"
      keywords={keywords}
      toolId="volumetric-efficiency-calculator"
      category="auto"
      emoji="📊"
      customHowToUse={[
        "Enter engine horsepower",
        "Input engine displacement in cubic inches",
        "Set engine RPM",
        "View calculated volumetric efficiency percentage"
      ]}
      customFeatures={[
        "Volumetric efficiency calculations",
        "Engine breathing analysis",
        "Performance tuning metrics",
        "VE percentage calculations"
      ]}
    >
      <VolumetricEfficiencyCalculator />
    </ToolLayout>
  );
}
