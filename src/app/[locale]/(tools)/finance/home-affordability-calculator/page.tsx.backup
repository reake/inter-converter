import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import HomeAffordabilityCalculator from '@/components/converters/finance/HomeAffordabilityCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('home-affordability-calculator', 'finance', 'Home Affordability Calculator');

export const metadata: Metadata = {
  title: 'Home Affordability Calculator - How Much House Can I Afford? | InterConverter',
  description: 'Calculate how much house you can afford based on your income, debts, and down payment. Free home affordability calculator with debt-to-income ratios.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Home Affordability Calculator - How Much House Can I Afford?',
    description: 'Professional home affordability calculator for house hunting. Determine your maximum home price based on income, debts, and down payment.',
    type: 'website',
    images: [
      {
        url: '/images/og-home-affordability-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Home Affordability Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/home-affordability-calculator'
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

export default function HomeAffordabilityCalculatorPage() {
  const faqs = getFAQsByToolId('home-affordability-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Home Affordability Calculator"
      description="Determine how much house you can afford based on your income, monthly debts, and available down payment."
      keywords={keywords}
      toolId="home-affordability-calculator"
      category="finance"
      emoji="🏡"
      customHowToUse={[
        "Enter your gross annual income",
        "Input your monthly debt payments (credit cards, loans, etc.)",
        "Set your available down payment amount",
        "Choose your preferred loan term and interest rate",
        "Review your maximum affordable home price",
        "See recommended price ranges based on different DTI ratios"
      ]}
      customFeatures={[
        "Maximum home price calculation",
        "Debt-to-income ratio analysis (28/36 rule)",
        "Monthly payment breakdown",
        "Down payment impact analysis",
        "Conservative and aggressive affordability ranges",
        "Closing cost estimates"
      ]}
      faqs={faqs}
    >
      <HomeAffordabilityCalculator />
    </EnhancedToolLayout>
  );
}
