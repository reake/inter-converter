import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import CreditCardPayoffCalculator from '@/components/converters/finance/CreditCardPayoffCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Credit Card Rewards Calculator',
  'Calculate credit card rewards earnings from cashback, points, and miles programs. Compare reward cards and optimize spending categories.',
  'rewards-calculator',
  [
    'credit card rewards calculator',
    'cashback calculator',
    'credit card points calculator',
    'miles calculator',
    'rewards comparison calculator',
    'credit card benefits calculator',
    'cashback rewards calculator',
    'points value calculator'
  ],
  'credit-cards'
);

export default function RewardsCalculatorPage() {
  return (
    <ToolLayout
      title="Credit Card Rewards Calculator"
      description="Calculate potential earnings from credit card rewards programs including cashback, points, and miles based on your spending patterns"
      toolId="rewards-calculator"
      category="credit-cards"
      emoji="🎁"
      customHowToUse={[
        "Enter your monthly spending by category",
        "Input reward rates for different categories",
        "Calculate annual rewards earnings",
        "Compare multiple reward cards",
        "Factor in annual fees and benefits",
        "Optimize spending category allocation"
      ]}
      customFeatures={[
        "Multi-category spending analysis",
        "Cashback vs points comparison",
        "Annual fee break-even calculation",
        "Reward card comparison tools",
        "Spending optimization recommendations",
        "ROI analysis for premium cards"
      ]}
    >
      <CreditCardPayoffCalculator />
    </ToolLayout>
  );
}
