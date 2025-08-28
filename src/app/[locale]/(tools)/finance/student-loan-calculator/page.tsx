import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import LoanCalculator from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Student Loan Calculator',
  'Calculate student loan payments, interest costs, and repayment options. Compare federal and private student loan scenarios.',
  'student-loan-calculator',
  [
    'student loan calculator',
    'student loan payment calculator',
    'education loan calculator',
    'student debt calculator',
    'college loan calculator',
    'student loan repayment calculator'
  ],
  'loans'
);

export default function StudentLoanCalculatorPage() {
  return (
    <ToolLayout
      title="Student Loan Calculator"
      description="Calculate student loan payments and explore repayment options for federal and private education loans"
      toolId="student-loan-calculator"
      category="loans"
      emoji="🎓"
      customHowToUse={[
        "Enter total student loan amount",
        "Input interest rate (federal or private)",
        "Select repayment term (10-30 years)",
        "Choose repayment plan type",
        "Calculate monthly payments",
        "Compare different repayment strategies"
      ]}
      customFeatures={[
        "Federal vs private loan calculations",
        "Multiple repayment plan options"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
