import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { AutomotiveLayout } from '@/components/automotive/AutomotiveLayout';
import { CompressionRatioCalculator } from '@/components/converters/automotive/CompressionRatioCalculator';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Compression Ratio Calculator - Calculate Horsepower Changes from CR Modifications',
    description: 'Calculate horsepower changes from compression ratio modifications. Understand the effects of compression ratio on engine performance and fuel requirements.',
    keywords: [
      'compression ratio calculator',
      'horsepower calculator',
      'engine compression',
      'compression ratio horsepower',
      'engine performance calculator',
      'octane requirements',
      'automotive calculator'
    ],
    openGraph: {
      title: 'Compression Ratio Calculator',
      description: 'Calculate horsepower changes from compression ratio modifications and understand fuel requirements.',
      type: 'website',
    },
    alternates: {
      canonical: '/automotive/compression-ratio-calculator'
    }
  };
}

export default async function CompressionRatioCalculatorPage() {
  const t = await getTranslations();

  const educationalContent = {
    theory: 'Compression ratio is the ratio of cylinder volume when the piston is at bottom dead center to the volume when at top dead center. Higher compression ratios extract more energy from the fuel but require higher octane to prevent detonation. Each point of compression ratio typically adds 3-4% horsepower, but the relationship follows a logarithmic curve based on thermodynamic principles.',
    applications: [
      'Planning engine modifications for power gains',
      'Determining fuel octane requirements',
      'Calculating expected horsepower increases',
      'Balancing performance with pump gas compatibility',
      'Understanding the trade-offs of compression changes'
    ],
    tips: [
      'Each point of compression ratio typically adds 3-4% horsepower',
      'Pump gas limits compression to about 10.5:1 for iron heads',
      'Aluminum heads can run higher compression on pump gas due to better heat dissipation',
      'Consider cam timing effects on dynamic compression ratio',
      'Higher compression requires more precise tuning',
      'Detonation can cause severe engine damage - always use appropriate fuel'
    ],
    relatedTools: ['carburetor-cfm-calculator', 'supercharger-calculator']
  };

  const safetyWarnings = [
    'High compression ratios may require premium fuel to prevent detonation',
    'Detonation (engine knock) can cause severe engine damage',
    'Consult a professional tuner for compression ratios above 11:1',
    'Always verify fuel octane requirements before operating the engine',
    'Consider dynamic compression ratio effects from camshaft timing'
  ];

  const faqs = [
    {
      question: "How much horsepower does each point of compression ratio add?",
      answer: "Generally, each point of compression ratio adds approximately 3-4% horsepower. However, this follows a logarithmic curve, so the gains diminish at higher ratios. The actual gain depends on engine design, fuel quality, and tuning."
    },
    {
      question: "What's the maximum compression ratio for pump gas?",
      answer: "For iron heads, 10.5:1 is typically the safe limit for 91-93 octane pump gas. Aluminum heads can often handle 11:1 or slightly higher due to better heat dissipation. Always consider your local fuel quality and climate."
    },
    {
      question: "What happens if compression ratio is too high for the fuel?",
      answer: "Detonation (engine knock) occurs when the fuel ignites prematurely due to compression heat. This can cause severe engine damage including cracked pistons, bent rods, and damaged bearings. Always use appropriate octane fuel."
    },
    {
      question: "Should I consider dynamic compression ratio?",
      answer: "Yes! Dynamic compression ratio accounts for cam timing effects. A cam with late intake valve closing reduces effective compression. This calculator shows static compression - consult a professional for dynamic calculations."
    },
    {
      question: "Can I increase compression ratio without changing pistons?",
      answer: "Yes, through methods like milling heads/block, using thinner head gaskets, or different pistons. However, each method has limitations and considerations. Professional consultation is recommended for major changes."
    }
  ];

  return (
    <AutomotiveLayout
      title="Compression Ratio Calculator"
      description="Calculate horsepower changes from compression ratio modifications"
      toolId="compression-ratio-calculator"
      category="engine"
      educationalContent={educationalContent}
      safetyWarnings={safetyWarnings}
      difficulty="intermediate"
      faqs={faqs}
      relatedToolIds={['carburetor-cfm-calculator', 'supercharger-calculator', 'engine-displacement-calculator']}
    >
      <CompressionRatioCalculator />
    </AutomotiveLayout>
  );
}