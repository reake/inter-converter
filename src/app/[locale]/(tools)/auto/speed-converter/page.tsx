import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { SpeedConverter } from '@/components/converters/automotive/SpeedConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('speed-converter', 'auto', 'Speed Converter');

export const metadata: Metadata = {
  title: 'Speed Converter - MPH to KPH & KPH to MPH | InterConverter',
  description: 'Convert between MPH and KPH for automotive applications. Free speed converter with common speed references and professional accuracy.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Speed Converter - MPH to KPH & KPH to MPH',
    description: 'Professional speed converter for automotive applications. Convert between miles per hour and kilometers per hour with instant results.',
    type: 'website',
    images: [
      {
        url: '/images/og-speed-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Speed Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/auto/speed-converter'
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

export default function SpeedConverterPage() {
  const faqs = getFAQsByToolId('speed-converter', 'auto');

  return (
    <EnhancedToolLayout
      title="Speed Converter"
      description="Convert between MPH and KPH for automotive applications. Perfect for international driving and performance calculations."
      keywords={keywords}
      toolId="speed-converter"
      category="auto"
      emoji="🏁"
      customHowToUse={[
        "Enter speed in MPH or KPH",
        "View instant conversion to other unit",
        "Reference common speed limits",
        "Use for automotive calculations and international driving"
      ]}
      customFeatures={[
        "MPH to KPH conversion",
        "Bidirectional speed conversion",
        "Common speed references",
        "Automotive applications",
        "International driving support"
      ]}
      faqs={faqs}
    >
      <SpeedConverter />
    </EnhancedToolLayout>
  );
}
