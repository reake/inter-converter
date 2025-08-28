import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import MortgageCalculator from '@/components/converters/finance/MortgageCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  '30-Year Fixed Mortgage Calculator',
  'Calculate 30-year fixed mortgage payments with amortization schedule. Compare monthly payments, total interest, and loan costs for 30-year mortgages.',
  '30-year-fixed-mortgage-calculator',
  [
    '30 year mortgage calculator',
    '30 year fixed mortgage calculator',
    '30 year loan calculator',
    '30 year mortgage payment',
    'thirty year mortgage calculator',
    '30 year home loan calculator',
    '30 year mortgage amortization',
    'fixed rate mortgage calculator',
    '30 year mortgage interest',
    'conventional 30 year mortgage',
    '30 year mortgage rates',
    'long term mortgage calculator',
    '30 year principal and interest',
    'traditional mortgage calculator'
  ],
  'mortgages'
);

export default function ThirtyYearFixedMortgageCalculatorPage() {
  return (
    <ToolLayout
      title="30-Year Fixed Mortgage Calculator"
      description="Calculate monthly payments and total costs for a 30-year fixed-rate mortgage with detailed amortization schedule"
      toolId="30-year-fixed-mortgage-calculator"
      category="mortgages"
      emoji="🏠"
      customHowToUse={[
        "Enter the loan amount or home price",
        "Input your down payment (if calculating from home price)",
        "Set the 30-year fixed interest rate",
        "Add property taxes and insurance estimates",
        "Review monthly payment breakdown",
        "Analyze the complete 30-year amortization schedule"
      ]}
      customFeatures={[
        "30-year fixed-rate payment calculation",
        "Complete 360-payment amortization schedule",
        "Total interest cost over 30 years",
        "Principal vs interest breakdown by year",
        "Loan balance progression chart",
        "Tax and insurance escrow calculations"
      ]}
    >
      <MortgageCalculator />
    </ToolLayout>
  );
}
