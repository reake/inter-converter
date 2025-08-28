import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import CreditCardPayoffCalculator from '@/components/converters/finance/CreditCardPayoffCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Balance Transfer Calculator',
  'Calculate savings from credit card balance transfers. Compare transfer fees, promotional rates, and payoff scenarios.',
  'balance-transfer-calculator',
  [
    'balance transfer calculator',
    'credit card balance transfer calculator',
    'balance transfer savings calculator',
    'credit card transfer calculator',
    'balance transfer fee calculator',
    'promotional rate calculator',
    'debt consolidation calculator'
  ],
  'credit-cards'
);

export default function BalanceTransferCalculatorPage() {
  return (
    <ToolLayout
      title="Balance Transfer Calculator"
      description="Calculate potential savings from transferring credit card balances to cards with lower interest rates or promotional offers"
      toolId="balance-transfer-calculator"
      category="credit-cards"
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
    >
      <CreditCardPayoffCalculator />
    </ToolLayout>
  );
}
