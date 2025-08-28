import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import MortgageCalculator from '@/components/converters/finance/MortgageCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'FHA Loan Calculator',
  'Calculate FHA loan payments with mortgage insurance premiums. FHA calculator with low down payment options and government loan benefits.',
  'fha-loan-calculator',
  [
    'FHA loan calculator',
    'FHA mortgage calculator',
    'FHA payment calculator',
    'FHA mortgage insurance calculator',
    'government loan calculator',
    'low down payment mortgage calculator',
    'FHA loan payment',
    'FHA mortgage insurance premium',
    'first time buyer calculator',
    'FHA loan limits calculator',
    'FHA qualification calculator',
    'FHA vs conventional calculator'
  ],
  'mortgages'
);

export default function FHALoanCalculatorPage() {
  return (
    <ToolLayout
      title="FHA Loan Calculator"
      description="Calculate FHA loan payments including mortgage insurance premiums and low down payment benefits"
      toolId="fha-loan-calculator"
      category="mortgages"
      emoji="🏛️"
      customHowToUse={[
        "Enter the home purchase price",
        "Set FHA down payment (as low as 3.5%)",
        "Input current FHA interest rates",
        "Calculate upfront and annual mortgage insurance",
        "Review total monthly payment with MIP",
        "Compare with conventional loan options"
      ]}
      customFeatures={[
        "FHA-specific payment calculations",
        "Mortgage Insurance Premium (MIP) calculations",
        "Low down payment scenarios (3.5%)",
        "FHA loan limit verification",
        "First-time buyer benefits analysis",
        "Comparison with conventional loans"
      ]}
    >
      <MortgageCalculator />
    </ToolLayout>
  );
}
