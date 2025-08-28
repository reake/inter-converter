import { Metadata } from 'next';
import { ToolLayout } from '@/components/tools/ToolLayout';
import BudgetCalculator from '@/components/converters/finance/BudgetCalculator';

// Force static generation
export const dynamic = 'force-static';
const title = 'Budget Calculator';
const description = 'Create and manage personal budgets with income and expense tracking. Plan your finances effectively with our comprehensive budget planning tool.';
const keywordsArr = [
  'budget calculator',
  'personal budget',
  'expense tracker',
  'income planning',
  'financial planning',
  'budget planner',
  'money management',
  'financial calculator'
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
  alternates: { canonical: '/finance/budget-calculator' }
};

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
