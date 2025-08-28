import { Metadata } from 'next';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { RPMCalculator } from '@/components/converters/automotive/RPMCalculator';




// Force static generation
export const dynamic = 'force-static';
const title = 'RPM Calculator';
const description = 'Calculate engine RPM based on vehicle speed, gear ratio, and tire diameter. Free automotive RPM calculator.';
const keywordsArr = ['rpm calculator', 'engine speed', 'gear ratio', 'tire diameter', 'automotive calculator', 'vehicle speed', 'transmission'];

export const metadata: Metadata = {
  title: `${title} | InterConverter`,
  description,
  keywords: keywordsArr.join(', '),
  openGraph: {
    title: `${title} | InterConverter`,
    description,
    type: 'website',
  },
  alternates: { canonical: '/auto/rpm-calculator' }
};

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
