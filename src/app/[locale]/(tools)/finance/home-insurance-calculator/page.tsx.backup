import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import InsuranceCalculator from '@/components/converters/finance/InsuranceCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('home-insurance-calculator', 'finance', 'Home Insurance Calculator');

export const metadata: Metadata = {
  title: 'Home Insurance Calculator - Homeowners Insurance Premium | InterConverter',
  description: 'Calculate home insurance premiums and coverage costs. Compare dwelling, personal property, and liability coverage options with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Home Insurance Calculator - Homeowners Insurance Premium',
    description: 'Professional home insurance calculator for premium estimation. Compare coverage options and calculate insurance costs.',
    type: 'website',
    images: [
      {
        url: '/images/og-home-insurance-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Home Insurance Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/home-insurance-calculator'
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

export default function HomeInsuranceCalculatorPage() {
  const faqs = getFAQsByToolId('home-insurance-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Home Insurance Calculator"
      description="Calculate home insurance premiums and coverage costs with instant calculations."
      keywords={keywords}
      toolId="home-insurance-calculator"
      category="finance"
      emoji="🏠"
      customHowToUse={[
        "Enter current home market value",
        "Set desired coverage amounts for dwelling",
        "Choose deductible amount preference",
        "Input location and zip code details",
        "Calculate estimated premium costs",
        "Compare different coverage options"
      ]}
      customFeatures={[
        "Home insurance premium calculation",
        "Coverage comparison and analysis tools",
        "Deductible impact on premium costs",
        "Location-based risk pricing factors",
        "Multi-policy and safety discounts",
        "Replacement cost estimation tools"
      ]}
      faqs={faqs}
    >
      <InsuranceCalculator />
    </EnhancedToolLayout>
  );
}
