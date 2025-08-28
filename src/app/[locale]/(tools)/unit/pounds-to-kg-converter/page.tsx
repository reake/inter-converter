import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import PoundsToKgConverter from '@/components/converters/unit/PoundsToKgConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('pounds-to-kg-converter', 'unit', 'Pounds to Kilograms Converter');

export const metadata: Metadata = {
  title: 'Pounds to Kilograms Converter - lbs to kg Calculator | InterConverter',
  description: 'Convert pounds to kilograms (lbs to kg) instantly. Free weight converter with common values, conversion formula, and usage guide for fitness, shipping, and cooking.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Pounds to Kilograms Converter - lbs to kg Calculator',
    description: 'Professional weight converter for pounds to kilograms conversion. Instant calculations with formulas and reference tables for fitness and shipping.',
    type: 'website',
    images: [
      {
        url: '/images/og-pounds-to-kg-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Pounds to Kilograms Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/unit/pounds-to-kg-converter'
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

export default function PoundsToKgConverterPage() {
  const faqs = getFAQsByToolId('pounds-to-kg-converter', 'unit');

  return (
    <EnhancedToolLayout
      title="Pounds to Kilograms Converter"
      description="Convert weight from pounds to kilograms with precision and instant calculations."
      keywords={keywords}
      toolId="pounds-to-kg-converter"
      category="unit"
      emoji="⚖️"
      customHowToUse={[
        "Enter weight in pounds in the input field",
        "View the instant kilograms conversion result",
        "Use the common weights tab for quick reference",
        "Copy results or use the conversion formula",
        "Switch to reverse conversion if needed"
      ]}
      customFeatures={[
        "Bidirectional weight conversion",
        "Common weight reference table",
        "Precise conversion formulas (kg = lbs ÷ 2.205)",
        "Fitness and health applications",
        "Shipping and logistics support",
        "Instant calculation as you type"
      ]}
      faqs={faqs}
    >
      <PoundsToKgConverter />
    </EnhancedToolLayout>
  );
}
