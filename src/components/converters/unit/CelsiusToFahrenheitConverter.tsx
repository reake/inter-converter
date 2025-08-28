'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Thermometer, ArrowRightLeft } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

export default function CelsiusToFahrenheitConverter() {
  const [celsius, setCelsius] = useState<string>('0');
  const [fahrenheit, setFahrenheit] = useState<string>('32');
  const [error, setError] = useState('');

  const convertCelsiusToFahrenheit = (c: number): number => {
    return (c * 9 / 5) + 32;
  };

  const convertFahrenheitToCelsius = (f: number): number => {
    return (f - 32) * 5 / 9;
  };

  const handleCelsiusChange = (value: string) => {
    setCelsius(value);
    const c = parseFloat(value);
    if (!isNaN(c)) {
      const f = convertCelsiusToFahrenheit(c);
      setFahrenheit(f.toFixed(2));
      setError('');
    } else {
      setFahrenheit('');
      setError('');
    }
  };

  const handleFahrenheitChange = (value: string) => {
    setFahrenheit(value);
    const f = parseFloat(value);
    if (!isNaN(f)) {
      const c = convertFahrenheitToCelsius(f);
      setCelsius(c.toFixed(2));
      setError('');
    } else {
      setCelsius('');
      setError('');
    }
  };

  const swapUnits = () => {
    const temp = celsius;
    setCelsius(fahrenheit);
    setFahrenheit(temp);
  };

  useEffect(() => {
    handleCelsiusChange(celsius);
  }, []);

  const commonTemperatures = [
    { c: -40, f: -40, desc: 'Extreme Cold' },
    { c: -18, f: 0, desc: 'Freezer Temperature' },
    { c: 0, f: 32, desc: 'Water Freezing Point' },
    { c: 20, f: 68, desc: 'Room Temperature' },
    { c: 37, f: 98.6, desc: 'Human Body Temperature' },
    { c: 100, f: 212, desc: 'Water Boiling Point' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Main Converter */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              Celsius (°C)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="number"
              value={celsius}
              onChange={(e) => handleCelsiusChange(e.target.value)}
              placeholder="Enter temperature in Celsius"
              className="text-lg"
            />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-blue-600">{celsius}°C</span>
              <CopyButton text={`${celsius}°C`} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              Fahrenheit (°F)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="number"
              value={fahrenheit}
              onChange={(e) => handleFahrenheitChange(e.target.value)}
              placeholder="Enter temperature in Fahrenheit"
              className="text-lg"
            />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-red-600">{fahrenheit}°F</span>
              <CopyButton text={`${fahrenheit}°F`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center">
        <Button onClick={swapUnits} variant="outline" className="flex items-center gap-2">
          <ArrowRightLeft className="h-4 w-4" />
          Swap Units
        </Button>
      </div>

      {/* Result Display */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-lg font-medium text-gray-600 mb-2">Conversion Result</div>
            <div className="text-3xl font-bold text-gray-800">
              {celsius}°C = {fahrenheit}°F
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Common Temperatures */}
      <Card>
        <CardHeader>
          <CardTitle>Common Temperature References</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {commonTemperatures.map((temp, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-800 mb-1">{temp.desc}</div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-600 font-semibold">{temp.c}°C</span>
                  <span className="text-red-600 font-semibold">{temp.f}°F</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conversion Formula */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Formulas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold mb-2">Celsius to Fahrenheit</h4>
              <code className="text-lg">°F = (°C × 9/5) + 32</code>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-semibold mb-2">Fahrenheit to Celsius</h4>
              <code className="text-lg">°C = (°F - 32) × 5/9</code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

          <h3 className="text-lg font-semibold mb-3">如何使用</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <div className="font-medium">输入温度值</div>
                      <div className="text-sm text-gray-600">在摄氏度或华氏度输入框中输入数值</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <div className="font-medium">实时转换</div>
                      <div className="text-sm text-gray-600">系统会自动计算并显示对应的温度值</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <div className="font-medium">查看结果</div>
                      <div className="text-sm text-gray-600">转换结果精确到小数点后两位</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">温度单位历史</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-green-600 mb-2">摄氏度 (°C)</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>• 1742年由瑞典天文学家安德斯·摄尔修斯发明</div>
                      <div>• 原本以水的沸点为0°，冰点为100°</div>
                      <div>• 后来被卡尔·林奈颠倒为现在的标准</div>
                      <div>• 国际单位制的标准温度单位</div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-blue-600 mb-2">华氏度 (°F)</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>• 1724年由德国物理学家丹尼尔·华伦海特发明</div>
                      <div>• 以氯化铵和冰的混合物为0°F</div>
                      <div>• 人体温度约为96°F (后修正为98.6°F)</div>
                      <div>• 主要在美国、巴哈马等国使用</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">应用场景</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">日常生活</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>• 天气预报查看</div>
                      <div>• 烹饪温度设置</div>
                      <div>• 体温测量</div>
                      <div>• 空调温度调节</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">科学研究</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>• 实验数据记录</div>
                      <div>• 化学反应温度</div>
                      <div>• 物理测量</div>
                      <div>• 环境监测</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">国际交流</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>• 旅行天气了解</div>
                      <div>• 国际贸易规格</div>
                      <div>• 学术论文发表</div>
                      <div>• 医疗记录转换</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">转换记忆技巧</h4>
                <div className="text-sm text-green-700 space-y-1">
                  <div>• 记住关键点: 0°C = 32°F (水的冰点)</div>
                  <div>• 体温参考: 37°C ≈ 98.6°F</div>
                  <div>• 舒适温度: 20°C ≈ 68°F</div>
                  <div>• 快速估算: °F ≈ °C × 2 + 30</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
