import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('jpg-to-png-converter', 'media', 'JPG to PNG Converter');

export const metadata: Metadata = {
  title: 'JPG to PNG Converter - Convert Images Online | InterConverter',
  description: 'Convert JPG images to PNG format with transparency support. Free online image converter with batch processing and quality optimization.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'JPG to PNG Converter - Image Format Converter',
    description: 'Professional image converter for JPG to PNG conversion. Preserve transparency and image quality with batch processing.',
    type: 'website',
    images: [
      {
        url: '/images/og-jpg-to-png-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'JPG to PNG Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/media/jpg-to-png-converter'
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

export default function JpgToPngConverterPage() {
  const faqs = getFAQsByToolId('jpg-to-png-converter', 'media');

  return (
    <EnhancedToolLayout
      title="JPG to PNG Converter"
      description="Convert JPG images to PNG format with transparency support and instant processing."
      keywords={keywords}
      toolId="jpg-to-png-converter"
      category="media"
      emoji="🖼️"
      customHowToUse={[
        "Select or drag and drop your JPG/JPEG image files",
        "Choose PNG conversion settings and quality options",
        "Click convert to process your images instantly",
        "Download the converted PNG files with transparency support",
        "Use batch processing for multiple image conversions"
      ]}
      customFeatures={[
        "Convert JPG/JPEG to PNG format",
        "Preserve image transparency in PNG output",
        "Batch processing for multiple files",
        "Quality optimization settings",
        "Drag and drop file upload",
        "Instant download of converted images"
      ]}
      faqs={faqs}
    >
      <div className="text-center py-12 bg-muted rounded-lg">
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
        <p className="text-muted-foreground mb-6">
          We're developing an advanced image converter with support for multiple formats, 
          batch processing, and quality optimization features.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="p-4 bg-background rounded-lg">
            <div className="text-2xl mb-2">🎨</div>
            <div className="font-medium">Quality Preserved</div>
            <div className="text-sm text-muted-foreground">Maintain image quality</div>
          </div>
          <div className="p-4 bg-background rounded-lg">
            <div className="text-2xl mb-2">📦</div>
            <div className="font-medium">Batch Processing</div>
            <div className="text-sm text-muted-foreground">Convert multiple files</div>
          </div>
          <div className="p-4 bg-background rounded-lg">
            <div className="text-2xl mb-2">🔧</div>
            <div className="font-medium">Advanced Options</div>
            <div className="text-sm text-muted-foreground">Compression and settings</div>
          </div>
        </div>
      </div>
    </EnhancedToolLayout>
  );
}