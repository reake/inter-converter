import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getToolsByCategory } from '@/config/tools';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Color & Design Tools - HEX to RGB, Color Converters for Designers',
    description: 'Professional color Converters tools for designers and developers. Convert between HEX, RGB, HSL, and other color formats.',
    keywords: [
      'color converter',
      'hex to rgb',
      'rgb to hex',
      'color picker',
      'design tools',
      'css colors'
    ],
    openGraph: {
      title: 'Color & Design Tools',
      description: 'Professional color Converters tools for designers and developers.',
      type: 'website',
    },
    alternates: {
      canonical: '/color'
    }
  };
}

export default function ColorDesignPage() {
  const tools = getToolsByCategory('color');

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'bg-green-100 text-green-800 border-green-200';
    if (difficulty <= 3) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <span className="text-4xl">🎨</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Color & Design Tools
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Professional color Converters tools for designers, developers, and creatives. 
              Work seamlessly with colors across different formats and design systems.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>🌈</span>
                <span>All color formats</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>⚡</span>
                <span>Instant Converters</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>🎯</span>
                <span>Designer focused</span>
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
              Color Converters Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Convert between HEX, RGB, HSL, CMYK and other color formats with precision
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link key={tool.id} href={tool.path} className="block group">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02] border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {tool.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600 mt-2 line-clamp-2">
                          {tool.description}
                        </CardDescription>
                      </div>
                      <div className="ml-4 p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
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

        {/* Color Format Examples */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Color Format Guide
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understanding different color formats and when to use them
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-red-500 rounded-2xl mx-auto mb-4 shadow-lg"></div>
                <h3 className="font-bold text-lg mb-2 text-red-900">HEX</h3>
                <p className="text-red-800 text-sm mb-2">#FF5733</p>
                <p className="text-red-700 text-xs">Web standard format</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-500 rounded-2xl mx-auto mb-4 shadow-lg"></div>
                <h3 className="font-bold text-lg mb-2 text-green-900">RGB</h3>
                <p className="text-green-800 text-sm mb-2">rgb(255, 87, 51)</p>
                <p className="text-green-700 text-xs">Screen display format</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl mx-auto mb-4 shadow-lg"></div>
                <h3 className="font-bold text-lg mb-2 text-blue-900">HSL</h3>
                <p className="text-blue-800 text-sm mb-2">hsl(12, 100%, 60%)</p>
                <p className="text-blue-700 text-xs">Human-friendly format</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl mx-auto mb-4 shadow-lg"></div>
                <h3 className="font-bold text-lg mb-2 text-purple-900">CMYK</h3>
                <p className="text-purple-800 text-sm mb-2">cmyk(0, 66, 80, 0)</p>
                <p className="text-purple-700 text-xs">Print color format</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Information Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-pink-400 to-purple-500"></div>
            <CardHeader className="bg-gradient-to-br from-pink-50 to-purple-50">
              <CardTitle className="flex items-center gap-3 text-pink-800">
                <span className="text-2xl">🎨</span>
                Design Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-3">
                <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                  <span className="text-pink-600">•</span>
                  <span className="text-gray-700">Web development and CSS styling</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                  <span className="text-pink-600">•</span>
                  <span className="text-gray-700">Graphic design and branding projects</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                  <span className="text-pink-600">•</span>
                  <span className="text-gray-700">UI/UX design consistency</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                  <span className="text-pink-600">•</span>
                  <span className="text-gray-700">Print design preparation</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-orange-400 to-red-500"></div>
            <CardHeader className="bg-gradient-to-br from-orange-50 to-red-50">
              <CardTitle className="flex items-center gap-3 text-orange-800">
                <span className="text-2xl">🌈</span>
                Color Theory Basics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-400 rounded-lg">
                  <h4 className="font-bold text-red-700 mb-1">Primary Colors</h4>
                  <p className="text-sm text-red-600">Red, Blue, Yellow - foundation colors that cannot be created by mixing</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-400 rounded-lg">
                  <h4 className="font-bold text-green-700 mb-1">Secondary Colors</h4>
                  <p className="text-sm text-green-600">Orange, Green, Purple - created by mixing two primary colors</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-400 rounded-lg">
                  <h4 className="font-bold text-blue-700 mb-1">Tertiary Colors</h4>
                  <p className="text-sm text-blue-600">Created by mixing primary and secondary colors together</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pro Tips */}
        <Card className="mt-12 border-0 shadow-lg bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-200 rounded-full">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <h3 className="font-bold text-indigo-900 text-lg mb-2">Pro Designer Tips</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="text-indigo-800">
                    <strong>Web Design:</strong> Use HEX codes for consistency across browsers and frameworks
                  </div>
                  <div className="text-indigo-800">
                    <strong>Print Design:</strong> Always convert to CMYK before sending to print
                  </div>
                  <div className="text-indigo-800">
                    <strong>Accessibility:</strong> Ensure sufficient contrast ratios for readability
                  </div>
                  <div className="text-indigo-800">
                    <strong>Brand Colors:</strong> Document exact color values for brand consistency
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