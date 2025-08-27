import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Unsecured Loan Calculator',
  'Calculate unsecured personal loan payments without collateral requirements. Compare rates and terms for signature loans.',
  'unsecured-loan-calculator',
  [
    'unsecured loan calculator',
    'signature loan calculator',
    'unsecured personal loan calculator',
    'no collateral loan calculator'
  ],
  'loans'
);

export default function UnsecuredLoanCalculatorPage() {
  return (
    <ToolLayout
      title="Unsecured Loan Calculator"
      description="Calculate unsecured loan payments for personal loans that don't require collateral or asset backing"
      toolId="unsecured-loan-calculator"
      category="loans"
      emoji="📝"
      customHowToUse={[
        "Enter desired loan amount",
        "Input interest rate based on credit score",
        "Set loan term (typically 2-7 years)",
        "Calculate monthly payments",
        "Compare with secured options",
        "Analyze qualification requirements"
      ]}
      customFeatures={[
        "No collateral required calculations",
        "Credit score impact analysis",
        "Higher rate considerations",
        "Qualification assessment",
        "Secured vs unsecured comparison",
        "Risk-based pricing analysis"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
