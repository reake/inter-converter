import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('pdf-to-word-converter', 'media', 'PDF to Word Converter');

export const metadata: Metadata = {
  title: 'PDF to Word Converter - Convert PDF to DOC/DOCX | InterConverter',
  description: 'Convert PDF files to editable Word documents. Free online PDF to Word converter with high-quality conversion, OCR support, and layout preservation.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'PDF to Word Converter - Document Format Converter',
    description: 'Professional PDF to Word converter with OCR support. Convert PDF files to editable DOC/DOCX documents with layout preservation.',
    type: 'website',
    images: [
      {
        url: '/images/og-pdf-to-word-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'PDF to Word Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/media/pdf-to-word-converter'
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

export default function PdfToWordConverterPage() {
  const faqs = getFAQsByToolId('pdf-to-word-converter', 'media');

  return (
    <EnhancedToolLayout
      title="PDF to Word Converter"
      description="Convert PDF files to editable Word documents with instant processing and layout preservation."
      keywords={keywords}
      toolId="pdf-to-word-converter"
      category="media"
      emoji="📄"
      customHowToUse={[
        "Select or drag and drop your PDF file",
        "Choose output format (DOC or DOCX)",
        "Click convert to process your document",
        "Download the editable Word document",
        "Use OCR for scanned PDF documents"
      ]}
      customFeatures={[
        "Convert PDF to DOC/DOCX format",
        "Advanced OCR for scanned documents",
        "Preserve original formatting and layout",
        "Batch processing for multiple files",
        "Secure local file processing",
        "High-quality text extraction"
      ]}
      faqs={faqs}
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
    </EnhancedToolLayout>
  );
}