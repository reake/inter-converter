import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import PregnancyCalculator from '@/components/converters/health/PregnancyCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('pregnancy-calculator', 'health', 'Pregnancy Calculator');

export const metadata: Metadata = {
  title: 'Pregnancy Calculator - Due Date & Pregnancy Tracker | InterConverter',
  description: 'Calculate pregnancy due date and track pregnancy progress. Estimate conception date and pregnancy milestones with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Pregnancy Calculator - Due Date & Pregnancy Tracker',
    description: 'Professional pregnancy calculator for expectant mothers. Calculate due dates and track pregnancy progress.',
    type: 'website',
    images: [
      {
        url: '/images/og-pregnancy-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Pregnancy Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/health/pregnancy-calculator'
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

export default function PregnancyCalculatorPage() {
  const faqs = getFAQsByToolId('pregnancy-calculator', 'health');

  return (
    <EnhancedToolLayout
      title="Pregnancy Calculator"
      description="Calculate pregnancy due date and track pregnancy progress with instant calculations."
      keywords={keywords}
      toolId="pregnancy-calculator"
      category="health"
      emoji="🤰"
      customHowToUse={[
        "Enter last menstrual period start date",
        "Or input estimated conception date",
        "Calculate due date and pregnancy weeks",
        "View fetal development milestones",
        "Track pregnancy progress stages",
        "Get personalized pregnancy guidance"
      ]}
      customFeatures={[
        "Accurate due date calculation",
        "Pregnancy week and gestational age tracking",
        "Fetal development milestone tracking",
        "Pregnancy milestone reminders",
        "Prenatal appointment scheduling",
        "Comprehensive pregnancy health guidance"
      ]}
      faqs={faqs}
    >
      <PregnancyCalculator />
    </EnhancedToolLayout>
  );
}
