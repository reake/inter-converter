import { Metadata } from 'next';
import { ToolLayout } from '@/components/tools/ToolLayout';
import MortgageCalculator from '@/components/converters/finance/MortgageCalculator';

// Force static generation
export const dynamic = 'force-static';
const title = '15-Year Fixed Mortgage Calculator';
const description = 'Calculate 15-year fixed mortgage payments and savings. Compare monthly payments, total interest, and payoff time for 15-year mortgages.';
const keywordsArr = [
  '15 year mortgage calculator',
  '15 year fixed mortgage calculator',
  '15 year loan calculator',
  '15 year mortgage payment',
  'fifteen year mortgage calculator',
  '15 year home loan calculator',
  '15 year mortgage amortization',
  'short term mortgage calculator',
  '15 year mortgage interest',
  '15 year mortgage rates',
  '15 vs 30 year mortgage',
  'accelerated mortgage calculator',
  '15 year principal and interest'
];

export const metadata: Metadata = {
  title: `${title} | InterConverter`,
  description,
  keywords: keywordsArr.join(', '),
  openGraph: {
    title: `${title} | InterConverter`,
    description,
    type: 'website',
  },
  alternates: { canonical: '/finance/15-year-fixed-mortgage-calculator' }
};

export default function FifteenYearFixedMortgageCalculatorPage() {
  return (
    <ToolLayout
      title="15-Year Fixed Mortgage Calculator"
      description="Calculate monthly payments and interest savings for a 15-year fixed-rate mortgage with complete amortization schedule"
      toolId="15-year-fixed-mortgage-calculator"
      category="mortgages"
      emoji="🏠"
      customHowToUse={[
        "Enter the loan amount or home price",
        "Input your down payment amount",
        "Set the 15-year fixed interest rate",
        "Add property taxes and insurance",
        "Compare with 30-year mortgage options",
        "Review total interest savings over loan term"
      ]}
      customFeatures={[
        "15-year fixed-rate payment calculation",
        "Complete 180-payment amortization schedule",
        "Interest savings vs 30-year mortgage",
        "Faster equity building analysis",
        "Monthly payment comparison tools",
        "Total cost of ownership breakdown"
      ]}
    >
      <MortgageCalculator />
    </ToolLayout>
  );
}
