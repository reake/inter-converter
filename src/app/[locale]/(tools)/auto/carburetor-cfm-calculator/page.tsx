import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { CarburetorCFMCalculator } from '@/components/converters/automotive/CarburetorCFMCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('carburetor-cfm-calculator', 'auto', 'Carburetor CFM Calculator');

export const metadata: Metadata = {
  title: 'Carburetor CFM Calculator - Engine Airflow Sizing Tool | InterConverter',
  description: 'Calculate carburetor CFM for your engine displacement. Free carb sizing calculator for stock & modified engines with accurate airflow requirements and brand recommendations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Carburetor CFM Calculator - Engine Airflow Sizing Tool',
    description: 'Professional carburetor CFM calculator for engine performance. Calculate airflow requirements for Holley, Edelbrock, and other carburetors based on engine specs.',
    type: 'website',
    images: [
      {
        url: '/images/og-carburetor-cfm-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Carburetor CFM Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/auto/carburetor-cfm-calculator'
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

export default function CarburetorCFMCalculatorPage() {
  const faqs = getFAQsByToolId('carburetor-cfm-calculator', 'auto');

  return (
    <EnhancedToolLayout
      title="Carburetor CFM Calculator"
      description="Calculate the correct carburetor CFM for your engine based on displacement and modification level. Get accurate airflow requirements for optimal performance."
      keywords={keywords}
      toolId="carburetor-cfm-calculator"
      category="auto"
      emoji="🔧"
      customHowToUse={[
        "Enter engine displacement in cubic inches",
        "Select engine type (stock or modified)",
        "Choose target RPM range",
        "View calculated CFM requirements",
        "Use result to select appropriate carburetor brand and model"
      ]}
      customFeatures={[
        "Stock and modified engine calculations",
        "CFM per cubic inch ratios",
        "Carburetor sizing recommendations",
        "Performance optimization guidance",
        "Support for Holley, Edelbrock, and other brands"
      ]}
      faqs={faqs}
    >
      <CarburetorCFMCalculator />
    </EnhancedToolLayout>
  );
}