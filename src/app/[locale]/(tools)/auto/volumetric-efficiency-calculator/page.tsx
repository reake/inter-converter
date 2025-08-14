import { Metadata } from 'next';
import { VolumetricEfficiencyCalculator } from '@/components/converters/automotive/VolumetricEfficiencyCalculator';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Volumetric Efficiency Calculator - Calculate Engine Breathing Efficiency',
    description: 'Calculate engine volumetric efficiency (VE) from horsepower, displacement, and RPM. Essential for engine tuning and performance analysis.',
    keywords: [
      'volumetric efficiency calculator',
      'VE calculator',
      'engine breathing',
      'engine efficiency',
      'performance tuning',
      'automotive calculator'
    ],
    openGraph: {
      title: 'Volumetric Efficiency Calculator',
      description: 'Calculate engine volumetric efficiency for performance tuning and analysis.',
      type: 'website',
    },
  };
}

export default function VolumetricEfficiencyCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <VolumetricEfficiencyCalculator />
      </div>
    </div>
  );
}
