import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import LoanCalculator from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Personal Loan Calculator',
  'Calculate personal loan payments, interest costs, and amortization schedules. Compare loan terms and find the best personal loan options.',
  'personal-loan-calculator',
  [
    'personal loan calculator',
    'personal loan payment calculator',
    'unsecured loan calculator',
    'personal loan interest calculator',
    'personal loan amortization calculator',
    'personal loan comparison calculator',
    'installment loan calculator'
  ],
  'loans'
);

export default function PersonalLoanCalculatorPage() {
  return (
    <ToolLayout
      title="Personal Loan Calculator"
      description="Calculate monthly payments, total interest, and amortization schedule for personal loans with fixed rates and terms"
      toolId="personal-loan-calculator"
      category="loans"
      emoji="💰"
      customHowToUse={[
        "Enter the desired loan amount",
        "Input the annual interest rate (APR)",
        "Set the loan term in months or years",
        "Calculate monthly payment amount",
        "Review total interest cost",
        "Analyze complete amortization schedule"
      ]}
      customFeatures={[
        "Fixed monthly payment calculation",
        "Total interest cost analysis",
        "Complete amortization schedule",
        "Loan comparison tools",
        "APR vs interest rate comparison",
        "Early payoff scenarios"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
