import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import LoanCalculator from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'RV Loan Calculator',
  'Calculate RV loan payments and recreational vehicle financing costs. Compare rates for motorhomes, travel trailers, and campers.',
  'rv-loan-calculator',
  [
    'RV loan calculator',
    'recreational vehicle loan calculator',
    'motorhome loan calculator',
    'travel trailer loan calculator',
    'camper loan calculator',
    'RV financing calculator'
  ],
  'loans'
);

export default function RVLoanCalculatorPage() {
  return (
    <ToolLayout
      title="RV Loan Calculator"
      description="Calculate monthly payments and financing costs for RV loans including motorhomes, travel trailers, and campers"
      toolId="rv-loan-calculator"
      category="loans"
      emoji="🚐"
      customHowToUse={[
        "Enter RV purchase price",
        "Input down payment amount",
        "Set loan term (typically 10-20 years)",
        "Enter interest rate",
        "Calculate monthly payments",
        "Compare different RV financing options"
      ]}
      customFeatures={[
        "New and used RV calculations",
        "Extended financing terms",
        "Down payment optimization",
        "Seasonal usage considerations",
        "Insurance and maintenance costs",
        "Total ownership expense analysis"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
