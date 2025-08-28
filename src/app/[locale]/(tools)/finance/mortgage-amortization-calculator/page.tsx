import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import MortgageCalculator from '@/components/converters/finance/MortgageCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Mortgage Amortization Calculator',
  'Calculate mortgage amortization schedule with monthly principal and interest breakdown. View complete payment schedule and loan balance over time.',
  'mortgage-amortization-calculator',
  [
    'mortgage amortization calculator',
    'amortization schedule calculator',
    'loan amortization calculator',
    'mortgage payment schedule',
    'principal and interest calculator',
    'mortgage amortization table',
    'loan payment schedule',
    'mortgage balance calculator',
    'amortization chart calculator',
    'mortgage paydown calculator'
  ],
  'mortgages'
);

export default function MortgageAmortizationCalculatorPage() {
  return (
    <ToolLayout
      title="Mortgage Amortization Calculator"
      description="Generate complete mortgage amortization schedule showing monthly principal and interest payments over the loan term"
      toolId="mortgage-amortization-calculator"
      category="mortgages"
      emoji="📊"
      customHowToUse={[
        "Enter loan amount, interest rate, and term",
        "Generate complete amortization schedule",
        "View monthly principal vs interest breakdown",
        "Track remaining loan balance over time",
        "Analyze total interest paid over loan life",
        "Export or print amortization table"
      ]}
      customFeatures={[
        "Complete payment-by-payment schedule",
        "Principal vs interest breakdown",
        "Remaining balance tracking",
        "Cumulative interest calculations",
        "Year-by-year summary tables",
        "Visual amortization charts"
      ]}
    >
      <MortgageCalculator />
    </ToolLayout>
  );
}
