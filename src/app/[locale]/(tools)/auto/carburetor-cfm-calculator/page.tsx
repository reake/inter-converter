import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { CarburetorCFMCalculator } from '@/components/converters/automotive/CarburetorCFMCalculator';

export const metadata: Metadata = generateToolMetadata(
  'Carburetor CFM Calculator',
  'Calculate carburetor CFM for your engine displacement. Free carb sizing calculator for stock & modified engines. Get accurate airflow requirements.',
  'carburetor-cfm-calculator',
  [
    'carburetor cfm calculator',
    'carb cfm calculator',
    'carburetor sizing calculator',
    'engine cfm calculator',
    'carburetor airflow calculator',
    'carb sizing tool',
    'holley cfm calculator',
    'edelbrock cfm calculator',
    'quadrajet cfm calculator',
    'carburetor selection calculator',
    'engine airflow requirements',
    'cfm calculation formula',
    'carburetor cfm chart',
    'engine displacement cfm',
    'performance carburetor sizing'
  ],
  'auto'
);

export default function CarburetorCFMCalculatorPage() {
  return (
    <ToolLayout
      title="Carburetor CFM Calculator"
      description="Calculate the correct carburetor CFM for your engine based on displacement and modification level"
      toolId="carburetor-cfm-calculator"
      category="auto"
      emoji="🔧"
      customHowToUse={[
        "Enter engine displacement in cubic inches",
        "Select engine type (stock or modified)",
        "View calculated CFM requirements",
        "Use result to select appropriate carburetor"
      ]}
      customFeatures={[
        "Stock and modified engine calculations",
        "CFM per cubic inch ratios",
        "Carburetor sizing recommendations",
        "Performance optimization guidance"
      ]}
    >
      <CarburetorCFMCalculator />
    </ToolLayout>
  );
}