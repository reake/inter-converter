import { Metadata } from 'next';
import { ToolLayout } from '@/components/tools/ToolLayout';
import SavingsCalculator from '@/components/converters/finance/SavingsCalculator';

// Force static generation
export const dynamic = 'force-static';
const title = 'Compound Interest Calculator';
const description = 'Calculate compound interest growth over time. Understand the power of compounding for savings and investment planning.';
const keywordsArr = [
  'compound interest calculator',
  'compounding calculator',
  'interest growth calculator',
  'compound savings calculator',
  'investment growth calculator'
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
  alternates: { canonical: '/finance/compound-interest-calculator' }
};

export default function CompoundInterestCalculatorPage() {
  return (
    <ToolLayout
      title="Compound Interest Calculator"
      description="Calculate the power of compound interest and see how your money grows exponentially over time"
      toolId="compound-interest-calculator"
      category="banking"
      emoji="📊"
      customHowToUse={[
        "Enter initial principal amount",
        "Input annual interest rate",
        "Set compounding frequency (daily, monthly, quarterly, annually)",
        "Choose time period for growth",
        "Add regular contribution amounts",
        "View compound growth projections"
      ]}
      customFeatures={[
        "Multiple compounding frequencies",
        "Regular contribution tracking",
        "Growth visualization charts",
        "Simple vs compound interest comparison",
        "Time value of money analysis",
        "Einstein's 8th wonder demonstration"
      ]}
    >
      <SavingsCalculator />
    </ToolLayout>
  );
}
