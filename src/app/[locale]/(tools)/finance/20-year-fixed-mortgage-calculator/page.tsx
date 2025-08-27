import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  '20-Year Fixed Mortgage Calculator',
  'Calculate 20-year fixed mortgage payments and interest savings. Compare 20-year mortgage with 15 and 30-year options.',
  '20-year-fixed-mortgage-calculator',
  [
    '20 year mortgage calculator',
    '20 year fixed mortgage calculator',
    '20 year loan calculator',
    '20 year mortgage payment',
    'twenty year mortgage calculator',
    '20 year home loan calculator',
    '20 year mortgage amortization',
    'mid term mortgage calculator',
    '20 year mortgage interest',
    '20 year mortgage rates'
  ],
  'mortgages'
);

export default function TwentyYearFixedMortgageCalculatorPage() {
  return (
    <ToolLayout
      title="20-Year Fixed Mortgage Calculator"
      description="Calculate monthly payments and total costs for a 20-year fixed-rate mortgage with amortization schedule"
      toolId="20-year-fixed-mortgage-calculator"
      category="mortgages"
      emoji="🏠"
      customHowToUse={[
        "Enter the loan amount or home price",
        "Input your down payment amount",
        "Set the 20-year fixed interest rate",
        "Add property taxes and insurance",
        "Compare with 15 and 30-year options",
        "Review interest savings vs longer terms"
      ]}
      customFeatures={[
        "20-year fixed-rate payment calculation",
        "Complete 240-payment amortization schedule",
        "Interest savings vs 30-year mortgage",
        "Balanced payment vs payoff time",
        "Equity building analysis",
        "Total cost comparison tools"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
