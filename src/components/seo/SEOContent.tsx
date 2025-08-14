import React from 'react';
import { Metadata } from 'next';
import { ToolConfig } from '@/types/tools';
import { TOOL_CATEGORIES } from '@/config/tools';

interface SEOContentProps {
  tools: ToolConfig[];
  category?: string;
  locale?: string;
}

export function SEOContent({ tools, category, locale = 'en' }: SEOContentProps) {
  const categoryInfo = category ? TOOL_CATEGORIES[category as keyof typeof TOOL_CATEGORIES] : null;
  const toolCount = tools.length;
  const totalSearchVolume = tools.reduce((sum, tool) => sum + (tool.searchVolume || 0), 0);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main SEO Content */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {category
                ? `${categoryInfo?.name} Tools - Professional Online Calculators & Converters`
                : 'Free Online Converters & Calculators Tools - No Download Required'
              }
            </h2>

            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                {category
                  ? `Transform your workflow with our collection of ${toolCount} professional ${categoryInfo?.name.toLowerCase()} tools. ${categoryInfo?.description} Each calculator is meticulously designed for accuracy and ease of use, providing instant results for professionals, students, and enthusiasts. All tools are completely free, work directly in your browser, and require no software installation.`
                  : `Streamline your daily tasks with our comprehensive suite of ${toolCount}+ professional online Converters tools and calculators. From essential unit Converterss and currency calculations to specialized automotive, health, and engineering calculators, our platform delivers accurate results instantly. All tools are completely free, secure, and accessible from any device with an internet connection.`
                }
              </p>

              <p>
                {category
                  ? `Join over ${Math.round(totalSearchVolume / 1000)}K monthly users who rely on our ${categoryInfo?.name.toLowerCase()} tools for their professional and personal projects. Our calculators are trusted by engineers, developers, students, and industry professionals worldwide for their precision, reliability, and user-friendly design.`
                  : `Trusted by millions of users globally, our platform processes over ${Math.round(totalSearchVolume / 1000)}K calculations monthly. Whether you're a student working on assignments, a professional handling complex calculations, or someone needing quick Converterss, our tools provide accurate, reliable results with lightning-fast performance and zero learning curve.`
                }
              </p>

              {!category && (
                <p>
                  Our comprehensive platform spans {Object.keys(TOOL_CATEGORIES).length} specialized categories: time & date converters, currency & finance calculators, unit & measurement tools, file & media processors, color & design utilities, health & fitness calculators, science & engineering tools, and automotive calculators. Each category features multiple tools optimized for specific use cases, ensuring you find exactly what you need for any calculation or Converters task.
                </p>
              )}
            </div>

            {/* Key Features */}
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Why Choose InterConverter for Your {category ? categoryInfo?.name : 'Converters'} Needs?
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Completely Free Online Tools</h4>
                      <p className="text-gray-600 text-sm">Access all {category ? categoryInfo?.name.toLowerCase() : 'Converters'} tools without registration, subscriptions, or hidden fees. No credit card required.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Privacy-First Design</h4>
                      <p className="text-gray-600 text-sm">All calculations are performed locally in your browser. Your data never leaves your device, ensuring complete privacy and security.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Cross-Platform Compatibility</h4>
                      <p className="text-gray-600 text-sm">Works seamlessly on desktop computers, tablets, and smartphones. Responsive design ensures optimal experience on any screen size.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Instant Results & High Performance</h4>
                      <p className="text-gray-600 text-sm">Get immediate results with our optimized calculation engines. No waiting, no loading times - just instant, accurate Converterss.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Industry-Standard Accuracy</h4>
                      <p className="text-gray-600 text-sm">Built using verified formulas and up-to-date data sources. Trusted by professionals for mission-critical calculations.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Continuously Improved</h4>
                      <p className="text-gray-600 text-sm">Regular updates with new features, enhanced accuracy, and improved user experience based on user feedback.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Tools Section */}
            {!category && (
              <div className="mt-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Most Popular Tools</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {tools
                    .sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0))
                    .slice(0, 6)
                    .map((tool) => (
                      <div key={tool.id} className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{tool.icon}</span>
                          <h4 className="font-semibold text-gray-900">{tool.name}</h4>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2">{tool.description}</p>
                        <div className="mt-2 text-xs text-gray-500">
                          {Math.round((tool.searchVolume || 0) / 1000)}K monthly searches
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* FAQ Section */}
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Frequently Asked Questions About Our {category ? categoryInfo?.name : 'Online Converters'} Tools
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Are these {category ? categoryInfo?.name.toLowerCase() : 'Converters'} tools completely free to use?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Yes, all our {category ? categoryInfo?.name.toLowerCase() : 'Converters'} tools are 100% free with no hidden costs, registration requirements, or usage limits. We provide unlimited access to all features without any subscription fees or premium tiers.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    How do you protect my privacy and data security?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    All calculations are performed locally in your browser using client-side JavaScript. We never store, transmit, or have access to your input data or calculation results. Your information remains completely private and secure on your device.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    How accurate and reliable are the calculation results?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Our tools use verified industry-standard formulas and regularly updated data sources to ensure maximum accuracy. For financial calculations, we use real-time exchange rates from reliable providers. All formulas are tested and validated for precision.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Do these tools work on mobile devices and tablets?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Yes, all our tools are fully responsive and optimized for mobile devices, tablets, and desktop computers. The interface automatically adapts to your screen size for the best user experience on any device.
                  </p>
                </div>

                {category && (
                  <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      What makes your {categoryInfo?.name.toLowerCase()} tools different from others?
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Our {categoryInfo?.name.toLowerCase()} tools are specifically designed for professionals and enthusiasts, featuring intuitive interfaces, instant results, comprehensive functionality, and detailed explanations. {categoryInfo?.description} Each tool includes helpful references and examples for practical use.
                    </p>
                  </div>
                )}

                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Can I use these tools for commercial or professional purposes?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Absolutely! Our tools are designed for both personal and professional use. Many businesses, engineers, developers, and professionals rely on our calculators for their daily work. There are no restrictions on commercial usage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate metadata for SEO
export function generateToolsMetadata(tools: ToolConfig[], category?: string, locale: string = 'en'): Metadata {
  const categoryInfo = category ? TOOL_CATEGORIES[category as keyof typeof TOOL_CATEGORIES] : null;
  const toolCount = tools.length;

  // Optimized titles for tools page
  const title = category
    ? `${toolCount}+ Free Online ${categoryInfo?.name} Tools & Calculators | InterConverter`
    : `Free Online Conversion & Calculation Tools | InterConverter`;



  const description = category
    ? `Professional ${categoryInfo?.name.toLowerCase()} tools including ${tools.slice(0, 3).map(t => t.name.toLowerCase()).join(', ')} and ${toolCount - 3}+ more calculators. ${categoryInfo?.description} All tools are free, secure, and work directly in your browser without registration.`
    : `Explore free online converters and calculators at InterConverter. From currency and units to health and color tools – accurate, fast, and simple.
`;

  const keywords = category
    ? [
        `${categoryInfo?.name.toLowerCase()} calculator`,
        `${categoryInfo?.name.toLowerCase()} converter`,
        `free ${categoryInfo?.name.toLowerCase()} tools`,
        `online ${categoryInfo?.name.toLowerCase()}`,
        ...tools.slice(0, 8).flatMap(tool => tool.keywords.slice(0, 2)),
        'free calculator', 'online converter', 'no registration', 'browser based'
      ].join(', ')
    : [
        'online converter', 'free calculator', 'Converters tools', 'unit converter',
        'currency converter', 'measurement calculator', 'online tools', 'free Converters',
        'browser calculator', 'instant converter', 'no download required', 'professional tools',
        ...tools.slice(0, 6).flatMap(tool => tool.keywords.slice(0, 1))
      ].join(', ');

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'InterConverter Team' }],
    creator: 'InterConverter',
    publisher: 'InterConverter',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale,
      siteName: 'InterConverter - Free Online Converters Tools',
      images: [
        {
          url: '/og-image-tools.jpg',
          width: 1200,
          height: 630,
          alt: `${category ? categoryInfo?.name : 'Online Converters'} Tools - InterConverter`,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image-tools.jpg'],
      creator: '@InterConverter',
    },
    alternates: {
      canonical: category ? `/tools?categories=${category}` : '/tools',
    },
    other: {
      'google-site-verification': 'your-google-verification-code',
    }
  };
}
