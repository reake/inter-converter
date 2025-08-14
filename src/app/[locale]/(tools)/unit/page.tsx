import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getToolsByCategory } from '@/config/tools';



// Cloudflare Pages Edge Runtime 配置
export const runtime = 'edge';
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Unit & Measurement Converters - Length, Weight, Temperature Tools',
    description: 'Convert between different units of measurement including metric and imperial systems. Length, weight, temperature, and volume converters.',
    keywords: [
      'unit converter',
      'measurement converter',
      'metric to imperial',
      'length converter',
      'weight converter',
      'temperature converter'
    ],
    openGraph: {
      title: 'Unit & Measurement Converters',
      description: 'Professional unit Converters tools for all measurement systems.',
      type: 'website',
    },
    alternates: {
      canonical: '/unit'
    }
  };
}

export default function UnitMeasurementPage() {
  const tools = getToolsByCategory('unit');

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'bg-green-100 text-green-800 border-green-200';
    if (difficulty <= 3) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <span className="text-4xl">📏</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Unit & Measurement Converters
            </h1>
            <p className="text-xl text-cyan-100 max-w-3xl mx-auto mb-8">
              Professional unit Converters tools for engineers, scientists, students, and anyone working with measurements. 
              Convert between metric and imperial systems with scientific precision.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>🔬</span>
                <span>Scientific precision</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>🌍</span>
                <span>Global standards</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>⚡</span>
                <span>Instant Converters</span>
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
              Measurement Converters
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Convert between metric and imperial units with precision and accuracy
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link key={tool.id} href={tool.path} className="block group">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02] border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">
                          {tool.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600 mt-2 line-clamp-2">
                          {tool.description}
                        </CardDescription>
                      </div>
                      <div className="ml-4 p-3 bg-cyan-50 rounded-xl group-hover:bg-cyan-100 transition-colors">
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

        {/* Measurement Categories */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Measurement Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Convert between different types of measurements and unit systems
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100 text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">📐</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-red-900">Length</h3>
                <div className="space-y-1 text-sm text-red-700">
                  <div>Meters ↔ Feet</div>
                  <div>Kilometers ↔ Miles</div>
                  <div>Inches ↔ Centimeters</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">⚖️</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-green-900">Weight</h3>
                <div className="space-y-1 text-sm text-green-700">
                  <div>Kilograms ↔ Pounds</div>
                  <div>Grams ↔ Ounces</div>
                  <div>Tons ↔ Kilograms</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">🌡️</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-blue-900">Temperature</h3>
                <div className="space-y-1 text-sm text-blue-700">
                  <div>Celsius ↔ Fahrenheit</div>
                  <div>Kelvin ↔ Celsius</div>
                  <div>Rankine Scale</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">🥤</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-purple-900">Volume</h3>
                <div className="space-y-1 text-sm text-purple-700">
                  <div>Liters ↔ Gallons</div>
                  <div>Milliliters ↔ Ounces</div>
                  <div>Cubic Meters ↔ Feet</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Unit Systems Comparison */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Metric vs Imperial Systems
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understanding the differences between measurement systems used worldwide
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-400 to-cyan-500"></div>
              <CardHeader className="bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardTitle className="flex items-center gap-3 text-blue-800">
                  <span className="text-2xl">🌍</span>
                  Metric System (SI)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-bold text-blue-700 mb-1">Base Units</h4>
                    <div className="text-sm text-blue-600 space-y-1">
                      <div>Length: Meter (m)</div>
                      <div>Mass: Kilogram (kg)</div>
                      <div>Temperature: Celsius (°C)</div>
                      <div>Volume: Liter (L)</div>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-bold text-blue-700 mb-1">Advantages</h4>
                    <div className="text-sm text-blue-600 space-y-1">
                      <div>• Decimal-based (powers of 10)</div>
                      <div>• Used by most countries</div>
                      <div>• Scientific standard</div>
                      <div>• Easy Converterss</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-orange-400 to-red-500"></div>
              <CardHeader className="bg-gradient-to-br from-orange-50 to-red-50">
                <CardTitle className="flex items-center gap-3 text-orange-800">
                  <span className="text-2xl">🇺🇸</span>
                  Imperial System
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h4 className="font-bold text-orange-700 mb-1">Base Units</h4>
                    <div className="text-sm text-orange-600 space-y-1">
                      <div>Length: Foot (ft), Inch (in)</div>
                      <div>Mass: Pound (lb), Ounce (oz)</div>
                      <div>Temperature: Fahrenheit (°F)</div>
                      <div>Volume: Gallon (gal), Quart (qt)</div>
                    </div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h4 className="font-bold text-orange-700 mb-1">Usage</h4>
                    <div className="text-sm text-orange-600 space-y-1">
                      <div>• Primarily US, UK (partial)</div>
                      <div>• Traditional measurements</div>
                      <div>• Construction, cooking</div>
                      <div>• Complex Converterss</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Common Use Cases
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              When and why you might need unit Converterss
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-lg text-center bg-gradient-to-br from-indigo-50 to-indigo-100">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">🔬</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-indigo-900">Engineering</h3>
                <p className="text-indigo-800 text-sm">
                  Precise Converterss for technical calculations and research
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">🌐</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-green-900">International Trade</h3>
                <p className="text-green-800 text-sm">
                  Convert measurements for global business and shipping
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">✈️</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-blue-900">Travel & Living</h3>
                <p className="text-blue-800 text-sm">
                  Understand local measurements when traveling or relocating
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-purple-900">Education</h3>
                <p className="text-purple-800 text-sm">
                  Learn and practice unit Converterss for academic purposes
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Converters Tips */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-teal-50 to-cyan-50">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-teal-200 rounded-full">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <h3 className="font-bold text-teal-900 text-lg mb-2">Converters Tips & Tricks</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="text-teal-800">
                    <strong>Temperature:</strong> °F = (°C × 9/5) + 32, °C = (°F - 32) × 5/9
                  </div>
                  <div className="text-teal-800">
                    <strong>Quick Length:</strong> 1 meter ≈ 3.3 feet, 1 inch = 2.54 cm
                  </div>
                  <div className="text-teal-800">
                    <strong>Weight:</strong> 1 kg ≈ 2.2 lbs, 1 lb ≈ 454 grams
                  </div>
                  <div className="text-teal-800">
                    <strong>Volume:</strong> 1 liter ≈ 0.26 gallons, 1 gallon ≈ 3.8 liters
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}