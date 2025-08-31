import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAutoTools, getPopularTools } from '@/config/tools';
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
  const t = await getTranslations({ locale, namespace: 'categoryPages.auto' });
  
  const title = t('seo.title');
  const description = t('description');
  // Keywords are already an array in JSON, no need to parse
  const keywordsRaw = t.raw('seo.keywords') as string[];
  const keywords = keywordsRaw || [];
  
  return generateSEOMetadata({
    title,
    description,
    locale,
    pathname: '/auto',
    keywords
  });
}

export default async function AutoPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categoryPages.auto' });
  const allAutoTools = getAutoTools();
  
  // Get popular tools (top 6 by search volume)
  const popularTools = getPopularTools().filter(tool => tool.category === 'auto').slice(0, 6);

  // Get tools by category
  const engineTools = allAutoTools.filter(tool => 
    tool.keywords.some(keyword => 
      keyword.includes('engine') || 
      keyword.includes('horsepower') || 
      keyword.includes('compression') ||
      keyword.includes('carburetor')
    )
  );
  
  const transmissionTools = allAutoTools.filter(tool => 
    tool.keywords.some(keyword => 
      keyword.includes('gear') || 
      keyword.includes('transmission') ||
      keyword.includes('rpm')
    )
  );
  
  const performanceTools = allAutoTools.filter(tool => 
    tool.keywords.some(keyword => 
      keyword.includes('performance') || 
      keyword.includes('tuning') ||
      keyword.includes('dyno')
    )
  );
  
  const drivetrainTools = allAutoTools.filter(tool => 
    tool.keywords.some(keyword => 
      keyword.includes('drivetrain') || 
      keyword.includes('differential') ||
      keyword.includes('axle')
    )
  );
  
  const fluidTools = allAutoTools.filter(tool => 
    tool.keywords.some(keyword => 
      keyword.includes('fluid') || 
      keyword.includes('oil') ||
      keyword.includes('coolant')
    )
  );

  const getDifficultyColor = (difficulty: string | number) => {
    // Convert numeric difficulty to string
    const difficultyMap: { [key: string]: string } = {
      '0': 'beginner',
      '1': 'intermediate', 
      '2': 'advanced',
      'beginner': 'beginner',
      'intermediate': 'intermediate',
      'advanced': 'advanced'
    };
    
    const difficultyKey = difficultyMap[String(difficulty)] || 'beginner';
    
    switch (difficultyKey) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const getDifficultyLabel = (difficulty: string | number) => {
    // Convert numeric difficulty to string
    const difficultyMap: { [key: string]: string } = {
      '0': 'beginner',
      '1': 'intermediate', 
      '2': 'advanced',
      'beginner': 'beginner',
      'intermediate': 'intermediate',
      'advanced': 'advanced'
    };
    
    const difficultyKey = difficultyMap[String(difficulty)] || 'beginner';
    return t(`difficulty.${difficultyKey}`);
  };

  const ToolCard = ({ tool }: { tool: any }) => (
    <Link href={tool.path as any} className="block group">
      <Card className="h-full hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] border-0 shadow-md bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                {tool.name}
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2 line-clamp-2">
                {tool.description}
              </CardDescription>
            </div>
            <div className="ml-4 p-3 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors">
              <span className="text-3xl">{tool.icon}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className={`capitalize font-medium ${getDifficultyColor(tool.difficulty)}`}>
              {getDifficultyLabel(tool.difficulty)}
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
  );

  const SectionHeader = ({ title, description }: { title: string; description?: string }) => (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
      {description && (
        <p className="text-gray-600 text-lg">{description}</p>
      )}
    </div>
  );

  return (
    <>
      <HreflangLinks currentLocale={locale} pathname="/auto" />
      <CanonicalLink locale={locale} pathname="/auto" />
      <JsonLd data={generateWebsiteSchema(locale)} />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-orange-600 text-white">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <span className="text-4xl">🏎️</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto mb-8">
              {t('description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>🏎️</span>
                <span>{t('stats.autoTools')}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>⚡</span>
                <span>{t('stats.realTimeCalculations')}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>🔧</span>
                <span>{t('stats.professionalFormulas')}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>📱</span>
                <span>{t('stats.mobileOptimized')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Engine Tools */}
        <section className="mb-16">
          <SectionHeader 
            title={t('sections.enginePerformance.title')} 
            description={t('sections.enginePerformance.description')}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {engineTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Drivetrain Tools */}
        <section className="mb-16">
          <SectionHeader 
            title={t('sections.drivetrainGearing.title')} 
            description={t('sections.drivetrainGearing.description')}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {drivetrainTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Performance Tools */}
        <section className="mb-16">
          <SectionHeader 
            title={t('sections.performanceAnalysis.title')} 
            description={t('sections.performanceAnalysis.description')}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {performanceTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Fluid Tools */}
        {fluidTools.length > 0 && (
          <section className="mb-16">
            <SectionHeader 
              title={t('sections.fluidsWeight.title')} 
              description={t('sections.fluidsWeight.description')}
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {fluidTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        )}

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-blue-900">
                <span className="text-2xl">📚</span>
                {t('infoCards.aboutCalculators.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800 leading-relaxed">
                {t('infoCards.aboutCalculators.content')}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-amber-900">
                <span className="text-2xl">⚠️</span>
                {t('infoCards.safetyNotice.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-800 leading-relaxed">
                {t('infoCards.safetyNotice.content')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </>
  );
}