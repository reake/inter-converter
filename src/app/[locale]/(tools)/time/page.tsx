import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getTimeTools } from '@/config/tools';
import { ArrowRight, TrendingUp, Users, Star, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Time & Date Tools - Free Online Converters & Calculators | InterConverter',
  description: 'Professional time and date tools including timestamp converter, timezone converter, date calculator, age calculator, countdown timer, and world clock. Free online time conversion tools.',
  keywords: [
    'timestamp converter',
    'timezone converter',
    'date calculator',
    'age calculator',
    'countdown timer',
    'world clock',
    'unix timestamp',
    'epoch converter',
    'time zone conversion',
    'date difference calculator',
    'working days calculator',
    'stopwatch online',
    'time conversion tools',
    'date tools'
  ].join(', '),
  openGraph: {
    title: 'Time & Date Tools | InterConverter',
    description: 'Professional time and date conversion tools for developers, businesses, and everyday use.',
    type: 'website',
  },
  alternates: {
    canonical: '/time'
  }
};

export default function TimeToolsPage() {
  const timeTools = getTimeTools();
  
  const toolCategories = [
    {
      name: 'Time Conversion',
      description: 'Convert between different time formats and zones',
      tools: timeTools.filter(tool => 
        tool.id.includes('timestamp') || tool.id.includes('timezone')
      ),
      icon: '🌍',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      name: 'Date Calculation',
      description: 'Calculate dates, ages, and time differences',
      tools: timeTools.filter(tool => 
        tool.id.includes('date') || tool.id.includes('age')
      ),
      icon: '📅',
      color: 'bg-green-50 border-green-200'
    },
    {
      name: 'Time Tracking',
      description: 'Timers, stopwatches, and countdown tools',
      tools: timeTools.filter(tool => 
        tool.id.includes('timer') || tool.id.includes('stopwatch') || tool.id.includes('countdown')
      ),
      icon: '⏱️',
      color: 'bg-purple-50 border-purple-200'
    }
  ];
  
  // Popular tools (high search volume)
  const popularTools = timeTools.filter(tool => (tool.searchVolume || 0) > 50000);
  
  // Essential tools (most commonly used)
  const essentialTools = timeTools.filter(tool => (tool.difficulty || 1) === 1);
  
  // Advanced tools (for professionals)
  const advancedTools = timeTools.filter(tool => (tool.difficulty || 1) >= 2);

  // All tools sorted by popularity
  const allTools = timeTools
    .sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0))
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
            <Clock className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Time & Date Tools
        </h1>
        <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
          Professional time and date conversion tools for developers, businesses, and everyday use. 
          Convert timestamps, calculate dates, manage timezones, and track time worldwide.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>15M+ time conversions</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>Timezone Accurate</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            <span>Real-time Updates</span>
          </div>
        </div>
      </div>

      {/* Popular Tools */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Most Used Time Tools</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="grid lg:grid-cols-3 gap-8">
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

      {/* Developer Tools Section */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 rounded-2xl p-8 border border-indigo-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Essential for Developers & Businesses
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Unix Timestamps</h3>
              <p className="text-sm text-gray-600">
                Convert Unix timestamps to human-readable dates for database queries, API responses, and log analysis.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Global Timezones</h3>
              <p className="text-sm text-gray-600">
                Handle international business with accurate timezone conversions and daylight saving time support.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Business Planning</h3>
              <p className="text-sm text-gray-600">
                Calculate working days, project timelines, and business deadlines with precision and accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="prose max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Professional Time Management Tools
        </h2>
        <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-600">
          <div>
            <p className="mb-4">
              Our comprehensive time and date tool collection serves developers, businesses, and individuals 
              who need accurate time calculations and conversions. From Unix timestamp conversion to 
              international timezone management, our tools handle complex time-related tasks with precision.
            </p>
            <p className="mb-4">
              <strong>Developer Tools:</strong> Convert Unix timestamps (epoch time) to readable dates, 
              handle API timestamps, debug time-related issues, and manage database date fields with 
              our professional timestamp converter.
            </p>
            <p>
              <strong>Business Applications:</strong> Calculate working days between project milestones, 
              plan international meetings across timezones, and track deadlines with our business-focused 
              date calculation tools.
            </p>
          </div>
          <div>
            <p className="mb-4">
              <strong>Global Operations:</strong> Our timezone converter supports all world timezones 
              with automatic daylight saving time adjustments. Perfect for international teams, 
              global businesses, and remote work coordination.
            </p>
            <p className="mb-4">
              <strong>Personal Productivity:</strong> Use our countdown timers for events, calculate 
              your exact age, track time with our stopwatch, and stay organized with world clock 
              displays for multiple cities.
            </p>
            <p>
              All tools provide real-time accuracy, work offline after loading, and support multiple 
              date formats. Essential for software development, project management, and international business.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
