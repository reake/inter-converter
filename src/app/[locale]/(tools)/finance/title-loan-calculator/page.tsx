import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import LoanCalculator from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Title Loan Calculator',
  'Calculate auto title loan costs and APR. Understand the high cost of title loans and explore safer borrowing alternatives.',
  'title-loan-calculator',
  [
    'title loan calculator',
    'car title loan calculator',
    'auto title loan calculator',
    'vehicle title loan calculator',
    'title pawn calculator'
  ],
  'loans'
);

export default function TitleLoanCalculatorPage() {
  return (
    <ToolLayout
      title="Title Loan Calculator"
      description="Calculate the true cost and risks of auto title loans and explore safer borrowing alternatives"
      toolId="title-loan-calculator"
      category="loans"
      emoji="🚗💸"
      customHowToUse={[
        "Enter vehicle value and loan amount",
        "Input loan fees and interest rate",
        "Set loan term (typically 30 days)",
        "Calculate effective APR",
        "Review repossession risks",
        "Compare with safer alternatives"
      ]}
      customFeatures={[
        "High APR calculations",
        "Repossession risk warnings",
        "Alternative loan suggestions",
        "Cost comparison analysis",
        "Financial education resources",
        "Debt cycle prevention tools"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
