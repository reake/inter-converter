import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { GiftTaxCalculator } from '@/components/converters/finance/GiftTaxCalculator';

export const metadata: Metadata = {
  title: 'Gift Tax Calculator - Calculate Gift Tax Liability | InterConverter',
  description: 'Calculate gift tax liability and annual exclusions with our free gift tax calculator. Determine tax obligations for gifts and estate planning.',
  keywords: ['gift tax calculator', 'gift tax liability', 'annual exclusion', 'estate planning', 'tax calculator'],
  openGraph: {
    title: 'Gift Tax Calculator - Calculate Gift Tax Liability',
    description: 'Calculate gift tax liability and annual exclusions with our free gift tax calculator.',
    type: 'website',
  },
};

const toolConfig = {
  title: 'Gift Tax Calculator',
  description: 'Calculate gift tax liability and annual exclusions for estate planning',
  features: [
    'Calculate federal gift tax liability',
    'Annual exclusion tracking',
    'Lifetime exemption calculations',
    'Multiple gift scenarios',
    'Tax planning insights'
  ],
  usageGuide: [
    'Enter the total gift amount',
    'Specify the relationship to recipient',
    'Review annual exclusion limits',
    'Calculate tax liability',
    'Plan your gift strategy'
  ],
  faqs: [
    {
      question: 'What is the annual gift tax exclusion?',
      answer: 'The annual gift tax exclusion is the amount you can give to any individual each year without triggering gift tax. For 2024, this amount is $18,000 per recipient.'
    },
    {
      question: 'When do I need to pay gift tax?',
      answer: 'Gift tax is owed when you exceed both the annual exclusion and your lifetime exemption amount. Most people never pay gift tax due to the high lifetime exemption.'
    },
    {
      question: 'Do I need to file a gift tax return?',
      answer: 'You must file Form 709 if you give more than the annual exclusion to any individual, even if no tax is owed due to the lifetime exemption.'
    }
  ]
};

export default function GiftTaxCalculatorPage() {
  return (
    <EnhancedToolLayout
      title={toolConfig.title}
      description={toolConfig.description}
      customFeatures={toolConfig.features}
      customHowToUse={toolConfig.usageGuide}
      faqs={toolConfig.faqs}
      toolId="gift-tax-calculator"
      category="finance"
    >
      <GiftTaxCalculator />
    </EnhancedToolLayout>
  );
}
