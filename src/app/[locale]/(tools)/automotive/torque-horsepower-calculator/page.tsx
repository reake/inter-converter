import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { AutomotiveLayout } from '@/components/automotive/AutomotiveLayout';
import { TorqueHorsepowerCalculator } from '@/components/converters/automotive/TorqueHorsepowerCalculator';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Torque & Horsepower Calculator - Convert Between Torque, HP, and RPM',
    description: 'Convert between torque, horsepower, and RPM using automotive formulas. Understand the relationship between engine power measurements.',
    keywords: [
      'torque calculator',
      'horsepower calculator',
      'torque to horsepower',
      'hp to torque',
      'rpm calculator',
      '5252 rpm',
      'engine power calculator'
    ],
    openGraph: {
      title: 'Torque & Horsepower Calculator',
      description: 'Convert between torque, horsepower, and RPM and understand engine power relationships.',
      type: 'website',
    },
    alternates: {
      canonical: '/automotive/torque-horsepower-calculator'
    }
  };
}

export default async function TorqueHorsepowerCalculatorPage() {
  const t = await getTranslations();

  const educationalContent = {
    theory: 'Torque and horsepower are related by RPM through the formula: HP = (Torque × RPM) ÷ 5252. Torque is the twisting force applied to the crankshaft, while horsepower is the rate of doing work. They are mathematically equal at exactly 5252 RPM due to the conversion constant. This relationship is fundamental to understanding engine performance characteristics.',
    applications: [
      'Understanding dyno results and engine characteristics',
      'Calculating missing values from known parameters',
      'Comparing engine performance at different RPM levels',
      'Planning modifications for torque vs. horsepower emphasis',
      'Analyzing power delivery characteristics',
      'Understanding the 5252 RPM crossover point'
    ],
    tips: [
      'Torque determines how an engine feels during acceleration',
      'Horsepower determines top speed capability and sustained power',
      'Peak torque usually occurs at lower RPM than peak horsepower',
      'The 5252 RPM crossover point is where HP numerically equals torque',
      'Diesel engines typically produce more torque than gasoline engines',
      'High-revving engines favor horsepower over torque'
    ],
    relatedTools: ['power-to-weight-calculator', 'volumetric-efficiency-calculator']
  };

  const safetyWarnings = [
    'These calculations are theoretical - actual engine performance varies',
    'Consider engine design and operating conditions for real-world performance',
    'High RPM operation requires appropriate engine components',
    'Always verify calculations with actual dyno testing when possible'
  ];

  return (
    <AutomotiveLayout
      title="Torque & Horsepower Calculator"
      description="Convert between torque, horsepower, and RPM using automotive formulas"
      toolId="torque-horsepower-calculator"
      category="performance"
      educationalContent={educationalContent}
      safetyWarnings={safetyWarnings}
      difficulty="beginner"
    >
      <TorqueHorsepowerCalculator />
    </AutomotiveLayout>
  );
}