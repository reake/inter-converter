'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BMIResult {
  bmi: number;
  category: string;
  categoryColor: string;
}

export default function BMICalculator() {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [unit, setUnit] = useState<string>('metric');
  const [result, setResult] = useState<BMIResult | null>(null);

  const getBMICategory = (bmi: number): { category: string; color: string } => {
    if (bmi < 18.5) return { category: '体重不足', color: 'text-blue-600' };
    if (bmi < 25) return { category: '正常体重', color: 'text-green-600' };
    if (bmi < 30) return { category: '超重', color: 'text-yellow-600' };
    return { category: '肥胖', color: 'text-red-600' };
  };

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    
    if (h > 0 && w > 0) {
      let bmi: number;
      
      if (unit === 'metric') {
        // Height in cm, weight in kg
        const heightInM = h / 100;
        bmi = w / (heightInM * heightInM);
      } else {
        // Height in inches, weight in lbs
        bmi = (w / (h * h)) * 703;
      }
      
      const { category, color } = getBMICategory(bmi);
      
      setResult({
        bmi,
        category,
        categoryColor: color
      });
    }
  };

  const reset = () => {
    setHeight('');
    setWeight('');
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>BMI计算器</CardTitle>
          <CardDescription>计算身体质量指数并评估健康状况</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="unit">单位系统</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">公制 (cm/kg)</SelectItem>
                  <SelectItem value="imperial">英制 (in/lbs)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="height">
                身高 ({unit === 'metric' ? 'cm' : 'inches'})
              </Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={unit === 'metric' ? '170' : '67'}
              />
            </div>
            <div>
              <Label htmlFor="weight">
                体重 ({unit === 'metric' ? 'kg' : 'lbs'})
              </Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === 'metric' ? '70' : '154'}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={calculateBMI} className="flex-1">
              计算BMI
            </Button>
            <Button onClick={reset} variant="outline">
              重置
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>BMI结果</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="p-6 bg-blue-50 rounded-lg">
                <div className="text-4xl font-bold text-blue-600">
                  {result.bmi.toFixed(1)}
                </div>
                <div className="text-sm text-blue-600">BMI指数</div>
              </div>
              <div className={`text-xl font-semibold ${result.categoryColor}`}>
                {result.category}
              </div>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>BMI分类标准：</strong></p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>体重不足: &lt; 18.5</div>
                  <div>正常体重: 18.5 - 24.9</div>
                  <div>超重: 25.0 - 29.9</div>
                  <div>肥胖: ≥ 30.0</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
