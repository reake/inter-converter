import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Home Improvement Loan Calculator',
  'Calculate home improvement loan payments and financing options. Compare personal loans vs home equity for renovation projects.',
  'home-improvement-loan-calculator',
  [
    'home improvement loan calculator',
    'renovation loan calculator',
    'home renovation financing calculator',
    'remodeling loan calculator',
    'home upgrade loan calculator'
  ],
  'loans'
);

export default function HomeImprovementLoanCalculatorPage() {
  return (
    <ToolLayout
      title="Home Improvement Loan Calculator"
      description="Calculate financing options for home improvement projects including personal loans and home equity solutions"
      toolId="home-improvement-loan-calculator"
      category="loans"
      emoji="🔨"
      customHowToUse={[
        "Enter your renovation project cost",
        "Compare personal loan vs HELOC options",
        "Input interest rates and terms",
        "Calculate monthly payments",
        "Analyze total project financing costs",
        "Choose the best financing option"
      ]}
      customFeatures={[
        "Multiple financing option comparison",
        "Personal loan vs home equity analysis",
        "Project cost planning tools",
        "ROI and home value impact",
        "Tax deduction considerations",
        "Payment affordability assessment"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
