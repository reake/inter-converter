import { Metadata } from 'next';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CarburetorCFMCalculator } from '@/components/converters/automotive/CarburetorCFMCalculator';




// Force static generation
export const dynamic = 'force-static';
const keywords = [
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
];

export const metadata: Metadata = {
  title: 'Carburetor CFM Calculator',
  description:
    'Calculate carburetor CFM for your engine displacement. Free carb sizing calculator for stock & modified engines. Get accurate airflow requirements.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Carburetor CFM Calculator',
    description:
      'Calculate carburetor CFM for your engine displacement. Free carb sizing calculator for stock & modified engines. Get accurate airflow requirements.',
    type: 'website',
  },
  alternates: {
    canonical: '/auto/carburetor-cfm-calculator',
  },
};

export default function CarburetorCFMCalculatorPage() {
  return (
    <ToolLayout
      title="Carburetor CFM Calculator"
      description="Calculate the correct carburetor CFM for your engine based on displacement and modification level"
      keywords={keywords}
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