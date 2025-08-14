import React from "react";
import { Metadata } from 'next';
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
import { generateHomeMetadata } from "@/config/seo";
import { StructuredData } from "@/components/seo/StructuredData";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateHomeMetadata(locale);
}


export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const popularTools = getPopularTools(6);

  return (
    <>
      <StructuredData tools={popularTools} locale={locale} />
     
      {/* Hero Section */}
      <section className="relative overflow-visible bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-indigo-700/90"></div>
        <div className="relative container mx-auto px-4 py-20 text-center text-white max-w-7xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            InterConverter
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-100">
            Free Online Converters Tools & Calculators
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-12 max-w-5xl mx-auto leading-relaxed">
            Professional-grade Converters tools and calculators for developers, engineers,
            students, and professionals. Completely free, secure, and works instantly in your
            browser without downloads.
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8 relative z-50">
            <SearchInput
              placeholder="Search Converters tools..."
              redirectTo="/tools"
              locale={locale}
              showSuggestions={true}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold shadow-lg">
              <Link href="/tools">Explore All Tools</Link>
            </Button>
            <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-lg border-0">
              <Link href="/tools">Browse Categories</Link>
            </Button>
          </div>
        </div>
      </section>

       <div className="container mx-auto px-4 py-8">

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

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 rounded-3xl mx-4">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about our Converters tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-3 text-gray-900">
                  Are these tools really free?
                </h3>
                <p className="text-gray-700">
                  Yes! All our Converters tools are completely free to use with no hidden costs,
                  registration requirements, or usage limits. We believe in providing accessible tools for everyone.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-3 text-gray-900">
                  Do you store my data?
                </h3>
                <p className="text-gray-700">
                  No, all calculations are performed locally in your browser. We don't store, track,
                  or have access to your input data or results. Your privacy is our priority.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-3 text-gray-900">
                  How accurate are the results?
                </h3>
                <p className="text-gray-700">
                  Our tools use industry-standard formulas and regularly updated data sources to ensure
                  maximum accuracy. For financial tools, we use real-time exchange rates and official data.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-3 text-gray-900">
                  Do I need to create an account?
                </h3>
                <p className="text-gray-700">
                  No registration required! Simply visit any tool page and start converting immediately.
                  All tools work instantly without any sign-up process.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-3 text-gray-900">
                  Can I use these tools on mobile?
                </h3>
                <p className="text-gray-700">
                  Absolutely! All our tools are fully responsive and optimized for mobile devices.
                  They work perfectly on smartphones, tablets, and desktop computers.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-3 text-gray-900">
                  How often are exchange rates updated?
                </h3>
                <p className="text-gray-700">
                  Currency exchange rates are updated every 15 minutes during market hours from reliable
                  financial data providers to ensure you get the most current rates.
                </p>
              </div>
            </div>
          </div>
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
              InterConverter.com is the premier destination for professional-grade Converters tools and calculators. 
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
                  Complete privacy and security for all your Converterss.
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
                  new Converters tools based on user feedback and industry needs.
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
              rely on our tools for accurate, fast, and reliable Converterss.
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
                Get immediate, accurate Converterss without delays. All processing happens in your browser for maximum speed.
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
                Your data stays on your device. No tracking, no data collection, complete privacy for all your Converterss.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
    </>
  );
}
