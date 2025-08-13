'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PerformanceDisplay } from '@/components/automotive/PerformanceDisplay';
import { AutoTermTooltip } from '@/components/automotive/EducationalTooltip';
import { EngineFormulas } from '@/lib/automotive/engine-formulas';
import { AutomotiveValidator } from '@/lib/automotive/automotive-validators';
import { CompressionResult, AutomotiveResult, Recommendation, Warning } from '@/types/automotive';
import { AlertTriangleIcon, CalculatorIcon, TrendingUpIcon } from 'lucide-react';

interface CompressionCalculatorState {
  currentHP: string;
  currentCR: string;
  newCR: string;
}

export function CompressionRatioCalculator() {
  const [state, setState] = useState<CompressionCalculatorState>({
    currentHP: '',
    currentCR: '',
    newCR: ''
  });
  
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = useCallback((field: keyof CompressionCalculatorState, value: string) => {
    setState(prev => ({ ...prev, [field]: value }));
    setErrors([]);
    setResult(null);
  }, []);

  const calculateCompression = useCallback(() => {
    const currentHP = parseFloat(state.currentHP);
    const currentCR = parseFloat(state.currentCR);
    const newCR = parseFloat(state.newCR);
    const newErrors: string[] = [];

    // Validation
    if (!currentHP || isNaN(currentHP)) {
      newErrors.push('Please enter a valid current horsepower value');
    } else {
      const hpValidation = AutomotiveValidator.validateHorsepower(currentHP);
      if (!hpValidation.isValid) {
        newErrors.push(hpValidation.error!);
      }
    }

    if (!currentCR || isNaN(currentCR)) {
      newErrors.push('Please enter a valid current compression ratio');
    } else {
      const crValidation = AutomotiveValidator.validateCompressionRatio(currentCR);
      if (!crValidation.isValid) {
        newErrors.push(`Current CR: ${crValidation.error!}`);
      }
    }

    if (!newCR || isNaN(newCR)) {
      newErrors.push('Please enter a valid new compression ratio');
    } else {
      const newCrValidation = AutomotiveValidator.validateCompressionRatio(newCR);
      if (!newCrValidation.isValid) {
        newErrors.push(`New CR: ${newCrValidation.error!}`);
      }
    }

    if (currentCR && newCR && currentCR === newCR) {
      newErrors.push('New compression ratio must be different from current ratio');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    // Calculate compression ratio change
    const compressionResult = EngineFormulas.calculateCompressionHPChange(currentHP, currentCR, newCR);
    setResult(compressionResult);
  }, [state]);

  const getDisplayResults = (): AutomotiveResult[] => {
    if (!result) return [];

    const results: AutomotiveResult[] = [
      {
        label: 'Horsepower Change',
        value: result.hpPercentChange > 0 ? `+${result.hpPercentChange.toFixed(2)}` : result.hpPercentChange.toFixed(2),
        unit: '%',
        precision: 2,
        category: 'primary'
      },
      {
        label: 'New Horsepower',
        value: result.newHorsepower,
        unit: 'HP',
        precision: 1,
        category: 'primary'
      },
      {
        label: 'HP Gain/Loss',
        value: result.hpChange > 0 ? `+${result.hpChange.toFixed(1)}` : result.hpChange.toFixed(1),
        unit: 'HP',
        precision: 1,
        category: 'secondary'
      },
      {
        label: 'Original CR',
        value: `${result.originalCR.toFixed(1)}:1`,
        unit: '',
        precision: 1,
        category: 'secondary'
      },
      {
        label: 'New CR',
        value: `${result.newCR.toFixed(1)}:1`,
        unit: '',
        precision: 1,
        category: 'secondary'
      }
    ];

    return results;
  };

  const getWarnings = (): Warning[] => {
    if (!result) return [];

    const warnings: Warning[] = [];

    result.warnings.forEach(warning => {
      let severity: 'low' | 'medium' | 'high' = 'medium';
      let type: 'safety' | 'performance' | 'accuracy' = 'performance';

      if (warning.includes('race fuel') || warning.includes('detonation')) {
        severity = 'high';
        type = 'safety';
      } else if (warning.includes('premium fuel')) {
        severity = 'medium';
        type = 'performance';
      } else if (warning.includes('wear') || warning.includes('damage')) {
        severity = 'high';
        type = 'safety';
      }

      warnings.push({
        type,
        message: warning,
        severity
      });
    });

    return warnings;
  };

  const getRecommendations = (): Recommendation[] => {
    if (!result) return [];

    const recommendations: Recommendation[] = [];

    if (result.hpPercentChange > 0) {
      recommendations.push({
        type: 'performance',
        message: 'Increasing compression ratio will improve power output and thermal efficiency',
        priority: 'medium'
      });
    } else {
      recommendations.push({
        type: 'performance',
        message: 'Decreasing compression ratio will reduce power but may improve reliability on pump gas',
        priority: 'medium'
      });
    }

    if (result.newCR > 10.5) {
      recommendations.push({
        type: 'safety',
        message: 'High compression ratios require careful tuning and may need premium fuel',
        priority: 'high'
      });
    }

    if (result.newCR > 12) {
      recommendations.push({
        type: 'safety',
        message: 'Very high compression ratios may require race fuel and extensive engine modifications',
        priority: 'high'
      });
    }

    if (Math.abs(result.hpPercentChange) > 10) {
      recommendations.push({
        type: 'tuning',
        message: 'Significant compression changes may require carburetor or fuel injection tuning',
        priority: 'medium'
      });
    }

    return recommendations;
  };

  const commonCompressionRatios = [
    { name: 'Low Performance', cr: 8.0, description: 'Truck/economy engines' },
    { name: 'Mild Street', cr: 9.0, description: 'Pump gas friendly' },
    { name: 'Street Performance', cr: 9.5, description: 'Good balance' },
    { name: 'High Performance', cr: 10.5, description: 'Premium fuel recommended' },
    { name: 'Race', cr: 12.0, description: 'Race fuel required' },
    { name: 'Pro Race', cr: 14.0, description: 'Extreme performance' }
  ];

  return (
    <div className="space-y-8">
      {/* Calculator Card */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-white/20 rounded-lg">
              <CalculatorIcon className="h-6 w-6" />
            </div>
            Compression Ratio Calculator
          </CardTitle>
          <CardDescription className="text-red-100">
            Calculate horsepower changes from compression ratio modifications with professional accuracy
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          {/* Input Section */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-3">
              <Label htmlFor="currentHP" className="flex items-center gap-2 text-base font-semibold text-gray-700">
                Current Horsepower *
                <AutoTermTooltip termKey="compressionRatio" triggerText="?" />
              </Label>
              <Input
                id="currentHP"
                type="number"
                step="1"
                min="50"
                max="2000"
                placeholder="e.g., 300"
                value={state.currentHP}
                onChange={(e) => handleInputChange('currentHP', e.target.value)}
                className="h-12 text-lg border-2 focus:border-red-400 transition-colors"
              />
              <p className="text-sm text-gray-500">Enter your engine's current power output</p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="currentCR" className="text-base font-semibold text-gray-700">Current Compression Ratio *</Label>
              <Input
                id="currentCR"
                type="number"
                step="0.1"
                min="6"
                max="20"
                placeholder="e.g., 9.0"
                value={state.currentCR}
                onChange={(e) => handleInputChange('currentCR', e.target.value)}
                className="h-12 text-lg border-2 focus:border-red-400 transition-colors"
              />
              <p className="text-sm text-gray-500">Your engine's current compression ratio</p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="newCR" className="text-base font-semibold text-gray-700">New Compression Ratio *</Label>
              <Input
                id="newCR"
                type="number"
                step="0.1"
                min="6"
                max="20"
                placeholder="e.g., 10.0"
                value={state.newCR}
                onChange={(e) => handleInputChange('newCR', e.target.value)}
                className="h-12 text-lg border-2 focus:border-red-400 transition-colors"
              />
              <p className="text-sm text-gray-500">Target compression ratio after modification</p>
            </div>
          </div>

          {/* Common Compression Ratios */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-800">Quick Select</span>
              <Badge className="bg-blue-100 text-blue-800">Common Ratios</Badge>
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {commonCompressionRatios.map((ratio, index) => (
                <div key={index} className="p-4 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl hover:border-red-300 transition-all duration-200 hover:shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-800">{ratio.name}</span>
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 font-bold">
                      {ratio.cr}:1
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{ratio.description}</p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-8 text-xs hover:bg-red-50 hover:border-red-300"
                      onClick={() => handleInputChange('currentCR', ratio.cr.toString())}
                    >
                      Set Current
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-8 text-xs hover:bg-red-50 hover:border-red-300"
                      onClick={() => handleInputChange('newCR', ratio.cr.toString())}
                    >
                      Set Target
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calculate Button */}
          <div className="flex justify-center">
            <Button 
              onClick={calculateCompression} 
              className="px-12 py-4 text-lg font-semibold bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={!state.currentHP || !state.currentCR || !state.newCR}
            >
              <TrendingUpIcon className="h-5 w-5 mr-3" />
              Calculate Horsepower Change
            </Button>
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <Alert className="border-red-300 bg-red-50 shadow-lg">
              <AlertTriangleIcon className="h-5 w-5 text-red-600" />
              <AlertDescription className="text-red-800">
                <div className="font-semibold mb-2">Please fix the following issues:</div>
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <PerformanceDisplay
          results={getDisplayResults()}
          recommendations={getRecommendations()}
          warnings={getWarnings()}
          title="Compression Ratio Results"
          description="Horsepower changes from compression ratio modification"
        />
      )}

      {/* Information Cards */}
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
          <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
            <CardTitle className="flex items-center gap-3 text-green-800">
              <span className="text-2xl">⚡</span>
              Compression Ratio Effects
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-3">
              <h4 className="font-bold text-green-700 flex items-center gap-2">
                <span className="text-lg">📈</span>
                Benefits of Higher Compression
              </h4>
              <div className="grid gap-2">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600">•</span>
                  <span className="text-gray-700">Increased power output (3-4% per point)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600">•</span>
                  <span className="text-gray-700">Better thermal efficiency</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600">•</span>
                  <span className="text-gray-700">Improved throttle response</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600">•</span>
                  <span className="text-gray-700">More complete fuel combustion</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-red-700 flex items-center gap-2">
                <span className="text-lg">⚠️</span>
                Risks of High Compression
              </h4>
              <div className="grid gap-2">
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <span className="text-red-600">•</span>
                  <span className="text-gray-700">Requires higher octane fuel</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <span className="text-red-600">•</span>
                  <span className="text-gray-700">Risk of detonation/knock</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <span className="text-red-600">•</span>
                  <span className="text-gray-700">Increased combustion pressure</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <span className="text-red-600">•</span>
                  <span className="text-gray-700">May need timing adjustments</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-400 to-purple-500"></div>
          <CardHeader className="bg-gradient-to-br from-blue-50 to-purple-50">
            <CardTitle className="flex items-center gap-3 text-blue-800">
              <span className="text-2xl">⛽</span>
              Fuel Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid gap-4">
              <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-green-800">Regular Gas (87 octane)</span>
                  <Badge className="bg-green-200 text-green-800 font-bold">8.0-9.0:1</Badge>
                </div>
                <p className="text-sm text-green-700">Safe for most stock engines and daily drivers</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-200 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-yellow-800">Premium Gas (91-93 octane)</span>
                  <Badge className="bg-yellow-200 text-yellow-800 font-bold">9.5-11.0:1</Badge>
                </div>
                <p className="text-sm text-yellow-700">Required for high performance applications</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-red-800">Race Fuel (100+ octane)</span>
                  <Badge className="bg-red-200 text-red-800 font-bold">11.0+:1</Badge>
                </div>
                <p className="text-sm text-red-700">Necessary for extreme compression ratios</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}