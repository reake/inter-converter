import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getUnitTools, getPopularTools } from '@/config/tools';
import { ArrowRight, TrendingUp, Users, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Unit & Measurement Converters - Free Online Tools | InterConverter',
  description: 'Convert between different units of measurement including length, weight, temperature, area, volume, speed, pressure, energy, power, and data storage. Free, accurate, and instant conversion tools.',
  keywords: [
    'unit converter',
    'measurement converter',
    'length converter',
    'weight converter',
    'temperature converter',
    'area converter',
    'volume converter',
    'speed converter',
    'pressure converter',
    'energy converter',
    'power converter',
    'data converter',
    'metric imperial converter',
    'measurement tools',
    'conversion calculator'
  ].join(', '),
  openGraph: {
    title: 'Unit & Measurement Converters | InterConverter',
    description: 'Convert between different units of measurement with our comprehensive collection of free online conversion tools.',
    type: 'website',
    url: 'https://interconverter.com/unit'
  },
  alternates: {
    canonical: '/unit'
  }
};

export default function UnitPage() {
  const allUnitTools = getUnitTools();
  
  // Get popular tools (top 6 by search volume)
  const popularTools = getPopularTools().filter(tool => tool.category === 'unit').slice(0, 6);

  // Get tools by keywords/type
  const lengthTools = allUnitTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('length') || keyword.includes('meter') || keyword.includes('feet') || keyword.includes('inch'))
  );
  const weightTools = allUnitTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('weight') || keyword.includes('mass') || keyword.includes('pound') || keyword.includes('kilogram'))
  );
  const temperatureTools = allUnitTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('temperature') || keyword.includes('celsius') || keyword.includes('fahrenheit'))
  );
  const areaTools = allUnitTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('area') || keyword.includes('square'))
  );
  const volumeTools = allUnitTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('volume') || keyword.includes('liter') || keyword.includes('gallon'))
  );
  const speedTools = allUnitTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('speed') || keyword.includes('velocity'))
  );
  const pressureTools = allUnitTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('pressure'))
  );
  const energyTools = allUnitTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('energy'))
  );
  const powerTools = allUnitTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('power'))
  );
  const dataTools = allUnitTools.filter(tool => 
    tool.keywords.some(keyword => keyword.includes('data') || keyword.includes('byte'))
  );

  const toolCategories = [
    {
      name: 'Length & Distance',
      description: 'Convert between meters, feet, inches, miles, and more',
      tools: lengthTools,
      icon: '📏',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      name: 'Weight & Mass',
      description: 'Convert between kilograms, pounds, grams, ounces, and more',
      tools: weightTools,
      icon: '⚖️',
      color: 'bg-green-50 border-green-200'
    },
    {
      name: 'Temperature',
      description: 'Convert between Celsius, Fahrenheit, and Kelvin',
      tools: temperatureTools,
      icon: '🌡️',
      color: 'bg-red-50 border-red-200'
    },
    {
      name: 'Area & Volume',
      description: 'Convert area and volume measurements',
      tools: [...areaTools, ...volumeTools],
      icon: '📐',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      name: 'Speed & Motion',
      description: 'Convert between different speed and velocity units',
      tools: speedTools,
      icon: '🏃',
      color: 'bg-orange-50 border-orange-200'
    },
    {
      name: 'Engineering Units',
      description: 'Convert pressure, energy, power, and data storage units',
      tools: [...pressureTools, ...energyTools, ...powerTools, ...dataTools],
      icon: '🔧',
      color: 'bg-indigo-50 border-indigo-200'
    }
  ];

  const ToolCard = ({ tool }: { tool: any }) => (
    <Link key={tool.id} href={tool.path} className="group">
      <Card className="h-full hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="text-2xl">{tool.icon}</div>
            <Badge variant="secondary" className="text-xs">
              {(tool.searchVolume || 0).toLocaleString()} searches/mo
            </Badge>
          </div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {tool.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm mb-3">
            {tool.description}
          </CardDescription>
          <div className="flex items-center text-primary text-sm font-medium">
            Convert Now
            <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Unit & Measurement Converters
        </h1>
        <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
          Convert between different units of measurement with our comprehensive collection of free online tools. 
          Accurate, fast, and easy-to-use converters for length, weight, temperature, and more.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>10M+ conversions monthly</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>100% Free & Accurate</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            <span>Real-time Results</span>
          </div>
        </div>
      </div>

      {/* Popular Tools */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Most Popular Converters</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularTools.map((tool) => (
            <Link key={tool.id} href={tool.path} className="group">
              <Card className="h-full hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl">{tool.icon}</div>
                    <Badge variant="secondary" className="text-xs">
                      {(tool.searchVolume || 0).toLocaleString()} searches/mo
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {tool.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm mb-3">
                    {tool.description}
                  </CardDescription>
                  <div className="flex items-center text-primary text-sm font-medium">
                    Convert Now
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

      {/* Features Section */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Choose Our Unit Converters?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Precision Accuracy</h3>
              <p className="text-sm text-gray-600">
                Our converters use precise mathematical formulas to ensure accurate results every time.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Real-time Results</h3>
              <p className="text-sm text-gray-600">
                Get instant conversions as you type, with no delays or waiting times.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">User-Friendly</h3>
              <p className="text-sm text-gray-600">
                Clean, intuitive interface designed for both beginners and professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="prose max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Complete Unit Conversion Solutions
        </h2>
        <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-600">
          <div>
            <p className="mb-4">
              Our comprehensive unit converter collection covers all major measurement systems used worldwide. 
              Whether you need to convert between metric and imperial units, or work with specialized 
              engineering measurements, our tools provide accurate and reliable results.
            </p>
            <p className="mb-4">
              <strong>Length Conversions:</strong> Convert between meters, feet, inches, centimeters, 
              millimeters, kilometers, miles, yards, and more. Perfect for construction, engineering, 
              and everyday measurements.
            </p>
            <p>
              <strong>Weight & Mass:</strong> Easily convert between kilograms, pounds, grams, ounces, 
              stones, and other weight units. Ideal for cooking, fitness, shipping, and scientific applications.
            </p>
          </div>
          <div>
            <p className="mb-4">
              <strong>Temperature Scales:</strong> Convert between Celsius, Fahrenheit, and Kelvin 
              temperature scales. Essential for weather, cooking, scientific research, and international communication.
            </p>
            <p className="mb-4">
              <strong>Engineering Units:</strong> Professional-grade converters for pressure (PSI, Bar, Pascal), 
              energy (Joules, calories, BTU), power (Watts, horsepower), and data storage (KB, MB, GB, TB).
            </p>
            <p>
              All our converters are free to use, require no registration, and work on all devices. 
              Perfect for students, professionals, and anyone who needs quick and accurate unit conversions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
