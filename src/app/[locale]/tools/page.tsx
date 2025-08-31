import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getToolsByAllCategories, TOOL_CATEGORIES, getPopularTools } from '@/config/tools';
import { ArrowRight, TrendingUp, Users, Star, Calculator } from 'lucide-react';
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
  const t = await getTranslations({ locale, namespace: 'toolsPage' });
  
  const title = locale === 'zh' 
    ? '免费在线转换器和计算器 - 250+ 工具 | InterConverter'
    : 'Free Online Converters & Calculators - 250+ Tools | InterConverter';
  
  const description = t('hero.description');
  
  const keywords = locale === 'zh' 
    ? ['在线转换器', '免费计算器', '单位转换器', '货币转换器', '颜色转换器', '健康计算器', '金融计算器', '汽车计算器', '时间转换器', '测量工具', '转换工具', '在线工具', '免费工具']
    : ['online converter', 'free calculator', 'unit converter', 'currency converter', 'color converter', 'health calculator', 'financial calculator', 'automotive calculator', 'time converter', 'measurement tools', 'conversion tools', 'online tools', 'free tools'];
  
  return generateSEOMetadata({
    title,
    description,
    locale,
    pathname: '/tools',
    keywords
  });
}

export default async function ToolsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'toolsPage' });
  
  // Get all tools by categories with isActive filtering (limit 8 per category for overview)
  const toolsByCategory = getToolsByAllCategories(8);
  
  // Get popular tools across all categories
  const popularTools = getPopularTools(6);
  
  // Category icons mapping
  const categoryIcons: Record<string, string> = {
    'unit': '📏',
    'time': '⏰', 
    'finance': '💰',
    'auto': '🚗',
    'color': '🎨',
    'health': '💪',
    'media': '📁',
    'science': '🧪'
  };

  // Category colors mapping
  const categoryColors: Record<string, string> = {
    'unit': 'from-blue-500 to-blue-600',
    'time': 'from-purple-500 to-purple-600',
    'finance': 'from-green-500 to-green-600', 
    'auto': 'from-red-500 to-red-600',
    'color': 'from-pink-500 to-pink-600',
    'health': 'from-teal-500 to-teal-600',
    'media': 'from-indigo-500 to-indigo-600',
    'science': 'from-orange-500 to-orange-600'
  };

  return (
    <>
      <HreflangLinks currentLocale={locale} pathname="/tools" />
      <CanonicalLink locale={locale} pathname="/tools" />
      <JsonLd data={generateWebsiteSchema(locale)} />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Calculator className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
              {t('hero.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Users className="h-4 w-4" />
                <span>{t('hero.stats.professionalTools')}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Star className="h-4 w-4" />
                <span>{t('hero.stats.freeToUse')}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <TrendingUp className="h-4 w-4" />
                <span>{t('hero.stats.accurateResults')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('sections.popularTools')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('sections.popularToolsDescription')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map((tool) => (
              <Link key={tool.id} href={tool.path as any} className="group">
                <Card className="h-full hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] border-0 shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl">{tool.icon}</div>
                      <Badge variant="secondary" className="text-xs">
                        {(tool.searchVolume || 0).toLocaleString()}/mo
                      </Badge>
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
                      {t('actions.useTool')}
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tools by Category Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('sections.browseByCategory')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('sections.browseByCategoryDescription')}
            </p>
          </div>

          <div className="space-y-16">
            {Object.entries(toolsByCategory).map(([categoryKey, categoryTools]) => {
              const categoryInfo = TOOL_CATEGORIES[categoryKey as keyof typeof TOOL_CATEGORIES];
              const categoryIcon = categoryIcons[categoryKey] || '🔧';
              const categoryColor = categoryColors[categoryKey] || 'from-gray-500 to-gray-600';
              
              if (!categoryInfo || categoryTools.length === 0) return null;

              return (
                <div key={categoryKey} className="category-section">
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${categoryColor} rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg`}>
                        {categoryIcon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {categoryInfo.name}
                        </h3>
                        <p className="text-gray-600 max-w-2xl">{categoryInfo.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="text-sm">
                        {categoryTools.length} {t('actions.toolsCount')}
                      </Badge>
                      <Button asChild variant="outline" size="sm" className="hover:bg-primary hover:text-white transition-colors">
                        <Link href={`/${categoryKey}` as any}>
                          {t('actions.viewMore')}
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Tools Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categoryTools.map((tool) => (
                      <Link key={tool.id} href={tool.path as any} className="group">
                        <Card className="h-full hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20 bg-white">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <div className="text-2xl">{tool.icon}</div>
                              {tool.searchVolume && tool.searchVolume > 10000 && (
                                <Badge variant="secondary" className="text-xs">
                                  {tool.searchVolume > 1000000 
                                    ? `${Math.round(tool.searchVolume / 1000000)}M`
                                    : `${Math.round(tool.searchVolume / 1000)}K`
                                  }
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                              {tool.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="text-sm mb-3 line-clamp-2">
                              {tool.description}
                            </CardDescription>
                            <div className="flex items-center text-primary text-sm font-medium">
                              {t('actions.useTool')}
                              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('sections.callToAction')}
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            {t('sections.callToActionDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
              {t('actions.requestNewTool')}
            </Button>
            <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-lg border-0">
              <Link href="/">
                {t('actions.backToHome')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
