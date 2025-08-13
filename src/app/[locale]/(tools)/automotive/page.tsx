import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AUTOMOTIVE_TOOLS_CONFIG } from '@/config/automotive-tools';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Automotive Calculators - Engine Performance & Tuning Tools',
    description: 'Comprehensive collection of automotive calculators for engine performance, tuning, and modifications. Calculate CFM, compression ratios, gear ratios, and more.',
    keywords: [
      'automotive calculators',
      'engine calculators',
      'performance calculators',
      'tuning tools',
      'carburetor calculator',
      'compression ratio',
      'gear ratio calculator'
    ],
    openGraph: {
      title: 'Automotive Calculators',
      description: 'Professional automotive calculators for engine performance and tuning.',
      type: 'website',
    },
    alternates: {
      canonical: '/automotive'
    }
  };
}

export default function AutomotivePage() {
  const engineTools = AUTOMOTIVE_TOOLS_CONFIG.filter(tool => tool.subcategory === 'engine');
  const drivetrainTools = AUTOMOTIVE_TOOLS_CONFIG.filter(tool => tool.subcategory === 'drivetrain');
  const performanceTools = AUTOMOTIVE_TOOLS_CONFIG.filter(tool => tool.subcategory === 'performance');
  const fluidTools = AUTOMOTIVE_TOOLS_CONFIG.filter(tool => tool.subcategory === 'fluids');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const ToolCard = ({ tool }: { tool: typeof AUTOMOTIVE_TOOLS_CONFIG[0] }) => (
    <Link href={tool.path} className="block group">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-orange-600 text-white">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <span className="text-4xl">🏎️</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Automotive Calculators
            </h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto mb-8">
              Professional automotive calculators for engine performance, tuning, and modifications. 
              Based on the original Mark's Street And Strip InterConverter™.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>⚡</span>
                <span>Real-time calculations</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>🔧</span>
                <span>Professional formulas</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>📱</span>
                <span>Mobile optimized</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Engine Tools */}
        <section className="mb-16">
          <SectionHeader 
            title="Engine Performance" 
            description="Calculate displacement, compression ratios, and carburetor sizing for optimal engine performance"
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
            title="Drivetrain & Gearing" 
            description="Optimize gear ratios and analyze drivetrain performance for better acceleration and top speed"
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
            title="Performance Analysis" 
            description="Analyze horsepower, torque, and overall vehicle performance metrics"
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
              title="Fluids & Weight" 
              description="Calculate fluid capacities and weight distributions for optimal vehicle setup"
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
                About These Calculators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800 leading-relaxed">
                These automotive calculators are based on proven formulas and real-world experience from 
                the original Mark's Street And Strip InterConverter™. They're designed for mechanics, 
                racers, and automotive enthusiasts who need accurate calculations for engine modifications 
                and performance tuning.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-amber-900">
                <span className="text-2xl">⚠️</span>
                Safety Notice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-800 leading-relaxed">
                These calculations are for educational and estimation purposes only. 
                Always consult with qualified automotive professionals for engine modifications, 
                tuning, and safety considerations. Actual results may vary based on specific conditions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}