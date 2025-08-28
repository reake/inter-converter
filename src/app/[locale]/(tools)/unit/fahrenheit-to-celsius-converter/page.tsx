import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import FahrenheitToCelsiusConverter from '@/components/converters/unit/FahrenheitToCelsiusConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('fahrenheit-to-celsius-converter', 'unit', 'Fahrenheit to Celsius Converter');

export const metadata: Metadata = {
  title: 'Fahrenheit to Celsius Converter - °F to °C Calculator | InterConverter',
  description: 'Convert Fahrenheit to Celsius instantly. Free online temperature converter with formula, common values, and usage guide. Perfect for weather, cooking, and science.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Fahrenheit to Celsius Converter - °F to °C Calculator',
    description: 'Professional temperature converter for Fahrenheit to Celsius conversion. Instant calculations with formulas and reference tables for weather and cooking.',
    type: 'website',
    images: [
      {
        url: '/images/og-fahrenheit-to-celsius-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Fahrenheit to Celsius Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/unit/fahrenheit-to-celsius-converter'
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

export default function FahrenheitToCelsiusConverterPage() {
  const faqs = getFAQsByToolId('fahrenheit-to-celsius-converter', 'unit');

  return (
    <EnhancedToolLayout
      title="Fahrenheit to Celsius Converter"
      description="Convert temperatures from Fahrenheit to Celsius with precision and instant calculations."
      keywords={keywords}
      toolId="fahrenheit-to-celsius-converter"
      category="unit"
      emoji="🌡️"
      customHowToUse={[
        "Enter temperature in Fahrenheit in the input field",
        "View the instant Celsius conversion result",
        "Use the common temperatures tab for quick reference",
        "Copy results or use the conversion formula",
        "Switch to reverse conversion if needed"
      ]}
      customFeatures={[
        "Bidirectional temperature conversion",
        "Common temperature reference table",
        "Precise conversion formulas (°C = (°F - 32) × 5/9)",
        "Weather and cooking applications",
        "Scientific accuracy with decimal precision",
        "Instant calculation as you type"
      ]}
      faqs={faqs}
    >
      <FahrenheitToCelsiusConverter />
    </EnhancedToolLayout>
  );
}
