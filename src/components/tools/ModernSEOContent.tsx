import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FAQSection } from './FAQSection';
import { RelatedToolsSection } from './RelatedToolsSection';
import { ToolCategory } from '@/types/tools';

interface SEOContentProps {
  title: string;
  description: string;
  features: string[];
  useCases: Array<{
    category: string;
    examples: string[];
  }>;
  howToUse: string[];
  tips?: string[];
  relatedTopics?: Array<{
    title: string;
    description: string;
  }>;
  technicalDetails?: Array<{
    term: string;
    definition: string;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  currentToolId?: string;
  category?: ToolCategory;
  relatedToolIds?: string[];
}

export function ModernSEOContent({
  title,
  description,
  features,
  useCases,
  howToUse,
  tips,
  relatedTopics,
  technicalDetails,
  faqs,
  currentToolId,
  category,
  relatedToolIds
}: SEOContentProps) {
  return (
    <div className="mt-16 space-y-12">
      {/* About Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
              ℹ️
            </span>
            About {title}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {description}
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
            ✨
          </span>
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 font-medium">{feature}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
            🎯
          </span>
          Common Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    {useCase.category}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {useCase.examples.map((example, exampleIndex) => (
                    <li key={exampleIndex} className="flex items-start gap-2 text-gray-700">
                      <span className="text-purple-500 font-bold text-sm mt-1">•</span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How to Use */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <span className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
            📋
          </span>
          How to Use
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {howToUse.map((step, index) => (
            <div key={index} className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-sm border border-amber-100">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {index + 1}
              </div>
              <p className="text-gray-700 font-medium">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tips Section */}
      {tips && tips.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <span className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
              💡
            </span>
            Pro Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {tips.map((tip, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">💡</span>
                    </div>
                    <p className="text-gray-700 font-medium">{tip}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Technical Details */}
      {technicalDetails && technicalDetails.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <span className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
              🔧
            </span>
            Technical Details
          </h2>
          <div className="space-y-4">
            {technicalDetails.map((detail, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 font-mono text-sm w-fit">
                      {detail.term}
                    </Badge>
                    <p className="text-gray-700 flex-1">{detail.definition}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqs && faqs.length > 0 && (
        <FAQSection faqs={faqs} />
      )}

      {/* Related Tools */}
      {currentToolId && category && (
        <RelatedToolsSection 
          currentToolId={currentToolId}
          category={category}
          relatedToolIds={relatedToolIds}
        />
      )}

      {/* Related Topics */}
      {relatedTopics && relatedTopics.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <span className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
              📚
            </span>
            Related Topics
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedTopics.map((topic, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">{topic.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-700">{topic.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}