'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightLeft, Gauge } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

const PRESSURE_UNITS = {
  pa: { name: 'Pascal (Pa)', factor: 1 },
  kpa: { name: 'Kilopascal (kPa)', factor: 1000 },
  bar: { name: 'Bar', factor: 100000 },
  psi: { name: 'PSI', factor: 6894.76 },
  atm: { name: 'Atmosphere (atm)', factor: 101325 },
  mmhg: { name: 'mmHg', factor: 133.322 },
  torr: { name: 'Torr', factor: 133.322 }
};

export function PressureConverter() {
  const [fromUnit, setFromUnit] = useState('psi');
  const [toUnit, setToUnit] = useState('bar');
  const [value, setValue] = useState('1');
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    convertValue();
  }, [value, fromUnit, toUnit]);

  const convertValue = () => {
    if (!value || isNaN(parseFloat(value))) {
      setResult(null);
      return;
    }

    const numValue = parseFloat(value);
    const fromFactor = PRESSURE_UNITS[fromUnit as keyof typeof PRESSURE_UNITS].factor;
    const toFactor = PRESSURE_UNITS[toUnit as keyof typeof PRESSURE_UNITS].factor;
    
    const pascalValue = numValue * fromFactor;
    const convertedValue = pascalValue / toFactor;
    
    setResult(convertedValue);
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pressure Converter</h1>
        <p className="text-gray-600">Convert between different pressure units including PSI, Bar, Pascal, and more</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5" />
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
                  {Object.entries(PRESSURE_UNITS).map(([key, unit]) => (
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
              <Gauge className="h-5 w-5" />
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
                  {Object.entries(PRESSURE_UNITS).map(([key, unit]) => (
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
                  {PRESSURE_UNITS[toUnit as keyof typeof PRESSURE_UNITS].name}
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

      {/* Common Conversions */}
      <Card>
        <CardHeader>
          <CardTitle>Common Pressure Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-3 bg-muted rounded">
              <div className="font-semibold">1 Bar</div>
              <div className="text-muted-foreground">= 14.5 PSI</div>
            </div>
            <div className="text-center p-3 bg-muted rounded">
              <div className="font-semibold">1 ATM</div>
              <div className="text-muted-foreground">= 14.7 PSI</div>
            </div>
            <div className="text-center p-3 bg-muted rounded">
              <div className="font-semibold">1 PSI</div>
              <div className="text-muted-foreground">= 6,895 Pa</div>
            </div>
            <div className="text-center p-3 bg-muted rounded">
              <div className="font-semibold">1 kPa</div>
              <div className="text-muted-foreground">= 0.145 PSI</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
