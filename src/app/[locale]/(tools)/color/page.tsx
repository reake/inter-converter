import { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getColorTools } from '@/config/tools';
import { ArrowRight, TrendingUp, Users, Star, Palette } from 'lucide-react';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';
import { HreflangLinks } from '@/components/seo/HreflangLinks';
import { CanonicalLink } from '@/components/seo/CanonicalLink';
import { JsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categoryPages.color' });
  
  const title = t('seo.title');
  const description = t('description');
  // Keywords are already an array in JSON, no need to parse
  const keywordsRaw = t.raw('seo.keywords') as string[];
  const keywords = keywordsRaw || [];
  
  return generateSEOMetadata({
    title,
    description,
    locale,
    pathname: '/color',
    keywords
  });
}


export default async function ColorToolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categoryPages.color' });
  
  const toolCategories = [
    {
      name: t('categories.colorConversion.name'),
      description: t('categories.colorConversion.description'),
      tools: getColorTools().filter(tool => 
        tool.id.includes('hex') || tool.id.includes('rgb') || tool.id.includes('hsl')
      ),
      icon: t('categories.colorConversion.icon'),
      color: 'bg-pink-50 border-pink-200'
    },
    {
      name: t('categories.colorSelection.name'),
      description: t('categories.colorSelection.description'),
      tools: getColorTools().filter(tool => 
        tool.id.includes('picker') || tool.id.includes('palette')
      ),
      icon: t('categories.colorSelection.icon'),
      color: 'bg-blue-50 border-blue-200'
    },
    {
      name: t('categories.designGeneration.name'),
      description: t('categories.designGeneration.description'),
      tools: getColorTools().filter(tool => 
        tool.id.includes('gradient') || tool.id.includes('generator')
      ),
      icon: t('categories.designGeneration.icon'),
      color: 'bg-purple-50 border-purple-200'
    },
    {
      name: t('categories.accessibility.name'),
      description: t('categories.accessibility.description'),
      tools: getColorTools().filter(tool => 
        tool.id.includes('contrast') || tool.id.includes('accessibility')
      ),
      icon: t('categories.accessibility.icon'),
      color: 'bg-green-50 border-green-200'
    }
  ];
  const colorTools = getColorTools();
  
  // Popular tools (high search volume)
  const popularTools = colorTools.filter(tool => (tool.searchVolume || 0) > 50000);
  
  // Essential tools (most commonly used)
  const essentialTools = colorTools.filter(tool => (tool.difficulty || 1) === 1);
  
  // Advanced tools (for professionals)
  const advancedTools = colorTools.filter(tool => (tool.difficulty || 1) >= 2);
  
  // New and trending tools
  const trendingTools = colorTools.filter(tool => tool.isActive);

  // All tools sorted by popularity
  const allTools = colorTools
    .sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0))
    .slice(0, 4);

  return (
    <>
      <HreflangLinks pathname="/color" currentLocale={locale} />
      <CanonicalLink pathname="/color" locale={locale} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": t('title'),
          "description": t('description'),
          "url": `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/color`,
          "inLanguage": locale,
          "isPartOf": {
            "@type": "WebSite",
            "name": "InterConverter",
            "url": process.env.NEXT_PUBLIC_SITE_URL
          }
        }}
      />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Palette className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            {t('description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{t('stats.designers')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>{t('stats.professionalGrade')}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span>{t('stats.wcagCompliant')}</span>
            </div>
          </div>
        </div>

        {/* Popular Tools */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('sections.essential.title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTools.map((tool) => (
              <Link key={tool.id} href={tool.path as any} className="group">
                <Card className="h-full hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl">{tool.icon}</div>
                      <Badge variant="secondary" className="text-xs">
                        {(tool.searchVolume || 0).toLocaleString()}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {tool.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm mb-3">
                      {tool.description.split('.')[0]}.
                    </CardDescription>
                    <div className="flex items-center text-primary text-sm font-medium">
                      {t('sections.essential.useTool')}
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
                      href={tool.path as any}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/60 hover:bg-white/80 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{tool.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                            {tool.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {(tool.searchVolume || 0).toLocaleString()} {t('common.monthlySearches')}
                          </div>
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

        {/* Color Showcase */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 rounded-2xl p-8 border border-purple-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {t('sections.workflows.title')}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Palette className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('workflows.designSystems.title')}</h3>
                <p className="text-sm text-gray-600">
                  {t('workflows.designSystems.description')}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('workflows.webDevelopment.title')}</h3>
                <p className="text-sm text-gray-600">
                  {t('workflows.webDevelopment.description')}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('workflows.accessibility.title')}</h3>
                <p className="text-sm text-gray-600">
                  {t('workflows.accessibility.description')}
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
                <strong>{t('categories.colorConversion.name')}:</strong> {t('content.colorConversion')}
              </p>
              <p>
                <strong>{t('categories.designGeneration.name')}:</strong> {t('content.designGeneration')}
              </p>
            </div>
            <div>
              <p className="mb-4">
                <strong>{t('workflows.webDevelopment.title')}:</strong> {t('content.professionalColorPicker')}
              </p>
              <p className="mb-4">
                <strong>{t('categories.accessibility.name')}:</strong> {t('content.accessibilityCompliance')}
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
