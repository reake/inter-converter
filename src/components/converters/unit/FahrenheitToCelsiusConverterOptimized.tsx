'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Thermometer, ArrowRightLeft } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

export default function FahrenheitToCelsiusConverter() {
  const [fahrenheit, setFahrenheit] = useState<string>('32');
  const [celsius, setCelsius] = useState<string>('0');
  const [error, setError] = useState('');

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

  useEffect(() => {
    handleFahrenheitChange(fahrenheit);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const commonTemperatures = [
    { name: currentLang === 'zh' ? '绝对零度' : 'Absolute Zero', f: -459.67, c: -273.15 },
    { name: currentLang === 'zh' ? '水的冰点' : 'Water Freezing Point', f: 32, c: 0 },
    { name: currentLang === 'zh' ? '室温' : 'Room Temperature', f: 68, c: 20 },
    { name: currentLang === 'zh' ? '人体体温' : 'Human Body Temperature', f: 98.6, c: 37 },
    { name: currentLang === 'zh' ? '水的沸点' : 'Water Boiling Point', f: 212, c: 100 },
    { name: currentLang === 'zh' ? '烘焙温度' : 'Baking Temperature', f: 350, c: 177 }
  ];

  const toolData = translations[currentLang]['fahrenheit-to-celsius'];

  return (
    <ToolLayout
      title={toolData.title}
      description={toolData.description}
      keywords={toolData.keywords}
      canonicalUrl={canonicalUrl}
      lang={currentLang}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <LanguageSelector 
              currentLang={currentLang} 
              onLanguageChange={changeLanguage}
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {toolData.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {toolData.description}
          </p>
        </div>

        <Tabs defaultValue="converter" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="converter">{t.converter}</TabsTrigger>
            <TabsTrigger value="common">{t.commonValues}</TabsTrigger>
            <TabsTrigger value="formula">{t.formula}</TabsTrigger>
            <TabsTrigger value="guide">{t.guide}</TabsTrigger>
          </TabsList>

          <TabsContent value="converter">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🌡️ {t.fahrenheit}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fahrenheit">{t.fahrenheit}</Label>
                      <Input
                        id="fahrenheit"
                        type="number"
                        value={fahrenheit}
                        onChange={(e) => handleFahrenheitChange(e.target.value)}
                        placeholder={t.enterValue}
                        className="text-lg"
                      />
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-800">
                        {fahrenheit}°F
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => copyToClipboard(`${fahrenheit}°F`)}
                      >
                        {t.copy} °F
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🌡️ {t.celsius}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="celsius">{t.celsius}</Label>
                      <Input
                        id="celsius"
                        type="number"
                        value={celsius}
                        onChange={(e) => handleCelsiusChange(e.target.value)}
                        placeholder={t.enterValue}
                        className="text-lg"
                      />
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-800">
                        {celsius}°C
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => copyToClipboard(`${celsius}°C`)}
                      >
                        {t.copy} °C
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="common">
            <Card>
              <CardHeader>
                <CardTitle>{t.commonConversions}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">{currentLang === 'zh' ? '温度' : 'Temperature'}</th>
                        <th className="text-center p-3">{t.fahrenheit}</th>
                        <th className="text-center p-3">{t.celsius}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commonTemperatures.map((temp, index) => (
                        <tr 
                          key={index} 
                          className="border-b hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            handleFahrenheitChange(temp.f.toString());
                          }}
                        >
                          <td className="p-3 font-medium">{temp.name}</td>
                          <td className="text-center p-3">{temp.f}°F</td>
                          <td className="text-center p-3">{temp.c}°C</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="formula">
            <Card>
              <CardHeader>
                <CardTitle>{t.conversionFormula}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    {currentLang === 'zh' ? '华氏度转摄氏度' : 'Fahrenheit to Celsius'}
                  </h3>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-xl font-mono text-center mb-2">
                      °C = (°F - 32) × 5/9
                    </div>
                    <div className="text-sm text-blue-700 text-center">
                      {currentLang === 'zh' 
                        ? '例如: (68°F - 32) × 5/9 = 20°C' 
                        : 'Example: (68°F - 32) × 5/9 = 20°C'
                      }
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    {currentLang === 'zh' ? '摄氏度转华氏度' : 'Celsius to Fahrenheit'}
                  </h3>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-xl font-mono text-center mb-2">
                      °F = (°C × 9/5) + 32
                    </div>
                    <div className="text-sm text-green-700 text-center">
                      {currentLang === 'zh' 
                        ? '例如: (20°C × 9/5) + 32 = 68°F' 
                        : 'Example: (20°C × 9/5) + 32 = 68°F'
                      }
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guide">
            <Card>
              <CardHeader>
                <CardTitle>{t.usageGuide}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    {currentLang === 'zh' ? '如何使用' : 'How to Use'}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <div>
                        <div className="font-medium">
                          {currentLang === 'zh' ? '输入温度值' : 'Enter Temperature Value'}
                        </div>
                        <div className="text-sm text-gray-600">
                          {currentLang === 'zh' 
                            ? '在华氏度或摄氏度输入框中输入数值' 
                            : 'Enter a number in either Fahrenheit or Celsius input field'
                          }
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <div>
                        <div className="font-medium">
                          {currentLang === 'zh' ? '查看转换结果' : 'View Conversion Result'}
                        </div>
                        <div className="text-sm text-gray-600">
                          {currentLang === 'zh' 
                            ? '转换结果会自动显示在另一个输入框中' 
                            : 'The converted value will automatically appear in the other input field'
                          }
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <div>
                        <div className="font-medium">
                          {currentLang === 'zh' ? '复制结果' : 'Copy Result'}
                        </div>
                        <div className="text-sm text-gray-600">
                          {currentLang === 'zh' 
                            ? '点击复制按钮将结果复制到剪贴板' 
                            : 'Click the copy button to copy the result to clipboard'
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    {currentLang === 'zh' ? '应用场景' : 'Use Cases'}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="font-medium mb-2">
                        {currentLang === 'zh' ? '天气预报' : 'Weather Forecasting'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {currentLang === 'zh' 
                          ? '转换不同地区的天气温度单位' 
                          : 'Convert temperature units for weather in different regions'
                        }
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="font-medium mb-2">
                        {currentLang === 'zh' ? '烹饪烘焙' : 'Cooking & Baking'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {currentLang === 'zh' 
                          ? '转换食谱中的烘焙温度' 
                          : 'Convert baking temperatures in recipes'
                        }
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="font-medium mb-2">
                        {currentLang === 'zh' ? '科学研究' : 'Scientific Research'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {currentLang === 'zh' 
                          ? '实验数据的温度单位转换' 
                          : 'Convert temperature units in experimental data'
                        }
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="font-medium mb-2">
                        {currentLang === 'zh' ? '国际交流' : 'International Communication'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {currentLang === 'zh' 
                          ? '与使用不同温度单位的人交流' 
                          : 'Communicate with people using different temperature units'
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ToolLayout>
  );
}
