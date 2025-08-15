import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { EngineDisplacementCalculator } from '@/components/converters/automotive/EngineDisplacementCalculator';




// Force static generation
export const dynamic = 'force-static';
export const metadata: Metadata = generateToolMetadata(
  'Engine Displacement Calculator',
  'Calculate engine displacement from bore, stroke, and cylinder count. Convert between cubic inches and liters, and understand engine design characteristics.',
  'engine-displacement-calculator',
  [
    'engine displacement calculator',
    'bore stroke calculator',
    'engine size calculator',
    'cubic inches to liters',
    'cylinder volume calculator',
    'engine building calculator',
    'automotive calculator'
  ],
  'auto'
);

export default function EngineDisplacementCalculatorPage() {
  return (
    <ToolLayout
      title="Engine Displacement Calculator"
      description="Calculate engine displacement from bore, stroke, and cylinder count"
      toolId="engine-displacement-calculator"
      category="auto"
      emoji="🔧"
      customHowToUse={[
        "Enter cylinder bore diameter",
        "Input stroke length",
        "Specify number of cylinders",
        "View calculated displacement in CI and liters"
      ]}
      customFeatures={[
        "Bore and stroke calculations",
        "Cubic inch to liter conversion",
        "Multi-cylinder support",
        "Engine design analysis"
      ]}
    >
      <EngineDisplacementCalculator />
    </ToolLayout>
  );
}