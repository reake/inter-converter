import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { AutomotiveLayout } from '@/components/automotive/AutomotiveLayout';
import { SuperchargerCalculator } from '@/components/converters/automotive/SuperchargerCalculator';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Supercharger Calculator - Calculate Horsepower Gains from Forced Induction',
    description: 'Calculate horsepower gains from superchargers, turbochargers, and ram air systems. Includes CFM requirements for boosted engines.',
    keywords: [
      'supercharger calculator',
      'turbo calculator',
      'boost calculator',
      'forced induction',
      'horsepower gain',
      'ram air calculator',
      'supercharger cfm'
    ],
    openGraph: {
      title: 'Supercharger Calculator',
      description: 'Calculate horsepower gains from forced induction systems and understand boost requirements.',
      type: 'website',
    },
    alternates: {
      canonical: '/automotive/supercharger-calculator'
    }
  };
}

export default async function SuperchargerCalculatorPage() {
  const t = await getTranslations();

  const educationalContent = {
    theory: 'Forced induction systems compress air entering the engine, allowing more fuel to be burned and increasing power output. The relationship between boost pressure and horsepower gain is roughly linear, with each PSI of boost adding approximately 7% more power. Superchargers are belt-driven and provide immediate response, while turbochargers use exhaust gases and can achieve higher efficiency.',
    applications: [
      'Estimating power gains from supercharger installation',
      'Calculating required CFM for boosted engines',
      'Planning fuel system upgrades for forced induction',
      'Understanding Ram Air effects at speed',
      'Sizing carburetors or throttle bodies for boosted applications'
    ],
    tips: [
      'Each PSI of boost adds roughly 7% horsepower (based on 14.7 PSI atmospheric pressure)',
      'Intercooling improves efficiency and safety by reducing intake air temperature',
      'Fuel system must support increased demand - typically 30-40% more fuel flow',
      'Engine internals may need upgrading for high boost applications',
      'Superchargers provide immediate throttle response unlike turbochargers',
      'Ram Air effects become significant above 60 MPH'
    ],
    relatedTools: ['compression-ratio-calculator', 'carburetor-cfm-calculator']
  };

  const safetyWarnings = [
    'High boost levels require fuel enrichment to prevent detonation',
    'Detonation risk increases significantly with boost pressure',
    'Professional tuning is essential for safety and reliability',
    'Monitor air/fuel ratios carefully under boost conditions',
    'Engine internals may need upgrading for boost levels above 8 PSI',
    'Always use appropriate octane fuel for your compression ratio and boost level'
  ];

  return (
    <AutomotiveLayout
      title="Supercharger Calculator"
      description="Calculate horsepower gains from supercharger and forced induction systems"
      toolId="supercharger-calculator"
      category="performance"
      educationalContent={educationalContent}
      safetyWarnings={safetyWarnings}
      difficulty="advanced"
    >
      <SuperchargerCalculator />
    </AutomotiveLayout>
  );
}