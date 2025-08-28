import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import CreditCardPayoffCalculator from '@/components/converters/finance/CreditCardPayoffCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('balance-transfer-calculator', 'finance', 'Balance Transfer Calculator');

export const metadata: Metadata = {
  title: 'Balance Transfer Calculator - Credit Card Savings | InterConverter',
  description: 'Calculate savings from credit card balance transfers. Compare transfer fees, promotional rates, and payoff scenarios.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Balance Transfer Calculator - Credit Card Savings',
    description: 'Professional balance transfer calculator for credit card debt management. Calculate savings and compare transfer options.',
    type: 'website',
    images: [
      {
        url: '/images/og-balance-transfer-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Balance Transfer Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/balance-transfer-calculator'
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

export default function BalanceTransferCalculatorPage() {
  const faqs = getFAQsByToolId('balance-transfer-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Balance Transfer Calculator"
      description="Calculate potential savings from transferring credit card balances to cards with lower interest rates or promotional offers."
      keywords={keywords}
      toolId="balance-transfer-calculator"
      category="finance"
      emoji="🔄"
      customHowToUse={[
        "Enter current credit card balance and APR",
        "Input new card's promotional rate and duration",
        "Add balance transfer fee (typically 3-5%)",
        "Set your planned monthly payment",
        "Compare total costs and savings",
        "Analyze break-even point for transfer"
      ]}
      customFeatures={[
        "Transfer fee impact analysis",
        "Promotional rate period tracking",
        "Interest savings calculation",
        "Break-even analysis",
        "Multiple card comparison",
        "Payoff timeline optimization"
      ]}
      faqs={faqs}
    >
      <CreditCardPayoffCalculator />
    </EnhancedToolLayout>
  );
}
