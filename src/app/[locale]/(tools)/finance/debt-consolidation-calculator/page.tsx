import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Debt Consolidation Calculator',
  'Calculate savings from consolidating multiple credit card debts into one loan. Compare interest rates, payments, and payoff timelines.',
  'debt-consolidation-calculator',
  [
    'debt consolidation calculator',
    'credit card consolidation calculator',
    'debt consolidation loan calculator',
    'multiple debt calculator',
    'debt payoff consolidation calculator',
    'consolidation savings calculator'
  ],
  'credit-cards'
);

export default function DebtConsolidationCalculatorPage() {
  return (
    <ToolLayout
      title="Debt Consolidation Calculator"
      description="Calculate potential savings from consolidating multiple credit card debts into a single loan with lower interest rates"
      toolId="debt-consolidation-calculator"
      category="credit-cards"
      emoji="🔗"
      customHowToUse={[
        "Enter details for all current credit card debts",
        "Input consolidation loan terms and rate",
        "Compare total monthly payments",
        "Analyze interest savings over time",
        "Review simplified payment structure",
        "Evaluate consolidation benefits vs costs"
      ]}
      customFeatures={[
        "Multiple debt aggregation",
        "Consolidation loan comparison",
        "Interest savings calculation",
        "Payment simplification analysis",
        "Payoff timeline comparison",
        "Total cost benefit analysis"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
