'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Thermometer, ArrowRightLeft } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

export default function FahrenheitToCelsiusConverter() {
  const [fahrenheit, setFahrenheit] = useState<string>('32');
  const [celsius, setCelsius] = useState<string>('0');
  const pathname = usePathname();
  const currentLang = pathname?.startsWith('/zh') ? 'zh' : 'en';

  const convertFahrenheitToCelsius = (f: number): number => {
    return (f - 32) * 5 / 9;
  };

  const convertCelsiusToFahrenheit = (c: number): number => {
    return (c * 9 / 5) + 32;
  };

  const handleFahrenheitChange = (value: string) => {
    setFahrenheit(value);
    const f = parseFloat(value);
    if (!isNaN(f)) {
      const c = convertFahrenheitToCelsius(f);
      setCelsius(c.toFixed(2));
    } else {
      setCelsius('');
    }
  };

  const handleCelsiusChange = (value: string) => {
    setCelsius(value);
    const c = parseFloat(value);
    if (!isNaN(c)) {
      const f = convertCelsiusToFahrenheit(c);
      setFahrenheit(f.toFixed(2));
    } else {
      setFahrenheit('');
    }
  };

  const swapUnits = () => {
    const temp = fahrenheit;
    setFahrenheit(celsius);
    setCelsius(temp);
  };

  useEffect(() => {
    handleFahrenheitChange(fahrenheit);
  }, []);

  const commonTemperatures = [
    { name: currentLang === 'zh' ? '绝对零度' : 'Absolute Zero', f: -459.67, c: -273.15 },
    { name: currentLang === 'zh' ? '水的冰点' : 'Water Freezing Point', f: 32, c: 0 },
    { name: currentLang === 'zh' ? '室温' : 'Room Temperature', f: 68, c: 20 },
    { name: currentLang === 'zh' ? '人体体温' : 'Human Body Temperature', f: 98.6, c: 37 },
    { name: currentLang === 'zh' ? '水的沸点' : 'Water Boiling Point', f: 212, c: 100 },
    { name: currentLang === 'zh' ? '烘焙温度' : 'Baking Temperature', f: 350, c: 177 }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Main Converter */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              {currentLang === 'zh' ? '华氏度 (°F)' : 'Fahrenheit (°F)'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="number"
              value={fahrenheit}
              onChange={(e) => handleFahrenheitChange(e.target.value)}
              placeholder={currentLang === 'zh' ? '输入华氏度' : 'Enter Fahrenheit'}
              className="text-lg"
            />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-red-600">{fahrenheit}°F</span>
              <CopyButton text={`${fahrenheit}°F`} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              {currentLang === 'zh' ? '摄氏度 (°C)' : 'Celsius (°C)'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="number"
              value={celsius}
              onChange={(e) => handleCelsiusChange(e.target.value)}
              placeholder={currentLang === 'zh' ? '输入摄氏度' : 'Enter Celsius'}
              className="text-lg"
            />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-blue-600">{celsius}°C</span>
              <CopyButton text={`${celsius}°C`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center">
        <Button onClick={swapUnits} variant="outline" className="flex items-center gap-2">
          <ArrowRightLeft className="h-4 w-4" />
          {currentLang === 'zh' ? '交换单位' : 'Swap Units'}
        </Button>
      </div>

      {/* Result Display */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-lg font-medium text-gray-600 mb-2">
              {currentLang === 'zh' ? '转换结果' : 'Conversion Result'}
            </div>
            <div className="text-3xl font-bold text-gray-800">
              {fahrenheit}°F = {celsius}°C
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Common Temperatures */}
      <Card>
        <CardHeader>
          <CardTitle>{currentLang === 'zh' ? '常用温度参考' : 'Common Temperature References'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {commonTemperatures.map((temp, index) => (
              <div 
                key={index} 
                className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => handleFahrenheitChange(temp.f.toString())}
              >
                <div className="font-medium text-gray-800 mb-1">{temp.name}</div>
                <div className="flex justify-between text-sm">
                  <span className="text-red-600 font-semibold">{temp.f}°F</span>
                  <span className="text-blue-600 font-semibold">{temp.c}°C</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conversion Formula */}
      <Card>
        <CardHeader>
          <CardTitle>{currentLang === 'zh' ? '转换公式' : 'Conversion Formulas'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-semibold mb-2">{currentLang === 'zh' ? '华氏度转摄氏度' : 'Fahrenheit to Celsius'}</h4>
              <code className="text-lg">°C = (°F - 32) × 5/9</code>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold mb-2">{currentLang === 'zh' ? '摄氏度转华氏度' : 'Celsius to Fahrenheit'}</h4>
              <code className="text-lg">°F = (°C × 9/5) + 32</code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
