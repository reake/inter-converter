import { Metadata } from 'next';
import { RamAirCalculator } from '@/components/converters/automotive/RamAirCalculator';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Ram Air Calculator - Calculate Horsepower Gains from Ram Air Induction',
    description: 'Calculate horsepower gains from ram air induction systems. Determine PSI increase and total horsepower output based on vehicle speed and engine power.',
    keywords: [
      'ram air calculator',
      'ram air induction',
      'horsepower gain',
      'pontiac ram air',
      'cold air intake',
      'performance calculator',
      'automotive calculator'
    ],
    openGraph: {
      title: 'Ram Air Calculator',
      description: 'Calculate horsepower gains from ram air induction systems and understand performance benefits.',
      type: 'website',
    },
  };
}

export default function RamAirCalculatorPage() {
  const educationalContent = {
    theory: 'Ram Air induction systems use vehicle speed to create positive pressure in the intake manifold. As the vehicle moves forward, air is forced into the intake system, creating a supercharging effect. This increases air density and allows more fuel to be burned, resulting in increased horsepower. The effect is minimal at low speeds but becomes significant at highway speeds.',
    applications: [
      'Calculating horsepower gains from ram air systems',
      'Understanding performance benefits at different speeds',
      'Comparing ram air effectiveness vs. other induction methods',
      'Planning cold air intake modifications',
      'Analyzing Pontiac Ram Air system performance'
    ],
    tips: [
      'Ram air effects become noticeable above 60 MPH',
      'Pontiac Ram Air systems were famous for this technology',
      'Cold air intakes can provide similar benefits at lower speeds',
      'The effect is more pronounced on naturally aspirated engines',
      'Proper air filter maintenance is crucial for optimal performance'
    ],
    relatedTools: ['supercharger-calculator', 'carburetor-cfm-calculator']
  };

  const safetyWarnings = [
    'Ensure proper air filter maintenance to prevent engine damage',
    'Cold air intakes may affect engine warranty',
    'Professional installation recommended for complex systems'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <RamAirCalculator />
      </div>
    </div>
  );
}
