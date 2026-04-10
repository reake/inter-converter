import { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getReviewApprovedToolsByCategory } from '@/config/tools';
import { ArrowRight, TrendingUp, Users, Star, Car } from 'lucide-react';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';
import { JsonLd, generateWebsiteSchema } from '@/components/seo/JsonLd';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categoryPages.auto' });

  const title = t('seo.title');
  const description = t('description');
  const keywordsRaw = t.raw('seo.keywords') as string[];
  const keywords = keywordsRaw || [];

  return generateSEOMetadata({
    title,
    description,
    locale,
    pathname: '/auto',
    keywords,
  });
}

export default async function AutoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categoryPages.auto' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://interconverter.com';
  const localePrefix = locale === 'en' ? '' : `/${locale}`;
  const autoTools = getReviewApprovedToolsByCategory('auto', locale);

  const toolCategories = [
    {
      name: t('sections.enginePerformance.title'),
      description: t('sections.enginePerformance.description'),
      tools: autoTools.filter((tool) =>
        [
          'carburetor-cfm-calculator',
          'compression-ratio-calculator',
          'engine-size-converter',
          'engine-volume-calculator',
          'engine-displacement-calculator',
          'volumetric-efficiency-calculator',
          'supercharger-calculator',
          'ram-air-calculator',
          'temperature-converter',
          'temperature-converter-enhanced',
        ].includes(tool.id),
      ),
      icon: '🔧',
      color: 'bg-red-50 border-red-200',
    },
    {
      name: t('sections.drivetrainGearing.title'),
      description: t('sections.drivetrainGearing.description'),
      tools: autoTools.filter((tool) =>
        ['gear-ratio-calculator', 'rpm-calculator', 'tire-calculator', 'tire-speed-calculator'].includes(
          tool.id,
        ),
      ),
      icon: '⚙️',
      color: 'bg-blue-50 border-blue-200',
    },
    {
      name: t('sections.performanceAnalysis.title'),
      description: t('sections.performanceAnalysis.description'),
      tools: autoTools.filter((tool) =>
        [
          'power-to-weight-ratio',
          'power-to-weight-calculator',
          'torque-horsepower-calculator',
          'speed-converter',
        ].includes(tool.id),
      ),
      icon: '🏁',
      color: 'bg-orange-50 border-orange-200',
    },
    {
      name: t('sections.fluidsWeight.title'),
      description: t('sections.fluidsWeight.description'),
      tools: autoTools.filter((tool) => ['fluid-weight-calculator', 'auto-weight-converter'].includes(tool.id)),
      icon: '🛢️',
      color: 'bg-green-50 border-green-200',
    },
  ].filter((category) => category.tools.length > 0);

  const popularTools = autoTools.filter((tool) => (tool.searchVolume || 0) >= 10000).slice(0, 8);

  return (
    <>
      <JsonLd data={generateWebsiteSchema(locale)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: t('title'),
          description: t('description'),
          url: `${baseUrl}${localePrefix}/auto`,
          inLanguage: locale,
          isPartOf: {
            '@type': 'WebSite',
            name: 'InterConverter',
            url: baseUrl,
          },
        }}
      />

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-amber-500">
              <Car className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">{t('title')}</h1>
          <p className="mx-auto mb-6 max-w-3xl text-xl text-gray-600">{t('description')}</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{t('stats.autoTools')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>{t('stats.formulaBasedReferences')}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span>{t('stats.realTimeCalculations')}</span>
            </div>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">{t('sections.popular.title')}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {popularTools.map((tool) => (
              <Link key={tool.id} href={tool.path} className="group">
                <Card className="h-full border-2 transition-all duration-200 hover:border-primary/20 hover:shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="text-2xl">{tool.icon}</div>
                    <CardTitle className="text-lg transition-colors group-hover:text-primary">
                      {tool.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-3 text-sm">{tool.description.split('.')[0]}.</CardDescription>
                    <div className="flex items-center text-sm font-medium text-primary">
                      {t('sections.popular.useTool')}
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">{t('sections.categories.title')}</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            {toolCategories.map((category) => (
              <Card key={category.name} className={`${category.color} border-2`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{category.icon}</div>
                    <div>
                      <CardTitle className="text-xl">{category.name}</CardTitle>
                      <CardDescription className="text-sm">{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.tools.map((tool) => (
                      <Link
                        key={tool.id}
                        href={tool.path}
                        className="group flex items-center justify-between rounded-lg bg-white/60 p-3 transition-colors hover:bg-white/80"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{tool.icon}</span>
                          <div>
                            <div className="font-medium text-gray-900 transition-colors group-hover:text-primary">
                              {tool.name}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-primary" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 p-8">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">{t('sections.notes.title')}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t('infoCards.aboutCalculators.title')}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-gray-600">
                  {t('infoCards.aboutCalculators.content')}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{t('infoCards.safetyNotice.title')}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-gray-600">
                  {t('infoCards.safetyNotice.content')}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
