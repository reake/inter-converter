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
import { DrivetrainFormulas } from '@/lib/automotive/drivetrain-calculations';
import { AutomotiveValidator } from '@/lib/automotive/automotive-validators';
import { GearRatioResult, AutomotiveResult, Recommendation } from '@/types/automotive';
import { CalculatorIcon, SettingsIcon, GaugeIcon, TargetIcon } from 'lucide-react';

interface TeethCalculatorState {
  ringTeeth: string;
  pinionTeeth: string;
}

interface CurrentRatioState {
  mph: string;
  rpm: string;
  tireDiameter: string;
}

interface IdealRatioState {
  desiredMPH: string;
  maxRPM: string;
  tireDiameter: string;
}

export function GearRatioCalculator() {
  const [teethState, setTeethState] = useState<TeethCalculatorState>({
    ringTeeth: '',
    pinionTeeth: ''
  });
  
  const [currentState, setCurrentState] = useState<CurrentRatioState>({
    mph: '',
    rpm: '',
    tireDiameter: ''
  });
  
  const [idealState, setIdealState] = useState<IdealRatioState>({
    desiredMPH: '',
    maxRPM: '',
    tireDiameter: ''
  });
  
  const [results, setResults] = useState<{
    teeth?: number;
    current?: number;
    ideal?: GearRatioResult;
  }>({});
  
  const [errors, setErrors] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('teeth');

  const handleTeethChange = useCallback((field: keyof TeethCalculatorState, value: string) => {
    setTeethState(prev => ({ ...prev, [field]: value }));
    setErrors([]);
    setResults(prev => ({ ...prev, teeth: undefined }));
  }, []);

  const handleCurrentChange = useCallback((field: keyof CurrentRatioState, value: string) => {
    setCurrentState(prev => ({ ...prev, [field]: value }));
    setErrors([]);
    setResults(prev => ({ ...prev, current: undefined }));
  }, []);

  const handleIdealChange = useCallback((field: keyof IdealRatioState, value: string) => {
    setIdealState(prev => ({ ...prev, [field]: value }));
    setErrors([]);
    setResults(prev => ({ ...prev, ideal: undefined }));
  }, []);

  const calculateFromTeeth = useCallback(() => {
    const ringTeeth = parseInt(teethState.ringTeeth);
    const pinionTeeth = parseInt(teethState.pinionTeeth);
    const newErrors: string[] = [];

    // Validation
    if (!ringTeeth || isNaN(ringTeeth)) {
      newErrors.push('Please enter a valid number of ring gear teeth');
    } else {
      const validation = AutomotiveValidator.validateGearTeeth(ringTeeth, 'ring');
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (!pinionTeeth || isNaN(pinionTeeth)) {
      newErrors.push('Please enter a valid number of pinion gear teeth');
    } else {
      const validation = AutomotiveValidator.validateGearTeeth(pinionTeeth, 'pinion');
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const ratio = DrivetrainFormulas.calculateGearRatio(ringTeeth, pinionTeeth);
    setResults(prev => ({ ...prev, teeth: ratio }));
  }, [teethState]);

  const calculateCurrentRatio = useCallback(() => {
    const mph = parseFloat(currentState.mph);
    const rpm = parseFloat(currentState.rpm);
    const tireDiameter = parseFloat(currentState.tireDiameter);
    const newErrors: string[] = [];

    // Validation
    if (!mph || isNaN(mph)) {
      newErrors.push('Please enter a valid speed in MPH');
    } else {
      const validation = AutomotiveValidator.validateSpeed(mph);
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (!rpm || isNaN(rpm)) {
      newErrors.push('Please enter a valid RPM');
    } else {
      const validation = AutomotiveValidator.validateRPM(rpm);
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (!tireDiameter || isNaN(tireDiameter)) {
      newErrors.push('Please enter a valid tire diameter');
    } else {
      const validation = DrivetrainFormulas.validateTireDiameter(tireDiameter);
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const ratio = DrivetrainFormulas.calculateCurrentRatio(mph, rpm, tireDiameter);
    setResults(prev => ({ ...prev, current: ratio }));
  }, [currentState]);

  const calculateIdealRatio = useCallback(() => {
    const desiredMPH = parseFloat(idealState.desiredMPH);
    const maxRPM = parseFloat(idealState.maxRPM);
    const tireDiameter = parseFloat(idealState.tireDiameter);
    const newErrors: string[] = [];

    // Validation
    if (!desiredMPH || isNaN(desiredMPH)) {
      newErrors.push('Please enter a valid desired speed');
    } else {
      const validation = AutomotiveValidator.validateSpeed(desiredMPH);
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (!maxRPM || isNaN(maxRPM)) {
      newErrors.push('Please enter a valid maximum RPM');
    } else {
      const validation = AutomotiveValidator.validateRPM(maxRPM);
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (!tireDiameter || isNaN(tireDiameter)) {
      newErrors.push('Please enter a valid tire diameter');
    } else {
      const validation = DrivetrainFormulas.validateTireDiameter(tireDiameter);
      if (!validation.isValid) {
        newErrors.push(validation.error!);
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = DrivetrainFormulas.calculateIdealRatio(desiredMPH, maxRPM, tireDiameter);
    setResults(prev => ({ ...prev, ideal: result }));
  }, [idealState]);

  const getDisplayResults = (): AutomotiveResult[] => {
    const displayResults: AutomotiveResult[] = [];

    if (activeTab === 'teeth' && results.teeth !== undefined) {
      displayResults.push({
        label: 'Gear Ratio',
        value: `${results.teeth.toFixed(2)}:1`,
        unit: '',
        precision: 2,
        category: 'primary'
      });
    }

    if (activeTab === 'current' && results.current !== undefined) {
      displayResults.push({
        label: 'Current Gear Ratio',
        value: `${results.current.toFixed(2)}:1`,
        unit: '',
        precision: 2,
        category: 'primary'
      });
    }

    if (activeTab === 'ideal' && results.ideal) {
      displayResults.push({
        label: 'Ideal Gear Ratio',
        value: `${results.ideal.ratio.toFixed(2)}:1`,
        unit: '',
        precision: 2,
        category: 'primary'
      });
    }

    return displayResults;
  };

  const getRecommendations = (): Recommendation[] => {
    if (activeTab === 'ideal' && results.ideal) {
      return results.ideal.recommendations.map(rec => ({
        type: 'performance' as const,
        message: rec,
        priority: 'medium' as const
      }));
    }
    return [];
  };

  const commonGearRatios = [
    { name: 'Highway Cruising', ratio: 2.73, description: 'Best fuel economy' },
    { name: 'Balanced Street', ratio: 3.08, description: 'Good all-around' },
    { name: 'Street Performance', ratio: 3.42, description: 'Performance oriented' },
    { name: 'Aggressive Street', ratio: 3.73, description: 'Quick acceleration' },
    { name: 'Drag Racing', ratio: 4.10, description: 'Maximum acceleration' },
    { name: 'Pro Drag', ratio: 4.56, description: 'Professional racing' }
  ];

  const commonTeethCombinations = [
    { ring: 37, pinion: 12, ratio: 3.08 },
    { ring: 41, pinion: 12, ratio: 3.42 },
    { ring: 41, pinion: 11, ratio: 3.73 },
    { ring: 41, pinion: 10, ratio: 4.10 },
    { ring: 46, pinion: 10, ratio: 4.56 }
  ];

  return (
    <div className="space-y-6">
      {/* Calculator Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalculatorIcon className="h-5 w-5" />
            Gear Ratio Calculator
          </CardTitle>
          <CardDescription>
            Calculate gear ratios using different methods based on your available information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="teeth" className="flex items-center gap-2">
                <SettingsIcon className="h-4 w-4" />
                From Teeth Count
              </TabsTrigger>
              <TabsTrigger value="current" className="flex items-center gap-2">
                <GaugeIcon className="h-4 w-4" />
                Current Ratio
              </TabsTrigger>
              <TabsTrigger value="ideal" className="flex items-center gap-2">
                <TargetIcon className="h-4 w-4" />
                Ideal Ratio
              </TabsTrigger>
            </TabsList>

            {/* Teeth Count Calculator */}
            <TabsContent value="teeth" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ringTeeth" className="flex items-center gap-2">
                    Ring Gear Teeth *
                    <AutoTermTooltip termKey="gearRatio" triggerText="?" />
                  </Label>
                  <Input
                    id="ringTeeth"
                    type="number"
                    min="30"
                    max="60"
                    placeholder="e.g., 41"
                    value={teethState.ringTeeth}
                    onChange={(e) => handleTeethChange('ringTeeth', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pinionTeeth">Pinion Gear Teeth *</Label>
                  <Input
                    id="pinionTeeth"
                    type="number"
                    min="8"
                    max="20"
                    placeholder="e.g., 11"
                    value={teethState.pinionTeeth}
                    onChange={(e) => handleTeethChange('pinionTeeth', e.target.value)}
                  />
                </div>
              </div>

              {/* Common Teeth Combinations */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Common Teeth Combinations</Label>
                <div className="grid gap-2 md:grid-cols-2">
                  {commonTeethCombinations.map((combo, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          {combo.ring} / {combo.pinion} teeth
                        </span>
                        <Badge variant="outline">{combo.ratio.toFixed(2)}:1</Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs mt-1"
                        onClick={() => {
                          setTeethState({
                            ringTeeth: combo.ring.toString(),
                            pinionTeeth: combo.pinion.toString()
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
                onClick={calculateFromTeeth} 
                className="w-full"
                disabled={!teethState.ringTeeth || !teethState.pinionTeeth}
              >
                Calculate Gear Ratio
              </Button>
            </TabsContent>

            {/* Current Ratio Calculator */}
            <TabsContent value="current" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="mph">Vehicle Speed (MPH) *</Label>
                  <Input
                    id="mph"
                    type="number"
                    step="1"
                    min="5"
                    max="200"
                    placeholder="e.g., 60"
                    value={currentState.mph}
                    onChange={(e) => handleCurrentChange('mph', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rpm">Engine RPM *</Label>
                  <Input
                    id="rpm"
                    type="number"
                    step="100"
                    min="500"
                    max="8000"
                    placeholder="e.g., 2500"
                    value={currentState.rpm}
                    onChange={(e) => handleCurrentChange('rpm', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tireDiameter">Tire Diameter (inches) *</Label>
                  <Input
                    id="tireDiameter"
                    type="number"
                    step="0.1"
                    min="20"
                    max="40"
                    placeholder="e.g., 28"
                    value={currentState.tireDiameter}
                    onChange={(e) => handleCurrentChange('tireDiameter', e.target.value)}
                  />
                </div>
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <AlertDescription className="text-blue-800">
                  <strong>Note:</strong> To get accurate current ratio, cruise at steady speed with transmission 
                  in high gear (1:1 ratio) but not overdrive. Record speed, RPM, and tire diameter.
                </AlertDescription>
              </Alert>

              <Button 
                onClick={calculateCurrentRatio} 
                className="w-full"
                disabled={!currentState.mph || !currentState.rpm || !currentState.tireDiameter}
              >
                Calculate Current Ratio
              </Button>
            </TabsContent>

            {/* Ideal Ratio Calculator */}
            <TabsContent value="ideal" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="desiredMPH">Desired Top Speed (MPH) *</Label>
                  <Input
                    id="desiredMPH"
                    type="number"
                    step="5"
                    min="50"
                    max="200"
                    placeholder="e.g., 120"
                    value={idealState.desiredMPH}
                    onChange={(e) => handleIdealChange('desiredMPH', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxRPM">Maximum Safe RPM *</Label>
                  <Input
                    id="maxRPM"
                    type="number"
                    step="100"
                    min="4000"
                    max="8000"
                    placeholder="e.g., 6000"
                    value={idealState.maxRPM}
                    onChange={(e) => handleIdealChange('maxRPM', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idealTireDiameter">Tire Diameter (inches) *</Label>
                  <Input
                    id="idealTireDiameter"
                    type="number"
                    step="0.1"
                    min="20"
                    max="40"
                    placeholder="e.g., 28"
                    value={idealState.tireDiameter}
                    onChange={(e) => handleIdealChange('tireDiameter', e.target.value)}
                  />
                </div>
              </div>

              <Button 
                onClick={calculateIdealRatio} 
                className="w-full"
                disabled={!idealState.desiredMPH || !idealState.maxRPM || !idealState.tireDiameter}
              >
                Calculate Ideal Ratio
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
          title="Gear Ratio Results"
          description="Your gear ratio calculation results and recommendations"
        />
      )}

      {/* Gear Ratio Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Gear Ratio Selection Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {commonGearRatios.map((ratio, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">{ratio.name}</h4>
                  <Badge variant="outline">{ratio.ratio}:1</Badge>
                </div>
                <p className="text-sm text-gray-600">{ratio.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}