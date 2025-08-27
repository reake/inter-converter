import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  '10-Year Fixed Mortgage Calculator',
  'Calculate 10-year fixed mortgage payments with maximum interest savings. Fast payoff mortgage calculator with high monthly payments.',
  '10-year-fixed-mortgage-calculator',
  [
    '10 year mortgage calculator',
    '10 year fixed mortgage calculator',
    '10 year loan calculator',
    '10 year mortgage payment',
    'ten year mortgage calculator',
    'short term mortgage calculator',
    'fast payoff mortgage calculator',
    'accelerated mortgage calculator'
  ],
  'mortgages'
);

export default function TenYearFixedMortgageCalculatorPage() {
  return (
    <ToolLayout
      title="10-Year Fixed Mortgage Calculator"
      description="Calculate 10-year fixed mortgage payments for fastest payoff and maximum interest savings"
      toolId="10-year-fixed-mortgage-calculator"
      category="mortgages"
      emoji="⚡"
      customHowToUse={[
        "Enter the loan amount",
        "Set the 10-year fixed interest rate",
        "Calculate high monthly payments",
        "Compare total interest savings",
        "Analyze cash flow requirements",
        "Review accelerated equity building"
      ]}
      customFeatures={[
        "10-year accelerated payment calculation",
        "Maximum interest savings analysis",
        "Fast equity building projection",
        "Cash flow requirement analysis",
        "Comparison with longer terms",
        "Total cost minimization strategy"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
