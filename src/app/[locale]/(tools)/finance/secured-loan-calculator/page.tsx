import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Secured Loan Calculator',
  'Calculate secured loan payments with collateral backing. Compare secured vs unsecured loan rates and terms.',
  'secured-loan-calculator',
  [
    'secured loan calculator',
    'collateral loan calculator',
    'asset backed loan calculator',
    'secured personal loan calculator'
  ],
  'loans'
);

export default function SecuredLoanCalculatorPage() {
  return (
    <ToolLayout
      title="Secured Loan Calculator"
      description="Calculate secured loan payments and compare rates for loans backed by collateral such as savings, vehicles, or property"
      toolId="secured-loan-calculator"
      category="loans"
      emoji="🔒"
      customHowToUse={[
        "Enter desired loan amount",
        "Input collateral value",
        "Set secured loan interest rate",
        "Compare with unsecured options",
        "Calculate monthly payments",
        "Analyze collateral risk vs savings"
      ]}
      customFeatures={[
        "Collateral value assessment",
        "Secured vs unsecured comparison",
        "Lower interest rate benefits",
        "Risk analysis tools",
        "Loan-to-value calculations",
        "Asset protection considerations"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
