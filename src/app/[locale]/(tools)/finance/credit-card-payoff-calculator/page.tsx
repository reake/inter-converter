import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Credit Card Payoff Calculator',
  'Calculate credit card payoff time and interest costs. Plan debt elimination strategies with minimum and extra payment scenarios.',
  'credit-card-payoff-calculator',
  [
    'credit card payoff calculator',
    'credit card debt calculator',
    'credit card payment calculator',
    'debt payoff calculator',
    'credit card interest calculator',
    'minimum payment calculator',
    'debt elimination calculator',
    'credit card balance calculator'
  ],
  'credit-cards'
);

export default function CreditCardPayoffCalculatorPage() {
  return (
    <ToolLayout
      title="Credit Card Payoff Calculator"
      description="Calculate how long it will take to pay off credit card debt and total interest costs with different payment strategies"
      toolId="credit-card-payoff-calculator"
      category="credit-cards"
      emoji="💳"
      customHowToUse={[
        "Enter your current credit card balance",
        "Input the annual percentage rate (APR)",
        "Set your planned monthly payment amount",
        "Compare minimum payment vs extra payment scenarios",
        "View payoff timeline and total interest costs",
        "Optimize payment strategy for faster payoff"
      ]}
      customFeatures={[
        "Payoff timeline calculation",
        "Total interest cost analysis",
        "Payment strategy comparison",
        "Minimum vs extra payment scenarios",
        "Interest savings visualization",
        "Debt elimination planning tools"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
