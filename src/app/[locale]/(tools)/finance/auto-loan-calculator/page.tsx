import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Auto Loan Calculator',
  'Calculate car loan payments, interest costs, and total vehicle financing costs. Compare auto loan terms and rates.',
  'auto-loan-calculator',
  [
    'auto loan calculator',
    'car loan calculator',
    'vehicle loan calculator',
    'auto financing calculator',
    'car payment calculator',
    'vehicle financing calculator',
    'automobile loan calculator'
  ],
  'loans'
);

export default function AutoLoanCalculatorPage() {
  return (
    <ToolLayout
      title="Auto Loan Calculator"
      description="Calculate monthly car loan payments, total interest costs, and complete financing details for vehicle purchases"
      toolId="auto-loan-calculator"
      category="loans"
      emoji="🚗"
      customHowToUse={[
        "Enter the vehicle purchase price",
        "Input your down payment amount",
        "Set the loan term (typically 3-7 years)",
        "Enter the annual interest rate (APR)",
        "Calculate monthly payment and total costs",
        "Compare different financing scenarios"
      ]}
      customFeatures={[
        "Monthly payment calculation",
        "Total interest cost analysis",
        "Down payment impact assessment",
        "Loan term comparison",
        "Trade-in value consideration",
        "Total cost of ownership analysis"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
