'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PerformanceDisplay } from '@/components/automotive/PerformanceDisplay';
import { AutoTermTooltip } from '@/components/automotive/EducationalTooltip';
import { EngineFormulas } from '@/lib/automotive/engine-formulas';
import { AutomotiveValidator } from '@/lib/automotive/automotive-validators';
import { SuperchargerResult, AutomotiveResult, Recommendation, Warning } from '@/types/automotive';
import { WindIcon, CalculatorIcon, GaugeIcon, ZapIcon } from 'lucide-react';

interface SuperchargerState {
  baseHP: string;
  psi: string;
}

interface RamAirState {
  baseHP: string;
  mph: string;
}

interface SuperchargerCFMState {
  displacement: string;
  rpm: string;
  psi: string;
}

export function SuperchargerCalculator() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');

  const [superchargerState, setSuperchargerState] = useState<SuperchargerState>({
    baseHP: '',
    psi: ''
  });

  const [ramAirState, setRamAirState] = useState<RamAirState>({
    baseHP: '',
    mph: ''
  });

  const [cfmState, setCfmState] = useState<SuperchargerCFMState>({
    displacement: '',
    rpm: '',
    psi: ''
  });

  const [results, setResults] = useState<{
    supercharger?: SuperchargerResult;
    ramAir?: SuperchargerResult;
    cfm?: number;
  }>({});

  const [errors, setErrors] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('supercharger');

  // Set initial tab based on URL parameter
  useEffect(() => {
    if (tabParam === 'ramair' || tabParam === 'cfm') {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleSuperchargerChange = useCallback((field: keyof SuperchargerState, value: string) => {
    setSuperchargerState(prev => ({ ...prev, [field]: value }));
    setErrors([]);
    setResults(prev => ({ ...prev, supercharger: undefined }));
  }, []);

  const handleRamAirChange = useCallback((field: keyof RamAirState, value: string) => {
    setRamAirState(prev => ({ ...prev, [field]: value }));
    setErrors([]);
    setResults(prev => ({ ...prev, ramAir: undefined }));
  }, []);

  const handleCfmChange = useCallback((field: keyof SuperchargerCFMState, value: string) => {
    setCfmState(prev => ({ ...prev, [field]: value }));
    setErrors([]);
    setResults(prev => ({ ...prev, cfm: undefined }));
  }, []);

  const calculateSupercharger = useCallback(() => {
    const baseHP = parseFloat(superchargerState.baseHP);
    const psi = parseFloat(superchargerState.psi);
    const newErrors: string[] = [];

    // Validation
    if (!baseHP || isNaN(baseHP)) {
      newErrors.push('Please enter a valid base horsepower');
    } else {
      const validation = AutomotiveValidator.validateHorsepower(baseHP);
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (!psi || isNaN(psi)) {
      newErrors.push('Please enter a valid boost pressure');
    } else {
      const validation = AutomotiveValidator.validateBoostPressure(psi);
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = EngineFormulas.calculateSuperchargerTotal(baseHP, psi);
    setResults(prev => ({ ...prev, supercharger: result }));
  }, [superchargerState]);

  const calculateRamAir = useCallback(() => {
    const baseHP = parseFloat(ramAirState.baseHP);
    const mph = parseFloat(ramAirState.mph);
    const newErrors: string[] = [];

    // Validation
    if (!baseHP || isNaN(baseHP)) {
      newErrors.push('Please enter a valid base horsepower');
    } else {
      const validation = AutomotiveValidator.validateHorsepower(baseHP);
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (!mph || isNaN(mph)) {
      newErrors.push('Please enter a valid speed');
    } else {
      const validation = AutomotiveValidator.validateSpeed(mph);
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = EngineFormulas.calculateRamAirGain(baseHP, mph);
    setResults(prev => ({ ...prev, ramAir: result }));
  }, [ramAirState]);

  const calculateSuperchargerCFM = useCallback(() => {
    const displacement = parseFloat(cfmState.displacement);
    const rpm = parseFloat(cfmState.rpm);
    const psi = parseFloat(cfmState.psi);
    const newErrors: string[] = [];

    // Validation
    if (!displacement || isNaN(displacement)) {
      newErrors.push('Please enter a valid displacement');
    } else {
      const validation = AutomotiveValidator.validateEngineDisplacement(displacement, 'ci');
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (!rpm || isNaN(rpm)) {
      newErrors.push('Please enter a valid RPM');
    } else {
      const validation = AutomotiveValidator.validateRPM(rpm, 'modified');
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (!psi || isNaN(psi)) {
      newErrors.push('Please enter a valid boost pressure');
    } else {
      const validation = AutomotiveValidator.validateBoostPressure(psi);
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const cfm = EngineFormulas.calculateSuperchargerCFM(displacement, rpm, psi);
    setResults(prev => ({ ...prev, cfm }));
  }, [cfmState]);

  const getDisplayResults = (): AutomotiveResult[] => {
    const displayResults: AutomotiveResult[] = [];

    if (activeTab === 'supercharger' && results.supercharger) {
      displayResults.push(
        {
          label: 'Horsepower Gain',
          value: `+${results.supercharger.hpGain.toFixed(1)}`,
          unit: 'HP',
          precision: 1,
          category: 'primary'
        },
        {
          label: 'Total Horsepower',
          value: results.supercharger.totalHorsepower,
          unit: 'HP',
          precision: 1,
          category: 'primary'
        },
        {
          label: 'Boost Pressure',
          value: results.supercharger.psi,
          unit: 'PSI',
          precision: 1,
          category: 'secondary'
        },
        {
          label: 'Base Horsepower',
          value: results.supercharger.baseHorsepower,
          unit: 'HP',
          precision: 1,
          category: 'secondary'
        }
      );
    }

    if (activeTab === 'ramair' && results.ramAir) {
      displayResults.push(
        {
          label: 'Ram Air Pressure',
          value: results.ramAir.psi,
          unit: 'PSI',
          precision: 3,
          category: 'primary'
        },
        {
          label: 'Horsepower Gain',
          value: `+${results.ramAir.hpGain.toFixed(1)}`,
          unit: 'HP',
          precision: 1,
          category: 'primary'
        },
        {
          label: 'Total Horsepower',
          value: results.ramAir.totalHorsepower,
          unit: 'HP',
          precision: 1,
          category: 'secondary'
        }
      );
    }

    if (activeTab === 'cfm' && results.cfm !== undefined) {
      displayResults.push({
        label: 'Required CFM',
        value: results.cfm,
        unit: 'CFM',
        precision: 1,
        category: 'primary'
      });
    }

    return displayResults;
  };

  const getWarnings = (): Warning[] => {
    const warnings: Warning[] = [];

    if (activeTab === 'supercharger' && results.supercharger) {
      results.supercharger.warnings.forEach(warning => {
        let severity: 'low' | 'medium' | 'high' = 'medium';
        if (warning.includes('race fuel') || warning.includes('extreme')) {
          severity = 'high';
        } else if (warning.includes('enriched') || warning.includes('lean')) {
          severity = 'high';
        }

        warnings.push({
          type: 'safety',
          message: warning,
          severity
        });
      });
    }

    return warnings;
  };

  const getRecommendations = (): Recommendation[] => {
    const recommendations: Recommendation[] = [];

    if (activeTab === 'supercharger' && results.supercharger) {
      const psi = results.supercharger.psi;
      
      if (psi <= 6) {
        recommendations.push({
          type: 'performance',
          message: 'Low boost levels are safe for most stock engines with proper tuning',
          priority: 'low'
        });
      } else if (psi <= 10) {
        recommendations.push({
          type: 'tuning',
          message: 'Medium boost levels require fuel system upgrades and careful tuning',
          priority: 'medium'
        });
      } else {
        recommendations.push({
          type: 'safety',
          message: 'High boost levels require extensive engine modifications and professional tuning',
          priority: 'high'
        });
      }

      recommendations.push({
        type: 'performance',
        message: 'Consider intercooling for improved efficiency and safety',
        priority: 'medium'
      });
    }

    if (activeTab === 'cfm' && results.cfm !== undefined) {
      recommendations.push({
        type: 'performance',
        message: 'Supercharged engines may need enriched carburetor settings to prevent running lean',
        priority: 'high'
      });
    }

    return recommendations;
  };

  const boostLevels = [
    { name: 'Mild', psi: 6, description: 'Safe for stock engines' },
    { name: 'Moderate', psi: 8, description: 'Good performance gain' },
    { name: 'Aggressive', psi: 12, description: 'Requires modifications' },
    { name: 'Extreme', psi: 15, description: 'Race applications only' }
  ];

  return (
    <div className="space-y-6">
      {/* Calculator Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <WindIcon className="h-5 w-5" />
            Forced Induction Calculator
          </CardTitle>
          <CardDescription>
            Calculate horsepower gains from superchargers, turbochargers, and ram air systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="supercharger" className="flex items-center gap-2">
                <ZapIcon className="h-4 w-4" />
                Supercharger
              </TabsTrigger>
              <TabsTrigger value="ramair" className="flex items-center gap-2">
                <WindIcon className="h-4 w-4" />
                Ram Air
              </TabsTrigger>
              <TabsTrigger value="cfm" className="flex items-center gap-2">
                <GaugeIcon className="h-4 w-4" />
                Boosted CFM
              </TabsTrigger>
            </TabsList>

            {/* Supercharger Calculator */}
            <TabsContent value="supercharger" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="baseHP">Base Horsepower (N/A) *</Label>
                  <Input
                    id="baseHP"
                    type="number"
                    step="1"
                    min="50"
                    max="1000"
                    placeholder="e.g., 300"
                    value={superchargerState.baseHP}
                    onChange={(e) => handleSuperchargerChange('baseHP', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="psi">Boost Pressure (PSI) *</Label>
                  <Input
                    id="psi"
                    type="number"
                    step="0.5"
                    min="0"
                    max="30"
                    placeholder="e.g., 8"
                    value={superchargerState.psi}
                    onChange={(e) => handleSuperchargerChange('psi', e.target.value)}
                  />
                </div>
              </div>

              {/* Boost Level Presets */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Common Boost Levels</Label>
                <div className="grid gap-2 md:grid-cols-2">
                  {boostLevels.map((level, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-sm">{level.name}</span>
                        <Badge variant="outline">{level.psi} PSI</Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{level.description}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs"
                        onClick={() => handleSuperchargerChange('psi', level.psi.toString())}
                      >
                        Use This
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                onClick={calculateSupercharger} 
                className="w-full"
                disabled={!superchargerState.baseHP || !superchargerState.psi}
              >
                Calculate Supercharger Gain
              </Button>
            </TabsContent>

            {/* Ram Air Calculator */}
            <TabsContent value="ramair" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ramBaseHP">Base Horsepower *</Label>
                  <Input
                    id="ramBaseHP"
                    type="number"
                    step="1"
                    min="50"
                    max="1000"
                    placeholder="e.g., 300"
                    value={ramAirState.baseHP}
                    onChange={(e) => handleRamAirChange('baseHP', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mph">Vehicle Speed (MPH) *</Label>
                  <Input
                    id="mph"
                    type="number"
                    step="5"
                    min="30"
                    max="200"
                    placeholder="e.g., 100"
                    value={ramAirState.mph}
                    onChange={(e) => handleRamAirChange('mph', e.target.value)}
                  />
                </div>
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <AlertDescription className="text-blue-800">
                  <strong>Ram Air Effect:</strong> Ram air systems use vehicle speed to create positive pressure 
                  in the intake. The effect is minimal at low speeds but becomes significant at highway speeds.
                  Pontiac Ram Air systems were famous for this technology.
                </AlertDescription>
              </Alert>

              <Button 
                onClick={calculateRamAir} 
                className="w-full"
                disabled={!ramAirState.baseHP || !ramAirState.mph}
              >
                Calculate Ram Air Gain
              </Button>
            </TabsContent>

            {/* Supercharger CFM Calculator */}
            <TabsContent value="cfm" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="displacement">Engine Displacement (CI) *</Label>
                  <Input
                    id="displacement"
                    type="number"
                    step="1"
                    min="100"
                    max="800"
                    placeholder="e.g., 350"
                    value={cfmState.displacement}
                    onChange={(e) => handleCfmChange('displacement', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cfmRpm">Maximum RPM *</Label>
                  <Input
                    id="cfmRpm"
                    type="number"
                    step="100"
                    min="3000"
                    max="8000"
                    placeholder="e.g., 6000"
                    value={cfmState.rpm}
                    onChange={(e) => handleCfmChange('rpm', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cfmPsi">Boost Pressure (PSI) *</Label>
                  <Input
                    id="cfmPsi"
                    type="number"
                    step="0.5"
                    min="0"
                    max="30"
                    placeholder="e.g., 8"
                    value={cfmState.psi}
                    onChange={(e) => handleCfmChange('psi', e.target.value)}
                  />
                </div>
              </div>

              <Alert className="border-orange-200 bg-orange-50">
                <AlertDescription className="text-orange-800">
                  <strong>Important:</strong> Supercharged engines may need enriched carburetor settings/jets 
                  to prevent running lean. The calculated CFM is for the carburetor or throttle body requirement.
                </AlertDescription>
              </Alert>

              <Button 
                onClick={calculateSuperchargerCFM} 
                className="w-full"
                disabled={!cfmState.displacement || !cfmState.rpm || !cfmState.psi}
              >
                Calculate Required CFM
              </Button>
            </TabsContent>
          </Tabs>

          {/* Errors */}
          {errors.length > 0 && (
            <Alert className="border-red-200 bg-red-50 mt-4">
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
      {getDisplayResults().length > 0 && (
        <PerformanceDisplay
          results={getDisplayResults()}
          recommendations={getRecommendations()}
          warnings={getWarnings()}
          title="Forced Induction Results"
          description="Your forced induction calculation results and safety recommendations"
        />
      )}

      {/* Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Forced Induction Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2">Supercharger Benefits</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Immediate throttle response</li>
                <li>• Linear power delivery</li>
                <li>• Works at all RPM ranges</li>
                <li>• Approximately 7% HP gain per PSI</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Turbocharger Benefits</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Higher efficiency potential</li>
                <li>• Uses exhaust energy</li>
                <li>• Better fuel economy when off boost</li>
                <li>• Can achieve higher boost levels</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-2">Safety Considerations</h4>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <Badge variant="outline" className="mb-2">Fuel System</Badge>
                <p className="text-sm text-gray-700">
                  Forced induction requires larger fuel injectors or enriched carburetor jetting 
                  to maintain proper air/fuel ratios under boost.
                </p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <Badge variant="outline" className="mb-2">Engine Internals</Badge>
                <p className="text-sm text-gray-700">
                  High boost levels may require forged pistons, stronger connecting rods, 
                  and upgraded head gaskets to handle increased cylinder pressures.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}