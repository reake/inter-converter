'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Droplets, Activity } from 'lucide-react';

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState<string>('');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [activityLevel, setActivityLevel] = useState<string>('');
  const [climate, setClimate] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [results, setResults] = useState<{
    dailyIntake: number;
    glassesPerDay: number;
    hourlyIntake: number;
    recommendations: string[];
  } | null>(null);

  const calculateWaterIntake = () => {
    if (!weight || !activityLevel || !climate || !age || !gender) return;

    let weightInKg = parseFloat(weight);
    if (weightUnit === 'lbs') {
      weightInKg = weightInKg * 0.453592; // 转换为公斤
    }

    // 基础水分需求：每公斤体重35ml
    let baseIntake = weightInKg * 35;

    // 年龄调整
    const ageValue = parseInt(age);
    if (ageValue > 65) {
      baseIntake *= 0.9; // 老年人需水量稍减
    } else if (ageValue < 18) {
      baseIntake *= 1.1; // 青少年需水量稍增
    }

    // 性别调整
    if (gender === 'male') {
      baseIntake *= 1.1; // 男性需水量稍高
    }

    // 活动水平调整
    const activityMultiplier = {
      'sedentary': 1.0,      // 久坐
      'light': 1.2,          // 轻度活动
      'moderate': 1.4,       // 中度活动
      'active': 1.6,         // 高度活动
      'very_active': 1.8     // 极高活动
    };
    baseIntake *= activityMultiplier[activityLevel as keyof typeof activityMultiplier] || 1.0;

    // 气候调整
    const climateMultiplier = {
      'cool': 1.0,           // 凉爽
      'moderate': 1.1,       // 温和
      'warm': 1.2,           // 温暖
      'hot': 1.4,            // 炎热
      'very_hot': 1.6        // 极热
    };
    baseIntake *= climateMultiplier[climate as keyof typeof climateMultiplier] || 1.0;

    const dailyIntakeML = Math.round(baseIntake);
    const glassesPerDay = Math.round(dailyIntakeML / 250); // 假设每杯250ml
    const hourlyIntake = Math.round(dailyIntakeML / 16); // 假设16小时清醒时间

    const recommendations = [
      '起床后立即喝一杯水',
      '餐前30分钟喝水有助消化',
      '运动前、中、后都要补充水分',
      '尿液颜色浅黄色表示水分充足',
      '避免等到口渴才喝水'
    ];

    setResults({
      dailyIntake: dailyIntakeML,
      glassesPerDay,
      hourlyIntake,
      recommendations
    });
  };

  const getActivityLevelText = (level: string) => {
    const levels = {
      'sedentary': '久坐不动',
      'light': '轻度活动',
      'moderate': '中度活动',
      'active': '高度活动',
      'very_active': '极高活动'
    };
    return levels[level as keyof typeof levels] || level;
  };

  const getClimateText = (climate: string) => {
    const climates = {
      'cool': '凉爽 (<20°C)',
      'moderate': '温和 (20-25°C)',
      'warm': '温暖 (25-30°C)',
      'hot': '炎热 (30-35°C)',
      'very_hot': '极热 (>35°C)'
    };
    return climates[climate as keyof typeof climates] || climate;
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            每日饮水量计算器
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">体重</Label>
              <div className="flex gap-2">
                <Input
                  id="weight"
                  type="number"
                  min="1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="输入体重"
                />
                <Select value={weightUnit} onValueChange={(value: 'kg' | 'lbs') => setWeightUnit(value)}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lbs">lbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">年龄</Label>
              <Input
                id="age"
                type="number"
                min="1"
                max="120"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="输入年龄"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>性别</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue placeholder="选择性别" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">男性</SelectItem>
                  <SelectItem value="female">女性</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>活动水平</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="选择活动水平" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">久坐不动</SelectItem>
                  <SelectItem value="light">轻度活动</SelectItem>
                  <SelectItem value="moderate">中度活动</SelectItem>
                  <SelectItem value="active">高度活动</SelectItem>
                  <SelectItem value="very_active">极高活动</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>环境温度</Label>
            <Select value={climate} onValueChange={setClimate}>
              <SelectTrigger>
                <SelectValue placeholder="选择环境温度" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cool">凉爽 (&lt;20°C)</SelectItem>
                <SelectItem value="moderate">温和 (20-25°C)</SelectItem>
                <SelectItem value="warm">温暖 (25-30°C)</SelectItem>
                <SelectItem value="hot">炎热 (30-35°C)</SelectItem>
                <SelectItem value="very_hot">极热 (&gt;35°C)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={calculateWaterIntake} 
            className="w-full"
            disabled={!weight || !activityLevel || !climate || !age || !gender}
          >
            <Droplets className="mr-2 h-4 w-4" />
            计算饮水量
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>饮水建议</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">每日总量</div>
                <div className="text-2xl font-bold text-blue-600">
                  {results.dailyIntake}
                </div>
                <div className="text-sm text-muted-foreground">毫升</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">约等于</div>
                <div className="text-2xl font-bold text-green-600">
                  {results.glassesPerDay}
                </div>
                <div className="text-sm text-muted-foreground">杯水 (250ml/杯)</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">每小时</div>
                <div className="text-2xl font-bold text-purple-600">
                  {results.hourlyIntake}
                </div>
                <div className="text-sm text-muted-foreground">毫升</div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <Activity className="h-4 w-4" />
                饮水建议
              </h3>
              
              <div className="space-y-2">
                {results.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{recommendation}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="text-sm font-medium text-yellow-800 mb-1">您的活动水平</div>
                <div className="text-sm text-yellow-700">
                  {getActivityLevelText(activityLevel)}
                </div>
              </div>
              
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="text-sm font-medium text-orange-800 mb-1">环境温度</div>
                <div className="text-sm text-orange-700">
                  {getClimateText(climate)}
                </div>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground mt-4 p-3 bg-gray-50 rounded">
              <strong>注意：</strong>此计算器提供的是一般性建议。如有特殊健康状况、服用药物或进行高强度运动，
              请咨询医疗专业人士获取个性化的饮水建议。
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
