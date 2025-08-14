import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Target,
  Users,
  Zap,
  Shield,
  Globe,
  Heart,
  Calculator,
  Palette,
  Clock,
  DollarSign
} from 'lucide-react';



// Cloudflare Pages Edge Runtime 配置
export const runtime = 'edge';
export default function AboutPage() {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Lightning Fast',
      description: 'All calculations happen instantly in your browser without server delays.'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Privacy First',
      description: 'Your data never leaves your device. No tracking, no data collection.'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Always Available',
      description: 'Works offline and accessible 24/7 from any device with a browser.'
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Completely Free',
      description: 'No subscriptions, no ads, no hidden costs. Free forever.'
    }
  ];

  const toolCategories = [
    {
      icon: <Calculator className="h-5 w-5" />,
      name: 'Converters',
      count: '12+',
      description: 'Currency, units, timestamps, and more'
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      name: 'Calculators',
      count: '8+',
      description: 'Financial, health, and utility calculators'
    },
    {
      icon: <Palette className="h-5 w-5" />,
      name: 'Design Tools',
      count: '4+',
      description: 'Color converters and design utilities'
    },
    {
      icon: <Clock className="h-5 w-5" />,
      name: 'Time Tools',
      count: '3+',
      description: 'Date, time, and countdown utilities'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl mb-6">
          <span className="text-3xl">🔧</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
          About InterConverter
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We're building the most comprehensive collection of free, fast, and privacy-focused
          Converters tools and calculators for developers, engineers, students, and professionals.
        </p>
      </div>

      {/* Mission Section */}
      <Card className="mb-12">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Target className="h-6 w-6 text-blue-500" />
            <CardTitle>Our Mission</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 leading-relaxed mb-4">
            InterConverter was created with a simple mission: to provide professional-grade Converters
            tools and calculators that are completely free, respect your privacy, and work instantly
            without any registration or downloads.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We believe that essential tools for calculation and Converters should be accessible to
            everyone, everywhere, without barriers. Whether you're a developer converting timestamps,
            an engineer calculating ratios, or a student working on assignments, our tools are designed
            to save you time and provide accurate results.
          </p>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose InterConverter?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 dark:bg-blue-950 rounded-lg mb-4 text-blue-500">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tool Categories */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Tool Categories</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {toolCategories.map((category, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-blue-500">{category.icon}</div>
                  <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <Badge variant="secondary" className="text-xs">{category.count} tools</Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <Card className="mb-16">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">28+</div>
              <div className="text-sm text-gray-600">Tools Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">8</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-sm text-gray-600">Free Forever</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">0</div>
              <div className="text-sm text-gray-600">Data Collected</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Section */}
      <Card className="mb-16">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-blue-500" />
            <CardTitle>Built by Developers, for Everyone</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 leading-relaxed mb-4">
            InterConverter is developed by a team of passionate developers and engineers who understand
            the daily need for reliable Converters tools. We use these tools ourselves and are committed
            to maintaining the highest standards of accuracy and performance.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our open-source approach ensures transparency and allows the community to contribute to
            making these tools even better. Every tool is thoroughly tested and optimized for both
            accuracy and speed.
          </p>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Explore our comprehensive collection of Converters tools and calculators.
          No registration required, no downloads needed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/tools">Browse All Tools</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
