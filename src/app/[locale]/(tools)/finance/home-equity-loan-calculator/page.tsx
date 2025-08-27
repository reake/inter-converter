import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Home Equity Loan Calculator',
  'Calculate home equity loan payments with fixed rates and terms. Second mortgage calculator for lump sum home equity loans.',
  'home-equity-loan-calculator',
  [
    'home equity loan calculator',
    'home equity loan payment calculator',
    'second mortgage calculator',
    'equity loan calculator',
    'home equity borrowing calculator',
    'fixed rate equity loan calculator',
    'home equity installment loan calculator',
    'equity loan payment estimator',
    'home equity financing calculator',
    'second mortgage payment calculator'
  ],
  'home-equity'
);

export default function HomeEquityLoanCalculatorPage() {
  return (
    <ToolLayout
      title="Home Equity Loan Calculator"
      description="Calculate fixed-rate home equity loan payments and total interest costs for lump sum borrowing against your home's equity"
      toolId="home-equity-loan-calculator"
      category="home-equity"
      emoji="🏠💰"
      customHowToUse={[
        "Enter your home's current market value",
        "Input your existing mortgage balance",
        "Set the desired loan amount (up to 80% LTV)",
        "Enter the fixed interest rate and loan term",
        "Calculate fixed monthly payments",
        "Review total interest cost and payoff schedule"
      ]}
      customFeatures={[
        "Fixed monthly payment calculation",
        "Available equity assessment",
        "Loan-to-value ratio analysis",
        "Complete amortization schedule",
        "Total interest cost projection",
        "Comparison with HELOC options"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
