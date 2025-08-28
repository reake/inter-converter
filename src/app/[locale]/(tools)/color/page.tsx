import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getColorTools } from '@/config/tools';
import { ArrowRight, TrendingUp, Users, Star, Palette } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Color & Design Tools - Free Online Color Converters | InterConverter',
  description: 'Professional color conversion tools including HEX to RGB, color picker, gradient generator, palette creator, and contrast checker. Free web design tools for developers and designers.',
  keywords: [
    'color converter',
    'hex to rgb converter',
    'rgb to hex converter',
    'color picker',
    'gradient generator',
    'color palette generator',
    'contrast checker',
    'web design tools',
    'css color tools',
    'color code converter',
    'design tools',
    'accessibility tools',
    'wcag contrast',
    'color theory tools'
  ].join(', '),
  openGraph: {
    title: 'Color & Design Tools | InterConverter',
    description: 'Professional color conversion and design tools for web developers and designers.',
    type: 'website',
  },
  alternates: {
    canonical: '/color'
  }
};

const toolCategories = [
  {
    name: 'Color Conversion',
    description: 'Convert between different color formats and codes',
    tools: getColorTools().filter(tool => 
      tool.id.includes('hex') || tool.id.includes('rgb') || tool.id.includes('hsl')
    ),
    icon: '🎨',
    color: 'bg-pink-50 border-pink-200'
  },
  {
    name: 'Color Selection',
    description: 'Pick and choose colors with advanced tools',
    tools: getColorTools().filter(tool => 
      tool.id.includes('picker') || tool.id.includes('palette')
    ),
    icon: '🎯',
    color: 'bg-blue-50 border-blue-200'
  },
  {
    name: 'Design Generation',
    description: 'Create gradients and color schemes',
    tools: getColorTools().filter(tool => 
      tool.id.includes('gradient') || tool.id.includes('generator')
    ),
    icon: '🌅',
    color: 'bg-purple-50 border-purple-200'
  },
  {
    name: 'Accessibility',
    description: 'Ensure your designs meet accessibility standards',
    tools: getColorTools().filter(tool => 
      tool.id.includes('contrast') || tool.id.includes('accessibility')
    ),
    icon: '♿',
    color: 'bg-green-50 border-green-200'
  }
];

export default function ColorToolsPage() {
  const colorTools = getColorTools();
  
  // Popular tools (high search volume)
  const popularTools = colorTools.filter(tool => (tool.searchVolume || 0) > 50000);
  
  // Essential tools (most commonly used)
  const essentialTools = colorTools.filter(tool => (tool.difficulty || 1) === 1);
  
  // Advanced tools (for professionals)
  const advancedTools = colorTools.filter(tool => (tool.difficulty || 1) >= 2);
  
  // New and trending tools
  const trendingTools = colorTools.filter(tool => tool.isActive);

  // All tools sorted by popularity
  const allTools = colorTools
    .sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0))
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <Palette className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Color & Design Tools
        </h1>
        <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
          Professional color conversion tools for web developers and designers. Convert color codes, 
          pick colors, generate gradients, and ensure accessibility compliance.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>5M+ designers trust us</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>Professional Grade Tools</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            <span>WCAG Compliant</span>
          </div>
        </div>
      </div>

      {/* Popular Tools */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Essential Color Tools</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularTools.map((tool) => (
            <Link key={tool.id} href={tool.path} className="group">
              <Card className="h-full hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl">{tool.icon}</div>
                    <Badge variant="secondary" className="text-xs">
                      {(tool.searchVolume || 0).toLocaleString()}
                    </Badge>
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
                    Use Tool
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
        <div className="grid lg:grid-cols-2 gap-8">
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
                          <div className="text-xs text-gray-500">
                            {(tool.searchVolume || 0).toLocaleString()} monthly searches
                          </div>
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

      {/* Color Showcase */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 rounded-2xl p-8 border border-purple-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Professional Color Workflows
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Design Systems</h3>
              <p className="text-sm text-gray-600">
                Create consistent color palettes for your brand and design system with our palette generator.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Web Development</h3>
              <p className="text-sm text-gray-600">
                Convert between HEX, RGB, and HSL formats for seamless CSS integration and web development.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Accessibility</h3>
              <p className="text-sm text-gray-600">
                Ensure your designs meet WCAG guidelines with our contrast checker and accessibility tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="prose max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Complete Color Tool Suite for Designers
        </h2>
        <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-600">
          <div>
            <p className="mb-4">
              Our comprehensive color tool collection provides everything designers and developers need 
              for professional color workflows. From basic color conversions to advanced palette generation, 
              our tools support modern design and development practices.
            </p>
            <p className="mb-4">
              <strong>Color Conversion Tools:</strong> Seamlessly convert between HEX, RGB, and HSL 
              color formats. Perfect for web development, CSS styling, and cross-platform design consistency.
            </p>
            <p>
              <strong>Design Generation:</strong> Create beautiful gradients, extract color palettes 
              from images, and generate harmonious color schemes based on color theory principles.
            </p>
          </div>
          <div>
            <p className="mb-4">
              <strong>Professional Color Picker:</strong> Advanced color selection with HSL controls, 
              color history, and real-time preview. Supports all major color formats and provides 
              instant CSS code generation.
            </p>
            <p className="mb-4">
              <strong>Accessibility Compliance:</strong> Ensure your designs meet WCAG AA and AAA 
              standards with our contrast checker. Test text readability and color combinations 
              for optimal accessibility.
            </p>
            <p>
              All tools are free, work offline after loading, and provide professional-grade accuracy. 
              Perfect for UI/UX designers, web developers, graphic designers, and digital artists.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
