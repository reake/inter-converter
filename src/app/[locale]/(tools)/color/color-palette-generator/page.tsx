import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { ColorPaletteGenerator } from '@/components/converters/color/ColorPaletteGenerator';
import { getSEOConfigByToolId } from '@/config/seo-tools';

const seoConfig = getSEOConfigByToolId('color-palette-generator');

export const metadata: Metadata = {
  title: seoConfig?.title || 'Color Palette Generator - Create Harmonious Color Schemes | InterConverter',
  description: seoConfig?.description || 'Generate beautiful color palettes using color theory. Create monochromatic, complementary, triadic and other color schemes instantly.',
  keywords: seoConfig?.keywords?.join(', ') || 'color palette generator, color scheme, harmonious colors, color theory, design colors',
  openGraph: {
    title: seoConfig?.title || 'Color Palette Generator | InterConverter',
    description: seoConfig?.description || 'Generate harmonious color palettes using color theory',
    type: 'website',
  },
  alternates: {
    canonical: seoConfig?.canonicalPath || '/color/color-palette-generator'
  }
};

export default function ColorPaletteGeneratorPage() {
  return (
    <ToolLayout
      title={metadata.title as string}
      description={metadata.description as string}
      keywords={seoConfig?.keywords || []}
      canonicalUrl={`https://interconverter.com${seoConfig?.canonicalPath}`}
      structuredData={seoConfig?.structuredData}
    >
      <ColorPaletteGenerator />
    </ToolLayout>
  );
}
