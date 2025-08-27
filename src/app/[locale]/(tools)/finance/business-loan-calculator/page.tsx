import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Business Loan Calculator',
  'Calculate business loan payments and financing costs. Compare SBA loans, term loans, and lines of credit for business funding.',
  'business-loan-calculator',
  [
    'business loan calculator',
    'commercial loan calculator',
    'SBA loan calculator',
    'business financing calculator',
    'term loan calculator',
    'business credit calculator'
  ],
  'loans'
);

export default function BusinessLoanCalculatorPage() {
  return (
    <ToolLayout
      title="Business Loan Calculator"
      description="Calculate business loan payments, interest costs, and cash flow impact for various commercial financing options"
      toolId="business-loan-calculator"
      category="loans"
      emoji="🏢"
      customHowToUse={[
        "Enter desired loan amount",
        "Input interest rate and fees",
        "Set loan term and payment frequency",
        "Calculate monthly payments",
        "Analyze cash flow impact",
        "Compare different loan products"
      ]}
      customFeatures={[
        "SBA loan calculations",
        "Term loan vs line of credit",
        "Cash flow impact analysis",
        "Collateral requirements",
        "Fee structure analysis",
        "ROI and payback calculations"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
