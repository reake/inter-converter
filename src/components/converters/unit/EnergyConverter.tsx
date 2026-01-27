'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightLeft, Zap } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

const ENERGY_UNITS = {
  j: { name: 'Joule (J)', factor: 1 },
  kj: { name: 'Kilojoule (kJ)', factor: 1000 },
  cal: { name: 'Calorie (cal)', factor: 4.184 },
  kcal: { name: 'Kilocalorie (kcal)', factor: 4184 },
  wh: { name: 'Watt-hour (Wh)', factor: 3600 },
  kwh: { name: 'Kilowatt-hour (kWh)', factor: 3600000 },
  btu: { name: 'BTU', factor: 1055.06 }
};

export default function EnergyConverter() {
  const [fromUnit, setFromUnit] = useState('kcal');
  const [toUnit, setToUnit] = useState('kj');
  const [value, setValue] = useState('1');
  const [result, setResult] = useState<number | null>(null);

  const convertValue = useCallback(() => {
    if (!value || isNaN(parseFloat(value))) {
      setResult(null);
      return;
    }

    const numValue = parseFloat(value);
    const fromFactor = ENERGY_UNITS[fromUnit as keyof typeof ENERGY_UNITS].factor;
    const toFactor = ENERGY_UNITS[toUnit as keyof typeof ENERGY_UNITS].factor;
    
    const jouleValue = numValue * fromFactor;
    const convertedValue = jouleValue / toFactor;
    
    setResult(convertedValue);
  }, [value, fromUnit, toUnit]);

  useEffect(() => {
    convertValue();
  }, [convertValue]);

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Energy Converter</h1>
        <p className="text-gray-600">Convert between calories, kilojoules, kilowatt-hours and other energy units</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              From
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ENERGY_UNITS).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter value"
                className="text-lg"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              To
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ENERGY_UNITS).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary mb-2">
                  {result !== null ? result.toLocaleString(undefined, { maximumFractionDigits: 6 }) : '0'}
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {ENERGY_UNITS[toUnit as keyof typeof ENERGY_UNITS].name}
                </div>
                {result !== null && (
                  <CopyButton text={result.toString()} />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button onClick={swapUnits} variant="outline" size="sm">
          <ArrowRightLeft className="h-4 w-4 mr-2" />
          Swap Units
        </Button>
      </div>
    </div>
  );
}
