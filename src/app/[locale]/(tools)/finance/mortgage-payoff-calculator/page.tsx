import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import MortgageCalculator from '@/components/converters/finance/MortgageCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Mortgage Payoff Calculator',
  'Calculate early mortgage payoff with extra payments. See how additional principal payments reduce loan term and save interest.',
  'mortgage-payoff-calculator',
  [
    'mortgage payoff calculator',
    'extra payment calculator',
    'mortgage early payoff calculator',
    'additional principal calculator',
    'mortgage acceleration calculator',
    'early mortgage payoff',
    'extra mortgage payment calculator',
    'mortgage paydown calculator',
    'biweekly mortgage calculator',
    'mortgage overpayment calculator'
  ],
  'mortgages'
);

export default function MortgagePayoffCalculatorPage() {
  return (
    <ToolLayout
      title="Mortgage Payoff Calculator"
      description="Calculate how extra payments can accelerate your mortgage payoff and reduce total interest costs"
      toolId="mortgage-payoff-calculator"
      category="mortgages"
      emoji="💰"
      customHowToUse={[
        "Enter your current mortgage details",
        "Add extra monthly payment amount",
        "Or enter one-time additional payments",
        "Compare payoff scenarios",
        "View interest savings from extra payments",
        "Analyze different acceleration strategies"
      ]}
      customFeatures={[
        "Extra monthly payment calculations",
        "One-time additional payment analysis",
        "Biweekly payment option",
        "Interest savings comparison",
        "Payoff time reduction analysis",
        "Multiple payment strategy comparison"
      ]}
    >
      <MortgageCalculator />
    </ToolLayout>
  );
}
