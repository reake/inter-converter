import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import HexToHslConverter from '@/components/converters/color/HexToHslConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('hex-to-hsl-converter', 'color', 'HEX to HSL Converter');

export const metadata: Metadata = {
  title: 'HEX to HSL Converter - Convert Colors Online | InterConverter',
  description: 'Convert HEX color codes to HSL values instantly. Free online color converter with live preview and HSL breakdown for web designers and developers.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'HEX to HSL Converter - Color Code Converter',
    description: 'Professional color converter for HEX to HSL conversion. Live preview and HSL breakdown for web design and development.',
    type: 'website',
    images: [
      {
        url: '/images/og-hex-to-hsl-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'HEX to HSL Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/color/hex-to-hsl-converter'
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

export default function HexToHslPage() {
  const faqs = getFAQsByToolId('hex-to-hsl-converter', 'color');

  return (
    <EnhancedToolLayout
      title="HEX to HSL Converter"
      description="Convert HEX color codes to HSL values instantly with live preview and instant calculations."
      keywords={keywords}
      toolId="hex-to-hsl-converter"
      category="color"
      emoji="🎨"
      customHowToUse={[
        "Enter a HEX color code (e.g., #FF5733)",
        "View the instant HSL conversion values",
        "Use the color preview to see the actual color",
        "Copy HSL values for your design project",
        "Adjust HSL values to fine-tune colors"
      ]}
      customFeatures={[
        "Convert HEX to HSL color format",
        "Live color preview and breakdown",
        "HSL value explanations (Hue, Saturation, Lightness)",
        "CSS-ready HSL color values",
        "Real-time color visualization",
        "Copy to clipboard functionality"
      ]}
      faqs={faqs}
    >
      <HexToHslConverter />
    </EnhancedToolLayout>
  );
}
