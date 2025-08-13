'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PerformanceDisplay } from '@/components/automotive/PerformanceDisplay';
import { EngineFormulas } from '@/lib/automotive/engine-formulas';
import { AutomotiveValidator } from '@/lib/automotive/automotive-validators';
import { AutomotiveResult, Recommendation } from '@/types/automotive';
import { CalculatorIcon, CylinderIcon, SettingsIcon, RulerIcon } from 'lucide-react';

interface BoreStrokeState {
  bore: string;
  stroke: string;
  cylinders: string;
}

interface DisplacementState {
  displacement: string;
  cylinders: string;
  unit: 'ci' | 'liters';
}

interface CylinderVolumeState {
  cylinderVolume: string;
  cylinders: string;
}

export function EngineDisplacementCalculator() {
  const [boreStrokeState, setBoreStrokeState] = useState<BoreStrokeState>({
    bore: '',
    stroke: '',
    cylinders: '8'
  });
  
  const [displacementState, setDisplacementState] = useState<DisplacementState>({
    displacement: '',
    cylinders: '8',
    unit: 'ci'
  });
  
  const [cylinderVolumeState, setCylinderVolumeState] = useState<CylinderVolumeState>({
    cylinderVolume: '',
    cylinders: '8'
  });
  
  const [results, setResults] = useState<{
    fromBoreStroke?: {
      cylinderVolume: number;
      totalDisplacement: number;
      bore: number;
      stroke: number;
      cylinders: number;
    };
    fromDisplacement?: {
      cylinderVolume: number;
      displacement: number;
      cylinders: number;
      unit: 'ci' | 'liters';
    };
    fromCylinderVolume?: {
      totalDisplacement: number;
      cylinderVolume: number;
      cylinders: number;
    };
  }>({});
  
  const [errors, setErrors] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('bore-stroke');

  const handleBoreStrokeChange = useCallback((field: keyof BoreStrokeState, value: string) => {
    setBoreStrokeState(prev => ({ ...prev, [field]: value }));
    setErrors([]);
    setResults(prev => ({ ...prev, fromBoreStroke: undefined }));
  }, []);

  const handleDisplacementChange = useCallback((field: keyof DisplacementState, value: string) => {
    setDisplacementState(prev => ({ ...prev, [field]: value }));
    setErrors([]);
    setResults(prev => ({ ...prev, fromDisplacement: undefined }));
  }, []);

  const handleCylinderVolumeChange = useCallback((field: keyof CylinderVolumeState, value: string) => {
    setCylinderVolumeState(prev => ({ ...prev, [field]: value }));
    setErrors([]);
    setResults(prev => ({ ...prev, fromCylinderVolume: undefined }));
  }, []);

  const calculateFromBoreStroke = useCallback(() => {
    const bore = parseFloat(boreStrokeState.bore);
    const stroke = parseFloat(boreStrokeState.stroke);
    const cylinders = parseInt(boreStrokeState.cylinders);
    const newErrors: string[] = [];

    // Validation
    if (!bore || isNaN(bore) || !stroke || isNaN(stroke)) {
      newErrors.push('Please enter valid bore and stroke dimensions');
    } else {
      const validation = AutomotiveValidator.validateBoreStroke(bore, stroke);
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (!cylinders || isNaN(cylinders)) {
      newErrors.push('Please select number of cylinders');
    } else {
      const validation = AutomotiveValidator.validateCylinders(cylinders);
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const cylinderVolume = EngineFormulas.calculateCylinderVolume(bore, stroke);
    const totalDisplacement = EngineFormulas.calculateEngineDisplacement(cylinderVolume, cylinders);

    setResults(prev => ({
      ...prev,
      fromBoreStroke: {
        cylinderVolume,
        totalDisplacement,
        bore,
        stroke,
        cylinders
      }
    }));
  }, [boreStrokeState]);

  const calculateFromDisplacement = useCallback(() => {
    const displacement = parseFloat(displacementState.displacement);
    const cylinders = parseInt(displacementState.cylinders);
    const newErrors: string[] = [];

    // Validation
    if (!displacement || isNaN(displacement)) {
      newErrors.push('Please enter a valid displacement');
    } else {
      const validation = AutomotiveValidator.validateEngineDisplacement(displacement, displacementState.unit);
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (!cylinders || isNaN(cylinders)) {
      newErrors.push('Please select number of cylinders');
    } else {
      const validation = AutomotiveValidator.validateCylinders(cylinders);
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    // Convert to CI if needed
    const displacementCI = displacementState.unit === 'liters' 
      ? EngineFormulas.litersToCi(displacement)
      : displacement;

    const cylinderVolume = displacementCI / cylinders;

    setResults(prev => ({
      ...prev,
      fromDisplacement: {
        cylinderVolume,
        displacement,
        cylinders,
        unit: displacementState.unit
      }
    }));
  }, [displacementState]);

  const calculateFromCylinderVolume = useCallback(() => {
    const cylinderVolume = parseFloat(cylinderVolumeState.cylinderVolume);
    const cylinders = parseInt(cylinderVolumeState.cylinders);
    const newErrors: string[] = [];

    // Validation
    if (!cylinderVolume || isNaN(cylinderVolume)) {
      newErrors.push('Please enter a valid cylinder volume');
    } else if (cylinderVolume < 10 || cylinderVolume > 150) {
      newErrors.push('Cylinder volume must be between 10 and 150 cubic inches');
    }

    if (!cylinders || isNaN(cylinders)) {
      newErrors.push('Please select number of cylinders');
    } else {
      const validation = AutomotiveValidator.validateCylinders(cylinders);
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const totalDisplacement = EngineFormulas.calculateEngineDisplacement(cylinderVolume, cylinders);

    setResults(prev => ({
      ...prev,
      fromCylinderVolume: {
        totalDisplacement,
        cylinderVolume,
        cylinders
      }
    }));
  }, [cylinderVolumeState]);

  const getDisplayResults = (): AutomotiveResult[] => {
    const displayResults: AutomotiveResult[] = [];

    if (activeTab === 'bore-stroke' && results.fromBoreStroke) {
      const result = results.fromBoreStroke;
      displayResults.push(
        {
          label: 'Total Displacement',
          value: result.totalDisplacement,
          unit: 'cubic inches',
          precision: 1,
          category: 'primary'
        },
        {
          label: 'Displacement (Liters)',
          value: EngineFormulas.ciToLiters(result.totalDisplacement),
          unit: 'L',
          precision: 2,
          category: 'primary'
        },
        {
          label: 'Cylinder Volume',
          value: result.cylinderVolume,
          unit: 'ci',
          precision: 2,
          category: 'secondary'
        },
        {
          label: 'Bore × Stroke',
          value: `${result.bore}" × ${result.stroke}"`,
          unit: '',
          precision: 2,
          category: 'secondary'
        },
        {
          label: 'Number of Cylinders',
          value: result.cylinders,
          unit: '',
          precision: 0,
          category: 'secondary'
        }
      );
    }

    if (activeTab === 'displacement' && results.fromDisplacement) {
      const result = results.fromDisplacement;
      displayResults.push(
        {
          label: 'Cylinder Volume',
          value: result.cylinderVolume,
          unit: 'cubic inches',
          precision: 2,
          category: 'primary'
        },
        {
          label: 'Total Displacement',
          value: result.displacement,
          unit: result.unit === 'ci' ? 'cubic inches' : 'liters',
          precision: result.unit === 'ci' ? 1 : 2,
          category: 'secondary'
        }
      );

      // Add conversion
      if (result.unit === 'ci') {
        displayResults.push({
          label: 'Displacement (Liters)',
          value: EngineFormulas.ciToLiters(result.displacement),
          unit: 'L',
          precision: 2,
          category: 'derived'
        });
      } else {
        displayResults.push({
          label: 'Displacement (CI)',
          value: EngineFormulas.litersToCi(result.displacement),
          unit: 'ci',
          precision: 1,
          category: 'derived'
        });
      }
    }

    if (activeTab === 'cylinder-volume' && results.fromCylinderVolume) {
      const result = results.fromCylinderVolume;
      displayResults.push(
        {
          label: 'Total Displacement',
          value: result.totalDisplacement,
          unit: 'cubic inches',
          precision: 1,
          category: 'primary'
        },
        {
          label: 'Displacement (Liters)',
          value: EngineFormulas.ciToLiters(result.totalDisplacement),
          unit: 'L',
          precision: 2,
          category: 'primary'
        },
        {
          label: 'Cylinder Volume',
          value: result.cylinderVolume,
          unit: 'ci',
          precision: 2,
          category: 'secondary'
        }
      );
    }

    return displayResults;
  };

  const getRecommendations = (): Recommendation[] => {
    const recommendations: Recommendation[] = [];

    if (activeTab === 'bore-stroke' && results.fromBoreStroke) {
      const { bore, stroke } = results.fromBoreStroke;
      const boreStrokeRatio = bore / stroke;

      if (boreStrokeRatio > 1.1) {
        recommendations.push({
          type: 'performance',
          message: 'Oversquare engine (bore > stroke) - typically better for high RPM applications',
          priority: 'medium'
        });
      } else if (boreStrokeRatio < 0.95) {
        recommendations.push({
          type: 'performance',
          message: 'Undersquare engine (stroke > bore) - typically produces more torque at lower RPM',
          priority: 'medium'
        });
      } else {
        recommendations.push({
          type: 'performance',
          message: 'Square engine (bore ≈ stroke) - balanced design for general performance',
          priority: 'low'
        });
      }
    }

    // General recommendations based on displacement
    const displacement = activeTab === 'bore-stroke' && results.fromBoreStroke 
      ? results.fromBoreStroke.totalDisplacement
      : activeTab === 'cylinder-volume' && results.fromCylinderVolume
      ? results.fromCylinderVolume.totalDisplacement
      : null;

    if (displacement) {
      if (displacement < 200) {
        recommendations.push({
          type: 'performance',
          message: 'Small displacement engine - focus on high RPM and efficiency',
          priority: 'low'
        });
      } else if (displacement > 500) {
        recommendations.push({
          type: 'performance',
          message: 'Large displacement engine - excellent for torque and low-end power',
          priority: 'low'
        });
      }
    }

    return recommendations;
  };

  const commonEngines = [
    { name: 'Chevy 350 SBC', bore: 4.00, stroke: 3.48, cylinders: 8 },
    { name: 'Chevy 454 BBC', bore: 4.25, stroke: 4.00, cylinders: 8 },
    { name: 'Ford 302', bore: 4.00, stroke: 3.00, cylinders: 8 },
    { name: 'Ford 351W', bore: 4.00, stroke: 3.50, cylinders: 8 },
    { name: 'Pontiac 455', bore: 4.15, stroke: 4.21, cylinders: 8 },
    { name: 'Mopar 440', bore: 4.32, stroke: 3.75, cylinders: 8 }
  ];

  return (
    <div className="space-y-6">
      {/* Calculator Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Engine Displacement Calculator
          </CardTitle>
          <CardDescription>
            Calculate engine displacement and cylinder volumes using different methods
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="bore-stroke" className="flex items-center gap-2">
                <RulerIcon className="h-4 w-4" />
                Bore & Stroke
              </TabsTrigger>
              <TabsTrigger value="displacement" className="flex items-center gap-2">
                <SettingsIcon className="h-4 w-4" />
                From Displacement
              </TabsTrigger>
              <TabsTrigger value="cylinder-volume" className="flex items-center gap-2">
                <CylinderIcon className="h-4 w-4" />
                From Cylinder Volume
              </TabsTrigger>
            </TabsList>

            {/* Bore & Stroke Calculator */}
            <TabsContent value="bore-stroke" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="bore">Bore Diameter (inches) *</Label>
                  <Input
                    id="bore"
                    type="number"
                    step="0.01"
                    min="2"
                    max="6"
                    placeholder="e.g., 4.00"
                    value={boreStrokeState.bore}
                    onChange={(e) => handleBoreStrokeChange('bore', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stroke">Stroke Length (inches) *</Label>
                  <Input
                    id="stroke"
                    type="number"
                    step="0.01"
                    min="2"
                    max="6"
                    placeholder="e.g., 3.48"
                    value={boreStrokeState.stroke}
                    onChange={(e) => handleBoreStrokeChange('stroke', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cylinders">Number of Cylinders *</Label>
                  <Select
                    value={boreStrokeState.cylinders}
                    onValueChange={(value) => handleBoreStrokeChange('cylinders', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 Cylinders</SelectItem>
                      <SelectItem value="4">4 Cylinders</SelectItem>
                      <SelectItem value="5">5 Cylinders</SelectItem>
                      <SelectItem value="6">6 Cylinders</SelectItem>
                      <SelectItem value="8">8 Cylinders (V8)</SelectItem>
                      <SelectItem value="10">10 Cylinders (V10)</SelectItem>
                      <SelectItem value="12">12 Cylinders (V12)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Common Engine Presets */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Common Engine Specifications</Label>
                <div className="grid gap-2 md:grid-cols-2">
                  {commonEngines.map((engine, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-sm">{engine.name}</span>
                        <Badge variant="outline">
                          {engine.bore}" × {engine.stroke}"
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">
                        {engine.cylinders} cylinders
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs"
                        onClick={() => {
                          setBoreStrokeState({
                            bore: engine.bore.toString(),
                            stroke: engine.stroke.toString(),
                            cylinders: engine.cylinders.toString()
                          });
                        }}
                      >
                        Use This
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                onClick={calculateFromBoreStroke} 
                className="w-full"
                disabled={!boreStrokeState.bore || !boreStrokeState.stroke}
              >
                Calculate Displacement
              </Button>
            </TabsContent>

            {/* From Displacement Calculator */}
            <TabsContent value="displacement" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="totalDisplacement">Engine Displacement *</Label>
                  <Input
                    id="totalDisplacement"
                    type="number"
                    step="0.1"
                    min="50"
                    placeholder={displacementState.unit === 'ci' ? 'e.g., 350' : 'e.g., 5.7'}
                    value={displacementState.displacement}
                    onChange={(e) => handleDisplacementChange('displacement', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select
                    value={displacementState.unit}
                    onValueChange={(value: 'ci' | 'liters') => handleDisplacementChange('unit', value)}
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
                <div className="space-y-2">
                  <Label htmlFor="dispCylinders">Number of Cylinders *</Label>
                  <Select
                    value={displacementState.cylinders}
                    onValueChange={(value) => handleDisplacementChange('cylinders', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 Cylinders</SelectItem>
                      <SelectItem value="4">4 Cylinders</SelectItem>
                      <SelectItem value="5">5 Cylinders</SelectItem>
                      <SelectItem value="6">6 Cylinders</SelectItem>
                      <SelectItem value="8">8 Cylinders (V8)</SelectItem>
                      <SelectItem value="10">10 Cylinders (V10)</SelectItem>
                      <SelectItem value="12">12 Cylinders (V12)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={calculateFromDisplacement} 
                className="w-full"
                disabled={!displacementState.displacement}
              >
                Calculate Cylinder Volume
              </Button>
            </TabsContent>

            {/* From Cylinder Volume Calculator */}
            <TabsContent value="cylinder-volume" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cylinderVol">Cylinder Volume (CI) *</Label>
                  <Input
                    id="cylinderVol"
                    type="number"
                    step="0.1"
                    min="10"
                    max="150"
                    placeholder="e.g., 43.75"
                    value={cylinderVolumeState.cylinderVolume}
                    onChange={(e) => handleCylinderVolumeChange('cylinderVolume', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvCylinders">Number of Cylinders *</Label>
                  <Select
                    value={cylinderVolumeState.cylinders}
                    onValueChange={(value) => handleCylinderVolumeChange('cylinders', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 Cylinders</SelectItem>
                      <SelectItem value="4">4 Cylinders</SelectItem>
                      <SelectItem value="5">5 Cylinders</SelectItem>
                      <SelectItem value="6">6 Cylinders</SelectItem>
                      <SelectItem value="8">8 Cylinders (V8)</SelectItem>
                      <SelectItem value="10">10 Cylinders (V10)</SelectItem>
                      <SelectItem value="12">12 Cylinders (V12)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={calculateFromCylinderVolume} 
                className="w-full"
                disabled={!cylinderVolumeState.cylinderVolume}
              >
                Calculate Total Displacement
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
          title="Engine Displacement Results"
          description="Your engine displacement and volume calculations"
        />
      )}

      {/* Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Engine Design Characteristics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 text-green-700">Oversquare (Bore &gt; Stroke)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Higher RPM capability</li>
                <li>• Better breathing at high RPM</li>
                <li>• More valve area per displacement</li>
                <li>• Example: Ford 302 (4.00" × 3.00")</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 text-blue-700">Square (Bore = Stroke)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Balanced design</li>
                <li>• Good all-around performance</li>
                <li>• Moderate RPM capability</li>
                <li>• Versatile for many applications</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 text-orange-700">Undersquare (Stroke &gt; Bore)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Higher torque production</li>
                <li>• Better low-end power</li>
                <li>• Longer connecting rods possible</li>
                <li>• Example: Pontiac 455 (4.15" × 4.21")</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}