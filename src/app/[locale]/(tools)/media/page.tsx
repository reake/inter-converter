import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getToolsByCategory } from '@/config/tools';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';
import { HreflangLinks } from '@/components/seo/HreflangLinks';
import { CanonicalLink } from '@/components/seo/CanonicalLink';
import { JsonLd, generateWebsiteSchema } from '@/components/seo/JsonLd';

// Force static generation
export const dynamic = 'force-static';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categoryPages.media' });
  
  const title = t('seo.title');
  const description = t('description');
  // Keywords are already an array in JSON, no need to parse
  const keywordsRaw = t.raw('seo.keywords') as string[];
  const keywords = keywordsRaw || [];
  
  return generateSEOMetadata({
    title,
    description,
    locale,
    pathname: '/media',
    keywords
  });
}

export default async function FileMediaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categoryPages.media' });
  const tools = getToolsByCategory('media');

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'bg-green-100 text-green-800 border-green-200';
    if (difficulty <= 3) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty <= 2) return t('difficulty.beginner');
    if (difficulty <= 3) return t('difficulty.intermediate');
    return t('difficulty.advanced');
  };

  return (
    <>
      <HreflangLinks pathname="/media" currentLocale={locale} />
      <CanonicalLink pathname="/media" locale={locale} />
      <JsonLd data={generateWebsiteSchema(locale)} />
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 py-16 max-w-6xl">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                <span className="text-4xl">📁</span>
              </div>
              <h1 className="text-5xl font-bold mb-6">
                {t('title')}
              </h1>
              <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
                {t('description')}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <span>🔒</span>
                  <span>{t('stats.secureProcessing')}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <span>⚡</span>
                  <span>{t('stats.fastConversion')}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <span>🎯</span>
                  <span>{t('stats.highQuality')}</span>
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
              {t('sections.converters.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('sections.converters.description')}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link key={tool.id} href={tool.path as any} className="block group">
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
                        {t('common.level')} {tool.difficulty || 1}/5
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
              {t('sections.fileTypes.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('sections.fileTypes.description')}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 text-white rounded-2xl mb-4 mx-auto">
                  <span className="text-2xl">📄</span>
                </div>
                <CardTitle className="text-red-900">{t('fileTypes.documents.title')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="grid gap-2">
                  <div className="flex items-center justify-center gap-2 p-2 bg-red-50 rounded-lg">
                    <span className="text-red-600 font-mono text-sm">{t('fileTypes.documents.formats.pdfDocx')}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 p-2 bg-red-50 rounded-lg">
                    <span className="text-red-600 font-mono text-sm">{t('fileTypes.documents.formats.docPdf')}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 p-2 bg-red-50 rounded-lg">
                    <span className="text-red-600 font-mono text-sm">{t('fileTypes.documents.formats.xlsxPdf')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-2xl mb-4 mx-auto">
                  <span className="text-2xl">🖼️</span>
                </div>
                <CardTitle className="text-green-900">{t('fileTypes.images.title')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="grid gap-2">
                  <div className="flex items-center justify-center gap-2 p-2 bg-green-50 rounded-lg">
                    <span className="text-green-600 font-mono text-sm">{t('fileTypes.images.formats.jpgPng')}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 p-2 bg-green-50 rounded-lg">
                    <span className="text-green-600 font-mono text-sm">{t('fileTypes.images.formats.pngWebp')}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 p-2 bg-green-50 rounded-lg">
                    <span className="text-green-600 font-mono text-sm">{t('fileTypes.images.formats.gifMp4')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-2xl mb-4 mx-auto">
                  <span className="text-2xl">🎵</span>
                </div>
                <CardTitle className="text-blue-900">{t('fileTypes.media.title')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="grid gap-2">
                  <div className="flex items-center justify-center gap-2 p-2 bg-blue-50 rounded-lg">
                    <span className="text-blue-600 font-mono text-sm">{t('fileTypes.media.formats.mp4Avi')}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 p-2 bg-blue-50 rounded-lg">
                    <span className="text-blue-600 font-mono text-sm">{t('fileTypes.media.formats.mp3Wav')}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 p-2 bg-blue-50 rounded-lg">
                    <span className="text-blue-600 font-mono text-sm">{t('fileTypes.media.formats.movMp4')}</span>
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
              {t('sections.features.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('sections.features.description')}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg text-center bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-green-900">{t('features.secure.title')}</h3>
                <p className="text-green-800 text-sm">
                  {t('features.secure.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-blue-900">{t('features.fast.title')}</h3>
                <p className="text-blue-800 text-sm">
                  {t('features.fast.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-purple-900">{t('features.quality.title')}</h3>
                <p className="text-purple-800 text-sm">
                  {t('features.quality.description')}
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
                <h3 className="font-bold text-amber-900 text-lg mb-2">{t('privacy.title')}</h3>
                <p className="text-amber-800 leading-relaxed">
                  {t('privacy.content')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </>
  );
}