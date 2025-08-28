import { Metadata } from 'next';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { TireCalculator } from '@/components/converters/automotive/TireCalculator';




// Force static generation
export const dynamic = 'force-static';
const title = 'Tire Calculator';
const description = 'Calculate how tire diameter changes affect vehicle speed, RPM, and performance. Tire size comparison calculator.';
const keywordsArr = ['tire calculator', 'tire diameter', 'speed difference', 'rpm change', 'tire size comparison', 'wheel calculator'];

export const metadata: Metadata = {
  title: `${title} | InterConverter`,
  description,
  keywords: keywordsArr.join(', '),
  openGraph: {
    title: `${title} | InterConverter`,
    description,
    type: 'website',
  },
  alternates: { canonical: '/auto/tire-calculator' }
};

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
