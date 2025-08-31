import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { BreakEvenCalculator } from '@/components/converters/finance/BreakEvenCalculator';

export const metadata: Metadata = {
  title: 'Break Even Calculator - Business Break Even Analysis | InterConverter',
  description: 'Calculate break-even point for business and investment decisions. Free break-even analysis calculator with profit planning.',
  keywords: ['break even calculator', 'break even analysis', 'business calculator', 'profit planning', 'cost analysis'],
  openGraph: {
    title: 'Break Even Calculator - Business Break Even Analysis',
    description: 'Calculate break-even point for business and investment decisions.',
    type: 'website',
  },
};

const toolConfig = {
  title: 'Break Even Calculator',
  description: 'Calculate break-even point for business and investment decisions',
  features: [
    'Break-even point calculation',
    'Fixed and variable cost analysis',
    'Profit margin planning',
    'Sales target determination',
    'Business viability assessment'
  ],
  usageGuide: [
    'Enter fixed costs (rent, salaries, etc.)',
    'Input variable cost per unit',
    'Set selling price per unit',
    'Calculate break-even point',
    'Analyze profit scenarios'
  ],
  faqs: [
    {
      question: 'What is break-even point?',
      answer: 'Break-even point is the level of sales at which total revenues equal total costs, resulting in neither profit nor loss. It\'s calculated as Fixed Costs ÷ (Price per Unit - Variable Cost per Unit).'
    },
    {
      question: 'Why is break-even analysis important?',
      answer: 'Break-even analysis helps businesses understand the minimum sales needed to cover costs, set pricing strategies, and make informed decisions about investments and operations.'
    },
    {
      question: 'What are fixed vs variable costs?',
      answer: 'Fixed costs remain constant regardless of production volume (rent, insurance, salaries). Variable costs change with production volume (materials, direct labor, shipping).'
    }
  ]
};

export default function BreakEvenCalculatorPage() {
  return (
    <EnhancedToolLayout
      title={toolConfig.title}
      description={toolConfig.description}
      customFeatures={toolConfig.features}
      customHowToUse={toolConfig.usageGuide}
      faqs={toolConfig.faqs}
      toolId="break-even-calculator"
      category="finance"
    >
      <BreakEvenCalculator />
    </EnhancedToolLayout>
  );
}
