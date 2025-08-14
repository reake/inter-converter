import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getToolsByCategory } from '@/config/tools';



// Cloudflare Pages Edge Runtime 配置
export const runtime = 'edge';
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Free Finance & Currency Converters | InterConverter',
    description: 'Professional financial tools: currency converter with live rates, loan calculator, mortgage calculator, tax estimator. Free, accurate, instant results.',
    keywords: [
      'currency converter',
      'live exchange rates',
      'loan calculator',
      'mortgage calculator',
      'tax calculator',
      'financial tools',
      'currency exchange calculator',
      'loan payment calculator',
      'finance calculator online',
      'free financial tools'
    ],
    openGraph: {
      title: 'Free Finance & Currency Converters | InterConverter',
      description: 'Professional financial converters: currency converter with live rates, loan calculator, mortgage calculator, tax estimator. Free, accurate, instant results.',
      type: 'website',
      url: 'https://interconverter.com/finance',
      siteName: 'InterConverter',
      images: [
        {
          url: 'https://interconverter.com/images/og-finance.jpg',
          width: 1200,
          height: 630,
          alt: 'Finance & Currency Calculators - InterConverter',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Free Finance & Currency Calculators | InterConverter',
      description: 'Professional financial tools: currency converter with live rates, loan calculator, mortgage calculator, tax estimator.',
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

export default function CurrencyFinancePage() {
  const tools = getToolsByCategory('finance');

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'bg-green-100 text-green-800 border-green-200';
    if (difficulty <= 3) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <span className="text-4xl">💰</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Currency & Finance Tools
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Professional financial calculators for currency conversion, loan analysis, and tax planning.
              Make informed financial decisions with accurate, real-time calculations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>📊</span>
                <span>Real-time data</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>🔒</span>
                <span>Secure calculations</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>💼</span>
                <span>Professional grade</span>
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
              Financial Calculators
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive suite of financial tools designed for accuracy and ease of use
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link key={tool.id} href={tool.path} className="block group">
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
                        Level {tool.difficulty || 1}/5
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

        {/* Feature Cards */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Financial Tools?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built with precision and designed for professionals, students, and everyday users
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-lg text-center bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-blue-900">Real-time Data</h3>
                <p className="text-blue-800 text-sm">
                  Live exchange rates and up-to-date financial information
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-purple-900">Secure & Private</h3>
                <p className="text-purple-800 text-sm">
                  Your financial data stays private with client-side calculations
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-green-900">Instant Results</h3>
                <p className="text-green-800 text-sm">
                  Lightning-fast calculations with professional accuracy
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-orange-900">Mobile Ready</h3>
                <p className="text-orange-800 text-sm">
                  Perfect experience on all devices and screen sizes
                </p>
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
                <span className="text-2xl">💱</span>
                Currency Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600">•</span>
                  <span className="text-gray-700">Real-time exchange rates from major financial sources</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600">•</span>
                  <span className="text-gray-700">Historical currency data and trend analysis</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600">•</span>
                  <span className="text-gray-700">Multi-currency conversion for international business</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600">•</span>
                  <span className="text-gray-700">Travel and business planning tools</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
            <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-3 text-green-800">
                <span className="text-2xl">🏦</span>
                Financial Calculators
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600">•</span>
                  <span className="text-gray-700">Comprehensive loan payment calculations</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600">•</span>
                  <span className="text-gray-700">Detailed mortgage amortization schedules</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600">•</span>
                  <span className="text-gray-700">Accurate tax liability estimation tools</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600">•</span>
                  <span className="text-gray-700">Investment planning and analysis tools</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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
                  These calculators are provided for educational and informational purposes only. 
                  While we strive for accuracy, results should not be considered as professional financial advice. 
                  Always consult with qualified financial professionals, accountants, or advisors for important financial decisions, 
                  tax planning, or investment strategies.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}