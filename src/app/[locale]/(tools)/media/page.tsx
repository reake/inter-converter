import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getToolsByCategory } from '@/config/tools';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'File & Media Converters - PDF, Image, Document Converters Tools',
    description: 'Professional file Converters tools for documents and media. Convert PDF to Word, JPG to PNG, and more file formats.',
    keywords: [
      'file converter',
      'pdf to word',
      'image converter',
      'jpg to png',
      'document converter',
      'media converter'
    ],
    openGraph: {
      title: 'File & Media Converters',
      description: 'Professional file and media Converters tools for all your document needs.',
      type: 'website',
    },
    alternates: {
      canonical: '/media'
    }
  };
}

export default function FileMediaPage() {
  const tools = getToolsByCategory('media');

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'bg-green-100 text-green-800 border-green-200';
    if (difficulty <= 3) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <span className="text-4xl">📁</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              File & Media Converters
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
              Professional file Converters tools for documents, images, and media files. 
              Convert between different formats quickly, securely, and with high quality.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>🔒</span>
                <span>Secure processing</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>⚡</span>
                <span>Fast Converters</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>🎯</span>
                <span>High quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Tools Grid */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              File Converters Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Convert documents, images, and media files between different formats with ease
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link key={tool.id} href={tool.path} className="block group">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02] border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {tool.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600 mt-2 line-clamp-2">
                          {tool.description}
                        </CardDescription>
                      </div>
                      <div className="ml-4 p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-100 transition-colors">
                        <span className="text-3xl">{tool.icon}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`font-medium ${getDifficultyColor(tool.difficulty || 1)}`}>
                        Level {tool.difficulty || 1}/5
                      </Badge>
                      {tool.searchVolume && (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                          {tool.searchVolume.toLocaleString()}/mo
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* File Format Categories */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Supported File Types
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Convert between popular document, image, and media formats
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 text-white rounded-2xl mb-4 mx-auto">
                  <span className="text-2xl">📄</span>
                </div>
                <CardTitle className="text-red-900">Documents</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="grid gap-2">
                  <div className="flex items-center justify-center gap-2 p-2 bg-red-50 rounded-lg">
                    <span className="text-red-600 font-mono text-sm">PDF</span>
                    <span className="text-gray-400">↔</span>
                    <span className="text-red-600 font-mono text-sm">DOCX</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 p-2 bg-red-50 rounded-lg">
                    <span className="text-red-600 font-mono text-sm">DOC</span>
                    <span className="text-gray-400">↔</span>
                    <span className="text-red-600 font-mono text-sm">PDF</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 p-2 bg-red-50 rounded-lg">
                    <span className="text-red-600 font-mono text-sm">XLSX</span>
                    <span className="text-gray-400">↔</span>
                    <span className="text-red-600 font-mono text-sm">PDF</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-2xl mb-4 mx-auto">
                  <span className="text-2xl">🖼️</span>
                </div>
                <CardTitle className="text-green-900">Images</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="grid gap-2">
                  <div className="flex items-center justify-center gap-2 p-2 bg-green-50 rounded-lg">
                    <span className="text-green-600 font-mono text-sm">JPG</span>
                    <span className="text-gray-400">↔</span>
                    <span className="text-green-600 font-mono text-sm">PNG</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 p-2 bg-green-50 rounded-lg">
                    <span className="text-green-600 font-mono text-sm">PNG</span>
                    <span className="text-gray-400">↔</span>
                    <span className="text-green-600 font-mono text-sm">WebP</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 p-2 bg-green-50 rounded-lg">
                    <span className="text-green-600 font-mono text-sm">GIF</span>
                    <span className="text-gray-400">↔</span>
                    <span className="text-green-600 font-mono text-sm">MP4</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-2xl mb-4 mx-auto">
                  <span className="text-2xl">🎵</span>
                </div>
                <CardTitle className="text-blue-900">Media</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="grid gap-2">
                  <div className="flex items-center justify-center gap-2 p-2 bg-blue-50 rounded-lg">
                    <span className="text-blue-600 font-mono text-sm">MP4</span>
                    <span className="text-gray-400">↔</span>
                    <span className="text-blue-600 font-mono text-sm">AVI</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 p-2 bg-blue-50 rounded-lg">
                    <span className="text-blue-600 font-mono text-sm">MP3</span>
                    <span className="text-gray-400">↔</span>
                    <span className="text-blue-600 font-mono text-sm">WAV</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 p-2 bg-blue-50 rounded-lg">
                    <span className="text-blue-600 font-mono text-sm">MOV</span>
                    <span className="text-gray-400">↔</span>
                    <span className="text-blue-600 font-mono text-sm">MP4</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Converters?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional-grade Converters tools with security and quality in mind
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg text-center bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-green-900">Secure Processing</h3>
                <p className="text-green-800 text-sm">
                  Files are processed securely and automatically deleted after Converters
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-blue-900">Lightning Fast</h3>
                <p className="text-blue-800 text-sm">
                  Optimized algorithms ensure quick Converters without quality loss
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-purple-900">High Quality</h3>
                <p className="text-purple-800 text-sm">
                  Maintain original quality and formatting during Converters process
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Privacy Notice */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-50 to-orange-50">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-200 rounded-full">
                <span className="text-2xl">🛡️</span>
              </div>
              <div>
                <h3 className="font-bold text-amber-900 text-lg mb-2">Privacy & Security Notice</h3>
                <p className="text-amber-800 leading-relaxed">
                  Your privacy is our priority. All files are processed securely using encrypted connections. 
                  Files are automatically deleted from our servers immediately after Converters. 
                  We never store, access, or share your files with third parties.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}