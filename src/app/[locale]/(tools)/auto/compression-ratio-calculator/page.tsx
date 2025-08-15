import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { CompressionRatioCalculator } from '@/components/converters/automotive/CompressionRatioCalculator';




// Force static generation
export const dynamic = 'force-static';
export const metadata: Metadata = generateToolMetadata(
  'Compression Ratio Calculator',
  'Calculate horsepower changes from compression ratio modifications. Understand the effects of compression ratio on engine performance and fuel requirements.',
  'compression-ratio-calculator',
  [
    'compression ratio calculator',
    'horsepower calculator',
    'engine compression',
    'compression ratio horsepower',
    'engine performance calculator',
    'octane requirements',
    'automotive calculator'
  ],
  'auto'
);

export default function CompressionRatioCalculatorPage() {
  return (
    <ToolLayout
      title="Compression Ratio Calculator"
      description="Calculate horsepower changes from compression ratio modifications"
      toolId="compression-ratio-calculator"
      category="auto"
      emoji="🔧"
      customHowToUse={[
        "Enter current compression ratio",
        "Input desired compression ratio",
        "View horsepower change percentage",
        "Consider fuel octane requirements"
      ]}
      customFeatures={[
        "Compression ratio analysis",
        "Horsepower change calculations",
        "Fuel octane recommendations",
        "Engine performance optimization"
      ]}
    >
      <CompressionRatioCalculator />
    </ToolLayout>
  );
}