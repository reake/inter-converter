import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { ROICalculator } from '@/components/converters/finance/ROICalculator';

export const metadata: Metadata = {
  title: 'ROI Calculator - Return on Investment Calculator | InterConverter',
  description: 'Calculate return on investment (ROI) for business and personal investments. Free ROI calculator with profit analysis.',
  keywords: ['roi calculator', 'return on investment', 'profit calculator', 'investment analysis', 'business calculator'],
  openGraph: {
    title: 'ROI Calculator - Return on Investment Calculator',
    description: 'Calculate return on investment (ROI) for business and personal investments.',
    type: 'website',
  },
};

const toolConfig = {
  title: 'ROI Calculator',
  description: 'Calculate return on investment for business and personal investments',
  features: [
    'Calculate ROI percentage',
    'Investment profit analysis',
    'Multiple investment comparison',
    'Time-based ROI calculations',
    'Business investment evaluation'
  ],
  usageGuide: [
    'Enter initial investment amount',
    'Input final investment value',
    'Specify investment period',
    'Review ROI percentage',
    'Compare investment options'
  ],
  faqs: [
    {
      question: 'What is ROI?',
      answer: 'ROI (Return on Investment) is a performance measure used to evaluate the efficiency of an investment. It measures the amount of return on an investment relative to the investment\'s cost.'
    },
    {
      question: 'How is ROI calculated?',
      answer: 'ROI is calculated as: (Current Value - Initial Investment) / Initial Investment × 100%. A positive ROI indicates a profitable investment.'
    },
    {
      question: 'What is a good ROI?',
      answer: 'A good ROI varies by industry and investment type. Generally, an annual ROI of 7-10% is considered good for long-term investments, while business investments may target higher returns.'
    }
  ]
};

export default function ROICalculatorPage() {
  return (
    <EnhancedToolLayout
      title={toolConfig.title}
      description={toolConfig.description}
      customFeatures={toolConfig.features}
      customHowToUse={toolConfig.usageGuide}
      faqs={toolConfig.faqs}
      toolId="roi-calculator"
      category="finance"
    >
      <ROICalculator />
    </EnhancedToolLayout>
  );
}
