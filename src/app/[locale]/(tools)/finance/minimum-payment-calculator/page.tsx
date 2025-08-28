import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import CreditCardPayoffCalculator from '@/components/converters/finance/CreditCardPayoffCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Credit Card Minimum Payment Calculator',
  'Calculate credit card minimum payments and understand the long-term cost of paying only minimums. Plan better payment strategies.',
  'minimum-payment-calculator',
  [
    'minimum payment calculator',
    'credit card minimum payment calculator',
    'minimum payment cost calculator',
    'credit card payment calculator',
    'minimum payment analysis',
    'credit card minimum calculator'
  ],
  'credit-cards'
);

export default function MinimumPaymentCalculatorPage() {
  return (
    <ToolLayout
      title="Credit Card Minimum Payment Calculator"
      description="Calculate your credit card minimum payments and see the true cost of paying only the minimum amount due"
      toolId="minimum-payment-calculator"
      category="credit-cards"
      emoji="⚠️"
      customHowToUse={[
        "Enter your credit card balance",
        "Input the annual percentage rate (APR)",
        "Set minimum payment percentage (typically 2-3%)",
        "Calculate minimum payment amount",
        "View total payoff time and interest costs",
        "Compare with higher payment scenarios"
      ]}
      customFeatures={[
        "Minimum payment calculation",
        "Total payoff time analysis",
        "Interest cost projection",
        "Payment comparison scenarios",
        "Debt trap visualization",
        "Payment optimization recommendations"
      ]}
    >
      <CreditCardPayoffCalculator />
    </ToolLayout>
  );
}
