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
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categoryPages.health' });
  
  const title = t('seo.title');
  const description = t('description');
  // Keywords are already an array in JSON, no need to parse
  const keywordsRaw = t.raw('seo.keywords') as string[];
  const keywords = keywordsRaw || [];
  
  return generateSEOMetadata({
    title,
    description,
    locale,
    pathname: '/health',
    keywords
  });
}

export default async function HealthFitnessPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categoryPages.health' });
  const tools = getToolsByCategory('health');

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'bg-green-100 text-green-800 border-green-200';
    if (difficulty <= 3) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <>
      <HreflangLinks currentLocale={locale} pathname="/health" />
      <CanonicalLink locale={locale} pathname="/health" />
      <JsonLd data={generateWebsiteSchema(locale)} />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <span className="text-4xl">💪</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              {t('description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>📊</span>
                <span>{t('stats.accurateCalculations')}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>🎯</span>
                <span>{t('stats.goalTracking')}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>🏥</span>
                <span>{t('stats.healthFocused')}</span>
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
              {t('sections.calculators.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('sections.calculators.description')}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link key={tool.id} href={tool.path as any} className="block group">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02] border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                          {tool.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600 mt-2 line-clamp-2">
                          {tool.description}
                        </CardDescription>
                      </div>
                      <div className="ml-4 p-3 bg-green-50 rounded-xl group-hover:bg-green-100 transition-colors">
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

        {/* BMI Categories */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('sections.bmiCategories.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('sections.bmiCategories.description')}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">📉</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-blue-900">{t('bmiCategories.underweight.title')}</h3>
                <p className="text-blue-800 text-sm mb-2">{t('bmiCategories.underweight.range')}</p>
                <p className="text-blue-700 text-xs">{t('bmiCategories.underweight.description')}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-green-900">{t('bmiCategories.normal.title')}</h3>
                <p className="text-green-800 text-sm mb-2">{t('bmiCategories.normal.range')}</p>
                <p className="text-green-700 text-xs">{t('bmiCategories.normal.description')}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100 text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-yellow-900">{t('bmiCategories.overweight.title')}</h3>
                <p className="text-yellow-800 text-sm mb-2">{t('bmiCategories.overweight.range')}</p>
                <p className="text-yellow-700 text-xs">{t('bmiCategories.overweight.description')}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100 text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">🚨</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-red-900">{t('bmiCategories.obese.title')}</h3>
                <p className="text-red-800 text-sm mb-2">{t('bmiCategories.obese.range')}</p>
                <p className="text-red-700 text-xs">{t('bmiCategories.obese.description')}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Information Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-400 to-cyan-500"></div>
            <CardHeader className="bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardTitle className="flex items-center gap-3 text-blue-800">
                <span className="text-2xl">🏋️</span>
                {t('infoCards.bodyComposition.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600">•</span>
                  <span className="text-gray-700">{t('infoCards.bodyComposition.features.bmi')}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600">•</span>
                  <span className="text-gray-700">{t('infoCards.bodyComposition.features.bodyFat')}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600">•</span>
                  <span className="text-gray-700">{t('infoCards.bodyComposition.features.idealWeight')}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600">•</span>
                  <span className="text-gray-700">{t('infoCards.bodyComposition.features.waistHip')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
            <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-3 text-green-800">
                <span className="text-2xl">🔥</span>
                {t('infoCards.fitnessNutrition.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600">•</span>
                  <span className="text-gray-700">{t('infoCards.fitnessNutrition.features.calories')}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600">•</span>
                  <span className="text-gray-700">{t('infoCards.fitnessNutrition.features.exercise')}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600">•</span>
                  <span className="text-gray-700">{t('infoCards.fitnessNutrition.features.heartRate')}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600">•</span>
                  <span className="text-gray-700">{t('infoCards.fitnessNutrition.features.goalTracking')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Health Disclaimer */}
        <Card className="mt-12 border-0 shadow-lg bg-gradient-to-r from-amber-50 to-orange-50">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-200 rounded-full">
                <span className="text-2xl">🏥</span>
              </div>
              <div>
                <h3 className="font-bold text-amber-900 text-lg mb-2">{t('disclaimer.title')}</h3>
                <p className="text-amber-800 leading-relaxed">
                  {t('disclaimer.content')}
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