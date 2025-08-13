import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { AutomotiveLayout } from '@/components/automotive/AutomotiveLayout';
import { EngineDisplacementCalculator } from '@/components/converters/automotive/EngineDisplacementCalculator';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Engine Displacement Calculator - Calculate Engine Size from Bore, Stroke, and Cylinders',
    description: 'Calculate engine displacement from bore, stroke, and cylinder count. Convert between cubic inches and liters, and understand engine design characteristics.',
    keywords: [
      'engine displacement calculator',
      'bore stroke calculator',
      'engine size calculator',
      'cubic inches to liters',
      'cylinder volume calculator',
      'engine building calculator',
      'automotive calculator'
    ],
    openGraph: {
      title: 'Engine Displacement Calculator',
      description: 'Calculate engine displacement and understand the relationship between bore, stroke, and engine size.',
      type: 'website',
    },
    alternates: {
      canonical: '/automotive/engine-displacement-calculator'
    }
  };
}

export default async function EngineDisplacementCalculatorPage() {
  const t = await getTranslations();

  const educationalContent = {
    theory: 'Engine displacement is the total volume swept by all pistons in an engine during one complete cycle. It\'s calculated by multiplying the area of the cylinder bore by the stroke length and the number of cylinders. Displacement is a key factor in determining an engine\'s power potential, with larger displacement generally allowing for more power production.',
    applications: [
      'Calculating displacement for custom engine builds',
      'Determining displacement after bore/stroke changes',
      'Converting between cubic inches and liters',
      'Planning engine modifications and upgrades',
      'Understanding engine design characteristics',
      'Comparing different engine configurations'
    ],
    tips: [
      'Bore has more effect on power potential than stroke due to valve area',
      'Longer stroke increases torque production and rod ratio',
      'Oversquare engines (bore > stroke) typically rev higher',
      'Undersquare engines (stroke > bore) produce more torque',
      'Square engines (bore ≈ stroke) offer balanced characteristics',
      'Displacement alone doesn\'t determine power - design matters too'
    ],
    relatedTools: ['carburetor-cfm-calculator', 'compression-ratio-calculator']
  };

  const safetyWarnings = [
    'Verify bore and stroke measurements are accurate for calculations',
    'Consider clearance requirements when planning bore increases',
    'Stroke changes may require different connecting rods',
    'Large displacement increases may need stronger engine internals'
  ];

  return (
    <AutomotiveLayout
      title="Engine Displacement Calculator"
      description="Calculate engine displacement from bore, stroke, and cylinder count"
      toolId="engine-displacement-calculator"
      category="engine"
      educationalContent={educationalContent}
      safetyWarnings={safetyWarnings}
      difficulty="beginner"
    >
      <EngineDisplacementCalculator />
    </AutomotiveLayout>
  );
}