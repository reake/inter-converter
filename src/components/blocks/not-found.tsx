'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchInput } from '@/components/ui/SearchInput';
import { getPopularTools } from '@/config/tools';

export default function NotFound() {
  const popularTools = getPopularTools(6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-indigo-700/90"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20 text-center text-white max-w-4xl">
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-white/20 rounded-full backdrop-blur-sm border border-white/30 mb-6">
              <span className="text-6xl">🔍</span>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-white">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-100">
            Converter Not Found
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Oops! The conversion tool you're looking for seems to have converted itself into thin air. 
            But don't worry – we have plenty of other amazing tools to help you convert anything!
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchInput
              placeholder="Search for conversion tools..."
              redirectTo="/tools"
              locale="en"
              showSuggestions={true}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold shadow-lg">
              <Link href="/">Go Home</Link>
            </Button>
            <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-lg border-0">
              <Link href="/tools">Browse All Tools</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Try These Popular Tools Instead
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              While you're here, check out some of our most popular conversion tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {popularTools.map((tool) => (
              <Link key={tool.id} href={tool.path} className="block group">
                <Card className="h-full transition-all duration-300 group-hover:scale-[1.02] border-0 shadow-lg hover:shadow-xl bg-gradient-to-br from-white to-gray-50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{tool.icon}</span>
                      <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {tool.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {tool.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {tool.category}
                      </span>
                      <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700">
                        Try it →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Need Help Finding Something?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Go Home</h4>
              <p className="text-gray-600 text-sm mb-4">
                Start fresh from our homepage with all available tools
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/">Home Page</Link>
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Browse Tools</h4>
              <p className="text-gray-600 text-sm mb-4">
                Explore all our conversion tools by category
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/tools">All Tools</Link>
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Contact Us</h4>
              <p className="text-gray-600 text-sm mb-4">
                Can't find what you need? Let us know!
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/contact">Get Help</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
