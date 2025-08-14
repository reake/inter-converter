'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Ruler, ArrowRightLeft } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';
import { ConversionEngine } from '@/lib/converters/conversion-engine';

type UnitCategory = 'length' | 'weight' | 'temperature' | 'area' | 'volume' | 'speed';

const UNIT_CATEGORIES = {
  length: {
    name: 'Length',
    icon: '📏',
    units: {
      mm: 'Millimeters',
      cm: 'Centimeters', 
      m: 'Meters',
      km: 'Kilometers',
      in: 'Inches',
      ft: 'Feet',
      yd: 'Yards',
      mi: 'Miles'
    }
  },
  weight: {
    name: 'Weight',
    icon: '⚖️',
    units: {
      mg: 'Milligrams',
      g: 'Grams',
      kg: 'Kilograms',
      ton: 'Metric Tons',
      oz: 'Ounces',
      lb: 'Pounds'
    }
  },
  temperature: {
    name: 'Temperature',
    icon: '🌡️',
    units: {
      c: 'Celsius',
      f: 'Fahrenheit',
      k: 'Kelvin'
    }
  },
  area: {
    name: 'Area',
    icon: '⬜',
    units: {
      'mm2': 'Square Millimeters',
      'cm2': 'Square Centimeters',
      'm2': 'Square Meters',
      'km2': 'Square Kilometers',
      'in2': 'Square Inches',
      'ft2': 'Square Feet',
      'yd2': 'Square Yards',
      'mi2': 'Square Miles',
      'acre': 'Acres',
      'hectare': 'Hectares'
    }
  },
  volume: {
    name: 'Volume',
    icon: '🥤',
    units: {
      'ml': 'Milliliters',
      'l': 'Liters',
      'm3': 'Cubic Meters',
      'tsp': 'Teaspoons',
      'tbsp': 'Tablespoons',
      'fl_oz': 'Fluid Ounces',
      'cup': 'Cups',
      'pt': 'Pints',
      'qt': 'Quarts',
      'gal': 'Gallons'
    }
  },
  speed: {
    name: 'Speed',
    icon: '🏃',
    units: {
      'mps': 'Meters per Second',
      'kph': 'Kilometers per Hour',
      'mph': 'Miles per Hour',
      'fps': 'Feet per Second',
      'knot': 'Knots'
    }
  }
};

// Extended conversion factors for additional categories
const EXTENDED_CONVERSION_FACTORS: Record<string, Record<string, number>> = {
  area: {
    // Base unit: square meter
    'mm2': 0.000001,
    'cm2': 0.0001,
    'm2': 1,
    'km2': 1000000,
    'in2': 0.00064516,
    'ft2': 0.092903,
    'yd2': 0.836127,
    'mi2': 2589988.11,
    'acre': 4046.86,
    'hectare': 10000
  },
  volume: {
    // Base unit: liter
    'ml': 0.001,
    'l': 1,
    'm3': 1000,
    'tsp': 0.00492892,
    'tbsp': 0.0147868,
    'fl_oz': 0.0295735,
    'cup': 0.236588,
    'pt': 0.473176,
    'qt': 0.946353,
    'gal': 3.78541
  },
  speed: {
    // Base unit: meters per second
    'mps': 1,
    'kph': 0.277778,
    'mph': 0.44704,
    'fps': 0.3048,
    'knot': 0.514444
  }
};

export function UnitConverter() {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [value, setValue] = useState('1');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Reset units when category changes
    const units = Object.keys(UNIT_CATEGORIES[category].units);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
  }, [category]);

  useEffect(() => {
    convertValue();
  }, [value, fromUnit, toUnit, category]);

  const convertValue = () => {
    if (!value || isNaN(parseFloat(value))) {
      setResult(null);
      setError('');
      return;
    }

    const numValue = parseFloat(value);
    
    try {
      if (category === 'temperature') {
        const tempResult = ConversionEngine.convertTemperature(numValue, fromUnit, toUnit);
        if (tempResult.success && tempResult.result !== undefined) {
          setResult(tempResult.result);
          setError('');
        } else {
          setError(tempResult.error || 'Conversion failed');
          setResult(null);
        }
      } else {
        // Use extended conversion factors for other categories
        const factors = EXTENDED_CONVERSION_FACTORS[category] || {};
        
        if (factors[fromUnit] && factors[toUnit]) {
          const baseValue = numValue * factors[fromUnit];
          const convertedValue = baseValue / factors[toUnit];
          setResult(convertedValue);
          setError('');
        } else {
          // Fall back to basic conversion engine
          const conversionResult = ConversionEngine.convertUnits(numValue, fromUnit, toUnit, category);
          if (conversionResult.success && conversionResult.result !== undefined) {
            setResult(conversionResult.result);
            setError('');
          } else {
            setError(conversionResult.error || 'Conversion not supported');
            setResult(null);
          }
        }
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
      return `${value} ${UNIT_CATEGORIES[category].units[fromUnit as keyof typeof UNIT_CATEGORIES[typeof category]['units']]} = ${formatResult(result)} ${UNIT_CATEGORIES[category].units[toUnit as keyof typeof UNIT_CATEGORIES[typeof category]['units']]}`;
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

  const setPresetConversion = (cat: UnitCategory, from: string, to: string, val: string) => {
    setCategory(cat);
    setFromUnit(from);
    setToUnit(to);
    setValue(val);
  };

  return (
    <div className="space-y-6">
      {/* Category Selection */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Unit Category</CardTitle>
          <CardDescription>
            Choose the type of units you want to convert
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.entries(UNIT_CATEGORIES).map(([key, cat]) => (
              <Button
                key={key}
                variant={category === key ? 'default' : 'outline'}
                onClick={() => setCategory(key as UnitCategory)}
                className="h-auto p-3 flex flex-col items-center gap-2"
              >
                <span className="text-lg">{cat.icon}</span>
                <span className="text-xs">{cat.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conversion Interface */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Ruler className="h-5 w-5" />
            {UNIT_CATEGORIES[category].name} Converter
          </CardTitle>
          <CardDescription>
            Convert between different {UNIT_CATEGORIES[category].name.toLowerCase()} units
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
                {Object.entries(UNIT_CATEGORIES[category].units).map(([key, name]) => (
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
                {Object.entries(UNIT_CATEGORIES[category].units).map(([key, name]) => (
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
                  {UNIT_CATEGORIES[category].units[toUnit as keyof typeof UNIT_CATEGORIES[typeof category]['units']]}
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
              {value} {UNIT_CATEGORIES[category].units[fromUnit as keyof typeof UNIT_CATEGORIES[typeof category]['units']]} = {formatResult(result)} {UNIT_CATEGORIES[category].units[toUnit as keyof typeof UNIT_CATEGORIES[typeof category]['units']]}
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

      {/* Quick Conversions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={() => setPresetConversion('length', 'm', 'ft', '1')}
              className="text-left justify-start h-auto p-3"
            >
              <div>
                <div className="font-medium">Meters to Feet</div>
                <div className="text-sm text-muted-foreground">1 m = 3.28 ft</div>
              </div>
            </Button>
            <Button
              variant="outline"
              onClick={() => setPresetConversion('weight', 'kg', 'lb', '1')}
              className="text-left justify-start h-auto p-3"
            >
              <div>
                <div className="font-medium">Kilograms to Pounds</div>
                <div className="text-sm text-muted-foreground">1 kg = 2.20 lbs</div>
              </div>
            </Button>
            <Button
              variant="outline"
              onClick={() => setPresetConversion('temperature', 'c', 'f', '0')}
              className="text-left justify-start h-auto p-3"
            >
              <div>
                <div className="font-medium">Celsius to Fahrenheit</div>
                <div className="text-sm text-muted-foreground">0°C = 32°F</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Reference */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Common {UNIT_CATEGORIES[category].name} Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Metric System</h4>
              <div className="space-y-2 text-sm">
                {category === 'length' && (
                  <>
                    <div className="flex justify-between">
                      <span>1 kilometer</span>
                      <span className="text-muted-foreground">1,000 meters</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 meter</span>
                      <span className="text-muted-foreground">100 centimeters</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 centimeter</span>
                      <span className="text-muted-foreground">10 millimeters</span>
                    </div>
                  </>
                )}
                {category === 'weight' && (
                  <>
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
                  </>
                )}
                {category === 'temperature' && (
                  <>
                    <div className="flex justify-between">
                      <span>Water freezes</span>
                      <span className="text-muted-foreground">0°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Room temperature</span>
                      <span className="text-muted-foreground">20°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Water boils</span>
                      <span className="text-muted-foreground">100°C</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Imperial System</h4>
              <div className="space-y-2 text-sm">
                {category === 'length' && (
                  <>
                    <div className="flex justify-between">
                      <span>1 mile</span>
                      <span className="text-muted-foreground">5,280 feet</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 yard</span>
                      <span className="text-muted-foreground">3 feet</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 foot</span>
                      <span className="text-muted-foreground">12 inches</span>
                    </div>
                  </>
                )}
                {category === 'weight' && (
                  <>
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
                  </>
                )}
                {category === 'temperature' && (
                  <>
                    <div className="flex justify-between">
                      <span>Water freezes</span>
                      <span className="text-muted-foreground">32°F</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Room temperature</span>
                      <span className="text-muted-foreground">68°F</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Water boils</span>
                      <span className="text-muted-foreground">212°F</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}