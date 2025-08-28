import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import MortgageCalculator from '@/components/converters/finance/MortgageCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  '15 vs 30 Year Mortgage Calculator',
  'Compare 15-year vs 30-year mortgage payments, interest costs, and total savings. Side-by-side mortgage term comparison calculator.',
  '15-vs-30-year-mortgage-calculator',
  [
    '15 vs 30 year mortgage calculator',
    '15 year vs 30 year mortgage',
    'mortgage term comparison calculator',
    '15 30 mortgage comparison',
    'short vs long term mortgage',
    'mortgage payment comparison',
    'interest savings calculator',
    'mortgage term analyzer'
  ],
  'mortgages'
);

export default function FifteenVsThirtyYearMortgageCalculatorPage() {
  return (
    <ToolLayout
      title="15 vs 30 Year Mortgage Calculator"
      description="Compare 15-year and 30-year mortgage options side-by-side to determine the best loan term for your situation"
      toolId="15-vs-30-year-mortgage-calculator"
      category="mortgages"
      emoji="⚖️"
      customHowToUse={[
        "Enter loan amount and interest rates for both terms",
        "Compare monthly payment differences",
        "Analyze total interest cost savings",
        "Review cash flow impact",
        "Consider opportunity cost of higher payments",
        "Make informed decision based on your financial goals"
      ]}
      customFeatures={[
        "Side-by-side payment comparison",
        "Total interest savings analysis",
        "Cash flow impact assessment",
        "Break-even analysis",
        "Opportunity cost calculations",
        "Personalized recommendation engine"
      ]}
    >
      <MortgageCalculator />
    </ToolLayout>
  );
}
