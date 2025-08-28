import { Metadata } from 'next';
import { ToolLayout } from '@/components/tools/ToolLayout';




// Force static generation
export const dynamic = 'force-static';
const title = 'PDF to Word Converter';
const description = 'Convert PDF files to editable Word documents. Free online PDF to Word converter with high-quality conversion.';
const keywordsArr = ['pdf', 'word', 'doc', 'docx', 'converter', 'document', 'file', 'conversion'];

export const metadata: Metadata = {
  title: `${title} | InterConverter`,
  description,
  keywords: keywordsArr.join(', '),
  openGraph: {
    title: `${title} | InterConverter`,
    description,
    type: 'website',
  },
  alternates: { canonical: '/media/pdf-to-word-converter' }
};

export default function PdfToWordConverterPage() {
  return (
    <ToolLayout
      title={title}
      description={description}
      keywords={keywordsArr}
      toolId="pdf-to-word-converter"
      category="media"
      emoji="📄"
    >
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
    </ToolLayout>
  );
}