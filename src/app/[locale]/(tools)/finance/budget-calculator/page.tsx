import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import BudgetCalculator from '@/components/converters/finance/BudgetCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Budget Calculator',
  'Create and manage personal budgets with income and expense tracking. Plan your finances effectively with our comprehensive budget planning tool.',
  'budget-calculator',
  [
    'budget calculator',
    'personal budget',
    'expense tracker',
    'income planning',
    'financial planning',
    'budget planner',
    'money management',
    'financial calculator'
  ],
  'finance'
);

export default function BudgetCalculatorPage() {
  return (
    <ToolLayout
      title="Budget Calculator"
      description="Create and manage personal budgets with comprehensive income and expense tracking"
      toolId="budget-calculator"
      category="finance"
      emoji="💰"
      customHowToUse={[
        "Enter your monthly income from all sources",
        "Add your fixed expenses (rent, utilities, insurance)",
        "Include variable expenses (groceries, entertainment)",
        "Set savings goals and track your progress",
        "Review the budget breakdown and recommendations"
      ]}
    >
      <BudgetCalculator />
    </ToolLayout>
  );
}
