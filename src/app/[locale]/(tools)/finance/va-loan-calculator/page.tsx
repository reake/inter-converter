import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'VA Loan Calculator',
  'Calculate VA loan payments with no down payment and no PMI. Veterans mortgage calculator with VA funding fee and military benefits.',
  'va-loan-calculator',
  [
    'VA loan calculator',
    'VA mortgage calculator',
    'veterans loan calculator',
    'military mortgage calculator',
    'VA loan payment calculator',
    'VA funding fee calculator',
    'no down payment mortgage calculator',
    'veterans benefits calculator',
    'VA home loan calculator',
    'military home buying calculator'
  ],
  'mortgages'
);

export default function VALoanCalculatorPage() {
  return (
    <ToolLayout
      title="VA Loan Calculator"
      description="Calculate VA loan payments with no down payment, no PMI, and VA funding fee for eligible veterans and service members"
      toolId="va-loan-calculator"
      category="mortgages"
      emoji="🇺🇸"
      customHowToUse={[
        "Enter the home purchase price",
        "Select VA funding fee rate (varies by service type)",
        "Input current VA loan interest rates",
        "Calculate monthly payment without PMI",
        "Review VA loan benefits and savings",
        "Compare with conventional loan options"
      ]}
      customFeatures={[
        "No down payment calculations",
        "No private mortgage insurance (PMI)",
        "VA funding fee calculations",
        "Veteran and service member benefits",
        "Competitive interest rate analysis",
        "VA loan limit verification"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
