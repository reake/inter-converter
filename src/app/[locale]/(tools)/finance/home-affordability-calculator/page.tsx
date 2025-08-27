import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Home Affordability Calculator',
  'Calculate how much house you can afford based on your income, debts, and down payment. Free home affordability calculator with debt-to-income ratios.',
  'home-affordability-calculator',
  [
    'home affordability calculator',
    'how much house can I afford',
    'house affordability calculator',
    'mortgage affordability calculator',
    'home buying calculator',
    'affordable home price calculator',
    'income to house price calculator',
    'debt to income ratio calculator',
    'home purchase calculator',
    'mortgage qualification calculator',
    'house price calculator',
    'home loan affordability',
    'maximum mortgage calculator',
    'home budget calculator',
    'qualifying income calculator'
  ],
  'mortgages'
);

export default function HomeAffordabilityCalculatorPage() {
  return (
    <ToolLayout
      title="Home Affordability Calculator"
      description="Determine how much house you can afford based on your income, monthly debts, and available down payment"
      toolId="home-affordability-calculator"
      category="mortgages"
      emoji="🏡"
      customHowToUse={[
        "Enter your gross annual income",
        "Input your monthly debt payments (credit cards, loans, etc.)",
        "Set your available down payment amount",
        "Choose your preferred loan term and interest rate",
        "Review your maximum affordable home price",
        "See recommended price ranges based on different DTI ratios"
      ]}
      customFeatures={[
        "Maximum home price calculation",
        "Debt-to-income ratio analysis (28/36 rule)",
        "Monthly payment breakdown",
        "Down payment impact analysis",
        "Conservative and aggressive affordability ranges",
        "Closing cost estimates"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
