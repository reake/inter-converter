import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { EngineVolumeCalculator } from '@/components/converters/automotive/EngineVolumeCalculator';

export const metadata: Metadata = generateToolMetadata(
  'Engine Volume Calculator',
  'Calculate cylinder volume from bore and stroke, engine displacement from cylinder volume, and convert between CI and CC.',
  'engine-volume-calculator',
  [
    'engine volume calculator',
    'cylinder volume',
    'engine displacement',
    'bore stroke calculator',
    'cubic inches to cc',
    'automotive calculator'
  ],
  'auto'
);

export default function EngineVolumeCalculatorPage() {
  return (
    <ToolLayout
      title="Engine Volume Calculator"
      description="Calculate cylinder volume from bore and stroke, engine displacement from cylinder volume, and convert between CI and CC"
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
