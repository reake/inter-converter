import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { TemperatureConverter } from '@/components/converters/unit/TemperatureConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('temperature-converter', 'unit', 'Temperature Converter');

export const metadata: Metadata = {
  title: 'Temperature Converter - Celsius, Fahrenheit & Kelvin | InterConverter',
  description: 'Convert temperatures between Celsius, Fahrenheit, and Kelvin. Free online temperature conversion calculator with weather references and formulas.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Temperature Converter - Universal Temperature Calculator',
    description: 'Professional temperature converter supporting Celsius, Fahrenheit, and Kelvin. Instant calculations with formulas and weather references.',
    type: 'website',
    images: [
      {
        url: '/images/og-temperature-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Temperature Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/unit/temperature-converter'
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

export default function TemperatureConverterPage() {
  const faqs = getFAQsByToolId('temperature-converter', 'unit');

  return (
    <EnhancedToolLayout
      title="Temperature Converter"
      description="Convert temperatures between Celsius, Fahrenheit, and Kelvin with precision and instant calculations."
      keywords={keywords}
      toolId="temperature-converter"
      category="unit"
      emoji="🌡️"
      customHowToUse={[
        "Select the source temperature unit from the dropdown",
        "Enter the temperature value in the input field",
        "Choose the target unit for conversion",
        "View instant conversion results",
        "Copy results or switch units as needed"
      ]}
      customFeatures={[
        "Support for Celsius, Fahrenheit, and Kelvin",
        "Scientific and weather applications",
        "High precision calculations with formulas",
        "Common temperature reference values",
        "Bidirectional conversion support",
        "Real-time calculation as you type"
      ]}
      faqs={faqs}
    >
      <TemperatureConverter />
    </EnhancedToolLayout>
  );
}
