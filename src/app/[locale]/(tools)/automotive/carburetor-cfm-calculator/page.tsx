import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { AutomotiveLayout } from '@/components/automotive/AutomotiveLayout';
import { CarburetorCFMCalculator } from '@/components/converters/automotive/CarburetorCFMCalculator';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Carburetor CFM Calculator - Calculate Required Airflow for Your Engine',
    description: 'Calculate the correct carburetor CFM for your engine based on displacement and modification level. Get recommendations for stock and modified engines.',
    keywords: [
      'carburetor cfm calculator',
      'carburetor sizing',
      'engine airflow calculator',
      'cfm requirements',
      'carburetor selection',
      'engine performance',
      'automotive calculator'
    ],
    openGraph: {
      title: 'Carburetor CFM Calculator',
      description: 'Calculate the correct carburetor CFM for your engine based on displacement and modification level.',
      type: 'website',
    },
    alternates: {
      canonical: '/automotive/carburetor-cfm-calculator'
    }
  };
}

export default async function CarburetorCFMCalculatorPage() {
  const t = await getTranslations();

  const educationalContent = {
    theory: 'CFM (Cubic Feet per Minute) measures the airflow capacity of a carburetor. The correct CFM rating ensures optimal air/fuel mixture delivery to your engine. Too little CFM restricts power, while too much CFM can cause poor throttle response and fuel economy. Stock engines typically need 1.5-1.7 CFM per cubic inch, while modified engines may need 1.7-2.0 CFM per cubic inch.',
    applications: [
      'Selecting the right carburetor for engine builds',
      'Upgrading carburetors for performance modifications',
      'Troubleshooting poor engine performance',
      'Matching carburetor size to engine displacement',
      'Planning intake system modifications'
    ],
    tips: [
      'Stock engines use 1.618 CFM per cubic inch multiplier',
      'Modified engines use 1.76 CFM per cubic inch multiplier',
      'Consider your driving style and intended use',
      'Vacuum secondary carburetors are more forgiving than mechanical',
      'Pontiac 400+ CI engines work well with Rochester Quadrajet 750 CFM',
      'Big Block Chevy engines often use Holley 3310 750 CFM carburetors'
    ],
    relatedTools: ['compression-ratio-calculator', 'engine-displacement-calculator']
  };

  const safetyWarnings = [
    'These calculations are for properly tuned engines only',
    'Carburetor sizing affects engine performance and drivability',
    'Consider professional consultation for racing applications',
    'Ensure adequate fuel system capacity for larger carburetors'
  ];

  return (
    <AutomotiveLayout
      title="Carburetor CFM Calculator"
      description="Calculate the correct carburetor CFM for your engine based on displacement and modification level"
      toolId="carburetor-cfm-calculator"
      category="engine"
      educationalContent={educationalContent}
      safetyWarnings={safetyWarnings}
      difficulty="beginner"
    >
      <CarburetorCFMCalculator />
    </AutomotiveLayout>
  );
}