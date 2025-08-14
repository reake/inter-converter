'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PerformanceDisplay } from '@/components/automotive/PerformanceDisplay';
import { AutoTermTooltip } from '@/components/automotive/EducationalTooltip';
import { EngineFormulas } from '@/lib/automotive/engine-formulas';
import { AutomotiveValidator } from '@/lib/automotive/automotive-validators';
import { CFMResult, AutomotiveResult, Recommendation } from '@/types/automotive';
import { InfoIcon, CalculatorIcon } from 'lucide-react';

interface CFMCalculatorState {
  displacement: string;
  unit: 'ci' | 'liters';
  engineType: 'stock' | 'street-strip';
}

export function CarburetorCFMCalculator() {
  const [state, setState] = useState<CFMCalculatorState>({
    displacement: '',
    unit: 'ci',
    engineType: 'stock'
  });
  
  const [result, setResult] = useState<CFMResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = useCallback((field: keyof CFMCalculatorState, value: string) => {
    setState(prev => ({ ...prev, [field]: value }));
    setErrors([]);
    setResult(null);
  }, []);

  const calculateCFM = useCallback(() => {
    const displacement = parseFloat(state.displacement);
    const newErrors: string[] = [];

    // Validation
    if (!displacement || isNaN(displacement)) {
      newErrors.push('Please enter a valid displacement value');
    } else {
      const validation = AutomotiveValidator.validateEngineDisplacement(displacement, state.unit);
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    // Calculate CFM
    let cfm: number;
    if (state.unit === 'liters') {
      cfm = EngineFormulas.calculateCFMFromLiters(displacement, state.engineType);
    } else {
      cfm = EngineFormulas.calculateCFM(displacement, state.engineType);
    }

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (cfm < 500) {
      recommendations.push('Consider a 500-600 CFM carburetor for this engine size');
      recommendations.push('Smaller carburetors provide better throttle response');
    } else if (cfm < 650) {
      recommendations.push('A 600-650 CFM carburetor would be ideal for this engine');
      recommendations.push('This size balances performance and drivability');
    } else if (cfm < 750) {
      recommendations.push('A 700-750 CFM carburetor is recommended');
      recommendations.push('Consider vacuum secondary for better street manners');
    } else if (cfm < 850) {
      recommendations.push('An 800-850 CFM carburetor is needed for this engine');
      recommendations.push('Mechanical secondary may be preferred for racing');
    } else {
      recommendations.push('A large 850+ CFM carburetor is required');
      recommendations.push('Consider a dominator-style carburetor for maximum flow');
    }

    if (state.engineType === 'street-strip') {
      recommendations.push('Modified engines benefit from slightly larger carburetors');
      recommendations.push('Ensure adequate fuel pump and lines for higher flow');
    }

    const cfmResult: CFMResult = {
      cfm,
      engineType: state.engineType,
      displacement,
      unit: state.unit,
      recommendations
    };

    setResult(cfmResult);
  }, [state]);

  const getDisplayResults = (): AutomotiveResult[] => {
    if (!result) return [];

    const results: AutomotiveResult[] = [
      {
        label: 'Required CFM',
        value: result.cfm,
        unit: 'CFM',
        precision: 1,
        category: 'primary'
      },
      {
        label: 'Engine Type',
        value: result.engineType === 'stock' ? 'Stock' : 'Street & Strip',
        unit: '',
        precision: 0,
        category: 'secondary'
      },
      {
        label: 'Displacement',
        value: result.displacement,
        unit: result.unit === 'ci' ? 'cubic inches' : 'liters',
        precision: result.unit === 'ci' ? 0 : 1,
        category: 'secondary'
      }
    ];

    // Add Converters if needed
    if (result.unit === 'ci') {
      results.push({
        label: 'Displacement (Liters)',
        value: EngineFormulas.ciToLiters(result.displacement),
        unit: 'L',
        precision: 2,
        category: 'derived'
      });
    } else {
      results.push({
        label: 'Displacement (CI)',
        value: EngineFormulas.litersToCi(result.displacement),
        unit: 'ci',
        precision: 0,
        category: 'derived'
      });
    }

    return results;
  };

  const getRecommendations = (): Recommendation[] => {
    if (!result) return [];

    return result.recommendations.map(rec => ({
      type: 'performance' as const,
      message: rec,
      priority: 'medium' as const
    }));
  };

  const commonEngines = [
    { name: 'Chevy 350 SBC', displacement: 350, unit: 'ci' as const },
    { name: 'Chevy 454 BBC', displacement: 454, unit: 'ci' as const },
    { name: 'Ford 302', displacement: 302, unit: 'ci' as const },
    { name: 'Ford 351W', displacement: 351, unit: 'ci' as const },
    { name: 'Pontiac 455', displacement: 455, unit: 'ci' as const },
    { name: 'Mopar 440', displacement: 440, unit: 'ci' as const },
    { name: 'LS1 5.7L', displacement: 5.7, unit: 'liters' as const },
    { name: 'LS3 6.2L', displacement: 6.2, unit: 'liters' as const }
  ];

  return (
    <div className="space-y-6">
      {/* Calculator Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalculatorIcon className="h-5 w-5" />
            CFM Calculator
          </CardTitle>
          <CardDescription>
            Calculate the required carburetor CFM for your engine displacement and configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="displacement" className="flex items-center gap-2">
                Engine Displacement *
                <AutoTermTooltip termKey="cfm" triggerText="?" />
              </Label>
              <Input
                id="displacement"
                type="number"
                step="0.1"
                min="0"
                placeholder={state.unit === 'ci' ? 'e.g., 350' : 'e.g., 5.7'}
                value={state.displacement}
                onChange={(e) => handleInputChange('displacement', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Select
                value={state.unit}
                onValueChange={(value: 'ci' | 'liters') => handleInputChange('unit', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ci">Cubic Inches (CI)</SelectItem>
                  <SelectItem value="liters">Liters (L)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="engineType">Engine Configuration</Label>
              <Select
                value={state.engineType}
                onValueChange={(value: 'stock' | 'street-strip') => handleInputChange('engineType', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stock">Stock Engine (1.618 multiplier)</SelectItem>
                  <SelectItem value="street-strip">Street & Strip Modified (1.76 multiplier)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Common Engine Presets */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Common Engine Presets</Label>
            <div className="flex flex-wrap gap-2">
              {commonEngines.map((engine, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setState(prev => ({
                      ...prev,
                      displacement: engine.displacement.toString(),
                      unit: engine.unit
                    }));
                  }}
                >
                  {engine.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Calculate Button */}
          <Button 
            onClick={calculateCFM} 
            className="w-full"
            disabled={!state.displacement}
          >
            Calculate CFM Requirements
          </Button>

          {/* Errors */}
          {errors.length > 0 && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
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
          title="CFM Calculation Results"
          description="Your carburetor CFM requirements and recommendations"
        />
      )}

      {/* Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <InfoIcon className="h-5 w-5" />
            Carburetor Selection Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2">Stock Engine Multiplier (1.618)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Factory or mildly modified engines</li>
                <li>• Stock camshaft and heads</li>
                <li>• Emphasis on drivability and fuel economy</li>
                <li>• Conservative CFM requirements</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Street & Strip Multiplier (1.76)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Modified performance engines</li>
                <li>• Aftermarket cam, heads, or intake</li>
                <li>• Headers and performance exhaust</li>
                <li>• Higher CFM for maximum power</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-2">Carburetor Types</h4>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Badge variant="outline" className="mb-2">Vacuum Secondary</Badge>
                <p className="text-sm text-gray-700">
                  Better for street driving, opens secondaries based on engine vacuum. 
                  More forgiving and provides better fuel economy.
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <Badge variant="outline" className="mb-2">Mechanical Secondary</Badge>
                <p className="text-sm text-gray-700">
                  Better for racing, opens secondaries mechanically with throttle. 
                  Provides maximum airflow but requires proper tuning.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}