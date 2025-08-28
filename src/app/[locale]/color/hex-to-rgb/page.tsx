import { Metadata } from 'next';
import ToolLayout from '@/components/layout/ToolLayout';
import { HexToRgbConverter } from '@/components/converters/color/HexToRgbConverter';
import { getSEOConfigByToolId } from '@/config/seo-tools';

const seoConfig = getSEOConfigByToolId('hex-to-rgb');

export const metadata: Metadata = {
  title: seoConfig?.title || 'HEX to RGB Converter - Convert Colors Online | InterConverter',
  description: seoConfig?.description || 'Convert HEX color codes to RGB values instantly. Free online color converter with live preview and copy functionality.',
  keywords: seoConfig?.keywords?.join(', ') || 'hex to rgb, color converter, hex converter, rgb converter, color code converter',
  openGraph: {
    title: seoConfig?.title || 'HEX to RGB Converter | InterConverter',
    description: seoConfig?.description || 'Convert HEX color codes to RGB values',
    type: 'website',
  },
  alternates: {
    canonical: seoConfig?.canonicalPath || '/color/hex-to-rgb'
  }
};

export default function HexToRgbPage() {
  return (
    <ToolLayout
      title={metadata.title as string}
      description={metadata.description as string}
      keywords={seoConfig?.keywords || []}
      canonicalUrl={`https://interconverter.com${seoConfig?.canonicalPath}`}
      structuredData={seoConfig?.structuredData}
    >
      <HexToRgbConverter />
    </ToolLayout>
  );
}
