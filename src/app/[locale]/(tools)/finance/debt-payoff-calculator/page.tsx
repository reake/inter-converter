import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Debt Payoff Calculator',
  'Calculate debt payoff strategies using snowball and avalanche methods. Plan multiple debt elimination with optimized payment allocation.',
  'debt-payoff-calculator',
  [
    'debt payoff calculator',
    'debt snowball calculator',
    'debt avalanche calculator',
    'multiple debt calculator',
    'debt elimination calculator',
    'debt paydown calculator'
  ],
  'loans'
);

export default function DebtPayoffCalculatorPage() {
  return (
    <ToolLayout
      title="Debt Payoff Calculator"
      description="Calculate optimal debt payoff strategies using snowball and avalanche methods for multiple debts"
      toolId="debt-payoff-calculator"
      category="loans"
      emoji="🎯"
      customHowToUse={[
        "Enter all your debts with balances and rates",
        "Set your total monthly payment budget",
        "Compare snowball vs avalanche methods",
        "View payoff timeline and interest savings",
        "Track progress with payment schedules",
        "Optimize your debt elimination strategy"
      ]}
      customFeatures={[
        "Snowball method calculations",
        "Avalanche method optimization",
        "Multiple debt tracking",
        "Interest savings comparison",
        "Payment allocation optimization",
        "Debt-free timeline projection"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
