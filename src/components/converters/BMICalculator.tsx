'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Activity, Heart } from 'lucide-react';
import { ConversionEngine } from '@/lib/converters/conversion-engine';

interface BMIResult {
  bmi: number;
  category: string;
  recommendation: string;
  idealWeightRange: {
    min: number;
    max: number;
  };
}

export function BMICalculator() {
  const [height, setHeight] = useState('170');
  const [weight, setWeight] = useState('70');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [heightFeet, setHeightFeet] = useState('5');
  const [heightInches, setHeightInches] = useState('7');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    calculateBMI();
  }, [height, weight, unit, heightFeet, heightInches]);

  const calculateBMI = () => {
    try {
      let heightValue: number;
      const weightValue = parseFloat(weight);

      if (isNaN(weightValue) || weightValue <= 0) {
        setError('Please enter a valid weight');
        setResult(null);
        return;
      }

      if (unit === 'metric') {
        heightValue = parseFloat(height);
        if (isNaN(heightValue) || heightValue <= 0) {
          setError('Please enter a valid height');
          setResult(null);
          return;
        }
        // Convert cm to meters if needed
        if (heightValue > 3) {
          heightValue = heightValue / 100;
        }
      } else {
        const feet = parseFloat(heightFeet);
        const inches = parseFloat(heightInches);
        if (isNaN(feet) || isNaN(inches) || feet < 0 || inches < 0) {
          setError('Please enter valid height values');
          setResult(null);
          return;
        }
        // Convert to total inches
        heightValue = (feet * 12) + inches;
      }

      const bmiResult = ConversionEngine.calculateBMI(weightValue, heightValue, unit);
      
      if (bmiResult.success && bmiResult.result) {
        // Calculate ideal weight range
        const idealWeightRange = calculateIdealWeightRange(heightValue, unit);
        
        setResult({
          bmi: bmiResult.result.bmi,
          category: bmiResult.result.category,
          recommendation: bmiResult.result.recommendation,
          idealWeightRange
        });
        setError('');
      } else {
        setError(bmiResult.error || 'Failed to calculate BMI');
        setResult(null);
      }
    } catch (err) {
      setError('Error calculating BMI');
      setResult(null);
    }
  };

  const calculateIdealWeightRange = (heightValue: number, unit: 'metric' | 'imperial') => {
    // Using BMI range of 18.5-24.9 for ideal weight
    let heightInMeters: number;
    
    if (unit === 'imperial') {
      heightInMeters = (heightValue * 2.54) / 100; // inches to meters
    } else {
      heightInMeters = heightValue > 3 ? heightValue / 100 : heightValue;
    }

    const minWeight = 18.5 * (heightInMeters * heightInMeters);
    const maxWeight = 24.9 * (heightInMeters * heightInMeters);

    if (unit === 'imperial') {
      return {
        min: Math.round(minWeight * 2.20462), // kg to lbs
        max: Math.round(maxWeight * 2.20462)
      };
    } else {
      return {
        min: Math.round(minWeight),
        max: Math.round(maxWeight)
      };
    }
  };

  const getBMIColor = (bmi: number) => {
    if (bmi < 18.5) return 'text-blue-600 dark:text-blue-400';
    if (bmi < 25) return 'text-green-600 dark:text-green-400';
    if (bmi < 30) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getBMIBgColor = (bmi: number) => {
    if (bmi < 18.5) return 'bg-blue-50 dark:bg-blue-950';
    if (bmi < 25) return 'bg-green-50 dark:bg-green-950';
    if (bmi < 30) return 'bg-orange-50 dark:bg-orange-950';
    return 'bg-red-50 dark:bg-red-950';
  };

  const copyResult = async () => {
    if (result) {
      const resultText = `BMI: ${result.bmi}\nCategory: ${result.category}\nIdeal Weight: ${result.idealWeightRange.min}-${result.idealWeightRange.max} ${unit === 'metric' ? 'kg' : 'lbs'}`;
      try {
        await navigator.clipboard.writeText(resultText);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const setPresetValues = (heightVal: string, weightVal: string, unitType: 'metric' | 'imperial') => {
    setUnit(unitType);
    if (unitType === 'metric') {
      setHeight(heightVal);
      setWeight(weightVal);
    } else {
      const totalInches = parseInt(heightVal);
      setHeightFeet(Math.floor(totalInches / 12).toString());
      setHeightInches((totalInches % 12).toString());
      setWeight(weightVal);
    }
  };

  return (
    <div className="space-y-6">
      {/* Unit Selection */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Unit System</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button
              variant={unit === 'metric' ? 'default' : 'outline'}
              onClick={() => setUnit('metric')}
            >
              Metric (cm, kg)
            </Button>
            <Button
              variant={unit === 'imperial' ? 'default' : 'outline'}
              onClick={() => setUnit('imperial')}
            >
              Imperial (ft/in, lbs)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Input Fields */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Your Measurements
          </CardTitle>
          <CardDescription>
            Enter your height and weight to calculate BMI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Height Input */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Height {unit === 'metric' ? '(cm)' : '(ft/in)'}
              </label>
              {unit === 'metric' ? (
                <Input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="170"
                  min="50"
                  max="250"
                />
              ) : (
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(e.target.value)}
                    placeholder="5"
                    min="3"
                    max="8"
                    className="w-20"
                  />
                  <span className="flex items-center text-sm text-muted-foreground">ft</span>
                  <Input
                    type="number"
                    value={heightInches}
                    onChange={(e) => setHeightInches(e.target.value)}
                    placeholder="7"
                    min="0"
                    max="11"
                    className="w-20"
                  />
                  <span className="flex items-center text-sm text-muted-foreground">in</span>
                </div>
              )}
            </div>

            {/* Weight Input */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
              </label>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === 'metric' ? '70' : '154'}
                min="20"
                max={unit === 'metric' ? '300' : '660'}
                step="0.1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Presets */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={() => setPresetValues('170', '70', 'metric')}
              className="text-left justify-start h-auto p-3"
            >
              <div>
                <div className="font-medium">Average Adult</div>
                <div className="text-sm text-muted-foreground">170cm, 70kg</div>
              </div>
            </Button>
            <Button
              variant="outline"
              onClick={() => setPresetValues('67', '154', 'imperial')}
              className="text-left justify-start h-auto p-3"
            >
              <div>
                <div className="font-medium">Average Adult</div>
                <div className="text-sm text-muted-foreground">5'7", 154lbs</div>
              </div>
            </Button>
            <Button
              variant="outline"
              onClick={() => setPresetValues('180', '80', 'metric')}
              className="text-left justify-start h-auto p-3"
            >
              <div>
                <div className="font-medium">Tall Adult</div>
                <div className="text-sm text-muted-foreground">180cm, 80kg</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Your BMI Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* BMI Value */}
            <div className={`p-6 rounded-lg ${getBMIBgColor(result.bmi)}`}>
              <div className="text-center">
                <div className={`text-4xl font-bold mb-2 ${getBMIColor(result.bmi)}`}>
                  {result.bmi}
                </div>
                <div className="text-lg font-medium mb-2">{result.category}</div>
                <Badge 
                  variant={result.bmi >= 18.5 && result.bmi < 25 ? "default" : "secondary"}
                  className="mb-4"
                >
                  BMI Category
                </Badge>
                <div className="flex justify-center">
                  <Button onClick={copyResult} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Results
                  </Button>
                </div>
              </div>
            </div>

            {/* BMI Scale */}
            <div className="space-y-3">
              <h4 className="font-medium">BMI Scale</h4>
              <div className="space-y-2">
                {[
                  { range: '< 18.5', category: 'Underweight', color: 'bg-blue-500' },
                  { range: '18.5 - 24.9', category: 'Normal weight', color: 'bg-green-500' },
                  { range: '25.0 - 29.9', category: 'Overweight', color: 'bg-orange-500' },
                  { range: '≥ 30.0', category: 'Obese', color: 'bg-red-500' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded ${item.color}`} />
                    <div className="flex-1 flex justify-between">
                      <span className="text-sm">{item.category}</span>
                      <span className="text-sm text-muted-foreground">{item.range}</span>
                    </div>
                    {result.category === item.category && (
                      <Badge variant="outline" className="text-xs">You are here</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Ideal Weight Range */}
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Ideal Weight Range</h4>
              <div className="text-lg">
                {result.idealWeightRange.min} - {result.idealWeightRange.max} {unit === 'metric' ? 'kg' : 'lbs'}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Based on BMI range of 18.5 - 24.9
              </div>
            </div>

            {/* Recommendation */}
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Health Recommendation</h4>
              <p className="text-sm text-muted-foreground">{result.recommendation}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="text-destructive text-sm">{error}</div>
          </CardContent>
        </Card>
      )}

      {/* BMI Information */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Understanding BMI</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">What is BMI?</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>• Body Mass Index measures body fat based on height and weight</div>
                <div>• It's a screening tool, not a diagnostic tool</div>
                <div>• BMI applies to most adults 18-65 years</div>
                <div>• Results may vary for athletes and elderly</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Health Tips</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>• Maintain a balanced diet with fruits and vegetables</div>
                <div>• Exercise regularly (150 min/week moderate activity)</div>
                <div>• Stay hydrated and get adequate sleep</div>
                <div>• Consult healthcare providers for medical advice</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}