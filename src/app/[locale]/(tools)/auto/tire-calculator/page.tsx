import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { TireCalculator } from '@/components/automotive/TireCalculator';



// Cloudflare Pages Edge Runtime 配置
export const runtime = 'edge';
export const metadata: Metadata = generateToolMetadata(
  'Tire Calculator',
  'Calculate how tire diameter changes affect vehicle speed, RPM, and performance. Tire size comparison calculator.',
  'tire-calculator',
  ['tire calculator', 'tire diameter', 'speed difference', 'rpm change', 'tire size comparison', 'wheel calculator'],
  'auto'
);

export default function TireCalculatorPage() {
  return (
    <ToolLayout
      title="Tire Calculator"
      description="Calculate tire diameter effects on speed and performance"
      toolId="tire-calculator"
      category="auto"
      emoji="🛞"
      customHowToUse={[
        "Enter original tire size (width/aspect/rim)",
        "Input new tire size for comparison",
        "View speed and RPM differences",
        "Analyze performance impact"
      ]}
      customFeatures={[
        "Tire size comparison",
        "Speed difference calculation",
        "RPM change analysis",
        "Performance impact assessment"
      ]}
    >
      <TireCalculator />
    </ToolLayout>
  );
}
