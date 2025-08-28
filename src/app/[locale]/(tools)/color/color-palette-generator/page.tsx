import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { ColorPaletteGenerator } from '@/components/converters/color/ColorPaletteGenerator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('color-palette-generator', 'color', 'Color Palette Generator');

export const metadata: Metadata = {
  title: 'Color Palette Generator - Create Harmonious Color Schemes | InterConverter',
  description: 'Generate beautiful color palettes using color theory. Create monochromatic, complementary, triadic and other color schemes instantly for web design and branding.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Color Palette Generator - Create Harmonious Color Schemes',
    description: 'Professional color palette generator using color theory. Create monochromatic, complementary, triadic color schemes for design projects.',
    type: 'website',
    images: [
      {
        url: '/images/og-color-palette-generator.jpg',
        width: 1200,
        height: 630,
        alt: 'Color Palette Generator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/color/color-palette-generator'
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

export default function ColorPaletteGeneratorPage() {
  const faqs = getFAQsByToolId('color-palette-generator', 'color');

  return (
    <EnhancedToolLayout
      title="Color Palette Generator"
      description="Generate beautiful color palettes using color theory with instant calculations and harmonious color schemes."
      keywords={keywords}
      toolId="color-palette-generator"
      category="color"
      emoji="🎨"
      customHowToUse={[
        "Select a base color using the color picker",
        "Choose a color harmony type (monochromatic, complementary, triadic, etc.)",
        "View the generated color palette with HEX and RGB codes",
        "Copy individual colors or export the entire palette",
        "Adjust colors manually to fine-tune your palette"
      ]}
      customFeatures={[
        "Multiple color harmony algorithms",
        "Monochromatic, complementary, and triadic schemes",
        "Real-time color preview",
        "Export palettes in multiple formats",
        "Color accessibility checking",
        "Professional color theory application"
      ]}
      faqs={faqs}
    >
      <ColorPaletteGenerator />
    </EnhancedToolLayout>
  );
}
