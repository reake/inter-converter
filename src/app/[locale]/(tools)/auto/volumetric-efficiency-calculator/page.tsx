import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { VolumetricEfficiencyCalculator } from '@/components/converters/automotive/VolumetricEfficiencyCalculator';



// Cloudflare Pages Edge Runtime 配置
export const runtime = 'edge';
export const metadata: Metadata = generateToolMetadata(
  'Volumetric Efficiency Calculator',
  'Calculate engine volumetric efficiency (VE) from horsepower, displacement, and RPM. Essential for engine tuning and performance analysis.',
  'volumetric-efficiency-calculator',
  [
    'volumetric efficiency calculator',
    'VE calculator',
    'engine breathing',
    'engine efficiency',
    'performance tuning',
    'automotive calculator'
  ],
  'auto'
);

export default function VolumetricEfficiencyCalculatorPage() {
  return (
    <ToolLayout
      title="Volumetric Efficiency Calculator"
      description="Calculate engine volumetric efficiency (VE) from horsepower, displacement, and RPM. Essential for engine tuning and performance analysis"
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
