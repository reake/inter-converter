import { Metadata } from 'next';
import { generateToolMetadata, generateToolStructuredData } from '@/components/tools/ToolLayout';

export const metadata: Metadata = generateToolMetadata(
  'PDF to Word Converter',
  'Convert PDF files to editable Word documents. Free online PDF to Word converter with high-quality conversion.',
  'pdf-to-word-converter',
  ['pdf', 'word', 'doc', 'docx', 'converter', 'document', 'file', 'conversion'],
  'media'
);

export default function PdfToWordConverterPage() {
  const structuredData = generateToolStructuredData(
    'PDF to Word Converter',
    'Convert PDF files to editable Word documents with preserved formatting',
    'pdf-to-word-converter',
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
              📄 PDF to Word Converter
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Convert PDF files to editable Word documents while preserving formatting. 
              Coming soon with advanced OCR and layout preservation.
            </p>
          </div>

          <div className="text-center py-12 bg-muted rounded-lg">
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
            <p className="text-muted-foreground mb-6">
              We're working on bringing you the best PDF to Word conversion experience. 
              This tool will feature advanced OCR, layout preservation, and batch processing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="p-4 bg-background rounded-lg">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-medium">High Accuracy</div>
                <div className="text-sm text-muted-foreground">Preserve formatting and layout</div>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <div className="text-2xl mb-2">🔒</div>
                <div className="font-medium">Secure</div>
                <div className="text-sm text-muted-foreground">Files processed locally</div>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <div className="text-2xl mb-2">⚡</div>
                <div className="font-medium">Fast</div>
                <div className="text-sm text-muted-foreground">Quick conversion process</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}