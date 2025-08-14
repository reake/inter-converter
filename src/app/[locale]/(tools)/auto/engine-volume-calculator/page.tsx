import { Metadata } from 'next';
import { EngineVolumeCalculator } from '@/components/converters/automotive/EngineVolumeCalculator';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Engine Volume Calculator - Calculate Cylinder and Engine Volume',
    description: 'Calculate cylinder volume from bore and stroke, engine displacement from cylinder volume, and convert between CI and CC.',
    keywords: [
      'engine volume calculator',
      'cylinder volume',
      'engine displacement',
      'bore stroke calculator',
      'cubic inches to cc',
      'automotive calculator'
    ],
    openGraph: {
      title: 'Engine Volume Calculator',
      description: 'Calculate engine and cylinder volumes for automotive applications.',
      type: 'website',
    },
  };
}

export default function EngineVolumeCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <EngineVolumeCalculator />
      </div>
    </div>
  );
}
