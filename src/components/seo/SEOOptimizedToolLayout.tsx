import React from 'react';
import { ToolConfig } from '@/types/tools';
import { TOOL_CATEGORIES } from '@/config/tools';
import { generateToolStructuredData } from './StructuredData';

interface SEOOptimizedToolLayoutProps {
  tool: ToolConfig;
  locale: string;
  children: React.ReactNode;
  additionalContent?: {
    howItWorks?: string[];
    benefits?: string[];
    useCases?: Array<{ category: string; examples: string[] }>;
    faqs?: Array<{ question: string; answer: string }>;
    tips?: string[];
  };
}

export function SEOOptimizedToolLayout({
  tool,
  locale,
  children,
  additionalContent
}: SEOOptimizedToolLayoutProps) {
  const categoryInfo = TOOL_CATEGORIES[tool.category as keyof typeof TOOL_CATEGORIES];
  const structuredDataArray = generateToolStructuredData(tool, locale);

  return (
    <>
      {/* Structured Data */}
      {structuredDataArray.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* SEO-Optimized Header */}
          <header className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl mb-6 shadow-lg">
              <span className="text-3xl">{tool.icon || '🔧'}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
              {tool.name}
            </h1>
            
            <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed">
              {tool.description}
            </p>

            {/* Breadcrumb Navigation */}
            <nav className="flex justify-center mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <a href="/" className="hover:text-blue-600 transition-colors">
                    Home
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="mx-2">/</span>
                  <a href="/tools" className="hover:text-blue-600 transition-colors">
                    Tools
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="mx-2">/</span>
                  <a 
                    href={`/${tool.category}`} 
                    className="hover:text-blue-600 transition-colors"
                  >
                    {categoryInfo?.name}
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="mx-2">/</span>
                  <span className="text-gray-900 font-medium">{tool.name}</span>
                </li>
              </ol>
            </nav>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-8">
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
                <span>Instant Results</span>
              </div>
            </div>
          </header>

          {/* Tool Component */}
          <main className="mb-12">
            {children}
          </main>

          {/* SEO Content Sections */}
          <div className="space-y-12">
            {/* How It Works */}
            {additionalContent?.howItWorks && (
              <section className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">How to Use {tool.name}</h2>
                <ol className="space-y-3">
                  {additionalContent.howItWorks.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Benefits */}
            {additionalContent?.benefits && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Why Choose Our {tool.name}?</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {additionalContent.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm border">
                      <span className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Use Cases */}
            {additionalContent?.useCases && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Common Use Cases</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {additionalContent.useCases.map((useCase, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
                      <h3 className="font-semibold text-lg mb-3 text-blue-600">
                        {useCase.category}
                      </h3>
                      <ul className="space-y-2">
                        {useCase.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex} className="flex items-center gap-2 text-gray-700">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tips */}
            {additionalContent?.tips && (
              <section className="bg-blue-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Pro Tips</h2>
                <div className="grid gap-4">
                  {additionalContent.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">
                        💡
                      </span>
                      <span className="text-gray-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQs */}
            {additionalContent?.faqs && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {additionalContent.faqs.map((faq, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
                      <h3 className="font-semibold text-lg mb-3 text-gray-900">
                        {faq.question}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Keywords for SEO (hidden) */}
            <div className="sr-only">
              <p>
                Keywords: {tool.keywords.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
