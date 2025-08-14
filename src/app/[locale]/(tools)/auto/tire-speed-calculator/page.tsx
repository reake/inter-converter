import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { TireSpeedCalculator } from '@/components/converters/automotive/TireSpeedCalculator';

export const metadata: Metadata = generateToolMetadata(
  'Tire Speed Calculator',
  'Calculate vehicle speed based on tire diameter, gear ratio, and RPM. Essential tool for performance tuning and gear selection.',
  'tire-speed-calculator',
  [
    'tire speed calculator',
    'tire diameter speed',
    'gear ratio speed',
    'rpm speed calculator',
    'vehicle speed calculator',
    'tire size speed',
    'automotive calculator'
  ],
  'auto'
);

export default function TireSpeedCalculatorPage() {
  return (
    <ToolLayout
      title="Tire Speed Calculator"
      description="Calculate vehicle speed based on tire diameter, gear ratio, and RPM"
      toolId="tire-speed-calculator"
      category="auto"
      emoji="🏎️"
      customHowToUse={[
        "Enter tire diameter in inches",
        "Input gear ratio (e.g., 3.73)",
        "Enter engine RPM",
        "View calculated speed in MPH",
        "Compare different tire sizes and ratios"
      ]}
      customFeatures={[
        "Larger tire diameter increases speed at same RPM",
        "Lower gear ratio increases speed but reduces acceleration",
        "Use for selecting optimal tire and gear combinations",
        "Consider transmission ratio for final calculations",
        "Account for tire wear affecting actual diameter"
      ]}
    >
      <TireSpeedCalculator />
    </ToolLayout>
  );
}
