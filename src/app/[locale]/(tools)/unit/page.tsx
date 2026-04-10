import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getReviewApprovedPopularTools, getReviewApprovedToolsByCategory } from '@/config/tools';
import { ArrowRight, TrendingUp, Users, Star } from 'lucide-react';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categoryPages.unit' });
  
  const title = t('seo.title');
  const description = t('description');
  // Keywords are already an array in JSON, no need to parse
  const keywordsRaw = t.raw('seo.keywords') as string[];
  const keywords = keywordsRaw || [];
  
  return generateSEOMetadata({
    title,
    description,
    locale,
    pathname: '/unit',
    keywords
  });
}

export default async function UnitPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categoryPages.unit' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://interconverter.com';
  const localePrefix = locale === 'en' ? '' : `/${locale}`;
  // Get all active unit tools from JSON data (isActive filtering is already applied in getUnitTools)
  const allUnitTools = getReviewApprovedToolsByCategory('unit', locale);
  
  // Get popular tools (top 6 by search volume)
  const popularTools = getReviewApprovedPopularTools(10, locale)
    .filter(tool => tool.category === 'unit')
    .slice(0, 6);

  // Get tools by keywords/type - now using the JSON data with isActive filtering
  const lengthTools = allUnitTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('length') || keyword.includes('meter') || keyword.includes('feet') || keyword.includes('inch'))
  );
  const weightTools = allUnitTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('weight') || keyword.includes('mass') || keyword.includes('pound') || keyword.includes('kilogram'))
  );
  const temperatureTools = allUnitTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('temperature') || keyword.includes('celsius') || keyword.includes('fahrenheit'))
  );
  const areaTools = allUnitTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('area') || keyword.includes('square'))
  );
  const volumeTools = allUnitTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('volume') || keyword.includes('liter') || keyword.includes('gallon'))
  );
  const speedTools = allUnitTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('speed') || keyword.includes('velocity'))
  );
  const pressureTools = allUnitTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('pressure'))
  );
  const energyTools = allUnitTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('energy'))
  );
  const powerTools = allUnitTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('power'))
  );
  const dataTools = allUnitTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('data') || keyword.includes('byte'))
  );

  const toolCategories = [
    {
      name: t('categories.lengthDistance.name'),
      description: t('categories.lengthDistance.description'),
      tools: lengthTools,
      icon: t('categories.lengthDistance.icon'),
      color: 'bg-blue-50 border-blue-200'
    },
    {
      name: t('categories.weightMass.name'),
      description: t('categories.weightMass.description'),
      tools: weightTools,
      icon: t('categories.weightMass.icon'),
      color: 'bg-green-50 border-green-200'
    },
    {
      name: t('categories.temperature.name'),
      description: t('categories.temperature.description'),
      tools: temperatureTools,
      icon: t('categories.temperature.icon'),
      color: 'bg-red-50 border-red-200'
    },
    {
      name: t('categories.areaVolume.name'),
      description: t('categories.areaVolume.description'),
      tools: [...areaTools, ...volumeTools],
      icon: t('categories.areaVolume.icon'),
      color: 'bg-purple-50 border-purple-200'
    },
    {
      name: t('categories.speedMotion.name'),
      description: t('categories.speedMotion.description'),
      tools: speedTools,
      icon: t('categories.speedMotion.icon'),
      color: 'bg-orange-50 border-orange-200'
    },
    {
      name: t('categories.engineeringUnits.name'),
      description: t('categories.engineeringUnits.description'),
      tools: [...pressureTools, ...energyTools, ...powerTools, ...dataTools],
      icon: t('categories.engineeringUnits.icon'),
      color: 'bg-indigo-50 border-indigo-200'
    }
  ].filter((category) => category.tools.length > 0);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": t('title'),
          "description": t('description'),
          "url": `${baseUrl}${localePrefix}/unit`,
          "inLanguage": locale,
          "isPartOf": {
            "@type": "WebSite",
            "name": "InterConverter",
            "url": baseUrl
          }
        }}
      />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            {t('description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{t('stats.conversions')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>{t('stats.freeAccurate')}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span>{t('stats.realTimeResults')}</span>
            </div>
          </div>
        </div>

        {/* Popular Tools */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('sections.popular.title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map((tool) => (
              <Link key={tool.id} href={tool.path} className="group">
                <Card className="h-full hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl">{tool.icon}</div>
                      {/* <Badge variant="secondary" className="text-xs">
                        {(tool.searchVolume || 0).toLocaleString()} {t('common.searchesPerMonth')}
                      </Badge> */}
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {tool.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm mb-3">
                      {tool.description}
                    </CardDescription>
                    <div className="flex items-center text-primary text-sm font-medium">
                      {t('sections.popular.convertNow')}
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Tool Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('sections.categories.title')}</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {toolCategories.map((category) => (
            <Card key={category.name} className={`${category.color} border-2`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{category.icon}</div>
                  <div>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {category.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {category.tools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={tool.path}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/60 hover:bg-white/80 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{tool.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                            {tool.name}
                          </div>
                          {/* <div className="text-xs text-gray-500">
                            {(tool.searchVolume || 0).toLocaleString()} {t('common.monthlySearches')}
                          </div> */}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {t('sections.features.title')}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('features.precisionAccuracy.title')}</h3>
                <p className="text-sm text-gray-600">
                  {t('features.precisionAccuracy.description')}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('features.realTimeResults.title')}</h3>
                <p className="text-sm text-gray-600">
                  {t('features.realTimeResults.description')}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('features.userFriendly.title')}</h3>
                <p className="text-sm text-gray-600">
                  {t('features.userFriendly.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('sections.complete.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-600">
            <div>
              <p className="mb-4">
                {t('content.intro')}
              </p>
              <p className="mb-4">
                <strong>{t('categories.lengthDistance.name')}:</strong> {t('content.lengthConversions')}
              </p>
              <p>
                <strong>{t('categories.weightMass.name')}:</strong> {t('content.weightMass')}
              </p>
            </div>
            <div>
              <p className="mb-4">
                <strong>{t('categories.temperature.name')}:</strong> {t('content.temperatureScales')}
              </p>
              <p className="mb-4">
                <strong>{t('categories.engineeringUnits.name')}:</strong> {t('content.engineeringUnits')}
              </p>
              <p>
                {t('content.conclusion')}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
