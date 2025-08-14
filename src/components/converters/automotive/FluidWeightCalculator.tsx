'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Droplets } from 'lucide-react';

interface FluidData {
  name: string;
  density: number; // pounds per gallon
  description: string;
}

const FLUIDS: Record<string, FluidData> = {
  gasoline: {
    name: 'Gasoline',
    density: 6.073,
    description: 'Regular unleaded gasoline'
  },
  diesel: {
    name: 'Diesel Fuel',
    density: 7.05,
    description: 'Standard diesel fuel'
  },
  motorOil: {
    name: 'Motor Oil',
    density: 7.5,
    description: '10W-30 motor oil'
  },
  transmissionFluid: {
    name: 'Transmission Fluid',
    density: 7.2,
    description: 'ATF transmission fluid'
  },
  coolant: {
    name: 'Engine Coolant',
    density: 8.8,
    description: '50/50 antifreeze mix'
  },
  water: {
    name: 'Water',
    density: 8.34,
    description: 'Pure water at 60°F'
  }
};

interface Results {
  weight: number;
  volume: number;
  fluid: FluidData;
}

export function FluidWeightCalculator() {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputType, setInputType] = useState<'volume' | 'weight'>('volume');
  const [selectedFluid, setSelectedFluid] = useState<string>('gasoline');
  const [results, setResults] = useState<Results | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInputs = useCallback(() => {
    const newErrors: Record<string, string> = {};
    
    const value = parseFloat(inputValue);
    if (!inputValue || isNaN(value) || value <= 0) {
      newErrors.input = 'Please enter a valid positive number';
    }

    if (!selectedFluid) {
      newErrors.fluid = 'Please select a fluid type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [inputValue, selectedFluid]);

  const calculate = useCallback(() => {
    if (!validateInputs()) return;

    const value = parseFloat(inputValue);
    const fluid = FLUIDS[selectedFluid];
    
    let weight: number;
    let volume: number;

    if (inputType === 'volume') {
      // Convert volume to weight
      volume = value;
      weight = value * fluid.density;
    } else {
      // Convert weight to volume
      weight = value;
      volume = value / fluid.density;
    }

    setResults({
      weight,
      volume,
      fluid
    });
  }, [inputValue, inputType, selectedFluid, validateInputs]);

  const clearAll = () => {
    setInputValue('');
    setResults(null);
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Automotive Fluid Weight Calculator
          </CardTitle>
          <CardDescription>
            Convert between volume and weight for common automotive fluids
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="inputType">Input Type</Label>
              <Select value={inputType} onValueChange={(value: 'volume' | 'weight') => setInputType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="volume">Volume (Gallons)</SelectItem>
                  <SelectItem value="weight">Weight (Pounds)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inputValue">
                {inputType === 'volume' ? 'Volume (Gallons)' : 'Weight (Pounds)'}
              </Label>
              <Input
                id="inputValue"
                type="number"
                step="0.1"
                placeholder={inputType === 'volume' ? '5.0' : '30.0'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={errors.input ? 'border-red-500' : ''}
              />
              {errors.input && <p className="text-sm text-red-500">{errors.input}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fluid">Fluid Type</Label>
              <Select value={selectedFluid} onValueChange={setSelectedFluid}>
                <SelectTrigger className={errors.fluid ? 'border-red-500' : ''}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(FLUIDS).map(([key, fluid]) => (
                    <SelectItem key={key} value={key}>
                      {fluid.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.fluid && <p className="text-sm text-red-500">{errors.fluid}</p>}
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1">
              Calculate
            </Button>
            <Button variant="outline" onClick={clearAll}>
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5" />
              Converters Results
            </CardTitle>
            <CardDescription>{results.fluid.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Volume:</span>
                  <Badge variant="secondary">{results.volume.toFixed(2)} gallons</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Weight:</span>
                  <Badge variant="secondary">{results.weight.toFixed(2)} pounds</Badge>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Density:</span>
                  <Badge variant="outline">{results.fluid.density} lbs/gal</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Fluid Type:</span>
                  <Badge variant="outline">{results.fluid.name}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Fluid Density Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(FLUIDS).map(([key, fluid]) => (
              <div key={key} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div>
                  <div className="font-medium">{fluid.name}</div>
                  <div className="text-sm text-muted-foreground">{fluid.description}</div>
                </div>
                <Badge variant="outline">{fluid.density} lbs/gal</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
