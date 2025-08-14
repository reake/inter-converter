'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Wind, Info } from 'lucide-react';

interface RamAirResults {
  baseHP: number;
  ramAirHP: number;
  hpGain: number;
  percentGain: number;
  pressureIncrease: number;
  velocityPressure: number;
}

export function RamAirCalculator() {
  const [baseHP, setBaseHP] = useState<string>('');
  const [speed, setSpeed] = useState<string>('');
  const [results, setResults] = useState<RamAirResults | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInputs = useCallback(() => {
    const newErrors: Record<string, string> = {};
    
    const hp = parseFloat(baseHP);
    const speedNum = parseFloat(speed);

    if (!baseHP || isNaN(hp) || hp <= 0) {
      newErrors.baseHP = 'Please enter a valid horsepower value';
    } else if (hp > 2000) {
      newErrors.baseHP = 'Horsepower seems too high (max 2000 HP)';
    }

    if (!speed || isNaN(speedNum) || speedNum <= 0) {
      newErrors.speed = 'Please enter a valid speed';
    } else if (speedNum > 300) {
      newErrors.speed = 'Speed seems too high (max 300 MPH)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [baseHP, speed]);

  const calculateRamAir = useCallback(() => {
    if (!validateInputs()) return;

    const hp = parseFloat(baseHP);
    const speedMPH = parseFloat(speed);
    
    // Convert MPH to feet per second
    const speedFPS = speedMPH * 1.467;
    
    // Calculate velocity pressure (dynamic pressure)
    // q = 0.5 * ρ * v²
    // At sea level, air density ≈ 0.002377 slugs/ft³
    const airDensity = 0.002377;
    const velocityPressure = 0.5 * airDensity * speedFPS * speedFPS;
    
    // Convert to inches of water (1 psf = 5.202 inches of water)
    const velocityPressureInH2O = velocityPressure * 5.202;
    
    // Ram air pressure increase (simplified model)
    // Assumes 70% efficiency for typical ram air systems
    const efficiency = 0.7;
    const pressureIncrease = velocityPressureInH2O * efficiency;
    
    // Horsepower gain calculation
    // Approximate: 1% HP gain per 0.1 inches of water pressure increase
    const percentGain = pressureIncrease * 10;
    const hpGain = hp * (percentGain / 100);
    const ramAirHP = hp + hpGain;

    setResults({
      baseHP: hp,
      ramAirHP,
      hpGain,
      percentGain,
      pressureIncrease,
      velocityPressure: velocityPressureInH2O
    });
  }, [baseHP, speed, validateInputs]);

  const clearAll = () => {
    setBaseHP('');
    setSpeed('');
    setResults(null);
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Ram Air Calculator
          </CardTitle>
          <CardDescription>
            Calculate horsepower gains from ram air induction systems
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="baseHP">Base Horsepower</Label>
              <Input
                id="baseHP"
                type="number"
                step="1"
                placeholder="400"
                value={baseHP}
                onChange={(e) => setBaseHP(e.target.value)}
                className={errors.baseHP ? 'border-red-500' : ''}
              />
              {errors.baseHP && <p className="text-sm text-red-500">{errors.baseHP}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="speed">Vehicle Speed (MPH)</Label>
              <Input
                id="speed"
                type="number"
                step="1"
                placeholder="100"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                className={errors.speed ? 'border-red-500' : ''}
              />
              {errors.speed && <p className="text-sm text-red-500">{errors.speed}</p>}
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculateRamAir} className="flex-1">
              Calculate Ram Air Effect
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
                <Wind className="h-5 w-5" />
                Power Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Base Horsepower:</span>
                <Badge variant="outline">{results.baseHP.toFixed(0)} HP</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Ram Air Horsepower:</span>
                <Badge variant="default">{results.ramAirHP.toFixed(1)} HP</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Horsepower Gain:</span>
                <Badge variant="secondary">{results.hpGain.toFixed(1)} HP</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Percent Gain:</span>
                <Badge variant="secondary">{results.percentGain.toFixed(2)}%</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pressure Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Velocity Pressure:</span>
                <Badge variant="outline">{results.velocityPressure.toFixed(3)} in H₂O</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Effective Pressure:</span>
                <Badge variant="outline">{results.pressureIncrease.toFixed(3)} in H₂O</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Assumes 70% ram air system efficiency
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Info className="h-5 w-5" />
            Ram Air Theory
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">How Ram Air Works</h4>
            <p className="text-sm text-muted-foreground">
              Ram air systems use vehicle speed to create positive pressure in the intake system. 
              As air hits the front-facing intake, it's compressed and forced into the engine, 
              increasing air density and allowing more fuel to be burned.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Velocity Pressure Formula</h4>
            <p className="text-sm text-muted-foreground">
              q = 0.5 × ρ × v² where q is dynamic pressure, ρ is air density, and v is velocity
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Real-World Considerations</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Ram air effects are most noticeable at high speeds (80+ MPH)</li>
              <li>• Actual gains depend on intake design and engine tuning</li>
              <li>• Benefits may be offset by increased aerodynamic drag</li>
              <li>• Cold air intake systems can provide similar benefits</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
