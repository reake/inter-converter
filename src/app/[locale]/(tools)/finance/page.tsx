import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getFinanceTools, getPopularTools } from '@/config/tools';
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
  const t = await getTranslations({ locale, namespace: 'categoryPages.finance' });
  
  const title = t('seo.title');
  const description = t('description');
  // Keywords are already an array in JSON, no need to parse
  const keywordsRaw = t.raw('seo.keywords') as string[];
  const keywords = keywordsRaw || [];
  
  return generateSEOMetadata({
    title,
    description,
    locale,
    pathname: '/finance',
    keywords
  });
}


export default async function FinancePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categoryPages.finance' });
  const allFinanceTools = getFinanceTools(undefined, locale);
  const popularTools = getPopularTools(10, locale).filter(tool => tool.category === 'finance').slice(0, 6);
  
  // Get tools by keywords/type (since we don't have subcategory)
  const loanTools = allFinanceTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('loan')) || tool.name.toLowerCase().includes('loan')
  );
  const mortgageTools = allFinanceTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('mortgage')) || tool.name.toLowerCase().includes('mortgage')
  );
  const creditCardTools = allFinanceTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('credit')) || tool.name.toLowerCase().includes('credit')
  );
  const bankingTools = allFinanceTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('saving') || keyword.includes('bank')) || 
    tool.name.toLowerCase().includes('saving') || tool.name.toLowerCase().includes('bank')
  );
  const taxTools = allFinanceTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('tax')) || tool.name.toLowerCase().includes('tax')
  );
  const currencyTools = allFinanceTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('currency')) || tool.name.toLowerCase().includes('currency')
  );
  const investmentTools = allFinanceTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('invest') || keyword.includes('stock') || keyword.includes('portfolio')) || 
    tool.name.toLowerCase().includes('invest') || tool.name.toLowerCase().includes('stock')
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
              <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {tool.name}
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2 line-clamp-2">
                {tool.description}
              </CardDescription>
            </div>
            <div className="ml-4 p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
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
      <HreflangLinks pathname="/finance" />
      <CanonicalLink locale={locale} pathname="/finance" />
      <JsonLd data={generateWebsiteSchema(locale)} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <span className="text-4xl">💰</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              {t('description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>💰</span>
                <span>{t('stats.financialTools')}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>🏦</span>
                <span>{t('stats.bankingLoans')}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>📊</span>
                <span>{t('stats.investmentPlanning')}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>🏠</span>
                <span>{t('stats.realEstate')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Popular Financial Tools */}
        <section className="mb-16">
          <SectionHeader 
            title={t('sections.popular.title')} 
            description={t('sections.popular.description')}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {popularTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Loans & Credit */}
        <section className="mb-16">
          <SectionHeader 
            title={t('sections.loansCredit.title')} 
            description={t('sections.loansCredit.description')}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loanTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Mortgages & Real Estate */}
        <section className="mb-16">
          <SectionHeader 
            title={t('sections.mortgagesRealEstate.title')} 
            description={t('sections.mortgagesRealEstate.description')}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mortgageTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Credit Cards */}
        <section className="mb-16">
          <SectionHeader 
            title={t('sections.creditCards.title')} 
            description={t('sections.creditCards.description')}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {creditCardTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Banking & Savings */}
        <section className="mb-16">
          <SectionHeader 
            title={t('sections.bankingSavings.title')} 
            description={t('sections.bankingSavings.description')}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bankingTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Financial Tool Categories Overview */}
        <section className="mb-16">
          <SectionHeader 
            title={t('sections.allCategories.title')} 
            description={t('sections.allCategories.description')}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { id: 'loans', name: t('categories.loans.name'), description: t('categories.loans.description'), icon: '💳', color: 'bg-blue-500', tools: loanTools },
              { id: 'mortgages', name: t('categories.mortgages.name'), description: t('categories.mortgages.description'), icon: '🏠', color: 'bg-green-500', tools: mortgageTools },
              { id: 'investments', name: t('categories.investments.name'), description: t('categories.investments.description'), icon: '📈', color: 'bg-purple-500', tools: investmentTools },
              { id: 'banking', name: t('categories.banking.name'), description: t('categories.banking.description'), icon: '🏦', color: 'bg-indigo-500', tools: bankingTools }
            ].map((category) => (
              <Card key={category.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] text-center">
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${category.color} text-white rounded-2xl mb-4`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                  <Badge className={`${category.color} text-white border-0`}>
                    {category.tools.length} {t('common.tools')}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Financial Planning Tips */}
        <div className="grid gap-8 md:grid-cols-2 mt-16">
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
            <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-3 text-green-800">
                <span className="text-2xl">💡</span>
                {t('tips.planningTips.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-bold text-green-700 mb-1">{t('tips.planningTips.emergencyFund.title')}</h4>
                  <p className="text-sm text-green-600">{t('tips.planningTips.emergencyFund.description')}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-bold text-green-700 mb-1">{t('tips.planningTips.payOffDebt.title')}</h4>
                  <p className="text-sm text-green-600">{t('tips.planningTips.payOffDebt.description')}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-bold text-green-700 mb-1">{t('tips.planningTips.startInvesting.title')}</h4>
                  <p className="text-sm text-green-600">{t('tips.planningTips.startInvesting.description')}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-bold text-green-700 mb-1">{t('tips.planningTips.diversify.title')}</h4>
                  <p className="text-sm text-green-600">{t('tips.planningTips.diversify.description')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
            <CardHeader className="bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-3 text-blue-800">
                <span className="text-2xl">📊</span>
                {t('tips.milestones.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-bold text-blue-700 mb-1">{t('tips.milestones.twenties.title')}</h4>
                  <p className="text-sm text-blue-600">{t('tips.milestones.twenties.description')}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-bold text-blue-700 mb-1">{t('tips.milestones.thirties.title')}</h4>
                  <p className="text-sm text-blue-600">{t('tips.milestones.thirties.description')}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-bold text-blue-700 mb-1">{t('tips.milestones.forties.title')}</h4>
                  <p className="text-sm text-blue-600">{t('tips.milestones.forties.description')}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-bold text-blue-700 mb-1">{t('tips.milestones.fifties.title')}</h4>
                  <p className="text-sm text-blue-600">{t('tips.milestones.fifties.description')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Financial Concepts */}
        <section className="mb-16 mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('concepts.title')}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-500 text-white rounded-lg">
                    <span className="text-xl">📈</span>
                  </div>
                  <h3 className="font-bold text-lg text-purple-900">{t('concepts.compoundInterest.title')}</h3>
                </div>
                <div className="space-y-2 text-sm text-purple-700">
                  <div>• {t('concepts.compoundInterest.point1')}</div>
                  <div>• {t('concepts.compoundInterest.point2')}</div>
                  <div>• {t('concepts.compoundInterest.point3')}</div>
                  <div>• {t('concepts.compoundInterest.point4')}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-500 text-white rounded-lg">
                    <span className="text-xl">⚖️</span>
                  </div>
                  <h3 className="font-bold text-lg text-orange-900">{t('concepts.riskReturn.title')}</h3>
                </div>
                <div className="space-y-2 text-sm text-orange-700">
                  <div>• {t('concepts.riskReturn.point1')}</div>
                  <div>• {t('concepts.riskReturn.point2')}</div>
                  <div>• {t('concepts.riskReturn.point3')}</div>
                  <div>• {t('concepts.riskReturn.point4')}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-50 to-teal-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-teal-500 text-white rounded-lg">
                    <span className="text-xl">💰</span>
                  </div>
                  <h3 className="font-bold text-lg text-teal-900">{t('concepts.timeValue.title')}</h3>
                </div>
                <div className="space-y-2 text-sm text-teal-700">
                  <div>• {t('concepts.timeValue.point1')}</div>
                  <div>• {t('concepts.timeValue.point2')}</div>
                  <div>• {t('concepts.timeValue.point3')}</div>
                  <div>• {t('concepts.timeValue.point4')}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Disclaimer */}
        <Card className="mt-12 border-0 shadow-lg bg-gradient-to-r from-amber-50 to-orange-50">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-200 rounded-full">
                <span className="text-2xl">⚠️</span>
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
