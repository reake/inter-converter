import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Motorcycle Loan Calculator',
  'Calculate motorcycle loan payments and financing costs. Compare rates and terms for new and used motorcycle purchases.',
  'motorcycle-loan-calculator',
  [
    'motorcycle loan calculator',
    'bike loan calculator',
    'motorcycle financing calculator',
    'motorcycle payment calculator'
  ],
  'loans'
);

export default function MotorcycleLoanCalculatorPage() {
  return (
    <ToolLayout
      title="Motorcycle Loan Calculator"
      description="Calculate monthly payments and total costs for motorcycle loans and bike financing options"
      toolId="motorcycle-loan-calculator"
      category="loans"
      emoji="🏍️"
      customHowToUse={[
        "Enter motorcycle purchase price",
        "Input down payment amount",
        "Set loan term (typically 3-7 years)",
        "Enter interest rate",
        "Calculate monthly payments",
        "Compare financing options"
      ]}
      customFeatures={[
        "New and used bike calculations",
        "Seasonal payment considerations",
        "Insurance cost factors",
        "Trade-in value analysis",
        "Total ownership costs",
        "Payment affordability assessment"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
