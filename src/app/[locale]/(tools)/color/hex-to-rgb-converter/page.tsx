import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import HexToRgbConverter from '@/components/converters/color/HexToRgbConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('hex-to-rgb-converter', 'color', 'HEX to RGB Converter');

export const metadata: Metadata = {
  title: 'HEX to RGB Converter - Color Code Converter | InterConverter',
  description: 'Convert HEX color codes to RGB values and vice versa. Free color converter with color picker and preview for web designers and developers.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'HEX to RGB Converter - Color Code Converter',
    description: 'Professional color converter for HEX to RGB conversion. Visual color picker and preview for web design and development.',
    type: 'website',
    images: [
      {
        url: '/images/og-hex-to-rgb-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'HEX to RGB Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/color/hex-to-rgb-converter'
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

export default function HexToRgbConverterPage() {
  const faqs = getFAQsByToolId('hex-to-rgb-converter', 'color');

  return (
    <EnhancedToolLayout
      title="HEX to RGB Converter"
      description="Convert HEX color codes to RGB values and vice versa with precision and instant calculations."
      keywords={keywords}
      toolId="hex-to-rgb-converter"
      category="color"
      emoji="🎨"
      customHowToUse={[
        "Enter a HEX color code (e.g., #FF0000)",
        "Or enter RGB values (e.g., 255, 0, 0)",
        "Use the color picker to select colors visually",
        "Copy the converted values for your project",
        "Preview colors in real-time"
      ]}
      customFeatures={[
        "Convert HEX to RGB and RGB to HEX",
        "Visual color preview and picker",
        "Support for HSL color format",
        "CSS-ready color values",
        "Real-time color preview",
        "Copy to clipboard functionality"
      ]}
      faqs={faqs}
    >
      <HexToRgbConverter />
    </EnhancedToolLayout>
  );
}