import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getReviewApprovedToolsByCategory } from '@/config/tools';
import { ArrowRight, TrendingUp, Users, Star, Clock } from 'lucide-react';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';
import { JsonLd, generateWebsiteSchema } from '@/components/seo/JsonLd';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categoryPages.time' });
  
  const title = t('seo.title');
  const description = t('description');
  // Keywords are already an array in JSON, no need to parse
  const keywordsRaw = t.raw('seo.keywords') as string[];
  const keywords = keywordsRaw || [];
  
  return generateSEOMetadata({
    title,
    description,
    locale,
    pathname: '/time',
    keywords
  });
}

export default async function TimeToolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categoryPages.time' });
  const timeTools = getReviewApprovedToolsByCategory('time', locale);
  
  const toolCategories = [
    {
      name: t('categories.timeConversion.name'),
      description: t('categories.timeConversion.description'),
      tools: timeTools.filter(tool => 
        tool.id.includes('timestamp') || tool.id.includes('timezone')
      ),
      icon: '🌍',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      name: t('categories.dateCalculation.name'),
      description: t('categories.dateCalculation.description'),
      tools: timeTools.filter(tool => 
        tool.id.includes('date') || tool.id.includes('age')
      ),
      icon: '📅',
      color: 'bg-green-50 border-green-200'
    },
    {
      name: t('categories.timeTracking.name'),
      description: t('categories.timeTracking.description'),
      tools: timeTools.filter(tool => 
        tool.id.includes('timer') || tool.id.includes('stopwatch') || tool.id.includes('countdown')
      ),
      icon: '⏱️',
      color: 'bg-purple-50 border-purple-200'
    }
  ].filter((category) => category.tools.length > 0);
  
  // Popular tools (high search volume)
  const popularTools = timeTools.filter(tool => (tool.searchVolume || 0) > 50000);

  return (
    <>
      <JsonLd data={generateWebsiteSchema(locale)} />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
              <Clock className="h-8 w-8 text-white" />
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
              <span>{t('stats.conversions')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>{t('stats.timezoneAccurate')}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span>{t('stats.realTimeUpdates')}</span>
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
                        {(tool.searchVolume || 0).toLocaleString()}
                      </Badge> */}
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
                      {t('sections.popular.useToolText')}
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
          <div className="grid lg:grid-cols-3 gap-8">
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

        {/* Developer Tools Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 rounded-2xl p-8 border border-indigo-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {t('sections.developer.title')}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('features.unixTimestamps.title')}</h3>
                <p className="text-sm text-gray-600">
                  {t('features.unixTimestamps.description')}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('features.globalTimezones.title')}</h3>
                <p className="text-sm text-gray-600">
                  {t('features.globalTimezones.description')}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('features.businessPlanning.title')}</h3>
                <p className="text-sm text-gray-600">
                  {t('features.businessPlanning.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('sections.professional.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-600">
            <div>
              <p className="mb-4">
                {t('content.intro')}
              </p>
              <p className="mb-4">
                <strong>{t('features.unixTimestamps.title')}:</strong> {t('content.developerTools')}
              </p>
              <p>
                <strong>{t('features.businessPlanning.title')}:</strong> {t('content.businessApplications')}
              </p>
            </div>
            <div>
              <p className="mb-4">
                <strong>{t('features.globalTimezones.title')}:</strong> {t('content.globalOperations')}
              </p>
              <p className="mb-4">
                <strong>{t('content.personalProductivityLabel')}:</strong> {t('content.personalProductivity')}
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
