import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getToolsByCategory } from '@/config/tools';



// Cloudflare Pages Edge Runtime 配置
export const runtime = 'edge';
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Time & Date Calculators - Timestamp, Countdown, Date Difference Tools',
    description: 'Comprehensive collection of time and date Converters tools. Convert timestamps, create countdown timers, and calculate date differences.',
    keywords: [
      'time calculators',
      'date calculators',
      'timestamp converter',
      'countdown timer',
      'date difference calculator',
      'time zone converter'
    ],
    openGraph: {
      title: 'Time & Date Calculators',
      description: 'Professional time and date Converters tools for developers and users.',
      type: 'website',
    },
    alternates: {
      canonical: '/time'
    }
  };
}

export default function TimeDatePage() {
  const tools = getToolsByCategory('time');

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'bg-green-100 text-green-800 border-green-200';
    if (difficulty <= 3) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <span className="text-4xl">⏰</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Time & Date Tools
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Professional time and date Converters tools for developers, project managers, and anyone working with timestamps, dates, and time calculations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>🌍</span>
                <span>Timezone support</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>⚡</span>
                <span>Real-time updates</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>🎯</span>
                <span>Developer friendly</span>
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
              Time & Date Calculators
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Convert timestamps, calculate date differences, and manage time across different formats
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link key={tool.id} href={tool.path} className="block group">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02] border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
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

        {/* Time Formats */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Common Time Formats
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understanding different time representations and when to use them
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">🕐</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-blue-900">Unix Timestamp</h3>
                <p className="text-blue-800 text-sm mb-2 font-mono">1640995200</p>
                <p className="text-blue-700 text-xs">Seconds since 1970</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">📅</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-green-900">ISO 8601</h3>
                <p className="text-green-800 text-sm mb-2 font-mono">2022-01-01T00:00:00Z</p>
                <p className="text-green-700 text-xs">International standard</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-purple-900">UTC Time</h3>
                <p className="text-purple-800 text-sm mb-2 font-mono">12:00:00 UTC</p>
                <p className="text-purple-700 text-xs">Coordinated Universal Time</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 text-white rounded-2xl mb-4">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-orange-900">Local Time</h3>
                <p className="text-orange-800 text-sm mb-2 font-mono">8:00 AM EST</p>
                <p className="text-orange-700 text-xs">Your timezone</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Use Cases */}
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-400 to-cyan-500"></div>
            <CardHeader className="bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardTitle className="flex items-center gap-3 text-blue-800">
                <span className="text-2xl">👨‍💻</span>
                For Developers
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600">•</span>
                  <span className="text-gray-700">Convert Unix timestamps to readable dates</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600">•</span>
                  <span className="text-gray-700">Handle timezone Converterss in applications</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600">•</span>
                  <span className="text-gray-700">Calculate time differences for features</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600">•</span>
                  <span className="text-gray-700">Debug time-related issues and logs</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
            <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-3 text-green-800">
                <span className="text-2xl">👥</span>
                For Everyone
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600">•</span>
                  <span className="text-gray-700">Create countdown timers for events</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600">•</span>
                  <span className="text-gray-700">Calculate age and date differences</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600">•</span>
                  <span className="text-gray-700">Plan project timelines and deadlines</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600">•</span>
                  <span className="text-gray-700">Track important dates and milestones</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Time Zone Info */}
        <Card className="mt-12 border-0 shadow-lg bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-200 rounded-full">
                <span className="text-2xl">🌍</span>
              </div>
              <div>
                <h3 className="font-bold text-indigo-900 text-lg mb-2">Time Zone Considerations</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="text-indigo-800">
                    <strong>UTC:</strong> Use for storing timestamps in databases and APIs
                  </div>
                  <div className="text-indigo-800">
                    <strong>Local Time:</strong> Display times in user's local timezone
                  </div>
                  <div className="text-indigo-800">
                    <strong>Daylight Saving:</strong> Consider DST changes in calculations
                  </div>
                  <div className="text-indigo-800">
                    <strong>ISO 8601:</strong> Standard format for date/time exchange
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