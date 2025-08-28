import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import CelsiusToFahrenheitConverter from '@/components/converters/unit/CelsiusToFahrenheitConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('celsius-to-fahrenheit-converter', 'unit', 'Celsius to Fahrenheit Converter');

export const metadata: Metadata = {
  title: 'Celsius to Fahrenheit Converter - °C to °F Calculator | InterConverter',
  description: 'Convert Celsius to Fahrenheit instantly. Free online temperature converter with formula, common values, and usage guide. Perfect for weather, cooking, and science.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Celsius to Fahrenheit Converter - °C to °F Calculator',
    description: 'Professional temperature converter for Celsius to Fahrenheit conversion. Instant calculations with formulas and reference tables for weather and cooking.',
    type: 'website',
    images: [
      {
        url: '/images/og-celsius-to-fahrenheit-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Celsius to Fahrenheit Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/unit/celsius-to-fahrenheit-converter'
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

export default function CelsiusToFahrenheitConverterPage() {
  const faqs = getFAQsByToolId('celsius-to-fahrenheit-converter', 'unit');

  return (
    <EnhancedToolLayout
      title="Celsius to Fahrenheit Converter"
      description="Convert temperatures from Celsius to Fahrenheit with precision and instant calculations."
      keywords={keywords}
      toolId="celsius-to-fahrenheit-converter"
      category="unit"
      emoji="🌡️"
      customHowToUse={[
        "Enter temperature in Celsius in the input field",
        "View the instant Fahrenheit conversion result",
        "Use the common temperatures tab for quick reference",
        "Copy results or use the conversion formula",
        "Switch to reverse conversion if needed"
      ]}
      customFeatures={[
        "Bidirectional temperature conversion",
        "Common temperature reference table",
        "Precise conversion formulas (°F = (°C × 9/5) + 32)",
        "Weather and cooking applications",
        "Scientific accuracy with decimal precision",
        "Instant calculation as you type"
      ]}
      faqs={faqs}
    >
      <CelsiusToFahrenheitConverter />
    </EnhancedToolLayout>
  );
}
