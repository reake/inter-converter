import { Metadata } from 'next';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { EngineVolumeCalculator } from '@/components/converters/automotive/EngineVolumeCalculator';




// Force static generation
export const dynamic = 'force-static';
const keywords = [
  'engine volume calculator',
  'cylinder volume',
  'engine displacement',
  'bore stroke calculator',
  'cubic inches to cc',
  'automotive calculator',
];

export const metadata: Metadata = {
  title: 'Engine Volume Calculator',
  description:
    'Calculate cylinder volume from bore and stroke, engine displacement from cylinder volume, and convert between CI and CC.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Engine Volume Calculator',
    description:
      'Calculate cylinder volume from bore and stroke, engine displacement from cylinder volume, and convert between CI and CC.',
    type: 'website',
  },
  alternates: {
    canonical: '/auto/engine-volume-calculator',
  },
};

export default function EngineVolumeCalculatorPage() {
  return (
    <ToolLayout
      title="Engine Volume Calculator"
      description="Calculate cylinder volume from bore and stroke, engine displacement from cylinder volume, and convert between CI and CC"
      keywords={keywords}
      toolId="engine-volume-calculator"
      category="auto"
      emoji="🔧"
      customHowToUse={[
        "Enter cylinder bore diameter",
        "Input stroke length",
        "Specify number of cylinders",
        "View calculated volumes and displacement"
      ]}
      customFeatures={[
        "Cylinder volume calculations",
        "Engine displacement calculation",
        "Cubic inch to CC conversion",
        "Bore and stroke analysis"
      ]}
    >
      <EngineVolumeCalculator />
    </ToolLayout>
  );
}
