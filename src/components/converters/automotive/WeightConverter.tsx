'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Scale } from 'lucide-react';

interface WeightResults {
  pounds: number;
  kilograms: number;
  ounces: number;
  grams: number;
  tons: number;
  stones: number;
}

const WEIGHT_UNITS = {
  pounds: { name: 'Pounds', symbol: 'lbs', factor: 1 },
  kilograms: { name: 'Kilograms', symbol: 'kg', factor: 0.453592 },
  ounces: { name: 'Ounces', symbol: 'oz', factor: 16 },
  grams: { name: 'Grams', symbol: 'g', factor: 453.592 },
  tons: { name: 'Tons (US)', symbol: 'tons', factor: 0.0005 },
  stones: { name: 'Stones', symbol: 'st', factor: 0.0714286 }
};

export function WeightConverter() {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputUnit, setInputUnit] = useState<string>('pounds');
  const [results, setResults] = useState<WeightResults | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInputs = useCallback(() => {
    const newErrors: Record<string, string> = {};
    
    const value = parseFloat(inputValue);
    if (!inputValue || isNaN(value) || value < 0) {
      newErrors.input = 'Please enter a valid positive number';
    } else if (value > 1000000) {
      newErrors.input = 'Value seems too large';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [inputValue]);

  const convertWeight = useCallback(() => {
    if (!validateInputs()) return;

    const value = parseFloat(inputValue);
    const unit = WEIGHT_UNITS[inputUnit as keyof typeof WEIGHT_UNITS];
    
    // Convert input to pounds first
    const pounds = inputUnit === 'pounds' ? value : value / unit.factor;
    
    // Convert pounds to all other units
    const results: WeightResults = {
      pounds: pounds,
      kilograms: pounds * WEIGHT_UNITS.kilograms.factor,
      ounces: pounds * WEIGHT_UNITS.ounces.factor,
      grams: pounds * WEIGHT_UNITS.grams.factor,
      tons: pounds * WEIGHT_UNITS.tons.factor,
      stones: pounds * WEIGHT_UNITS.stones.factor
    };

    setResults(results);
  }, [inputValue, inputUnit, validateInputs]);

  const clearAll = () => {
    setInputValue('');
    setResults(null);
    setErrors({});
  };

  const getDisplayValue = (value: number, unit: string): string => {
    if (value < 0.001 && value > 0) {
      return value.toExponential(3);
    } else if (value < 1) {
      return value.toFixed(4);
    } else if (value < 10) {
      return value.toFixed(3);
    } else if (value < 100) {
      return value.toFixed(2);
    } else if (value < 1000) {
      return value.toFixed(1);
    } else {
      return value.toFixed(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Automotive Weight Converter
          </CardTitle>
          <CardDescription>
            Convert between different weight units for automotive applications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="inputValue">Weight Value</Label>
              <Input
                id="inputValue"
                type="number"
                step="0.1"
                placeholder="100"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={errors.input ? 'border-red-500' : ''}
              />
              {errors.input && <p className="text-sm text-red-500">{errors.input}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="inputUnit">Input Unit</Label>
              <Select value={inputUnit} onValueChange={setInputUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(WEIGHT_UNITS).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name} ({unit.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={convertWeight} className="flex-1">
              Convert Weight
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
              <Scale className="h-5 w-5" />
              Conversion Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Pounds:</span>
                <Badge variant="default">{getDisplayValue(results.pounds, 'lbs')} lbs</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Kilograms:</span>
                <Badge variant="secondary">{getDisplayValue(results.kilograms, 'kg')} kg</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Ounces:</span>
                <Badge variant="outline">{getDisplayValue(results.ounces, 'oz')} oz</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Grams:</span>
                <Badge variant="outline">{getDisplayValue(results.grams, 'g')} g</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Tons (US):</span>
                <Badge variant="outline">{getDisplayValue(results.tons, 'tons')} tons</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Stones:</span>
                <Badge variant="outline">{getDisplayValue(results.stones, 'st')} st</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Common Automotive Weights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Vehicle Components</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Small block V8 engine: 400-500 lbs</li>
                <li>• Big block V8 engine: 600-700 lbs</li>
                <li>• Transmission (auto): 150-200 lbs</li>
                <li>• Transmission (manual): 80-120 lbs</li>
                <li>• Differential: 100-150 lbs</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Vehicle Weights</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Compact car: 2,500-3,000 lbs</li>
                <li>• Mid-size car: 3,000-3,500 lbs</li>
                <li>• Full-size car: 3,500-4,500 lbs</li>
                <li>• Pickup truck: 4,000-6,000 lbs</li>
                <li>• SUV: 4,500-7,000 lbs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
