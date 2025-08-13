'use client';

import React, { useState, useCallback } from 'react';
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
import { AutomotiveResult, Recommendation } from '@/types/automotive';
import { CalculatorIcon, ZapIcon, RotateCcwIcon, GaugeIcon } from 'lucide-react';

interface HPToTorqueState {
  horsepower: string;
  rpm: string;
}

interface TorqueToHPState {
  torque: string;
  rpm: string;
}

interface HPTorqueToRPMState {
  horsepower: string;
  torque: string;
}

export function TorqueHorsepowerCalculator() {
  const [hpToTorqueState, setHpToTorqueState] = useState<HPToTorqueState>({
    horsepower: '',
    rpm: ''
  });
  
  const [torqueToHPState, setTorqueToHPState] = useState<TorqueToHPState>({
    torque: '',
    rpm: ''
  });
  
  const [hpTorqueToRPMState, setHpTorqueToRPMState] = useState<HPTorqueToRPMState>({
    horsepower: '',
    torque: ''
  });
  
  const [results, setResults] = useState<{
    torque?: number;
    horsepower?: number;
    rpm?: number;
  }>({});
  
  const [errors, setErrors] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('hp-to-torque');

  const handleHpToTorqueChange = useCallback((field: keyof HPToTorqueState, value: string) => {
    setHpToTorqueState(prev => ({ ...prev, [field]: value }));
    setErrors([]);
    setResults(prev => ({ ...prev, torque: undefined }));
  }, []);

  const handleTorqueToHPChange = useCallback((field: keyof TorqueToHPState, value: string) => {
    setTorqueToHPState(prev => ({ ...prev, [field]: value }));
    setErrors([]);
    setResults(prev => ({ ...prev, horsepower: undefined }));
  }, []);

  const handleHpTorqueToRPMChange = useCallback((field: keyof HPTorqueToRPMState, value: string) => {
    setHpTorqueToRPMState(prev => ({ ...prev, [field]: value }));
    setErrors([]);
    setResults(prev => ({ ...prev, rpm: undefined }));
  }, []);

  const calculateTorqueFromHP = useCallback(() => {
    const horsepower = parseFloat(hpToTorqueState.horsepower);
    const rpm = parseFloat(hpToTorqueState.rpm);
    const newErrors: string[] = [];

    // Validation
    if (!horsepower || isNaN(horsepower)) {
      newErrors.push('Please enter a valid horsepower value');
    } else {
      const validation = AutomotiveValidator.validateHorsepower(horsepower);
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (!rpm || isNaN(rpm)) {
      newErrors.push('Please enter a valid RPM value');
    } else {
      const validation = AutomotiveValidator.validateRPM(rpm);
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const torque = EngineFormulas.calculateTorque(horsepower, rpm);
    setResults(prev => ({ ...prev, torque }));
  }, [hpToTorqueState]);

  const calculateHPFromTorque = useCallback(() => {
    const torque = parseFloat(torqueToHPState.torque);
    const rpm = parseFloat(torqueToHPState.rpm);
    const newErrors: string[] = [];

    // Validation
    if (!torque || isNaN(torque)) {
      newErrors.push('Please enter a valid torque value');
    } else {
      const validation = AutomotiveValidator.validateTorque(torque);
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (!rpm || isNaN(rpm)) {
      newErrors.push('Please enter a valid RPM value');
    } else {
      const validation = AutomotiveValidator.validateRPM(rpm);
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const horsepower = EngineFormulas.calculateHorsepower(torque, rpm);
    setResults(prev => ({ ...prev, horsepower }));
  }, [torqueToHPState]);

  const calculateRPMFromHPTorque = useCallback(() => {
    const horsepower = parseFloat(hpTorqueToRPMState.horsepower);
    const torque = parseFloat(hpTorqueToRPMState.torque);
    const newErrors: string[] = [];

    // Validation
    if (!horsepower || isNaN(horsepower)) {
      newErrors.push('Please enter a valid horsepower value');
    } else {
      const validation = AutomotiveValidator.validateHorsepower(horsepower);
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (!torque || isNaN(torque)) {
      newErrors.push('Please enter a valid torque value');
    } else {
      const validation = AutomotiveValidator.validateTorque(torque);
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const rpm = EngineFormulas.calculateRPM(horsepower, torque);
    setResults(prev => ({ ...prev, rpm }));
  }, [hpTorqueToRPMState]);

  const getDisplayResults = (): AutomotiveResult[] => {
    const displayResults: AutomotiveResult[] = [];

    if (activeTab === 'hp-to-torque' && results.torque !== undefined) {
      displayResults.push(
        {
          label: 'Torque',
          value: results.torque,
          unit: 'lb-ft',
          precision: 1,
          category: 'primary'
        },
        {
          label: 'Horsepower',
          value: parseFloat(hpToTorqueState.horsepower),
          unit: 'HP',
          precision: 1,
          category: 'secondary'
        },
        {
          label: 'RPM',
          value: parseFloat(hpToTorqueState.rpm),
          unit: 'RPM',
          precision: 0,
          category: 'secondary'
        }
      );

      // Show if this is the 5252 RPM crossover point
      const rpm = parseFloat(hpToTorqueState.rpm);
      if (Math.abs(rpm - 5252) < 50) {
        displayResults.push({
          label: 'Special Note',
          value: 'HP = Torque at 5252 RPM',
          unit: '',
          precision: 0,
          category: 'derived'
        });
      }
    }

    if (activeTab === 'torque-to-hp' && results.horsepower !== undefined) {
      displayResults.push(
        {
          label: 'Horsepower',
          value: results.horsepower,
          unit: 'HP',
          precision: 1,
          category: 'primary'
        },
        {
          label: 'Torque',
          value: parseFloat(torqueToHPState.torque),
          unit: 'lb-ft',
          precision: 1,
          category: 'secondary'
        },
        {
          label: 'RPM',
          value: parseFloat(torqueToHPState.rpm),
          unit: 'RPM',
          precision: 0,
          category: 'secondary'
        }
      );

      // Show if this is the 5252 RPM crossover point
      const rpm = parseFloat(torqueToHPState.rpm);
      if (Math.abs(rpm - 5252) < 50) {
        displayResults.push({
          label: 'Special Note',
          value: 'HP = Torque at 5252 RPM',
          unit: '',
          precision: 0,
          category: 'derived'
        });
      }
    }

    if (activeTab === 'hp-torque-to-rpm' && results.rpm !== undefined) {
      displayResults.push(
        {
          label: 'RPM',
          value: results.rpm,
          unit: 'RPM',
          precision: 0,
          category: 'primary'
        },
        {
          label: 'Horsepower',
          value: parseFloat(hpTorqueToRPMState.horsepower),
          unit: 'HP',
          precision: 1,
          category: 'secondary'
        },
        {
          label: 'Torque',
          value: parseFloat(hpTorqueToRPMState.torque),
          unit: 'lb-ft',
          precision: 1,
          category: 'secondary'
        }
      );

      // Show if this is the 5252 RPM crossover point
      if (Math.abs(results.rpm - 5252) < 50) {
        displayResults.push({
          label: 'Special Note',
          value: 'HP = Torque at 5252 RPM',
          unit: '',
          precision: 0,
          category: 'derived'
        });
      }
    }

    return displayResults;
  };

  const getRecommendations = (): Recommendation[] => {
    const recommendations: Recommendation[] = [];

    // General recommendations based on the calculation type
    if (activeTab === 'hp-to-torque' && results.torque !== undefined) {
      const hp = parseFloat(hpToTorqueState.horsepower);
      const torque = results.torque;
      const rpm = parseFloat(hpToTorqueState.rpm);

      if (torque > hp) {
        recommendations.push({
          type: 'performance',
          message: 'High torque relative to horsepower - excellent for low-end power and acceleration',
          priority: 'medium'
        });
      }

      if (rpm > 6000) {
        recommendations.push({
          type: 'performance',
          message: 'High RPM operation - ensure engine components can handle sustained high RPM',
          priority: 'medium'
        });
      }
    }

    if (activeTab === 'torque-to-hp' && results.horsepower !== undefined) {
      const torque = parseFloat(torqueToHPState.torque);
      const hp = results.horsepower;
      const rpm = parseFloat(torqueToHPState.rpm);

      if (hp > torque) {
        recommendations.push({
          type: 'performance',
          message: 'High horsepower relative to torque - good for high RPM performance',
          priority: 'medium'
        });
      }

      if (rpm < 3000 && hp > 300) {
        recommendations.push({
          type: 'performance',
          message: 'High horsepower at low RPM indicates excellent torque production',
          priority: 'low'
        });
      }
    }

    // Universal recommendations
    recommendations.push({
      type: 'performance',
      message: 'Remember: Torque determines acceleration feel, horsepower determines top speed capability',
      priority: 'low'
    });

    return recommendations;
  };

  const commonExamples = [
    { name: 'Small Block Chevy 350', hp: 300, torque: 350, rpm: 4500 },
    { name: 'Big Block Chevy 454', hp: 400, torque: 500, rpm: 4200 },
    { name: 'Modern LS3 6.2L', hp: 430, torque: 424, rpm: 5300 },
    { name: 'Cummins Diesel', hp: 350, torque: 650, rpm: 2800 },
    { name: 'High RPM Race Engine', hp: 500, torque: 400, rpm: 6500 }
  ];

  return (
    <div className="space-y-6">
      {/* Calculator Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalculatorIcon className="h-5 w-5" />
            Torque & Horsepower Calculator
          </CardTitle>
          <CardDescription>
            Convert between torque, horsepower, and RPM using the fundamental automotive relationship
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="hp-to-torque" className="flex items-center gap-2">
                <RotateCcwIcon className="h-4 w-4" />
                HP → Torque
              </TabsTrigger>
              <TabsTrigger value="torque-to-hp" className="flex items-center gap-2">
                <ZapIcon className="h-4 w-4" />
                Torque → HP
              </TabsTrigger>
              <TabsTrigger value="hp-torque-to-rpm" className="flex items-center gap-2">
                <GaugeIcon className="h-4 w-4" />
                HP & Torque → RPM
              </TabsTrigger>
            </TabsList>

            {/* HP to Torque Calculator */}
            <TabsContent value="hp-to-torque" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="hp1" className="flex items-center gap-2">
                    Horsepower *
                    <AutoTermTooltip termKey="powerToWeight" triggerText="?" />
                  </Label>
                  <Input
                    id="hp1"
                    type="number"
                    step="1"
                    min="50"
                    max="2000"
                    placeholder="e.g., 300"
                    value={hpToTorqueState.horsepower}
                    onChange={(e) => handleHpToTorqueChange('horsepower', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rpm1">RPM *</Label>
                  <Input
                    id="rpm1"
                    type="number"
                    step="100"
                    min="500"
                    max="10000"
                    placeholder="e.g., 4500"
                    value={hpToTorqueState.rpm}
                    onChange={(e) => handleHpToTorqueChange('rpm', e.target.value)}
                  />
                </div>
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <AlertDescription className="text-blue-800">
                  <strong>Formula:</strong> Torque = (Horsepower × 5252) ÷ RPM
                </AlertDescription>
              </Alert>

              <Button 
                onClick={calculateTorqueFromHP} 
                className="w-full"
                disabled={!hpToTorqueState.horsepower || !hpToTorqueState.rpm}
              >
                Calculate Torque
              </Button>
            </TabsContent>

            {/* Torque to HP Calculator */}
            <TabsContent value="torque-to-hp" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="torque1">Torque (lb-ft) *</Label>
                  <Input
                    id="torque1"
                    type="number"
                    step="1"
                    min="50"
                    max="1500"
                    placeholder="e.g., 350"
                    value={torqueToHPState.torque}
                    onChange={(e) => handleTorqueToHPChange('torque', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rpm2">RPM *</Label>
                  <Input
                    id="rpm2"
                    type="number"
                    step="100"
                    min="500"
                    max="10000"
                    placeholder="e.g., 4500"
                    value={torqueToHPState.rpm}
                    onChange={(e) => handleTorqueToHPChange('rpm', e.target.value)}
                  />
                </div>
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <AlertDescription className="text-blue-800">
                  <strong>Formula:</strong> Horsepower = (Torque × RPM) ÷ 5252
                </AlertDescription>
              </Alert>

              <Button 
                onClick={calculateHPFromTorque} 
                className="w-full"
                disabled={!torqueToHPState.torque || !torqueToHPState.rpm}
              >
                Calculate Horsepower
              </Button>
            </TabsContent>

            {/* HP & Torque to RPM Calculator */}
            <TabsContent value="hp-torque-to-rpm" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="hp3">Horsepower *</Label>
                  <Input
                    id="hp3"
                    type="number"
                    step="1"
                    min="50"
                    max="2000"
                    placeholder="e.g., 300"
                    value={hpTorqueToRPMState.horsepower}
                    onChange={(e) => handleHpTorqueToRPMChange('horsepower', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="torque3">Torque (lb-ft) *</Label>
                  <Input
                    id="torque3"
                    type="number"
                    step="1"
                    min="50"
                    max="1500"
                    placeholder="e.g., 350"
                    value={hpTorqueToRPMState.torque}
                    onChange={(e) => handleHpTorqueToRPMChange('torque', e.target.value)}
                  />
                </div>
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <AlertDescription className="text-blue-800">
                  <strong>Formula:</strong> RPM = (Horsepower × 5252) ÷ Torque
                </AlertDescription>
              </Alert>

              <Button 
                onClick={calculateRPMFromHPTorque} 
                className="w-full"
                disabled={!hpTorqueToRPMState.horsepower || !hpTorqueToRPMState.torque}
              >
                Calculate RPM
              </Button>
            </TabsContent>
          </Tabs>

          {/* Common Examples */}
          <div className="space-y-3 mt-6">
            <Label className="text-sm font-medium">Common Engine Examples</Label>
            <div className="grid gap-2 md:grid-cols-2">
              {commonExamples.map((example, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">{example.name}</span>
                    <Badge variant="outline">
                      {example.hp}HP @ {example.rpm}RPM
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">
                    {example.torque} lb-ft torque
                  </p>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={() => {
                        if (activeTab === 'hp-to-torque') {
                          setHpToTorqueState({
                            horsepower: example.hp.toString(),
                            rpm: example.rpm.toString()
                          });
                        } else if (activeTab === 'torque-to-hp') {
                          setTorqueToHPState({
                            torque: example.torque.toString(),
                            rpm: example.rpm.toString()
                          });
                        } else {
                          setHpTorqueToRPMState({
                            horsepower: example.hp.toString(),
                            torque: example.torque.toString()
                          });
                        }
                      }}
                    >
                      Use This
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
          title="Torque & Horsepower Results"
          description="Your torque and horsepower calculation results"
        />
      )}

      {/* Information Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Understanding the Relationship</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold mb-2">The 5252 RPM Rule</h4>
              <p className="text-sm text-gray-700">
                Horsepower and torque curves always cross at exactly 5252 RPM. This is because 
                of the mathematical relationship between the two measurements and the constant 5252 
                in the conversion formula.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Key Concepts</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Torque is the twisting force applied to the crankshaft</li>
                <li>• Horsepower is the rate at which work is performed</li>
                <li>• HP = (Torque × RPM) ÷ 5252</li>
                <li>• Below 5252 RPM: Torque &gt; Horsepower</li>
                <li>• Above 5252 RPM: Horsepower &gt; Torque</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Practical Applications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-700">Torque Advantages</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Determines acceleration feel</li>
                <li>• Important for towing and hauling</li>
                <li>• Better for stop-and-go driving</li>
                <li>• Peak torque usually occurs at lower RPM</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-700">Horsepower Advantages</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Determines top speed capability</li>
                <li>• Important for sustained high-speed driving</li>
                <li>• Better for racing applications</li>
                <li>• Peak HP usually occurs at higher RPM</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}