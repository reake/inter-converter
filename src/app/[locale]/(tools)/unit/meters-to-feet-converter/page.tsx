import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import MetersToFeetConverter from '@/components/converters/unit/MetersToFeetConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('meters-to-feet-converter', 'unit', 'Meters to Feet Converter');

export const metadata: Metadata = {
  title: 'Meters to Feet Converter - m to ft Calculator | InterConverter',
  description: 'Convert meters to feet instantly. Free length converter with common measurements, conversion formula, and usage guide for construction, sports, and international use.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Meters to Feet Converter - m to ft Calculator',
    description: 'Professional length converter for meters to feet conversion. Instant calculations with formulas and reference tables for construction and sports.',
    type: 'website',
    images: [
      {
        url: '/images/og-meters-to-feet-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Meters to Feet Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/unit/meters-to-feet-converter'
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

export default function MetersToFeetConverterPage() {
  const faqs = getFAQsByToolId('meters-to-feet-converter', 'unit');

  return (
    <EnhancedToolLayout
      title="Meters to Feet Converter"
      description="Convert length from meters to feet with precision and instant calculations."
      keywords={keywords}
      toolId="meters-to-feet-converter"
      category="unit"
      emoji="📏"
      customHowToUse={[
        "Enter length in meters in the input field",
        "View the instant feet conversion result",
        "Use the common lengths tab for quick reference",
        "Copy results or use the conversion formula",
        "Switch to reverse conversion if needed"
      ]}
      customFeatures={[
        "Bidirectional length conversion",
        "Common length reference table",
        "Precise conversion formulas (ft = m × 3.281)",
        "Construction and engineering applications",
        "Sports and athletics support",
        "Instant calculation as you type"
      ]}
      faqs={faqs}
    >
      <MetersToFeetConverter />
    </EnhancedToolLayout>
  );
}
