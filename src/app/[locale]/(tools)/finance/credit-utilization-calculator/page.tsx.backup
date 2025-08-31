import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import CreditCardPayoffCalculator from '@/components/converters/finance/CreditCardPayoffCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('credit-utilization-calculator', 'finance', 'Credit Utilization Calculator');

export const metadata: Metadata = {
  title: 'Credit Utilization Calculator - Credit Score Impact Analysis | InterConverter',
  description: 'Calculate credit utilization ratio and its impact on credit score. Optimize credit card balances for better credit health with professional analysis.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Credit Utilization Calculator - Credit Score Impact Analysis',
    description: 'Professional credit utilization calculator. Calculate your credit utilization ratio and understand its impact on your credit score and financial health.',
    type: 'website',
    images: [
      {
        url: '/images/og-credit-utilization-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Credit Utilization Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/credit-utilization-calculator'
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

export default function CreditUtilizationCalculatorPage() {
  const faqs = getFAQsByToolId('credit-utilization-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Credit Utilization Calculator"
      description="Calculate your credit utilization ratio and understand how it affects your credit score and financial health."
      keywords={keywords}
      toolId="credit-utilization-calculator"
      category="finance"
      emoji="📈"
      customHowToUse={[
        "Enter total credit card balances",
        "Input total available credit limits",
        "Calculate overall utilization ratio",
        "Analyze per-card utilization rates",
        "Review credit score impact",
        "Get recommendations for optimization"
      ]}
      customFeatures={[
        "Overall utilization ratio calculation",
        "Per-card utilization analysis",
        "Credit score impact assessment",
        "Optimization recommendations",
        "Target utilization guidance",
        "Credit health monitoring tools"
      ]}
      faqs={faqs}
    >
      <CreditCardPayoffCalculator />
    </EnhancedToolLayout>
  );
}
