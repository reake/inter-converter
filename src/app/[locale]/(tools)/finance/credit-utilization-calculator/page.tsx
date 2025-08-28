import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import CreditCardPayoffCalculator from '@/components/converters/finance/CreditCardPayoffCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Credit Utilization Calculator',
  'Calculate credit utilization ratio and its impact on credit score. Optimize credit card balances for better credit health.',
  'credit-utilization-calculator',
  [
    'credit utilization calculator',
    'credit utilization ratio calculator',
    'credit score calculator',
    'credit card utilization calculator',
    'credit limit calculator',
    'credit health calculator',
    'utilization rate calculator'
  ],
  'credit-cards'
);

export default function CreditUtilizationCalculatorPage() {
  return (
    <ToolLayout
      title="Credit Utilization Calculator"
      description="Calculate your credit utilization ratio and understand how it affects your credit score and financial health"
      toolId="credit-utilization-calculator"
      category="credit-cards"
      emoji="📈"
      customHowToUse={[
        "Enter total credit card balances",
        "Input total available credit limits",
        "Calculate overall utilization ratio",
        "Analyze per-card utilization rates",
        "Review credit score impact",
        "Get recommendations for optimization"
      ]}
      customFeatures={[
        "Overall utilization ratio calculation",
        "Per-card utilization analysis",
        "Credit score impact assessment",
        "Optimization recommendations",
        "Target utilization guidance",
        "Credit health monitoring tools"
      ]}
    >
      <CreditCardPayoffCalculator />
    </ToolLayout>
  );
}
