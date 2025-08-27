import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Interest-Only Mortgage Calculator',
  'Calculate interest-only mortgage payments and total costs. Analyze payment shock and balloon payment scenarios.',
  'interest-only-mortgage-calculator',
  [
    'interest only mortgage calculator',
    'interest only payment calculator',
    'IO mortgage calculator',
    'interest only loan calculator',
    'balloon payment calculator',
    'payment shock calculator',
    'interest only period calculator'
  ],
  'mortgages'
);

export default function InterestOnlyMortgageCalculatorPage() {
  return (
    <ToolLayout
      title="Interest-Only Mortgage Calculator"
      description="Calculate interest-only mortgage payments and analyze the transition to principal and interest payments"
      toolId="interest-only-mortgage-calculator"
      category="mortgages"
      emoji="📊"
      customHowToUse={[
        "Enter loan amount and interest rate",
        "Set interest-only period length",
        "Calculate low initial payments",
        "Analyze payment shock after IO period",
        "Review total cost implications",
        "Compare with traditional mortgages"
      ]}
      customFeatures={[
        "Interest-only payment calculation",
        "Payment shock analysis",
        "Balloon payment scenarios",
        "Total cost comparison",
        "Cash flow optimization",
        "Risk assessment tools"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
