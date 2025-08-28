import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import FeetToMetersOnlyConverter from '@/components/converters/unit/FeetToMetersOnlyConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('feet-to-meters-converter', 'unit', 'Feet to Meters Converter');

export const metadata: Metadata = {
  title: 'Feet to Meters Converter - ft to m Calculator | InterConverter',
  description: 'Convert feet to meters instantly. Free length converter with common measurements, conversion formula, and usage guide for construction, sports, and international use.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Feet to Meters Converter - ft to m Calculator',
    description: 'Professional length converter for feet to meters conversion. Instant calculations with formulas and reference tables for construction and sports.',
    type: 'website',
    images: [
      {
        url: '/images/og-feet-to-meters-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Feet to Meters Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/unit/feet-to-meters-converter'
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

export default function FeetToMetersConverterPage() {
  const faqs = getFAQsByToolId('feet-to-meters-converter', 'unit');

  return (
    <EnhancedToolLayout
      title="Feet to Meters Converter"
      description="Convert length from feet to meters with precision and instant calculations."
      keywords={keywords}
      toolId="feet-to-meters-converter"
      category="unit"
      emoji="📏"
      customHowToUse={[
        "Enter length in feet in the input field",
        "View the instant meters conversion result",
        "Use the common lengths tab for quick reference",
        "Copy results or use the conversion formula",
        "Switch to reverse conversion if needed"
      ]}
      customFeatures={[
        "Bidirectional length conversion",
        "Common length reference table",
        "Precise conversion formulas (m = ft × 0.3048)",
        "Construction and engineering applications",
        "Sports and athletics support",
        "Instant calculation as you type"
      ]}
      faqs={faqs}
    >
      <FeetToMetersOnlyConverter />
    </EnhancedToolLayout>
  );
}
