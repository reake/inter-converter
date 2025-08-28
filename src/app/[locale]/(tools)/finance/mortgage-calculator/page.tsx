import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import MortgageCalculator from '@/components/converters/finance/MortgageCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Mortgage Calculator',
  'Calculate monthly mortgage payments, total interest, and amortization schedule. Free mortgage payment calculator with taxes, insurance, and PMI.',
  'mortgage-calculator',
  [
    'mortgage calculator',
    'mortgage payment calculator',
    'home loan calculator',
    'monthly mortgage payment',
    'mortgage amortization calculator',
    'home mortgage calculator',
    'loan payment calculator',
    'mortgage interest calculator',
    'house payment calculator',
    'mortgage estimator',
    'home loan payment',
    'mortgage payment estimator',
    'principal and interest calculator',
    'mortgage cost calculator',
    'home financing calculator'
  ],
  'mortgages'
);

export default function MortgageCalculatorPage() {
  return (
    <ToolLayout
      title="Mortgage Calculator"
      description="Calculate your monthly mortgage payments including principal, interest, taxes, insurance, and PMI"
      toolId="mortgage-calculator"
      category="mortgages"
      emoji="🏠"
      customHowToUse={[
        "Enter the home purchase price or loan amount",
        "Input your down payment amount or percentage",
        "Set the loan term (typically 15 or 30 years)",
        "Enter the annual interest rate",
        "Add property taxes, insurance, and PMI if applicable",
        "View your monthly payment breakdown and amortization schedule"
      ]}
      customFeatures={[
        "Monthly payment calculation with PITI breakdown",
        "Complete amortization schedule",
        "Total interest cost over loan term",
        "Property tax and insurance estimates",
        "PMI calculation for loans with less than 20% down",
        "Loan-to-value ratio analysis"
      ]}
    >
      <MortgageCalculator />
    </ToolLayout>
  );
}
