'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from '@/hooks/useTranslation';

interface FeetToMetersConverterProps {
  lang?: string;
}

export default function FeetToMetersConverter({ lang = 'en' }: FeetToMetersConverterProps) {
  const { t } = useTranslation(lang);
  const [feet, setFeet] = useState<string>('1');
  const [meters, setMeters] = useState<string>('0.3048');

  const convertFeetToMeters = (ft: number): number => {
    return ft * 0.3048;
  };

  const convertMetersToFeet = (m: number): number => {
    return m / 0.3048;
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

  const handleMetersChange = (value: string) => {
    setMeters(value);
    const m = parseFloat(value);
    if (!isNaN(m)) {
      const ft = convertMetersToFeet(m);
      setFeet(ft.toFixed(4));
    } else {
      setFeet('');
    }
  };

  useEffect(() => {
    handleFeetChange(feet);
  }, []);

  const commonLengths = [
    { ft: 1, m: 0.3048, desc: '1英尺' },
    { ft: 3, m: 0.9144, desc: '1码' },
    { ft: 5, m: 1.524, desc: '成人身高(矮)' },
    { ft: 6, m: 1.8288, desc: '成人身高(高)' },
    { ft: 10, m: 3.048, desc: '一层楼高' },
    { ft: 100, m: 30.48, desc: '足球场宽度' },
    { ft: 300, m: 91.44, desc: '足球场长度' }
  ];

  const heightRanges = [
    { category: '婴儿 (0-1岁)', ft: '1.5-2.5', m: '0.46-0.76' },
    { category: '幼儿 (1-3岁)', ft: '2.5-3.0', m: '0.76-0.91' },
    { category: '儿童 (4-12岁)', ft: '3.0-5.0', m: '0.91-1.52' },
    { category: '青少年 (13-18岁)', ft: '4.5-6.5', m: '1.37-1.98' },
    { category: '成人女性', ft: '5.0-5.8', m: '1.52-1.77' },
    { category: '成人男性', ft: '5.5-6.5', m: '1.68-1.98' }
  ];

  const architecturalMeasurements = [
    { item: '标准门高', ft: '6.67', m: '2.03' },
    { item: '标准天花板', ft: '8-10', m: '2.44-3.05' },
    { item: '篮球架高度', ft: '10', m: '3.05' },
    { item: '网球网高度', ft: '3', m: '0.91' },
    { item: '标准停车位长', ft: '18', m: '5.49' },
    { item: '标准停车位宽', ft: '8.5', m: '2.59' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{t.feetToMeters.title}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t.feetToMeters.description}
        </p>
      </div>

      <Tabs defaultValue="converter" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="feet-to-meters">{t.feet} → {t.meters}</TabsTrigger>
          <TabsTrigger value="meters-to-feet">{t.meters} → {t.feet}</TabsTrigger>
          <TabsTrigger value="formula">转换公式</TabsTrigger>
          <TabsTrigger value="guide">使用指南</TabsTrigger>
        </TabsList>

        <TabsContent value="converter">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📏 {t.feet}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="feet">{t.feet}</Label>
                    <Input
                      id="feet"
                      type="number"
                      value={feet}
                      onChange={(e) => handleFeetChange(e.target.value)}
                      placeholder={t.feetToMeters.enterFeet}
                      className="text-lg"
                      step="0.0001"
                    />
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">
                      {feet} ft
                    </div>
                    <div className="text-sm text-gray-600">{t.feet}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📏 {t.meters}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="meters">{t.meters}</Label>
                    <Input
                      id="meters"
                      type="number"
                      value={meters}
                      onChange={(e) => handleMetersChange(e.target.value)}
                      placeholder={t.feetToMeters.enterMeters}
                      className="text-lg"
                      readOnly
                    />
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">
                      {meters} m
                    </div>
                    <div className="text-sm text-gray-600">米</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>转换结果</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-gray-600">英尺 (英制)</div>
                  <div className="text-2xl font-bold text-blue-600">{feet} ft</div>
                  <div className="text-xs text-gray-500">Feet</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-gray-600">米 (公制)</div>
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
                <CardTitle>常用长度对照表</CardTitle>
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
                <CardTitle>人体身高参考范围</CardTitle>
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
                <CardTitle>建筑和体育测量</CardTitle>
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

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">长度单位换算</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
                <div>
                  <div className="font-medium mb-1">英制单位</div>
                  <div>• 1英尺 = 12英寸</div>
                  <div>• 1码 = 3英尺 = 36英寸</div>
                  <div>• 1英里 = 5280英尺</div>
                </div>
                <div>
                  <div className="font-medium mb-1">公制单位</div>
                  <div>• 1米 = 100厘米</div>
                  <div>• 1米 = 1000毫米</div>
                  <div>• 1公里 = 1000米</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="formula">
          <Card>
            <CardHeader>
              <CardTitle>长度转换公式</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">英尺转米</h3>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-center">
                    <div className="text-xl font-mono font-bold text-blue-800">
                      m = ft × 0.3048
                    </div>
                    <div className="text-sm text-blue-600 mt-2">
                      米 = 英尺 × 0.3048
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  <strong>示例:</strong> 6 ft = 6 × 0.3048 = 1.8288 m
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">米转英尺</h3>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-center">
                    <div className="text-xl font-mono font-bold text-green-800">
                      ft = m ÷ 0.3048
                    </div>
                    <div className="text-sm text-green-600 mt-2">
                      英尺 = 米 ÷ 0.3048
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  <strong>示例:</strong> 2 m = 2 ÷ 0.3048 = 6.5617 ft
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">简化计算方法</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">英尺转米 (近似)</h4>
                    <div className="text-purple-700">
                      <div className="font-mono">m ≈ ft ÷ 3.3</div>
                      <div className="text-sm mt-1">误差约 ±2%</div>
                    </div>
                  </div>
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">米转英尺 (近似)</h4>
                    <div className="text-orange-700">
                      <div className="font-mono">ft ≈ m × 3.3</div>
                      <div className="text-sm mt-1">误差约 ±2%</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">相关单位转换</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 border rounded-lg">
                    <h4 className="font-semibold mb-2">英制长度单位</h4>
                    <div className="text-sm text-gray-700 space-y-1">
                      <div>• 1英尺 = 12英寸</div>
                      <div>• 1码 = 3英尺</div>
                      <div>• 1英寻 = 6英尺</div>
                      <div>• 1英里 = 5280英尺</div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 border rounded-lg">
                    <h4 className="font-semibold mb-2">公制长度单位</h4>
                    <div className="text-sm text-gray-700 space-y-1">
                      <div>• 1米 = 100厘米</div>
                      <div>• 1米 = 1000毫米</div>
                      <div>• 1千米 = 1000米</div>
                      <div>• 1分米 = 0.1米</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border rounded-lg">
                <h4 className="font-semibold mb-2">精确转换系数</h4>
                <div className="text-sm text-gray-700 space-y-1">
                  <div>• 1英尺 = 0.3048米 (精确值)</div>
                  <div>• 1米 = 3.28084英尺 (精确值)</div>
                  <div>• 转换系数基于1959年国际协议</div>
                  <div>• 1英尺定义为精确的0.3048米</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guide">
          <Card>
            <CardHeader>
              <CardTitle>使用指南</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">如何使用</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <div className="font-medium">输入长度值</div>
                      <div className="text-sm text-gray-600">在英尺或米输入框中输入数值</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <div className="font-medium">实时转换</div>
                      <div className="text-sm text-gray-600">系统会自动计算并显示对应的长度值</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <div className="font-medium">查看结果</div>
                      <div className="text-sm text-gray-600">转换结果精确到小数点后四位</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">长度单位介绍</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-blue-600 mb-2">英尺 (Foot, ft)</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>• 英制长度单位</div>
                      <div>• 主要在美国、英国使用</div>
                      <div>• 符号: ft 或 '</div>
                      <div>• 1英尺 = 12英寸</div>
                      <div>• 常用于身高、房屋尺寸</div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-green-600 mb-2">米 (Meter, m)</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>• 国际单位制基本单位</div>
                      <div>• 全世界大部分国家使用</div>
                      <div>• 符号: m</div>
                      <div>• 1米 = 100厘米</div>
                      <div>• 科学、工程标准单位</div>
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
                      <div>• 身高测量</div>
                      <div>• 房屋尺寸</div>
                      <div>• 家具规格</div>
                      <div>• 运动场地</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">建筑工程</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>• 建筑图纸</div>
                      <div>• 施工测量</div>
                      <div>• 材料规格</div>
                      <div>• 安全距离</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">国际贸易</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>• 产品规格</div>
                      <div>• 运输尺寸</div>
                      <div>• 标准转换</div>
                      <div>• 技术文档</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">历史背景</h3>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm text-blue-700 space-y-2">
                    <div><strong>英尺的起源:</strong> 最初基于人脚的长度，不同地区标准不一</div>
                    <div><strong>现代定义:</strong> 1959年国际协议将1英尺定义为精确的0.3048米</div>
                    <div><strong>米的定义:</strong> 最初定义为地球子午线的四千万分之一，现基于光速定义</div>
                    <div><strong>使用现状:</strong> 美国主要使用英制，其他国家多使用公制</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">转换记忆技巧</h4>
                <div className="text-sm text-green-700 space-y-1">
                  <div>• 记住: 1米 ≈ 3.3英尺</div>
                  <div>• 身高参考: 6英尺 ≈ 1.8米</div>
                  <div>• 快速估算: 英尺数除以3约等于米数</div>
                  <div>• 精确计算: 使用0.3048转换系数</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
