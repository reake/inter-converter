import { Metadata } from 'next';
import { generateToolMetadata, generateToolStructuredData } from '@/components/tools/ToolLayout';

export const metadata: Metadata = generateToolMetadata(
  'JPG to PNG Converter',
  'Convert JPG images to PNG format with transparency support. Free online image converter with batch processing.',
  'jpg-to-png-converter',
  ['jpg', 'jpeg', 'png', 'image', 'converter', 'photo', 'transparency', 'format'],
  'media'
);

export default function JpgToPngConverterPage() {
  const structuredData = generateToolStructuredData(
    'JPG to PNG Converter',
    'Convert JPG images to PNG format with transparency support and quality preservation',
    'jpg-to-png-converter',
    'media'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4">
              🖼️ JPG to PNG Converter
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Convert JPG images to PNG format with transparency support and quality preservation. 
              Coming soon with batch processing and advanced options.
            </p>
          </div>

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
        </div>
      </div>
    </>
  );
}