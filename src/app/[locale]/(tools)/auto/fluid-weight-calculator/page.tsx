import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { FluidWeightCalculator } from '@/components/converters/automotive/FluidWeightCalculator';

export const metadata: Metadata = generateToolMetadata(
  'Automotive Fluid Weight Calculator',
  'Calculate weight and volume conversions for automotive fluids including gasoline, motor oil, transmission fluid, and water.',
  'fluid-weight-calculator',
  [
    'fluid weight calculator',
    'gasoline weight',
    'motor oil weight',
    'transmission fluid weight',
    'automotive fluids',
    'volume to weight converter'
  ],
  'auto'
);

export default function FluidWeightCalculatorPage() {
  return (
    <ToolLayout
      title="Automotive Fluid Weight Calculator"
      description="Calculate weight and volume conversions for automotive fluids including gasoline, motor oil, transmission fluid, and water"
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
