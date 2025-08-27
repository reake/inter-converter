import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Mortgage APR Calculator',
  'Calculate true mortgage APR including fees and closing costs. Compare loan offers with accurate annual percentage rate calculations.',
  'mortgage-apr-calculator',
  [
    'mortgage APR calculator',
    'APR calculator',
    'annual percentage rate calculator',
    'mortgage APR comparison',
    'true cost of loan calculator',
    'mortgage rate calculator',
    'loan APR calculator',
    'effective interest rate calculator'
  ],
  'mortgages'
);

export default function MortgageAPRCalculatorPage() {
  return (
    <ToolLayout
      title="Mortgage APR Calculator"
      description="Calculate the true Annual Percentage Rate (APR) of your mortgage including all fees and closing costs"
      toolId="mortgage-apr-calculator"
      category="mortgages"
      emoji="📈"
      customHowToUse={[
        "Enter loan amount and interest rate",
        "Input all loan fees and closing costs",
        "Calculate true APR including all costs",
        "Compare different loan offers",
        "Understand the real cost of borrowing",
        "Make informed lending decisions"
      ]}
      customFeatures={[
        "True APR calculation with all fees",
        "Loan comparison tools",
        "Fee impact analysis",
        "Interest rate vs APR comparison",
        "Lender offer evaluation",
        "Cost transparency analysis"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
