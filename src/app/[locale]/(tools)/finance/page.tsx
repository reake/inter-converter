import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getFinanceTools, getToolsByCategory, getPopularTools, FINANCE_TOOLS_CONFIG } from '@/config/tools';

// Force static generation
export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Free Financial Calculators & Tools | Loans, Mortgages, Investments | InterConverter',
    description: 'Comprehensive financial calculators for loans, mortgages, investments, taxes, and more. Free tools for personal finance planning and analysis.',
    keywords: [
      'financial calculators',
      'loan calculator',
      'mortgage calculator',
      'investment calculator',
      'tax calculator',
      'finance tools',
      'personal finance',
      'financial planning',
      'money calculator',
      'free financial tools'
    ],
    openGraph: {
      title: 'Free Financial Calculators & Tools | InterConverter',
      description: 'Comprehensive financial calculators for loans, mortgages, investments, taxes, and more. Free tools for personal finance planning.',
      type: 'website',
      url: 'https://interconverter.com/finance',
      siteName: 'InterConverter',
      images: [
        {
          url: 'https://interconverter.com/images/og-finance.jpg',
          width: 1200,
          height: 630,
          alt: 'Financial Calculators & Tools - InterConverter',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Free Financial Calculators & Tools | InterConverter',
      description: 'Comprehensive financial calculators for loans, mortgages, investments, taxes, and more.',
      creator: '@interconverter',
    },
    alternates: {
      canonical: 'https://interconverter.com/finance'
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}


export default function FinancePage() {
  const allFinanceTools = getFinanceTools();
  const popularTools = getPopularTools().filter(tool => tool.category === 'finance').slice(0, 6);
  
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const ToolCard = ({ tool }: { tool: any }) => (
    <Link href={tool.path} className="block group">
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
              {tool.difficulty}
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <span className="text-4xl">💰</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Financial Calculators & Tools
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Comprehensive collection of 77+ financial calculators for loans, mortgages, investments, taxes, and more. 
              Free tools to help you make informed financial decisions and plan your financial future.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>💰</span>
                <span>77+ Financial Tools</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>🏦</span>
                <span>Banking & Loans</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>📊</span>
                <span>Investment Planning</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>🏠</span>
                <span>Real Estate</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Popular Financial Tools */}
        <section className="mb-16">
          <SectionHeader 
            title="Most Popular Financial Calculators" 
            description="Start with these most-used financial planning tools"
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
            title="Loans & Credit" 
            description="Calculate loan payments, interest costs, and repayment strategies"
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
            title="Mortgages & Real Estate" 
            description="Home loan calculators, refinancing tools, and real estate analysis"
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
            title="Credit Cards" 
            description="Credit card payoff calculators and debt management tools"
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
            title="Banking & Savings" 
            description="Savings growth calculators and compound interest tools"
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
            title="All Financial Categories" 
            description="Browse tools by category"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { id: 'loans', name: 'Loans & Credit', description: 'Loan calculators and credit tools', icon: '💳', color: 'bg-blue-500', tools: loanTools },
              { id: 'mortgages', name: 'Mortgages', description: 'Home loan and mortgage calculators', icon: '🏠', color: 'bg-green-500', tools: mortgageTools },
              { id: 'investments', name: 'Investments', description: 'Investment and portfolio tools', icon: '📈', color: 'bg-purple-500', tools: investmentTools },
              { id: 'banking', name: 'Banking', description: 'Savings and banking calculators', icon: '🏦', color: 'bg-indigo-500', tools: bankingTools }
            ].map((category) => (
              <Card key={category.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] text-center">
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${category.color} text-white rounded-2xl mb-4`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                  <Badge className={`${category.color} text-white border-0`}>
                    {category.tools.length} Tools
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
                Financial Planning Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-bold text-green-700 mb-1">Build Emergency Fund</h4>
                  <p className="text-sm text-green-600">Save 3-6 months of expenses for unexpected situations</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-bold text-green-700 mb-1">Pay Off High-Interest Debt</h4>
                  <p className="text-sm text-green-600">Prioritize credit card debt and high-interest loans</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-bold text-green-700 mb-1">Start Investing Early</h4>
                  <p className="text-sm text-green-600">Take advantage of compound interest and time</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-bold text-green-700 mb-1">Diversify Investments</h4>
                  <p className="text-sm text-green-600">Spread risk across different asset classes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
            <CardHeader className="bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-3 text-blue-800">
                <span className="text-2xl">📊</span>
                Financial Milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-bold text-blue-700 mb-1">20s: Build Foundation</h4>
                  <p className="text-sm text-blue-600">Emergency fund, pay off student loans, start 401k</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-bold text-blue-700 mb-1">30s: Accelerate Growth</h4>
                  <p className="text-sm text-blue-600">Increase savings rate, consider home purchase</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-bold text-blue-700 mb-1">40s: Peak Earning</h4>
                  <p className="text-sm text-blue-600">Maximize retirement contributions, plan for kids' college</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-bold text-blue-700 mb-1">50s+: Pre-Retirement</h4>
                  <p className="text-sm text-blue-600">Catch-up contributions, reduce investment risk</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Financial Concepts */}
        <section className="mb-16 mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Key Financial Concepts
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-500 text-white rounded-lg">
                    <span className="text-xl">📈</span>
                  </div>
                  <h3 className="font-bold text-lg text-purple-900">Compound Interest</h3>
                </div>
                <div className="space-y-2 text-sm text-purple-700">
                  <div>• Interest earned on interest</div>
                  <div>• Time is your best friend</div>
                  <div>• Start investing early</div>
                  <div>• Reinvest dividends and gains</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-500 text-white rounded-lg">
                    <span className="text-xl">⚖️</span>
                  </div>
                  <h3 className="font-bold text-lg text-orange-900">Risk vs Return</h3>
                </div>
                <div className="space-y-2 text-sm text-orange-700">
                  <div>• Higher returns require higher risk</div>
                  <div>• Diversification reduces risk</div>
                  <div>• Match risk to time horizon</div>
                  <div>• Don't put all eggs in one basket</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-50 to-teal-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-teal-500 text-white rounded-lg">
                    <span className="text-xl">💰</span>
                  </div>
                  <h3 className="font-bold text-lg text-teal-900">Time Value of Money</h3>
                </div>
                <div className="space-y-2 text-sm text-teal-700">
                  <div>• Money today is worth more than tomorrow</div>
                  <div>• Inflation reduces purchasing power</div>
                  <div>• Present value vs future value</div>
                  <div>• Discount rates and opportunity cost</div>
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
                <h3 className="font-bold text-amber-900 text-lg mb-2">Important Disclaimer</h3>
                <p className="text-amber-800 leading-relaxed">
                  These financial calculators provide estimates for educational and informational purposes only. Results may vary 
                  based on individual circumstances, market conditions, interest rates, and other factors. This information should 
                  not be considered as professional financial, investment, tax, or legal advice. Always consult with qualified 
                  financial professionals before making important financial decisions. Past performance does not guarantee future 
                  results. Interest rates, tax laws, and market conditions can change significantly over time.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
