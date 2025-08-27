import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Payday Loan Calculator',
  'Calculate payday loan costs and APR. Understand the true cost of short-term payday loans and explore alternatives.',
  'payday-loan-calculator',
  [
    'payday loan calculator',
    'payday loan cost calculator',
    'short term loan calculator',
    'cash advance calculator',
    'payday loan APR calculator'
  ],
  'loans'
);

export default function PaydayLoanCalculatorPage() {
  return (
    <ToolLayout
      title="Payday Loan Calculator"
      description="Calculate the true cost and APR of payday loans and explore more affordable borrowing alternatives"
      toolId="payday-loan-calculator"
      category="loans"
      emoji="⚠️"
      customHowToUse={[
        "Enter loan amount needed",
        "Input loan fee or finance charge",
        "Set loan term (typically 2 weeks)",
        "Calculate effective APR",
        "View total cost breakdown",
        "Compare with alternative options"
      ]}
      customFeatures={[
        "True APR calculation",
        "Cost comparison analysis",
        "Alternative loan suggestions",
        "Rollover cost analysis",
        "Debt cycle warnings",
        "Financial education resources"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
