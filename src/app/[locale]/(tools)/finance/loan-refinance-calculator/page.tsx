import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Loan Refinance Calculator',
  'Calculate loan refinancing savings and break-even analysis. Compare current loan with new refinance terms and closing costs.',
  'loan-refinance-calculator',
  [
    'loan refinance calculator',
    'refinancing calculator',
    'loan refi calculator',
    'refinance savings calculator',
    'break even calculator'
  ],
  'loans'
);

export default function LoanRefinanceCalculatorPage() {
  return (
    <ToolLayout
      title="Loan Refinance Calculator"
      description="Calculate potential savings from refinancing your loan and determine if refinancing makes financial sense"
      toolId="loan-refinance-calculator"
      category="loans"
      emoji="🔄"
      customHowToUse={[
        "Enter current loan balance and rate",
        "Input new loan terms and rate",
        "Add refinancing costs and fees",
        "Calculate monthly payment savings",
        "Analyze break-even timeline",
        "Compare total interest costs"
      ]}
      customFeatures={[
        "Monthly payment comparison",
        "Break-even analysis",
        "Total interest savings",
        "Closing cost impact",
        "Cash-out refinance options",
        "ROI calculation"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
