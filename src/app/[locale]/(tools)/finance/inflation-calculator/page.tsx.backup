import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { InflationCalculator } from '@/components/converters/finance/InflationCalculator';

export const metadata: Metadata = {
  title: 'Inflation Calculator - Calculate Inflation Impact | InterConverter',
  description: 'Calculate the impact of inflation on money value over time. Free inflation calculator with purchasing power analysis.',
  keywords: ['inflation calculator', 'purchasing power', 'money value', 'cpi calculator', 'inflation impact'],
  openGraph: {
    title: 'Inflation Calculator - Calculate Inflation Impact',
    description: 'Calculate the impact of inflation on money value over time.',
    type: 'website',
  },
};

const toolConfig = {
  title: 'Inflation Calculator',
  description: 'Calculate the impact of inflation on money value over time',
  features: [
    'Inflation impact calculation',
    'Purchasing power analysis',
    'Future value estimation',
    'Historical inflation data',
    'Real vs nominal value comparison'
  ],
  usageGuide: [
    'Enter initial amount',
    'Set inflation rate percentage',
    'Specify time period',
    'Review purchasing power impact',
    'Compare real vs nominal values'
  ],
  faqs: [
    {
      question: 'What is inflation?',
      answer: 'Inflation is the rate at which the general level of prices for goods and services rises, eroding purchasing power. A 3% inflation rate means what costs $100 today will cost $103 next year.'
    },
    {
      question: 'How does inflation affect my money?',
      answer: 'Inflation reduces the purchasing power of money over time. If inflation is 3% annually, $1000 today will only buy what $970 could buy next year.'
    },
    {
      question: 'What is a typical inflation rate?',
      answer: 'The Federal Reserve targets 2% annual inflation. Historical US inflation has averaged around 3.2% since 1913, but varies significantly by time period.'
    }
  ]
};

export default function InflationCalculatorPage() {
  return (
    <EnhancedToolLayout
      title={toolConfig.title}
      description={toolConfig.description}
      customFeatures={toolConfig.features}
      customHowToUse={toolConfig.usageGuide}
      faqs={toolConfig.faqs}
      toolId="inflation-calculator"
      category="finance"
    >
      <InflationCalculator />
    </EnhancedToolLayout>
  );
}
