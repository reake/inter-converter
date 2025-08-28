import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import RetirementCalculator from '@/components/converters/finance/RetirementCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('roth-ira-calculator', 'finance', 'Roth IRA Calculator');

export const metadata: Metadata = {
  title: 'Roth IRA Calculator - Tax-Free Retirement Calculator | InterConverter',
  description: 'Calculate Roth IRA contributions, tax-free growth, and retirement withdrawals with after-tax benefits and instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Roth IRA Calculator - Tax-Free Retirement Calculator',
    description: 'Professional Roth IRA calculator for tax-free retirement planning. Calculate contributions and after-tax benefits.',
    type: 'website',
    images: [
      {
        url: '/images/og-roth-ira-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Roth IRA Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/roth-ira-calculator'
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

export default function RothIRACalculatorPage() {
  const faqs = getFAQsByToolId('roth-ira-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Roth IRA Calculator"
      description="Calculate Roth IRA contributions and tax-free retirement growth with instant calculations."
      keywords={keywords}
      toolId="roth-ira-calculator"
      category="finance"
      emoji="💰"
      customHowToUse={[
        "Enter current age and planned retirement age",
        "Input current Roth IRA balance if any",
        "Set annual contribution amount within limits",
        "Calculate tax-free growth projections",
        "Plan flexible withdrawal strategy",
        "Compare benefits with Traditional IRA"
      ]}
      customFeatures={[
        "Tax-free growth calculation and projections",
        "Annual contribution limit tracking",
        "After-tax benefit analysis and savings",
        "Withdrawal flexibility without penalties",
        "Estate planning benefits and inheritance",
        "Roth conversion analysis and strategies"
      ]}
      faqs={faqs}
    >
      <RetirementCalculator />
    </EnhancedToolLayout>
  );
}
