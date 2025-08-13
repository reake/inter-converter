import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { AutomotiveLayout } from '@/components/automotive/AutomotiveLayout';
import { GearRatioCalculator } from '@/components/converters/automotive/GearRatioCalculator';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Gear Ratio Calculator - Calculate Differential Ratios, RPM, and Speed',
    description: 'Calculate gear ratios from teeth count, determine current ratios from speed/RPM, and find ideal ratios for performance. Comprehensive gear ratio calculator.',
    keywords: [
      'gear ratio calculator',
      'differential ratio',
      'ring and pinion',
      'gear ratio rpm',
      'speed calculator',
      'automotive gearing',
      'final drive ratio'
    ],
    openGraph: {
      title: 'Gear Ratio Calculator',
      description: 'Calculate gear ratios, RPM, and speed relationships for optimal automotive performance.',
      type: 'website',
    },
    alternates: {
      canonical: '/automotive/gear-ratio-calculator'
    }
  };
}

export default async function GearRatioCalculatorPage() {
  const t = await getTranslations();

  const educationalContent = {
    theory: 'Gear ratio is determined by dividing the number of ring gear teeth by pinion gear teeth. Lower numerical ratios (like 3.08:1) provide higher top speed but slower acceleration, while higher ratios (like 4.10:1) provide quicker acceleration but lower top speed. The gear ratio multiplies engine torque while dividing engine RPM at the wheels.',
    applications: [
      'Optimizing acceleration vs. top speed balance',
      'Calculating current gear ratio from speed/RPM measurements',
      'Selecting ideal ratio for racing or street use',
      'Determining speedometer error from gear changes',
      'Planning drivetrain modifications for specific performance goals'
    ],
    tips: [
      'Higher numerical ratios (4.10+) are better for drag racing and acceleration',
      'Lower numerical ratios (3.08-3.42) are better for highway driving and fuel economy',
      'Consider your transmission gear ratios in overall gearing calculations',
      'Tire diameter significantly affects effective gearing',
      'Most street cars benefit from ratios between 3.42:1 and 3.73:1',
      'Overdrive transmissions can compensate for aggressive rear gear ratios'
    ],
    relatedTools: ['tire-speed-calculator', 'power-to-weight-calculator']
  };

  const safetyWarnings = [
    'Verify gear ratio compatibility with your differential housing',
    'Consider the impact on speedometer accuracy',
    'Ensure adequate cooling for aggressive gear ratios used in racing',
    'Professional installation recommended for ring and pinion changes'
  ];

  return (
    <AutomotiveLayout
      title="Gear Ratio Calculator"
      description="Calculate gear ratios, RPM, and speed relationships for optimal performance"
      toolId="gear-ratio-calculator"
      category="drivetrain"
      educationalContent={educationalContent}
      safetyWarnings={safetyWarnings}
      difficulty="beginner"
    >
      <GearRatioCalculator />
    </AutomotiveLayout>
  );
}