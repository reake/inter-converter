import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { RPMCalculator } from '@/components/automotive/RPMCalculator';




// Force static generation
export const dynamic = 'force-static';
export const metadata: Metadata = generateToolMetadata(
  'RPM Calculator',
  'Calculate engine RPM based on vehicle speed, gear ratio, and tire diameter. Free automotive RPM calculator.',
  'rpm-calculator',
  ['rpm calculator', 'engine speed', 'gear ratio', 'tire diameter', 'automotive calculator', 'vehicle speed', 'transmission'],
  'auto'
);

export default function RPMCalculatorPage() {
  return (
    <ToolLayout
      title="RPM Calculator"
      description="Calculate engine RPM based on speed, gear ratio, and tire size"
      toolId="rpm-calculator"
      category="auto"
      emoji="🏎️"
      customHowToUse={[
        "Enter vehicle speed in MPH or KPH",
        "Input tire diameter in inches",
        "Enter gear ratio for current gear",
        "View calculated engine RPM instantly"
      ]}
      customFeatures={[
        "Speed to RPM conversion",
        "Gear ratio calculations",
        "Tire size considerations",
        "Multiple unit support"
      ]}
    >
      <RPMCalculator />
    </ToolLayout>
  );
}
