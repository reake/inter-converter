'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from '@/hooks/useTranslation';

interface FeetToMetersOnlyConverterProps {
  lang?: string;
}

export default function FeetToMetersOnlyConverter({ lang = 'en' }: FeetToMetersOnlyConverterProps) {
  const { t } = useTranslation(lang);
  const [feet, setFeet] = useState<string>('1');
  const [meters, setMeters] = useState<string>('0.3048');

  const convertFeetToMeters = (ft: number): number => {
    return ft * 0.3048;
  };

  const handleFeetChange = (value: string) => {
    setFeet(value);
    const ft = parseFloat(value);
    if (!isNaN(ft)) {
      const m = convertFeetToMeters(ft);
      setMeters(m.toFixed(4));
    } else {
      setMeters('');
    }
  };

  useEffect(() => {
    handleFeetChange(feet);
  }, []);

  const commonLengths = [
    { ft: 1, m: 0.3048, desc: lang === 'en' ? '1 foot' : '1英尺' },
    { ft: 3, m: 0.9144, desc: lang === 'en' ? '1 yard' : '1码' },
    { ft: 5, m: 1.524, desc: lang === 'en' ? 'Short adult height' : '成人身高(矮)' },
    { ft: 6, m: 1.8288, desc: lang === 'en' ? 'Tall adult height' : '成人身高(高)' },
    { ft: 10, m: 3.048, desc: lang === 'en' ? 'One story height' : '一层楼高' },
    { ft: 100, m: 30.48, desc: lang === 'en' ? 'Football field width' : '足球场宽度' },
    { ft: 300, m: 91.44, desc: lang === 'en' ? 'Football field length' : '足球场长度' }
  ];

  const heightRanges = [
    { category: lang === 'en' ? 'Infants (0-1 years)' : '婴儿 (0-1岁)', ft: '1.5-2.5', m: '0.46-0.76' },
    { category: lang === 'en' ? 'Toddlers (1-3 years)' : '幼儿 (1-3岁)', ft: '2.5-3.0', m: '0.76-0.91' },
    { category: lang === 'en' ? 'Children (4-12 years)' : '儿童 (4-12岁)', ft: '3.0-5.0', m: '0.91-1.52' },
    { category: lang === 'en' ? 'Teenagers (13-18 years)' : '青少年 (13-18岁)', ft: '4.5-6.5', m: '1.37-1.98' },
    { category: lang === 'en' ? 'Adult women' : '成人女性', ft: '5.0-5.8', m: '1.52-1.77' },
    { category: lang === 'en' ? 'Adult men' : '成人男性', ft: '5.5-6.5', m: '1.68-1.98' }
  ];

  const architecturalMeasurements = [
    { item: lang === 'en' ? 'Standard door height' : '标准门高', ft: '6.67', m: '2.03' },
    { item: lang === 'en' ? 'Standard ceiling' : '标准天花板', ft: '8-10', m: '2.44-3.05' },
    { item: lang === 'en' ? 'Basketball hoop height' : '篮球架高度', ft: '10', m: '3.05' },
    { item: lang === 'en' ? 'Tennis net height' : '网球网高度', ft: '3', m: '0.91' },
    { item: lang === 'en' ? 'Standard parking space length' : '标准停车位长', ft: '18', m: '5.49' },
    { item: lang === 'en' ? 'Standard parking space width' : '标准停车位宽', ft: '8.5', m: '2.59' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          {lang === 'en' ? 'Feet to Meters Converter' : '英尺转米转换器'}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {lang === 'en' 
            ? 'Convert feet to meters instantly. Free length converter with common measurements, conversion formula, and usage guide for construction, sports, and international use.'
            : '快速将英尺转换为米。免费的长度转换器，包含常用测量值、转换公式和使用指南，适用于建筑、体育和国际使用。'
          }
        </p>
      </div>

      <Tabs defaultValue="converter" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="converter">
            {lang === 'en' ? 'Converter' : '转换器'}
          </TabsTrigger>
          <TabsTrigger value="common">
            {lang === 'en' ? 'Common Lengths' : '常用长度'}
          </TabsTrigger>
          <TabsTrigger value="formula">
            {lang === 'en' ? 'Formula' : '转换公式'}
          </TabsTrigger>
          <TabsTrigger value="guide">
            {lang === 'en' ? 'Guide' : '使用指南'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="converter">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📏 {lang === 'en' ? 'Feet' : '英尺'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="feet">{lang === 'en' ? 'Enter feet' : '输入英尺'}</Label>
                    <Input
                      id="feet"
                      type="number"
                      value={feet}
                      onChange={(e) => handleFeetChange(e.target.value)}
                      placeholder={lang === 'en' ? 'Enter feet value' : '输入英尺值'}
                      className="text-lg"
                      step="0.0001"
                    />
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">
                      {feet} ft
                    </div>
                    <div className="text-sm text-gray-600">
                      {lang === 'en' ? 'Feet' : '英尺'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📏 {lang === 'en' ? 'Meters' : '米'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="meters">{lang === 'en' ? 'Result in meters' : '结果（米）'}</Label>
                    <Input
                      id="meters"
                      type="number"
                      value={meters}
                      className="text-lg"
                      readOnly
                    />
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">
                      {meters} m
                    </div>
                    <div className="text-sm text-gray-600">
                      {lang === 'en' ? 'Meters' : '米'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{lang === 'en' ? 'Conversion Result' : '转换结果'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-gray-600">
                    {lang === 'en' ? 'Feet (Imperial)' : '英尺 (英制)'}
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{feet} ft</div>
                  <div className="text-xs text-gray-500">Feet</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-gray-600">
                    {lang === 'en' ? 'Meters (Metric)' : '米 (公制)'}
                  </div>
                  <div className="text-2xl font-bold text-green-600">{meters} m</div>
                  <div className="text-xs text-gray-500">Meters</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="common">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{lang === 'en' ? 'Common Length Reference' : '常用长度对照表'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {commonLengths.map((length, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="font-medium">{length.desc}</div>
                      </div>
                      <div className="flex gap-6 text-right">
                        <div>
                          <div className="text-blue-600 font-bold">{length.ft} ft</div>
                        </div>
                        <div>
                          <div className="text-green-600 font-bold">{length.m} m</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{lang === 'en' ? 'Height Reference Ranges' : '人体身高参考范围'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {heightRanges.map((range, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{range.category}</div>
                      </div>
                      <div className="flex gap-6 text-right text-sm">
                        <div>
                          <div className="text-blue-600 font-semibold">{range.ft} ft</div>
                        </div>
                        <div>
                          <div className="text-green-600 font-semibold">{range.m} m</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{lang === 'en' ? 'Architectural and Sports Measurements' : '建筑和体育测量'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {architecturalMeasurements.map((measurement, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{measurement.item}</div>
                      </div>
                      <div className="flex gap-6 text-right text-sm">
                        <div>
                          <div className="text-blue-600 font-semibold">{measurement.ft} ft</div>
                        </div>
                        <div>
                          <div className="text-green-600 font-semibold">{measurement.m} m</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="formula">
          <Card>
            <CardHeader>
              <CardTitle>{lang === 'en' ? 'Conversion Formula' : '长度转换公式'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  {lang === 'en' ? 'Feet to Meters' : '英尺转米'}
                </h3>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-center">
                    <div className="text-xl font-mono font-bold text-blue-800">
                      m = ft × 0.3048
                    </div>
                    <div className="text-sm text-blue-600 mt-2">
                      {lang === 'en' ? 'meters = feet × 0.3048' : '米 = 英尺 × 0.3048'}
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  <strong>{lang === 'en' ? 'Example:' : '示例:'}</strong> 6 ft = 6 × 0.3048 = 1.8288 m
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">
                  {lang === 'en' ? 'Quick Calculation Method' : '简化计算方法'}
                </h3>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">
                    {lang === 'en' ? 'Feet to Meters (Approximate)' : '英尺转米 (近似)'}
                  </h4>
                  <div className="text-purple-700">
                    <div className="font-mono">m ≈ ft ÷ 3.3</div>
                    <div className="text-sm mt-1">
                      {lang === 'en' ? 'Error: ±2%' : '误差约 ±2%'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border rounded-lg">
                <h4 className="font-semibold mb-2">
                  {lang === 'en' ? 'Exact Conversion Factor' : '精确转换系数'}
                </h4>
                <div className="text-sm text-gray-700 space-y-1">
                  <div>• 1 {lang === 'en' ? 'foot' : '英尺'} = 0.3048 {lang === 'en' ? 'meters (exact)' : '米 (精确值)'}</div>
                  <div>• {lang === 'en' ? 'Based on 1959 international agreement' : '转换系数基于1959年国际协议'}</div>
                  <div>• {lang === 'en' ? '1 foot is defined as exactly 0.3048 meters' : '1英尺定义为精确的0.3048米'}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guide">
          <Card>
            <CardHeader>
              <CardTitle>{lang === 'en' ? 'Usage Guide' : '使用指南'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  {lang === 'en' ? 'How to Use' : '如何使用'}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <div className="font-medium">
                        {lang === 'en' ? 'Enter length value' : '输入长度值'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {lang === 'en' ? 'Input the value in feet' : '在英尺输入框中输入数值'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <div className="font-medium">
                        {lang === 'en' ? 'Real-time conversion' : '实时转换'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {lang === 'en' ? 'The system automatically calculates and displays the corresponding meter value' : '系统会自动计算并显示对应的米值'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <div className="font-medium">
                        {lang === 'en' ? 'View results' : '查看结果'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {lang === 'en' ? 'Conversion results are accurate to four decimal places' : '转换结果精确到小数点后四位'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">
                  {lang === 'en' ? 'Unit Introduction' : '长度单位介绍'}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-blue-600 mb-2">
                      {lang === 'en' ? 'Foot (ft)' : '英尺 (Foot, ft)'}
                    </h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>• {lang === 'en' ? 'Imperial unit of length' : '英制长度单位'}</div>
                      <div>• {lang === 'en' ? 'Mainly used in US and UK' : '主要在美国、英国使用'}</div>
                      <div>• {lang === 'en' ? 'Symbol: ft or \'' : '符号: ft 或 \''}</div>
                      <div>• 1 {lang === 'en' ? 'foot' : '英尺'} = 12 {lang === 'en' ? 'inches' : '英寸'}</div>
                      <div>• {lang === 'en' ? 'Commonly used for height, building dimensions' : '常用于身高、房屋尺寸'}</div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-green-600 mb-2">
                      {lang === 'en' ? 'Meter (m)' : '米 (Meter, m)'}
                    </h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>• {lang === 'en' ? 'SI base unit' : '国际单位制基本单位'}</div>
                      <div>• {lang === 'en' ? 'Used by most countries worldwide' : '全世界大部分国家使用'}</div>
                      <div>• {lang === 'en' ? 'Symbol: m' : '符号: m'}</div>
                      <div>• 1 {lang === 'en' ? 'meter' : '米'} = 100 {lang === 'en' ? 'centimeters' : '厘米'}</div>
                      <div>• {lang === 'en' ? 'Standard unit for science and engineering' : '科学、工程标准单位'}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">
                  {lang === 'en' ? 'Memory Tips' : '转换记忆技巧'}
                </h4>
                <div className="text-sm text-green-700 space-y-1">
                  <div>• {lang === 'en' ? 'Remember: 1 meter ≈ 3.3 feet' : '记住: 1米 ≈ 3.3英尺'}</div>
                  <div>• {lang === 'en' ? 'Height reference: 6 feet ≈ 1.8 meters' : '身高参考: 6英尺 ≈ 1.8米'}</div>
                  <div>• {lang === 'en' ? 'Quick estimate: divide feet by 3 to get approximate meters' : '快速估算: 英尺数除以3约等于米数'}</div>
                  <div>• {lang === 'en' ? 'Precise calculation: use 0.3048 conversion factor' : '精确计算: 使用0.3048转换系数'}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
