import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getToolsByCategory } from '@/config/tools';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Health & Fitness Calculators - BMI, Body Fat, Calorie Tools',
    description: 'Professional health and fitness calculators including BMI calculator, body fat percentage, calorie needs, and fitness tracking tools.',
    keywords: [
      'bmi calculator',
      'body mass index',
      'health calculator',
      'fitness calculator',
      'calorie calculator',
      'body fat calculator'
    ],
    openGraph: {
      title: 'Health & Fitness Calculators',
      description: 'Professional health and fitness calculation tools for wellness tracking.',
      type: 'website',
    },
    alternates: {
      canonical: '/health-fitness'
    }
  };
}

export default function HealthFitnessPage() {
  const tools = getToolsByCategory('health-fitness');

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'bg-green-100 text-green-800 border-green-200';
    if (difficulty <= 3) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <span className="text-4xl">💪</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Health & Fitness Tools
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Professional health and fitness calculators to help you track your wellness journey. 
              Calculate BMI, body fat, calorie needs, and achieve your fitness goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>📊</span>
                <span>Accurate calculations</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>🎯</span>
                <span>Goal tracking</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>🏥</span>
                <span>Health focused</span>
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
              Health Calculators
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Track your health metrics and fitness progress with our professional-grade calculators
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

        {/* BMI Categories */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              BMI Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understand your Body Mass Index classification and what it means for your health
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">📉</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-blue-900">Underweight</h3>
                <p className="text-blue-800 text-sm mb-2">BMI &lt; 18.5</p>
                <p className="text-blue-700 text-xs">May need to gain weight</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-green-900">Normal Weight</h3>
                <p className="text-green-800 text-sm mb-2">BMI 18.5-24.9</p>
                <p className="text-green-700 text-xs">Healthy weight range</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100 text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-yellow-900">Overweight</h3>
                <p className="text-yellow-800 text-sm mb-2">BMI 25-29.9</p>
                <p className="text-yellow-700 text-xs">Consider weight loss</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100 text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">🚨</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-red-900">Obese</h3>
                <p className="text-red-800 text-sm mb-2">BMI ≥ 30</p>
                <p className="text-red-700 text-xs">Consult healthcare provider</p>
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
                Body Composition Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600">•</span>
                  <span className="text-gray-700">BMI (Body Mass Index) calculation</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600">•</span>
                  <span className="text-gray-700">Body fat percentage estimation</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600">•</span>
                  <span className="text-gray-700">Ideal weight range calculations</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600">•</span>
                  <span className="text-gray-700">Waist-to-hip ratio analysis</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
            <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-3 text-green-800">
                <span className="text-2xl">🔥</span>
                Fitness & Nutrition
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600">•</span>
                  <span className="text-gray-700">Daily calorie requirements</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600">•</span>
                  <span className="text-gray-700">Exercise calorie burn estimation</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600">•</span>
                  <span className="text-gray-700">Heart rate zone calculations</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600">•</span>
                  <span className="text-gray-700">Fitness goal tracking tools</span>
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
                <h3 className="font-bold text-amber-900 text-lg mb-2">Important Health Disclaimer</h3>
                <p className="text-amber-800 leading-relaxed">
                  These calculators are provided for educational and informational purposes only. 
                  They should not replace professional medical advice, diagnosis, or treatment. 
                  Always consult with qualified healthcare professionals for personalized health guidance, 
                  especially before starting any new diet or exercise program.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}