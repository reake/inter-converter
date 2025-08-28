import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { SuperchargerCalculator } from '@/components/converters/automotive/SuperchargerCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('supercharger-calculator', 'auto', 'Supercharger Calculator');

export const metadata: Metadata = {
  title: 'Supercharger HP Calculator - Boost PSI to Horsepower | InterConverter',
  description: 'Calculate supercharger horsepower gains from boost PSI. Free online tool for turbo, blower & forced induction power calculations with professional accuracy.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Supercharger HP Calculator - Boost PSI to Horsepower',
    description: 'Professional supercharger calculator for forced induction systems. Calculate horsepower gains from boost pressure for turbos, blowers, and superchargers.',
    type: 'website',
    images: [
      {
        url: '/images/og-supercharger-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Supercharger Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/auto/supercharger-calculator'
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

export default function SuperchargerCalculatorPage() {
  const faqs = getFAQsByToolId('supercharger-calculator', 'auto');

  return (
    <EnhancedToolLayout
      title="Supercharger Calculator"
      description="Calculate horsepower gains from supercharger and forced induction systems. Essential for turbo, blower, and supercharger performance planning."
      keywords={keywords}
      toolId="supercharger-calculator"
      category="auto"
      emoji="💨"
      customHowToUse={[
        "Enter base engine horsepower",
        "Input boost pressure in PSI",
        "Select supercharger type (if applicable)",
        "View calculated horsepower gains",
        "Consider safety warnings for high boost applications"
      ]}
      customFeatures={[
        "Boost pressure to HP calculations",
        "Forced induction analysis",
        "Multiple supercharger types supported",
        "Performance optimization guidance",
        "Safety considerations included"
      ]}
      faqs={faqs}
    >
      <SuperchargerCalculator />
    </EnhancedToolLayout>
  );
}