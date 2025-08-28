import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import BudgetCalculator from '@/components/converters/finance/BudgetCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('budget-calculator', 'finance', 'Budget Calculator');

export const metadata: Metadata = {
  title: 'Budget Calculator - Personal Finance Planning | InterConverter',
  description: 'Create and manage personal budgets with income and expense tracking. Plan your finances effectively with our comprehensive budget planning tool.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Budget Calculator - Personal Finance Planning',
    description: 'Professional budget calculator for personal finance management. Track income, expenses, and savings goals with comprehensive planning tools.',
    type: 'website',
    images: [
      {
        url: '/images/og-budget-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Budget Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/budget-calculator'
  },
  authors: [{ name: 'InterConverter Team' }],
  creator: 'InterConverter',
  publisher: 'InterConverter',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};

export default function BudgetCalculatorPage() {
  const faqs = getFAQsByToolId('budget-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Budget Calculator"
      description="Create and manage personal budgets with comprehensive income and expense tracking."
      keywords={keywords}
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
      customFeatures={[
        "Income and expense tracking",
        "Savings goal planning",
        "Budget category breakdown",
        "Financial health analysis",
        "Spending pattern insights",
        "Budget optimization recommendations"
      ]}
      faqs={faqs}
    >
      <BudgetCalculator />
    </EnhancedToolLayout>
  );
}
