import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import LoanCalculator from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Consolidation Loan Calculator',
  'Calculate debt consolidation loan payments and savings. Compare consolidating multiple debts into one loan with lower rates.',
  'consolidation-loan-calculator',
  [
    'consolidation loan calculator',
    'debt consolidation calculator',
    'loan consolidation calculator',
    'debt merger calculator',
    'multiple debt calculator'
  ],
  'loans'
);

export default function ConsolidationLoanCalculatorPage() {
  return (
    <ToolLayout
      title="Consolidation Loan Calculator"
      description="Calculate potential savings from consolidating multiple debts into a single loan with simplified payments"
      toolId="consolidation-loan-calculator"
      category="loans"
      emoji="🔗"
      customHowToUse={[
        "Enter details of all current debts",
        "Input consolidation loan terms",
        "Compare total monthly payments",
        "Analyze interest rate savings",
        "Review simplified payment structure",
        "Calculate total cost benefits"
      ]}
      customFeatures={[
        "Multiple debt aggregation",
        "Payment simplification analysis",
        "Interest rate comparison",
        "Total cost savings calculation",
        "Cash flow improvement tracking",
        "Debt management optimization"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
