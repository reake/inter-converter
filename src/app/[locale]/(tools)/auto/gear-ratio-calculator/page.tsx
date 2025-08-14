import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { GearRatioCalculator } from '@/components/automotive/GearRatioCalculator';



// Cloudflare Pages Edge Runtime 配置
export const runtime = 'edge';
export const metadata: Metadata = generateToolMetadata(
  'Gear Ratio Calculator',
  'Calculate gear ratios from ring and pinion teeth, find optimal ratios for performance. Free automotive gear ratio calculator.',
  'gear-ratio-calculator',
  ['gear ratio calculator', 'ring pinion', 'differential ratio', 'automotive performance', 'gear calculator', 'drivetrain', 'transmission'],
  'auto'
);

export default function GearRatioCalculatorPage() {
  return (
    <ToolLayout
      title="Gear Ratio Calculator"
      description="Calculate gear ratios and find optimal ratios for performance"
      toolId="gear-ratio-calculator"
      category="auto"
      emoji="⚙️"
      customHowToUse={[
        "Enter number of ring gear teeth",
        "Input number of pinion gear teeth",
        "View calculated gear ratio automatically",
        "Compare different ratio options for performance"
      ]}
      customFeatures={[
        "Ring and pinion calculations",
        "Performance ratio analysis",
        "Differential gear ratios",
        "Drivetrain optimization"
      ]}
    >
      <GearRatioCalculator />
    </ToolLayout>
  );
}
