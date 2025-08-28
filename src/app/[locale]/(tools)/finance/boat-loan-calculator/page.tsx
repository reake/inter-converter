import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import LoanCalculator from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Boat Loan Calculator',
  'Calculate boat loan payments and marine financing costs. Compare rates and terms for new and used boat purchases.',
  'boat-loan-calculator',
  [
    'boat loan calculator',
    'marine financing calculator',
    'yacht loan calculator',
    'boat payment calculator',
    'watercraft loan calculator'
  ],
  'loans'
);

export default function BoatLoanCalculatorPage() {
  return (
    <ToolLayout
      title="Boat Loan Calculator"
      description="Calculate monthly payments and total costs for boat loans and marine financing options"
      toolId="boat-loan-calculator"
      category="loans"
      emoji="⛵"
      customHowToUse={[
        "Enter boat purchase price",
        "Input down payment amount",
        "Set loan term (typically 10-20 years)",
        "Enter interest rate",
        "Calculate monthly payments",
        "Compare new vs used boat financing"
      ]}
      customFeatures={[
        "New and used boat calculations",
        "Extended loan term options",
        "Down payment impact analysis",
        "Insurance cost considerations",
        "Seasonal payment options",
        "Total ownership cost analysis"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
