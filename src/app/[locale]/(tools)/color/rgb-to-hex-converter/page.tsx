import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import RgbToHexConverter from '@/components/converters/color/RgbToHexConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('rgb-to-hex-converter', 'color', 'RGB to HEX Color Converter');

export const metadata: Metadata = {
  title: 'RGB to HEX Color Converter - Color Code Converter | InterConverter',
  description: 'Convert RGB to HEX color codes instantly. Free color converter with preview, common colors, web-safe palette, and CSS code generation for web design and development.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'RGB to HEX Color Converter - Color Code Converter',
    description: 'Professional color converter for RGB to HEX conversion. Real-time preview and CSS code generation for web designers and developers.',
    type: 'website',
    images: [
      {
        url: '/images/og-rgb-to-hex-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'RGB to HEX Color Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/color/rgb-to-hex-converter'
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

export default function RgbToHexConverterPage() {
  const faqs = getFAQsByToolId('rgb-to-hex-converter', 'color');

  return (
    <EnhancedToolLayout
      title="RGB to HEX Color Converter"
      description="Convert RGB color values to HEX codes with real-time preview and instant calculations."
      keywords={keywords}
      toolId="rgb-to-hex-converter"
      category="color"
      emoji="🎨"
      customHowToUse={[
        "Enter RGB values (0-255) for Red, Green, and Blue",
        "View the instant HEX color code conversion",
        "Use the color preview to see the actual color",
        "Copy HEX codes or CSS properties for your project",
        "Use sliders for visual color selection"
      ]}
      customFeatures={[
        "Bidirectional RGB ↔ HEX conversion",
        "Real-time color preview",
        "Common colors reference table",
        "Web-safe color palette",
        "CSS code generation",
        "Interactive color sliders"
      ]}
      faqs={faqs}
    >
      <RgbToHexConverter />
    </EnhancedToolLayout>
  );
}
