import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Force static generation
export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Moving Cost Calculator - Relocation & Moving Expense Tools | 搬家费用计算器',
    description: 'Calculate moving costs and relocation expenses with our comprehensive moving calculator. Plan your move budget and compare moving company quotes.',
    keywords: [
      'moving cost calculator',
      'moving calculator',
      'relocation cost calculator',
      'moving expense calculator',
      'moving budget calculator',
      'cost of moving calculator',
      '搬家费用计算器',
      '搬迁成本计算器'
    ],
    openGraph: {
      title: 'Moving Cost Calculator - Relocation Planning Tools',
      description: 'Professional moving cost calculator to plan your relocation budget and moving expenses.',
      type: 'website',
    },
    alternates: {
      canonical: '/moving'
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}

const movingTools = [
  {
    id: 'moving-cost-calculator',
    name: 'Moving Cost Calculator',
    description: 'Calculate comprehensive moving costs including packing, transportation, and additional services',
    category: 'Moving Costs',
    path: '/finance/loan-calculator',
    icon: '📦',
    difficulty: 2,
    searchVolume: 95000,
    isPopular: true
  }
];

const categories = [
  { name: 'Moving Costs', count: 1, color: 'bg-blue-500' }
];

export default function MovingPage() {
  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'bg-green-100 text-green-800 border-green-200';
    if (difficulty <= 3) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty <= 2) return 'Easy';
    if (difficulty <= 3) return 'Medium';
    return 'Advanced';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <span className="text-4xl">📦</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Moving Cost Calculator
            </h1>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto mb-8">
              Professional moving cost calculator to plan your relocation budget. Calculate moving expenses, 
              compare quotes, and prepare for all costs associated with your move.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>📦</span>
                <span>Moving Calculator</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>💰</span>
                <span>Budget Planning</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>📊</span>
                <span>Cost Estimation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Moving Calculator */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Moving Cost Calculator
          </h2>
          <div className="flex justify-center">
            <Link href={movingTools[0].path} className="block group">
              <Card className="w-96 hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02] border-0 shadow-lg bg-gradient-to-br from-white to-teal-50">
                <CardHeader className="pb-4 text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-teal-100 rounded-full group-hover:bg-teal-200 transition-colors mb-4 mx-auto">
                    <span className="text-5xl">{movingTools[0].icon}</span>
                  </div>
                  <div className="flex justify-center mb-2">
                    <Badge className="bg-teal-500 text-white">Popular</Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                    {movingTools[0].name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-3 leading-relaxed">
                    {movingTools[0].description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <div className="flex items-center justify-center gap-4">
                    <Badge variant="outline" className={`font-medium ${getDifficultyColor(movingTools[0].difficulty)}`}>
                      {getDifficultyLabel(movingTools[0].difficulty)}
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                      {movingTools[0].searchVolume.toLocaleString()}/mo
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* Moving Cost Factors */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Moving Cost Factors
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">📏</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-blue-900">Distance</h3>
                <div className="space-y-1 text-sm text-blue-700">
                  <div>• Local moves (under 50 miles)</div>
                  <div>• Long-distance moves</div>
                  <div>• Interstate relocations</div>
                  <div>• International moves</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-green-900">Home Size</h3>
                <div className="space-y-1 text-sm text-green-700">
                  <div>• Studio/1 bedroom</div>
                  <div>• 2-3 bedroom homes</div>
                  <div>• 4+ bedroom houses</div>
                  <div>• Commercial spaces</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">🛠️</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-purple-900">Services</h3>
                <div className="space-y-1 text-sm text-purple-700">
                  <div>• Packing services</div>
                  <div>• Loading/unloading</div>
                  <div>• Storage solutions</div>
                  <div>• Specialty item handling</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">📅</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-orange-900">Timing</h3>
                <div className="space-y-1 text-sm text-orange-700">
                  <div>• Peak season (summer)</div>
                  <div>• Off-season discounts</div>
                  <div>• Weekend vs weekday</div>
                  <div>• Rush/expedited moves</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Moving Types Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Types of Moving Services
          </h2>
          <div className="grid gap-8 md:grid-cols-1">
            {/* Full-Service Moving */}
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-400 to-cyan-500"></div>
              <CardHeader className="bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardTitle className="flex items-center gap-3 text-blue-800">
                  <span className="text-3xl">🚛</span>
                  Full-Service Moving
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="font-bold text-blue-700 mb-3">Services Included</h4>
                    <div className="space-y-2 text-sm text-blue-600">
                      <div>• Professional packing and unpacking</div>
                      <div>• Loading and unloading</div>
                      <div>• Transportation and delivery</div>
                      <div>• Furniture disassembly/assembly</div>
                      <div>• Basic insurance coverage</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-700 mb-3">Cost Range</h4>
                    <div className="space-y-2 text-sm text-blue-600">
                      <div>• <strong>Local:</strong> $80-120/hour for 2-3 movers</div>
                      <div>• <strong>Long-distance:</strong> $2,500-5,000+</div>
                      <div>• <strong>Factors:</strong> Distance, size, services</div>
                      <div>• <strong>Best for:</strong> Busy professionals, families</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Self-Service Moving */}
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
              <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
                <CardTitle className="flex items-center gap-3 text-green-800">
                  <span className="text-3xl">📦</span>
                  Self-Service Moving
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="font-bold text-green-700 mb-3">DIY Options</h4>
                    <div className="space-y-2 text-sm text-green-600">
                      <div>• <strong>Truck Rental:</strong> U-Haul, Budget, Penske</div>
                      <div>• <strong>Container Services:</strong> PODS, U-Pack</div>
                      <div>• <strong>Hybrid Services:</strong> Labor-only help</div>
                      <div>• <strong>Supplies:</strong> Boxes, tape, bubble wrap</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-700 mb-3">Cost Savings</h4>
                    <div className="space-y-2 text-sm text-green-600">
                      <div>• <strong>Truck Rental:</strong> $30-300/day + gas</div>
                      <div>• <strong>Container:</strong> $1,500-3,000 long-distance</div>
                      <div>• <strong>Savings:</strong> 50-70% vs full-service</div>
                      <div>• <strong>Best for:</strong> Budget-conscious, local moves</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Moving Tips */}
        <div className="grid gap-8 md:grid-cols-2 mt-16">
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-teal-400 to-cyan-500"></div>
            <CardHeader className="bg-gradient-to-br from-teal-50 to-cyan-50">
              <CardTitle className="flex items-center gap-3 text-teal-800">
                <span className="text-2xl">💡</span>
                Money-Saving Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="p-3 bg-teal-50 rounded-lg">
                  <h4 className="font-bold text-teal-700 mb-1">Get Multiple Quotes</h4>
                  <p className="text-sm text-teal-600">Compare at least 3 moving company estimates</p>
                </div>
                <div className="p-3 bg-teal-50 rounded-lg">
                  <h4 className="font-bold text-teal-700 mb-1">Move Off-Peak</h4>
                  <p className="text-sm text-teal-600">Avoid summer months and weekends for better rates</p>
                </div>
                <div className="p-3 bg-teal-50 rounded-lg">
                  <h4 className="font-bold text-teal-700 mb-1">Declutter First</h4>
                  <p className="text-sm text-teal-600">Sell or donate items to reduce moving weight</p>
                </div>
                <div className="p-3 bg-teal-50 rounded-lg">
                  <h4 className="font-bold text-teal-700 mb-1">Pack Yourself</h4>
                  <p className="text-sm text-teal-600">Save on packing services by doing it yourself</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-purple-400 to-indigo-500"></div>
            <CardHeader className="bg-gradient-to-br from-purple-50 to-indigo-50">
              <CardTitle className="flex items-center gap-3 text-purple-800">
                <span className="text-2xl">📋</span>
                Moving Checklist
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-bold text-purple-700 mb-1">8 Weeks Before</h4>
                  <p className="text-sm text-purple-600">Research and book moving company</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-bold text-purple-700 mb-1">6 Weeks Before</h4>
                  <p className="text-sm text-purple-600">Start decluttering and ordering supplies</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-bold text-purple-700 mb-1">4 Weeks Before</h4>
                  <p className="text-sm text-purple-600">Change address and transfer utilities</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-bold text-purple-700 mb-1">2 Weeks Before</h4>
                  <p className="text-sm text-purple-600">Confirm details and start packing</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hidden Moving Costs */}
        <section className="mb-16 mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Hidden Moving Costs to Consider
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-500 text-white rounded-lg">
                    <span className="text-xl">💰</span>
                  </div>
                  <h3 className="font-bold text-lg text-red-900">Extra Fees</h3>
                </div>
                <div className="space-y-2 text-sm text-red-700">
                  <div>• Long carry charges</div>
                  <div>• Stair/elevator fees</div>
                  <div>• Shuttle service costs</div>
                  <div>• Fuel surcharges</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-500 text-white rounded-lg">
                    <span className="text-xl">📦</span>
                  </div>
                  <h3 className="font-bold text-lg text-yellow-900">Supplies</h3>
                </div>
                <div className="space-y-2 text-sm text-yellow-700">
                  <div>• Boxes and packing materials</div>
                  <div>• Bubble wrap and padding</div>
                  <div>• Tape and labels</div>
                  <div>• Specialty boxes</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500 text-white rounded-lg">
                    <span className="text-xl">🏠</span>
                  </div>
                  <h3 className="font-bold text-lg text-blue-900">New Home</h3>
                </div>
                <div className="space-y-2 text-sm text-blue-700">
                  <div>• Utility deposits and setup</div>
                  <div>• Home repairs and cleaning</div>
                  <div>• New furniture needs</div>
                  <div>• Storage unit rental</div>
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
                  This moving cost calculator provides estimates for educational purposes only. Actual moving costs may vary 
                  significantly based on specific circumstances, distance, services required, time of year, and moving company 
                  policies. Prices can fluctuate based on demand, fuel costs, and other market factors. Always obtain detailed 
                  written estimates from licensed moving companies and verify their credentials before making decisions. 
                  Consider additional costs like insurance, tips, and unexpected expenses when budgeting for your move.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
