import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import OvulationCalculator from '@/components/converters/health/OvulationCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('ovulation-calculator', 'health', 'Ovulation Calculator');

export const metadata: Metadata = {
  title: 'Ovulation Calculator - Fertile Window & Conception Calculator | InterConverter',
  description: 'Calculate ovulation dates and fertile window for family planning. Track menstrual cycle and predict best conception times with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Ovulation Calculator - Fertile Window & Conception Calculator',
    description: 'Professional ovulation calculator for family planning. Calculate fertile window and track menstrual cycles.',
    type: 'website',
    images: [
      {
        url: '/images/og-ovulation-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Ovulation Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/health/ovulation-calculator'
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

export default function OvulationCalculatorPage() {
  const faqs = getFAQsByToolId('ovulation-calculator', 'health');

  return (
    <EnhancedToolLayout
      title="Ovulation Calculator"
      description="Calculate ovulation dates and fertile window for family planning with instant calculations."
      keywords={keywords}
      toolId="ovulation-calculator"
      category="health"
      emoji="🌸"
      customHowToUse={[
        "Enter last menstrual period start date",
        "Set average menstrual cycle length",
        "Calculate ovulation date and fertile window",
        "View best conception timing",
        "Track menstrual cycle patterns",
        "Get personalized fertility guidance"
      ]}
      customFeatures={[
        "Accurate ovulation date prediction",
        "Fertile window calculation",
        "Menstrual cycle tracking tools",
        "Fertility assessment indicators",
        "Conception timing optimization",
        "Personalized fertility recommendations"
      ]}
      faqs={faqs}
    >
      <OvulationCalculator />
    </EnhancedToolLayout>
  );
}
