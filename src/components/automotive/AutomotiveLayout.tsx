'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { InfoIcon, AlertTriangleIcon, BookOpenIcon } from 'lucide-react';
import { EducationalContent } from '@/types/automotive';
import { FAQSection } from '@/components/tools/FAQSection';
import { RelatedToolsSection } from '@/components/tools/RelatedToolsSection';

interface AutomotiveLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  toolId: string;
  category: 'engine' | 'drivetrain' | 'performance' | 'fluids';
  educationalContent?: EducationalContent;
  safetyWarnings?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  relatedToolIds?: string[];
}

const categoryColors = {
  engine: 'bg-red-100 text-red-800 border-red-200',
  drivetrain: 'bg-blue-100 text-blue-800 border-blue-200',
  performance: 'bg-green-100 text-green-800 border-green-200',
  fluids: 'bg-purple-100 text-purple-800 border-purple-200'
};

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800'
};

export function AutomotiveLayout({
  title,
  description,
  children,
  toolId,
  category,
  educationalContent,
  safetyWarnings = [],
  difficulty = 'beginner',
  faqs = [],
  relatedToolIds = []
}: AutomotiveLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant="outline" className={categoryColors[category]}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Badge>
          <Badge variant="outline" className={difficultyColors[difficulty]}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-lg text-gray-600 mb-4">{description}</p>
        
        {/* Safety Warnings */}
        {safetyWarnings.length > 0 && (
          <Alert className="mb-4 border-orange-200 bg-orange-50">
            <AlertTriangleIcon className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>Safety Notice:</strong>
              <ul className="mt-2 list-disc list-inside space-y-1">
                {safetyWarnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Main Calculator */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Calculator</span>
          </CardTitle>
          <CardDescription>
            Enter your values below to perform the calculation
          </CardDescription>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>

      {/* Educational Content */}
      {educationalContent && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Theory Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpenIcon className="h-5 w-5" />
                Theory & Background
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {educationalContent.theory}
              </p>
            </CardContent>
          </Card>

          {/* Applications Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <InfoIcon className="h-5 w-5" />
                Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {educationalContent.applications.map((application, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-gray-700">{application}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Tips Section */}
          {educationalContent.tips.length > 0 && (
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Pro Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  {educationalContent.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">💡</span>
                      <span className="text-gray-700 text-sm">{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <div className="mt-8">
          <FAQSection faqs={faqs} />
        </div>
      )}

      {/* Related Tools */}
      <div className="mt-8">
        <RelatedToolsSection 
          currentToolId={toolId}
          category="automotive"
          relatedToolIds={relatedToolIds}
        />
      </div>

      {/* Disclaimer */}
      <Alert className="mt-8 border-gray-200 bg-gray-50">
        <InfoIcon className="h-4 w-4" />
        <AlertDescription className="text-gray-700">
          <strong>Disclaimer:</strong> These calculations are for educational and estimation purposes only. 
          Always consult with qualified automotive professionals for engine modifications, tuning, and safety considerations. 
          Actual results may vary based on specific engine configurations, conditions, and other factors.
        </AlertDescription>
      </Alert>
    </div>
  );
}