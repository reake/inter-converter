import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import MortgageCalculator from '@/components/converters/finance/MortgageCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Mortgage Refinance Calculator',
  'Calculate refinance savings, break-even point, and new monthly payments. Compare current mortgage with refinance options and closing costs.',
  'mortgage-refinance-calculator',
  [
    'mortgage refinance calculator',
    'refinance calculator',
    'refi calculator',
    'mortgage refi calculator',
    'refinance savings calculator',
    'refinance break even calculator',
    'should I refinance calculator',
    'refinance comparison calculator',
    'mortgage refinancing calculator',
    'home loan refinance calculator',
    'refinance payment calculator',
    'refinance cost calculator',
    'cash out refinance calculator',
    'rate and term refinance calculator'
  ],
  'mortgages'
);

export default function MortgageRefinanceCalculatorPage() {
  return (
    <ToolLayout
      title="Mortgage Refinance Calculator"
      description="Calculate potential savings from refinancing your mortgage, including break-even analysis and new payment comparisons"
      toolId="mortgage-refinance-calculator"
      category="mortgages"
      emoji="🔄"
      customHowToUse={[
        "Enter your current mortgage details (balance, rate, remaining term)",
        "Input the new loan terms (rate, term, closing costs)",
        "Compare monthly payment differences",
        "Calculate break-even point in months",
        "Review total interest savings over loan life",
        "Analyze cash-out refinance options if applicable"
      ]}
      customFeatures={[
        "Current vs new payment comparison",
        "Break-even analysis with closing costs",
        "Total interest savings calculation",
        "Monthly and lifetime savings breakdown",
        "Cash-out refinance calculations",
        "Refinance recommendation analysis"
      ]}
    >
      <MortgageCalculator />
    </ToolLayout>
  );
}
