'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Info } from 'lucide-react';

interface VolumeResults {
  cylinderVolume: {
    cubicInches: number;
    cubicCentimeters: number;
    liters: number;
  };
  engineDisplacement: {
    cubicInches: number;
    cubicCentimeters: number;
    liters: number;
  };
}

export function EngineVolumeCalculator() {
  const [bore, setBore] = useState<string>('');
  const [stroke, setStroke] = useState<string>('');
  const [cylinders, setCylinders] = useState<string>('8');
  const [results, setResults] = useState<VolumeResults | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInputs = useCallback(() => {
    const newErrors: Record<string, string> = {};
    
    const boreNum = parseFloat(bore);
    const strokeNum = parseFloat(stroke);
    const cylindersNum = parseInt(cylinders);

    if (!bore || isNaN(boreNum) || boreNum <= 0) {
      newErrors.bore = 'Please enter a valid bore diameter';
    } else if (boreNum > 10) {
      newErrors.bore = 'Bore diameter seems too large (max 10 inches)';
    }

    if (!stroke || isNaN(strokeNum) || strokeNum <= 0) {
      newErrors.stroke = 'Please enter a valid stroke length';
    } else if (strokeNum > 10) {
      newErrors.stroke = 'Stroke length seems too large (max 10 inches)';
    }

    if (!cylinders || isNaN(cylindersNum) || cylindersNum <= 0) {
      newErrors.cylinders = 'Please enter a valid number of cylinders';
    } else if (cylindersNum > 16) {
      newErrors.cylinders = 'Number of cylinders seems too large (max 16)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [bore, stroke, cylinders]);

  const calculateVolume = useCallback(() => {
    if (!validateInputs()) return;

    const boreNum = parseFloat(bore);
    const strokeNum = parseFloat(stroke);
    const cylindersNum = parseInt(cylinders);

    // Calculate cylinder volume in cubic inches
    // Volume = π × (bore/2)² × stroke
    const radius = boreNum / 2;
    const cylinderVolumeCI = Math.PI * radius * radius * strokeNum;
    
    // Convert to other units
    const cylinderVolumeCC = cylinderVolumeCI * 16.387064; // 1 cubic inch = 16.387064 cubic centimeters
    const cylinderVolumeLiters = cylinderVolumeCC / 1000;

    // Calculate total engine displacement
    const engineDisplacementCI = cylinderVolumeCI * cylindersNum;
    const engineDisplacementCC = engineDisplacementCI * 16.387064;
    const engineDisplacementLiters = engineDisplacementCC / 1000;

    setResults({
      cylinderVolume: {
        cubicInches: cylinderVolumeCI,
        cubicCentimeters: cylinderVolumeCC,
        liters: cylinderVolumeLiters
      },
      engineDisplacement: {
        cubicInches: engineDisplacementCI,
        cubicCentimeters: engineDisplacementCC,
        liters: engineDisplacementLiters
      }
    });
  }, [bore, stroke, cylinders, validateInputs]);

  const clearAll = () => {
    setBore('');
    setStroke('');
    setCylinders('8');
    setResults(null);
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Engine Volume Calculator
          </CardTitle>
          <CardDescription>
            Calculate cylinder volume and total engine displacement from bore, stroke, and cylinder count
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bore">Bore Diameter (inches)</Label>
              <Input
                id="bore"
                type="number"
                step="0.001"
                placeholder="4.000"
                value={bore}
                onChange={(e) => setBore(e.target.value)}
                className={errors.bore ? 'border-red-500' : ''}
              />
              {errors.bore && <p className="text-sm text-red-500">{errors.bore}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stroke">Stroke Length (inches)</Label>
              <Input
                id="stroke"
                type="number"
                step="0.001"
                placeholder="3.480"
                value={stroke}
                onChange={(e) => setStroke(e.target.value)}
                className={errors.stroke ? 'border-red-500' : ''}
              />
              {errors.stroke && <p className="text-sm text-red-500">{errors.stroke}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cylinders">Number of Cylinders</Label>
              <Input
                id="cylinders"
                type="number"
                min="1"
                max="16"
                placeholder="8"
                value={cylinders}
                onChange={(e) => setCylinders(e.target.value)}
                className={errors.cylinders ? 'border-red-500' : ''}
              />
              {errors.cylinders && <p className="text-sm text-red-500">{errors.cylinders}</p>}
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculateVolume} className="flex-1">
              Calculate Volume
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
              <CardTitle className="text-lg">Cylinder Volume</CardTitle>
              <CardDescription>Volume of a single cylinder</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Cubic Inches:</span>
                <Badge variant="secondary">{results.cylinderVolume.cubicInches.toFixed(3)} CI</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Cubic Centimeters:</span>
                <Badge variant="secondary">{results.cylinderVolume.cubicCentimeters.toFixed(1)} CC</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Liters:</span>
                <Badge variant="secondary">{results.cylinderVolume.liters.toFixed(4)} L</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Engine Displacement</CardTitle>
              <CardDescription>Total volume of all cylinders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Cubic Inches:</span>
                <Badge variant="default">{results.engineDisplacement.cubicInches.toFixed(1)} CI</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Cubic Centimeters:</span>
                <Badge variant="default">{results.engineDisplacement.cubicCentimeters.toFixed(0)} CC</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Liters:</span>
                <Badge variant="default">{results.engineDisplacement.liters.toFixed(2)} L</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Info className="h-5 w-5" />
            How Engine Volume Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Cylinder Volume Formula</h4>
            <p className="text-sm text-muted-foreground">
              Volume = π × (bore ÷ 2)² × stroke
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              This calculates the swept volume of one cylinder as the piston moves from bottom dead center to top dead center.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Engine Displacement</h4>
            <p className="text-sm text-muted-foreground">
              Total displacement = Cylinder volume × Number of cylinders
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Engine displacement is the total volume displaced by all pistons in one complete cycle.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Common Applications</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Engine building and modification planning</li>
              <li>• Compression ratio calculations</li>
              <li>• Performance comparisons between engines</li>
              <li>• Carburetor and fuel system sizing</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
