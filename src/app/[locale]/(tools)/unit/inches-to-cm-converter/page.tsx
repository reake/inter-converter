import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import InchesToCmConverter from '@/components/converters/unit/InchesToCmConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('inches-to-cm-converter', 'unit', 'Inches to Centimeters Converter');

export const metadata: Metadata = {
  title: 'Inches to Centimeters Converter - in to cm Calculator | InterConverter',
  description: 'Convert inches to centimeters (in to cm) instantly. Free length converter with common sizes, conversion formula, and usage guide for design, manufacturing, and measurements.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Inches to Centimeters Converter - in to cm Calculator',
    description: 'Professional length converter for inches to centimeters conversion. Instant calculations with formulas and reference tables for design and manufacturing.',
    type: 'website',
    images: [
      {
        url: '/images/og-inches-to-cm-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Inches to Centimeters Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/unit/inches-to-cm-converter'
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

export default function InchesToCmConverterPage() {
  const faqs = getFAQsByToolId('inches-to-cm-converter', 'unit');

  return (
    <EnhancedToolLayout
      title="Inches to Centimeters Converter"
      description="Convert length from inches to centimeters with precision and instant calculations."
      keywords={keywords}
      toolId="inches-to-cm-converter"
      category="unit"
      emoji="📐"
      customHowToUse={[
        "Enter length in inches in the input field",
        "View the instant centimeters conversion result",
        "Use the common sizes tab for quick reference",
        "Copy results or use the conversion formula",
        "Switch to reverse conversion if needed"
      ]}
      customFeatures={[
        "Bidirectional length conversion",
        "Common size reference table",
        "Precise conversion formulas (cm = in × 2.54)",
        "Design and manufacturing applications",
        "Screen and display measurements",
        "Instant calculation as you type"
      ]}
      faqs={faqs}
    >
      <InchesToCmConverter />
    </EnhancedToolLayout>
  );
}
