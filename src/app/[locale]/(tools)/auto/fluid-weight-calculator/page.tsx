import { Metadata } from 'next';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { FluidWeightCalculator } from '@/components/converters/automotive/FluidWeightCalculator';




// Force static generation
export const dynamic = 'force-static';
const keywords = [
  'fluid weight calculator',
  'gasoline weight',
  'motor oil weight',
  'transmission fluid weight',
  'automotive fluids',
  'volume to weight converter',
];

export const metadata: Metadata = {
  title: 'Automotive Fluid Weight Calculator',
  description:
    'Calculate weight and volume conversions for automotive fluids including gasoline, motor oil, transmission fluid, and water.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Automotive Fluid Weight Calculator',
    description:
      'Calculate weight and volume conversions for automotive fluids including gasoline, motor oil, transmission fluid, and water.',
    type: 'website',
  },
  alternates: {
    canonical: '/auto/fluid-weight-calculator',
  },
};

export default function FluidWeightCalculatorPage() {
  return (
    <ToolLayout
      title="Automotive Fluid Weight Calculator"
      description="Calculate weight and volume conversions for automotive fluids including gasoline, motor oil, transmission fluid, and water"
      keywords={keywords}
      toolId="fluid-weight-calculator"
      category="auto"
      emoji="🛢️"
      customHowToUse={[
        "Select the type of automotive fluid",
        "Enter volume in gallons or liters",
        "View calculated weight in pounds or kilograms",
        "Use for fuel capacity and fluid planning"
      ]}
      customFeatures={[
        "Multiple automotive fluid types",
        "Volume to weight conversion",
        "Support for gallons and liters",
        "Accurate fluid density calculations"
      ]}
    >
      <FluidWeightCalculator />
    </ToolLayout>
  );
}
