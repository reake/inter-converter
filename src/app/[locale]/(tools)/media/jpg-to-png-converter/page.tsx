import { Metadata } from 'next';
import { ToolLayout } from '@/components/tools/ToolLayout';




// Force static generation
export const dynamic = 'force-static';
const title = 'JPG to PNG Converter';
const description = 'Convert JPG images to PNG format with transparency support. Free online image converter with batch processing.';
const keywordsArr = ['jpg', 'jpeg', 'png', 'image', 'converter', 'photo', 'transparency', 'format'];

export const metadata: Metadata = {
  title: `${title} | InterConverter`,
  description,
  keywords: keywordsArr.join(', '),
  openGraph: {
    title: `${title} | InterConverter`,
    description,
    type: 'website',
  },
  alternates: { canonical: '/media/jpg-to-png-converter' }
};

export default function JpgToPngConverterPage() {
  return (
    <ToolLayout
      title={title}
      description={description}
      keywords={keywordsArr}
      toolId="jpg-to-png-converter"
      category="media"
      emoji="🖼️"
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
    </ToolLayout>
  );
}