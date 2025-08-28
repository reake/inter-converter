'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangleIcon, CheckCircleIcon, InfoIcon } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';
import { AutomotiveResult, Recommendation, Warning } from '@/types/automotive';

interface PerformanceDisplayProps {
  results: AutomotiveResult[];
  recommendations?: Recommendation[];
  warnings?: Warning[];
  showComparisons?: boolean;
  title?: string;
  description?: string;
}

const resultCategoryColors = {
  primary: 'text-2xl font-bold text-blue-600',
  secondary: 'text-lg font-semibold text-gray-700',
  derived: 'text-base text-gray-600'
};

const warningColors = {
  low: 'border-yellow-200 bg-yellow-50 text-yellow-800',
  medium: 'border-orange-200 bg-orange-50 text-orange-800',
  high: 'border-red-200 bg-red-50 text-red-800'
};

const recommendationColors = {
  performance: 'border-blue-200 bg-blue-50 text-blue-800',
  safety: 'border-red-200 bg-red-50 text-red-800',
  tuning: 'border-green-200 bg-green-50 text-green-800'
};

export function PerformanceDisplay({
  results,
  recommendations = [],
  warnings = [],
  showComparisons = false,
  title = 'Calculation Results',
  description = 'Your automotive calculation results are shown below'
}: PerformanceDisplayProps) {


  const formatValue = (value: number | string, precision: number): string => {
    if (typeof value === 'string') return value;
    return value.toFixed(precision);
  };

  const primaryResults = results.filter(r => r.category === 'primary');
  const secondaryResults = results.filter(r => r.category === 'secondary');
  const derivedResults = results.filter(r => r.category === 'derived');

  return (
    <div className="space-y-6">
      {/* Main Results Card */}
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Primary Results */}
          {primaryResults.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Primary Results</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {primaryResults.map((result, index) => (
                  <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-600 font-medium">{result.label}</p>
                        <p className={resultCategoryColors[result.category]}>
                          {formatValue(result.value, result.precision)} {result.unit}
                        </p>
                      </div>
                      <CopyButton
                        text={`${result.label}: ${formatValue(result.value, result.precision)} ${result.unit}`}
                        variant="ghost"
                        size="sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Secondary Results */}
          {secondaryResults.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Additional Results</h3>
              <div className="grid gap-3 md:grid-cols-3">
                {secondaryResults.map((result, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{result.label}</p>
                        <p className={resultCategoryColors[result.category]}>
                          {formatValue(result.value, result.precision)} {result.unit}
                        </p>
                      </div>
                      <CopyButton
                        text={`${result.label}: ${formatValue(result.value, result.precision)} ${result.unit}`}
                        variant="ghost"
                        size="sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Derived Results */}
          {derivedResults.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Derived Values</h3>
              <div className="grid gap-2 md:grid-cols-4">
                {derivedResults.map((result, index) => (
                  <div key={index} className="p-2 bg-gray-100 rounded">
                    <p className="text-xs text-gray-500">{result.label}</p>
                    <p className={resultCategoryColors[result.category]}>
                      {formatValue(result.value, result.precision)} {result.unit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="space-y-3">
          {warnings.map((warning, index) => (
            <Alert key={index} className={warningColors[warning.severity]}>
              <AlertTriangleIcon className="h-4 w-4" />
              <AlertDescription>
                <div className="flex items-center justify-between">
                  <span>{warning.message}</span>
                  <Badge variant="outline" className="ml-2">
                    {warning.type}
                  </Badge>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 text-green-600" />
              Recommendations
            </CardTitle>
            <CardDescription>
              Professional recommendations based on your calculation results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <Alert key={index} className={recommendationColors[rec.type]}>
                  <InfoIcon className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex items-start justify-between">
                      <span className="flex-1">{rec.message}</span>
                      <div className="flex gap-2 ml-2">
                        <Badge variant="outline" className="text-xs">
                          {rec.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {rec.priority}
                        </Badge>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comparison Section */}
      {showComparisons && primaryResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Performance Comparison</CardTitle>
            <CardDescription>
              How your results compare to common automotive benchmarks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {primaryResults.map((result, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{result.label}</span>
                    <span className="text-sm text-gray-500">
                      {formatValue(result.value, result.precision)} {result.unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: '65%' }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Low</span>
                    <span>Average</span>
                    <span>High</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}