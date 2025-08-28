import { Metadata } from "next";
import { EnhancedToolLayout } from "@/components/tools/EnhancedToolLayout";
import TaxCalculator from "@/components/converters/finance/TaxCalculator";
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('tax-calculator', 'finance', 'Tax Calculator');

export const metadata: Metadata = {
  title: 'Tax Calculator - Income Tax & Refund Estimator | InterConverter',
  description: 'Calculate income tax, estimate tax liability, and plan your tax strategy. Free tax calculator with multiple filing statuses and professional accuracy.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Tax Calculator - Income Tax & Refund Estimator',
    description: 'Professional tax calculator for income tax planning. Calculate tax liability, estimate refunds, and optimize your tax strategy.',
    type: 'website',
    images: [
      {
        url: '/images/og-tax-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Tax Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/tax-calculator'
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

export default function TaxCalculatorPage() {
  const faqs = getFAQsByToolId('tax-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Tax Calculator"
      description="Calculate income tax and plan tax strategies with instant calculations."
      keywords={keywords}
      toolId="tax-calculator"
      category="finance"
      emoji="💰"
      customHowToUse={[
        "Enter annual gross income amount",
        "Select filing status (single, married, etc.)",
        "Add deductions and tax credits",
        "Calculate federal and state tax liability",
        "Review applicable tax brackets",
        "Plan tax optimization strategies"
      ]}
      customFeatures={[
        "Federal and state tax calculation",
        "Progressive tax bracket analysis",
        "Standard and itemized deduction optimization",
        "Tax credit planning and maximization",
        "Withholding adjustment recommendations",
        "Tax planning strategies and tips"
      ]}
      faqs={faqs}
    >
      <TaxCalculator />
    </EnhancedToolLayout>
  );
}
