import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import RetirementCalculator from '@/components/converters/finance/RetirementCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('ira-calculator', 'finance', 'IRA Calculator');

export const metadata: Metadata = {
  title: 'IRA Calculator - Traditional & Roth IRA Calculator | InterConverter',
  description: 'Calculate IRA contributions, growth, and retirement savings with traditional and Roth IRA options with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'IRA Calculator - Traditional & Roth IRA Calculator',
    description: 'Professional IRA calculator for retirement planning. Calculate contributions and compare traditional vs Roth IRA options.',
    type: 'website',
    images: [
      {
        url: '/images/og-ira-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'IRA Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/ira-calculator'
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

export default function IRACalculatorPage() {
  const faqs = getFAQsByToolId('ira-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="IRA Calculator"
      description="Calculate IRA contributions and retirement savings growth with instant calculations."
      keywords={keywords}
      toolId="ira-calculator"
      category="finance"
      emoji="💰"
      customHowToUse={[
        "Choose IRA type (Traditional or Roth)",
        "Enter current age and planned retirement age",
        "Input current IRA balance if any",
        "Set annual contribution amount and limits",
        "Calculate retirement savings growth",
        "Compare Traditional vs Roth IRA benefits"
      ]}
      customFeatures={[
        "Traditional vs Roth IRA comparison analysis",
        "Annual contribution limit tracking and alerts",
        "Tax benefit analysis and savings calculations",
        "Retirement income projections and planning",
        "Withdrawal strategy planning and optimization",
        "Required minimum distribution (RMD) calculations"
      ]}
      faqs={faqs}
    >
      <RetirementCalculator />
    </EnhancedToolLayout>
  );
}
