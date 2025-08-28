'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Scale, ArrowRightLeft } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';
import { ConvertersEngine } from '@/lib/converters/conversion-engine';

const WEIGHT_UNITS = {
  mg: 'Milligrams',
  g: 'Grams',
  kg: 'Kilograms',
  ton: 'Metric Tons',
  oz: 'Ounces',
  lb: 'Pounds'
};

export function WeightConverter() {
  const [fromUnit, setFromUnit] = useState('kg');
  const [toUnit, setToUnit] = useState('lb');
  const [value, setValue] = useState('1');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    convertValue();
  }, [value, fromUnit, toUnit]);

  const convertValue = () => {
    if (!value || isNaN(parseFloat(value))) {
      setResult(null);
      setError('');
      return;
    }

    const numValue = parseFloat(value);
    
    try {
      const conversionResult = ConvertersEngine.convertUnits(numValue, fromUnit, toUnit, 'weight');
      if (conversionResult.success && conversionResult.result !== undefined) {
        setResult(conversionResult.result);
        setError('');
      } else {
        setError(conversionResult.error || 'Conversion not supported');
        setResult(null);
      }
    } catch (err) {
      setError('Conversion error');
      setResult(null);
    }
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const getResultText = () => {
    if (result !== null) {
      return `${value} ${WEIGHT_UNITS[fromUnit as keyof typeof WEIGHT_UNITS]} = ${formatResult(result)} ${WEIGHT_UNITS[toUnit as keyof typeof WEIGHT_UNITS]}`;
    }
    return '';
  };

  const formatResult = (value: number) => {
    if (Math.abs(value) >= 1000000) {
      return value.toExponential(6);
    } else if (Math.abs(value) < 0.001 && value !== 0) {
      return value.toExponential(6);
    } else {
      return parseFloat(value.toFixed(8)).toString();
    }
  };

  return (
    <div className="space-y-6">
      {/* Conversion Interface */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Scale className="h-5 w-5" />
            Weight Converter
          </CardTitle>
          <CardDescription>
            Convert between different weight units
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Value Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Value</label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
              className="text-lg"
              step="any"
            />
          </div>

          {/* Unit Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium mb-2">From</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full p-3 border border-input rounded-md bg-background"
              >
                {Object.entries(WEIGHT_UNITS).map(([key, name]) => (
                  <option key={key} value={key}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={swapUnits}
                variant="outline"
                size="sm"
                className="rounded-full w-10 h-10 p-0"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">To</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full p-3 border border-input rounded-md bg-background"
              >
                {Object.entries(WEIGHT_UNITS).map(([key, name]) => (
                  <option key={key} value={key}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result */}
          {result !== null && (
            <div className="p-6 bg-muted rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {formatResult(result)}
                </div>
                <div className="text-muted-foreground mb-4">
                  {WEIGHT_UNITS[toUnit as keyof typeof WEIGHT_UNITS]}
                </div>
                <CopyButton
                  text={getResultText()}
                  variant="outline"
                  size="sm"
                  showText={true}
                  successText="Result Copied!"
                />
              </div>
            </div>
          )}

          {/* Conversion Formula */}
          {result !== null && (
            <div className="text-center text-sm text-muted-foreground">
              {value} {WEIGHT_UNITS[fromUnit as keyof typeof WEIGHT_UNITS]} = {formatResult(result)} {WEIGHT_UNITS[toUnit as keyof typeof WEIGHT_UNITS]}
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="text-destructive text-sm p-3 bg-destructive/10 rounded-lg">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Conversion Reference */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Common Weight Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Metric System</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>1 metric ton</span>
                  <span className="text-muted-foreground">1,000 kilograms</span>
                </div>
                <div className="flex justify-between">
                  <span>1 kilogram</span>
                  <span className="text-muted-foreground">1,000 grams</span>
                </div>
                <div className="flex justify-between">
                  <span>1 gram</span>
                  <span className="text-muted-foreground">1,000 milligrams</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Imperial System</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>1 pound</span>
                  <span className="text-muted-foreground">16 ounces</span>
                </div>
                <div className="flex justify-between">
                  <span>1 stone</span>
                  <span className="text-muted-foreground">14 pounds</span>
                </div>
                <div className="flex justify-between">
                  <span>1 ton (US)</span>
                  <span className="text-muted-foreground">2,000 pounds</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
