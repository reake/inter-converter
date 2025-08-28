import { Metadata } from 'next';
import ToolLayout from '@/components/layout/ToolLayout';
import ColorPickerTool from '@/components/converters/color/ColorPickerTool';
import { getSEOConfigByToolId } from '@/config/seo-tools';

const seoConfig = getSEOConfigByToolId('color-picker');

export const metadata: Metadata = {
  title: seoConfig?.title || 'Color Picker Tool - Pick & Convert Colors Online | InterConverter',
  description: seoConfig?.description || 'Professional color picker with HSL, RGB, and HEX support. Pick colors, create palettes, and copy color codes instantly.',
  keywords: seoConfig?.keywords?.join(', ') || 'color picker, color tool, hsl picker, rgb picker, hex picker, color palette',
  openGraph: {
    title: seoConfig?.title || 'Color Picker Tool | InterConverter',
    description: seoConfig?.description || 'Pick and convert colors with our professional color picker',
    type: 'website',
  },
  alternates: {
    canonical: seoConfig?.canonicalPath || '/color/color-picker'
  }
};

export default function ColorPickerPage() {
  return (
    <ToolLayout
      title={metadata.title as string}
      description={metadata.description as string}
      keywords={seoConfig?.keywords || []}
      canonicalUrl={`https://interconverter.com${seoConfig?.canonicalPath}`}
      structuredData={seoConfig?.structuredData}
    >
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Color Picker Tool</h1>
          <p className="text-gray-600">Pick colors, create palettes, and get HEX, RGB, and HSL values instantly</p>
        </div>
        <ColorPickerTool />
      </div>
    </ToolLayout>
  );
}
