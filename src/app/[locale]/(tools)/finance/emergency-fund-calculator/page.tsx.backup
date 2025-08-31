import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import SavingsCalculator from '@/components/converters/finance/SavingsCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('emergency-fund-calculator', 'finance', 'Emergency Fund Calculator');

export const metadata: Metadata = {
  title: 'Emergency Fund Calculator - Financial Safety Net Planning | InterConverter',
  description: 'Calculate emergency fund savings goals based on monthly expenses. Plan your financial safety net and savings timeline.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Emergency Fund Calculator - Financial Safety Net Planning',
    description: 'Professional emergency fund calculator for financial security. Calculate savings goals and create a plan to build your financial safety net.',
    type: 'website',
    images: [
      {
        url: '/images/og-emergency-fund-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Emergency Fund Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/emergency-fund-calculator'
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

export default function EmergencyFundCalculatorPage() {
  const faqs = getFAQsByToolId('emergency-fund-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Emergency Fund Calculator"
      description="Calculate emergency fund requirements and savings plan with instant calculations."
      keywords={keywords}
      toolId="emergency-fund-calculator"
      category="finance"
      emoji="🌂"
      customHowToUse={[
        "Enter monthly living expenses and bills",
        "Set desired months of coverage (3-6 months recommended)",
        "Input current emergency savings balance",
        "Calculate target fund amount needed",
        "Plan monthly contribution amount",
        "Track savings progress and timeline"
      ]}
      customFeatures={[
        "Emergency fund size calculation based on expenses",
        "3-6 month expense coverage recommendations",
        "Savings timeline projection and planning",
        "Monthly contribution planning tools",
        "Progress tracking and milestone alerts",
        "Financial security assessment and tips"
      ]}
      faqs={faqs}
    >
      <SavingsCalculator />
    </EnhancedToolLayout>
  );
}
