import { Metadata } from 'next';
import { FluidWeightCalculator } from '@/components/converters/automotive/FluidWeightCalculator';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Automotive Fluid Weight Calculator - Convert Volume to Weight',
    description: 'Calculate weight and volume conversions for automotive fluids including gasoline, motor oil, transmission fluid, and water.',
    keywords: [
      'fluid weight calculator',
      'gasoline weight',
      'motor oil weight',
      'transmission fluid weight',
      'automotive fluids',
      'volume to weight converter'
    ],
    openGraph: {
      title: 'Automotive Fluid Weight Calculator',
      description: 'Convert between volume and weight for automotive fluids.',
      type: 'website',
    },
  };
}

export default function FluidWeightCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <FluidWeightCalculator />
      </div>
    </div>
  );
}
