import React from "react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/SearchInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { getPopularTools } from "@/config/tools";
import { EnhancedToolCard } from "@/components/tools/EnhancedToolCard";


export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const popularTools = getPopularTools(6);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-70"></div>
        <div className="relative text-center py-24">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl mb-8 shadow-lg">
            <span className="text-4xl">🔧</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
            InterConverter
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-6 max-w-4xl mx-auto leading-relaxed">
            The ultimate collection of professional conversion tools and calculators
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Free online conversion tools for developers, designers, and professionals. 
            Convert currencies, units, colors, files, automotive calculations, and more - all in your browser.
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto mb-12">
            <SearchInput 
              placeholder="Search conversion tools..." 
              redirectTo="/tools"
              locale={locale}
              showSuggestions={true}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
              <Link href="/tools">Explore All Tools</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/tools">Automotive Tools</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>No Registration</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>Privacy Focused</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>Mobile Optimized</span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">
          Most Popular Tools
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {popularTools.map((tool, index) => (
            <EnhancedToolCard
              key={tool.id}
              tool={tool}
              featured={index < 3}
              showStats={true}
            />
          ))}
        </div>
        <div className="text-center">
          <Button asChild variant="outline">
            <Link href="/tools">View All Tools</Link>
          </Button>
        </div>
      </section>

      {/* About InterConverter Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl mx-4">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About InterConverter.com
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              InterConverter.com is the premier destination for professional-grade conversion tools and calculators. 
              Built by developers for developers, designers, engineers, and professionals who demand accuracy and efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <CardTitle className="text-xl">Professional Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Every tool is built with precision and tested for accuracy. We use industry-standard algorithms 
                  and formulas to ensure reliable results for professional use.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <CardTitle className="text-xl">Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  All calculations happen instantly in your browser. No server delays, no waiting times. 
                  Get results immediately with our optimized, client-side processing.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <CardTitle className="text-xl">Privacy First</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Your data never leaves your device. No tracking, no data collection, no user accounts required. 
                  Complete privacy and security for all your conversions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <CardTitle className="text-xl">Mobile Optimized</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Perfect experience on all devices. Responsive design ensures all tools work flawlessly 
                  on desktop, tablet, and mobile devices.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🌍</span>
                </div>
                <CardTitle className="text-xl">Global Standards</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Support for international standards, multiple currencies, units, and formats. 
                  Built for a global audience with localization and accessibility in mind.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <CardTitle className="text-xl">Always Updated</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Regular updates with new tools, features, and improvements. We continuously add 
                  new conversion tools based on user feedback and industry needs.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Trusted by Professionals Worldwide
            </h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
              From automotive engineers calculating compression ratios to web developers converting colors, 
              InterConverter.com serves thousands of professionals daily. Join the community of users who 
              rely on our tools for accurate, fast, and reliable conversions.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <span className="bg-white px-4 py-2 rounded-full shadow-sm">🔧 Engineers</span>
              <span className="bg-white px-4 py-2 rounded-full shadow-sm">💻 Developers</span>
              <span className="bg-white px-4 py-2 rounded-full shadow-sm">🎨 Designers</span>
              <span className="bg-white px-4 py-2 rounded-full shadow-sm">🏗️ Architects</span>
              <span className="bg-white px-4 py-2 rounded-full shadow-sm">📊 Analysts</span>
              <span className="bg-white px-4 py-2 rounded-full shadow-sm">🔬 Scientists</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose InterConverter?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <CardTitle>Instant Results</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get immediate, accurate conversions without delays. All processing happens in your browser for maximum speed.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🆓</span>
              </div>
              <CardTitle>Completely Free</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                No subscriptions, no hidden fees, no registration required. Professional-grade tools available to everyone.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <CardTitle>Privacy Protected</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Your data stays on your device. No tracking, no data collection, complete privacy for all your conversions.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
