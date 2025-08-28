import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import InvestmentCalculator from '@/components/converters/finance/InvestmentCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('401k-calculator', 'finance', '401k Calculator');

export const metadata: Metadata = {
  title: '401k Calculator - Retirement Savings & Employer Match | InterConverter',
  description: 'Calculate 401k retirement savings growth with employer matching. Plan your retirement contributions and track long-term growth with professional accuracy.',
  keywords: keywords.join(', '),
  openGraph: {
    title: '401k Calculator - Retirement Savings Calculator',
    description: 'Professional 401k calculator with employer matching and contribution optimization. Calculate retirement savings growth and tax benefits.',
    type: 'website',
    images: [
      {
        url: '/images/og-401k-calculator.jpg',
        width: 1200,
        height: 630,
        alt: '401k Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/401k-calculator'
  },
  authors: [{ name: 'InterConverter Team' }],
  creator: 'InterConverter',
  publisher: 'InterConverter',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};

export default function FourOhOneKCalculatorPage() {
  const faqs = getFAQsByToolId('401k-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="401k Calculator"
      description="Calculate 401k retirement savings growth with employer matching and contribution optimization with instant calculations."
      keywords={keywords}
      toolId="401k-calculator"
      category="finance"
      emoji="💰"
      customHowToUse={[
        "Enter current age and planned retirement age",
        "Input current 401k balance if any",
        "Set annual contribution amount and percentage",
        "Add employer matching details and vesting schedule",
        "Review projected retirement savings growth",
        "Optimize contribution strategy for maximum benefits"
      ]}
      customFeatures={[
        "401k growth projection with compound interest",
        "Employer matching calculation and optimization",
        "Annual contribution limit tracking",
        "Tax benefit analysis and savings",
        "Retirement readiness assessment",
        "Contribution optimization recommendations"
      ]}
      faqs={faqs}
    >
      <RetirementCalculator />
    </EnhancedToolLayout>
  );
}
