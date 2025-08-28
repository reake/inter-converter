import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import MortgageCalculator from '@/components/converters/finance/MortgageCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'HELOC Calculator',
  'Calculate HELOC payments, credit limits, and interest costs. Home Equity Line of Credit calculator with draw and repayment periods.',
  'heloc-calculator',
  [
    'HELOC calculator',
    'home equity line of credit calculator',
    'HELOC payment calculator',
    'home equity credit line calculator',
    'HELOC interest calculator',
    'equity line calculator',
    'home equity LOC calculator',
    'HELOC draw period calculator',
    'variable rate HELOC calculator',
    'home equity borrowing calculator'
  ],
  'home-equity'
);

export default function HELOCCalculatorPage() {
  return (
    <ToolLayout
      title="HELOC Calculator"
      description="Calculate Home Equity Line of Credit payments, available credit limits, and total interest costs over draw and repayment periods"
      toolId="heloc-calculator"
      category="home-equity"
      emoji="🏠💳"
      customHowToUse={[
        "Enter your home's current market value",
        "Input your existing mortgage balance",
        "Set the HELOC credit limit (typically 80% LTV)",
        "Enter the variable interest rate",
        "Calculate interest-only payments during draw period",
        "Analyze principal + interest payments during repayment period"
      ]}
      customFeatures={[
        "Available credit limit calculation",
        "Interest-only draw period payments",
        "Principal + interest repayment calculations",
        "Variable rate impact analysis",
        "Payment shock assessment",
        "Total interest cost projections"
      ]}
    >
      <MortgageCalculator />
    </ToolLayout>
  );
}
