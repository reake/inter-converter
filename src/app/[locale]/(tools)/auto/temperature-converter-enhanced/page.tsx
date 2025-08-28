import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { AutomotiveTemperatureConverter } from '@/components/converters/automotive/AutomotiveTemperatureConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

// SEO-optimized keywords using our new system
const keywords = generateOptimizedKeywords('temperature-converter', 'auto', 'Automotive Temperature Converter');

// Enhanced metadata with Google SEO best practices
export const metadata: Metadata = {
  title: 'Automotive Temperature Converter - Engine Coolant °F to °C | InterConverter',
  description: 'Convert engine temperatures between Fahrenheit and Celsius. Free automotive temperature converter for coolant, oil, and engine diagnostics with normal operating ranges.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Automotive Temperature Converter - Engine Coolant °F to °C',
    description: 'Professional automotive temperature converter for engine diagnostics, coolant temperature, and oil temperature conversion between Fahrenheit and Celsius.',
    type: 'website',
    images: [
      {
        url: '/images/og-automotive-temperature-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Automotive Temperature Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/auto/temperature-converter'
  },
  // Enhanced SEO metadata
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

export default function AutomotiveTemperatureConverterPage() {
  // Get FAQs for this specific tool
  const faqs = getFAQsByToolId('temperature-converter', 'auto');

  return (
    <EnhancedToolLayout
      title="Automotive Temperature Converter"
      description="Convert between Fahrenheit and Celsius for automotive applications. Perfect for engine diagnostics, coolant temperature monitoring, and maintenance."
      keywords={keywords}
      toolId="temperature-converter"
      category="auto"
      emoji="🌡️"
      customHowToUse={[
        "Enter temperature in Fahrenheit or Celsius",
        "View instant conversion to other scale",
        "Reference normal automotive temperature ranges",
        "Use for engine diagnostics and maintenance planning"
      ]}
      customFeatures={[
        "Instant Fahrenheit to Celsius conversion",
        "Normal engine operating temperature references",
        "Coolant and oil temperature guidelines",
        "Professional automotive accuracy",
        "Mobile-friendly for shop use"
      ]}
      faqs={faqs}
    >
      <AutomotiveTemperatureConverter />
    </EnhancedToolLayout>
  );
}
