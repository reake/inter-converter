'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Gauge, Info } from 'lucide-react';

interface VEResults {
  volumetricEfficiency: number;
  actualAirflow: number;
  theoreticalAirflow: number;
  engineRating: string;
  recommendations: string[];
}

export function VolumetricEfficiencyCalculator() {
  const [displacement, setDisplacement] = useState<string>('');
  const [rpm, setRpm] = useState<string>('');
  const [actualCFM, setActualCFM] = useState<string>('');
  const [results, setResults] = useState<VEResults | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInputs = useCallback(() => {
    const newErrors: Record<string, string> = {};
    
    const disp = parseFloat(displacement);
    const rpmNum = parseFloat(rpm);
    const cfm = parseFloat(actualCFM);

    if (!displacement || isNaN(disp) || disp <= 0) {
      newErrors.displacement = 'Please enter a valid displacement';
    } else if (disp > 1000) {
      newErrors.displacement = 'Displacement seems too large (max 1000 CI)';
    }

    if (!rpm || isNaN(rpmNum) || rpmNum <= 0) {
      newErrors.rpm = 'Please enter a valid RPM';
    } else if (rpmNum > 10000) {
      newErrors.rpm = 'RPM seems too high (max 10,000)';
    }

    if (!actualCFM || isNaN(cfm) || cfm <= 0) {
      newErrors.actualCFM = 'Please enter a valid CFM value';
    } else if (cfm > 2000) {
      newErrors.actualCFM = 'CFM seems too high (max 2000)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [displacement, rpm, actualCFM]);

  const calculateVE = useCallback(() => {
    if (!validateInputs()) return;

    const disp = parseFloat(displacement);
    const rpmNum = parseFloat(rpm);
    const cfm = parseFloat(actualCFM);
    
    // Calculate theoretical airflow
    // CFM = (Displacement × RPM) / (2 × 1728)
    // Divided by 2 because 4-stroke engine has intake stroke every other revolution
    // Divided by 1728 to convert cubic inches to cubic feet
    const theoreticalCFM = (disp * rpmNum) / (2 * 1728);
    
    // Calculate volumetric efficiency
    const ve = (cfm / theoreticalCFM) * 100;
    
    // Determine engine rating and recommendations
    let rating: string;
    let recommendations: string[] = [];
    
    if (ve < 70) {
      rating = 'Poor';
      recommendations = [
        'Check for intake restrictions',
        'Inspect air filter condition',
        'Consider porting cylinder heads',
        'Check valve timing'
      ];
    } else if (ve < 80) {
      rating = 'Below Average';
      recommendations = [
        'Consider intake manifold upgrade',
        'Check exhaust system for restrictions',
        'Optimize cam timing'
      ];
    } else if (ve < 90) {
      rating = 'Average';
      recommendations = [
        'Good baseline performance',
        'Consider mild porting for improvement',
        'Optimize intake and exhaust systems'
      ];
    } else if (ve < 100) {
      rating = 'Good';
      recommendations = [
        'Excellent naturally aspirated performance',
        'Fine-tune for maximum efficiency',
        'Consider performance cam upgrade'
      ];
    } else if (ve < 110) {
      rating = 'Excellent';
      recommendations = [
        'Outstanding performance',
        'Well-optimized engine',
        'Consider forced induction for more power'
      ];
    } else {
      rating = 'Exceptional';
      recommendations = [
        'Race-level performance',
        'Highly modified engine',
        'Verify measurements for accuracy'
      ];
    }

    setResults({
      volumetricEfficiency: ve,
      actualAirflow: cfm,
      theoreticalAirflow: theoreticalCFM,
      engineRating: rating,
      recommendations
    });
  }, [displacement, rpm, actualCFM, validateInputs]);

  const clearAll = () => {
    setDisplacement('');
    setRpm('');
    setActualCFM('');
    setResults(null);
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Volumetric Efficiency Calculator
          </CardTitle>
          <CardDescription>
            Calculate engine volumetric efficiency for performance analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="displacement">Engine Displacement (CI)</Label>
              <Input
                id="displacement"
                type="number"
                step="1"
                placeholder="350"
                value={displacement}
                onChange={(e) => setDisplacement(e.target.value)}
                className={errors.displacement ? 'border-red-500' : ''}
              />
              {errors.displacement && <p className="text-sm text-red-500">{errors.displacement}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rpm">Engine RPM</Label>
              <Input
                id="rpm"
                type="number"
                step="100"
                placeholder="5500"
                value={rpm}
                onChange={(e) => setRpm(e.target.value)}
                className={errors.rpm ? 'border-red-500' : ''}
              />
              {errors.rpm && <p className="text-sm text-red-500">{errors.rpm}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="actualCFM">Actual Airflow (CFM)</Label>
              <Input
                id="actualCFM"
                type="number"
                step="1"
                placeholder="450"
                value={actualCFM}
                onChange={(e) => setActualCFM(e.target.value)}
                className={errors.actualCFM ? 'border-red-500' : ''}
              />
              {errors.actualCFM && <p className="text-sm text-red-500">{errors.actualCFM}</p>}
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculateVE} className="flex-1">
              Calculate VE
            </Button>
            <Button variant="outline" onClick={clearAll}>
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="h-5 w-5" />
                VE Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Volumetric Efficiency:</span>
                <Badge variant="default" className="text-lg">
                  {results.volumetricEfficiency.toFixed(1)}%
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Engine Rating:</span>
                <Badge variant="secondary">{results.engineRating}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Actual Airflow:</span>
                <Badge variant="outline">{results.actualAirflow.toFixed(0)} CFM</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Theoretical Airflow:</span>
                <Badge variant="outline">{results.theoreticalAirflow.toFixed(0)} CFM</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Info className="h-5 w-5" />
            Understanding Volumetric Efficiency
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">What is Volumetric Efficiency?</h4>
            <p className="text-sm text-muted-foreground">
              Volumetric efficiency (VE) measures how well an engine fills its cylinders with air compared to the theoretical maximum. 
              It's expressed as a percentage and indicates the engine's breathing efficiency.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">VE Formula</h4>
            <p className="text-sm text-muted-foreground">
              VE = (Actual Airflow ÷ Theoretical Airflow) × 100%
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Typical VE Values</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Stock engines: 75-85%</li>
              <li>• Modified engines: 85-95%</li>
              <li>• Race engines: 95-110%</li>
              <li>• Forced induction: 100%+</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
