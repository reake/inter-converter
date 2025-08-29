'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Moon, Sun, Clock } from 'lucide-react';

export default function SleepCalculator() {
  const [calculationType, setCalculationType] = useState<'bedtime' | 'waketime'>('bedtime');
  const [wakeTime, setWakeTime] = useState<string>('');
  const [bedTime, setBedTime] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [results, setResults] = useState<{
    recommendedTimes: string[];
    sleepCycles: number;
    totalSleep: string;
    ageGroup: string;
    recommendedHours: string;
  } | null>(null);

  const getRecommendedSleep = (ageValue: number) => {
    if (ageValue <= 3) return { hours: '11-14', group: '幼儿 (1-3岁)' };
    if (ageValue <= 5) return { hours: '10-13', group: '学龄前 (3-5岁)' };
    if (ageValue <= 13) return { hours: '9-11', group: '学龄儿童 (6-13岁)' };
    if (ageValue <= 17) return { hours: '8-10', group: '青少年 (14-17岁)' };
    if (ageValue <= 64) return { hours: '7-9', group: '成年人 (18-64岁)' };
    return { hours: '7-8', group: '老年人 (65岁以上)' };
  };

  const calculateSleep = () => {
    if (calculationType === 'bedtime' && wakeTime && age) {
      calculateBedtime();
    } else if (calculationType === 'waketime' && bedTime && age) {
      calculateWakeTime();
    }
  };

  const calculateBedtime = () => {
    if (!wakeTime || !age) return;

    const ageValue = parseInt(age);
    const sleepInfo = getRecommendedSleep(ageValue);
    const wakeDateTime = new Date(`2024-01-01T${wakeTime}`);
    
    // 计算不同睡眠时长的建议就寝时间
    const sleepDurations = [7, 7.5, 8, 8.5, 9]; // 小时
    const recommendedTimes: string[] = [];

    sleepDurations.forEach(duration => {
      const bedDateTime = new Date(wakeDateTime.getTime() - (duration * 60 * 60 * 1000));
      recommendedTimes.push(bedDateTime.toTimeString().slice(0, 5));
    });

    setResults({
      recommendedTimes,
      sleepCycles: Math.round(8 / 1.5), // 平均睡眠周期
      totalSleep: '7-9小时',
      ageGroup: sleepInfo.group,
      recommendedHours: sleepInfo.hours
    });
  };

  const calculateWakeTime = () => {
    if (!bedTime || !age) return;

    const ageValue = parseInt(age);
    const sleepInfo = getRecommendedSleep(ageValue);
    const bedDateTime = new Date(`2024-01-01T${bedTime}`);
    
    // 计算不同睡眠时长的建议起床时间
    const sleepDurations = [7, 7.5, 8, 8.5, 9]; // 小时
    const recommendedTimes: string[] = [];

    sleepDurations.forEach(duration => {
      const wakeDateTime = new Date(bedDateTime.getTime() + (duration * 60 * 60 * 1000));
      recommendedTimes.push(wakeDateTime.toTimeString().slice(0, 5));
    });

    setResults({
      recommendedTimes,
      sleepCycles: Math.round(8 / 1.5),
      totalSleep: '7-9小时',
      ageGroup: sleepInfo.group,
      recommendedHours: sleepInfo.hours
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="h-5 w-5 text-blue-500" />
            睡眠时间计算器
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>计算类型</Label>
            <Select value={calculationType} onValueChange={(value: 'bedtime' | 'waketime') => setCalculationType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bedtime">计算就寝时间</SelectItem>
                <SelectItem value="waketime">计算起床时间</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">年龄</Label>
              <Input
                id="age"
                type="number"
                min="1"
                max="100"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="输入年龄"
              />
            </div>
            
            {calculationType === 'bedtime' ? (
              <div className="space-y-2">
                <Label htmlFor="wakeTime">起床时间</Label>
                <Input
                  id="wakeTime"
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="bedTime">就寝时间</Label>
                <Input
                  id="bedTime"
                  type="time"
                  value={bedTime}
                  onChange={(e) => setBedTime(e.target.value)}
                />
              </div>
            )}
          </div>
          
          <Button 
            onClick={calculateSleep} 
            className="w-full"
            disabled={!age || (calculationType === 'bedtime' ? !wakeTime : !bedTime)}
          >
            <Clock className="mr-2 h-4 w-4" />
            计算睡眠时间
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>睡眠建议</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">您的年龄组</div>
              <div className="text-lg font-semibold text-blue-600">
                {results.ageGroup}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                建议睡眠时长：{results.recommendedHours} 小时
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                {calculationType === 'bedtime' ? (
                  <>
                    <Moon className="h-4 w-4" />
                    建议就寝时间
                  </>
                ) : (
                  <>
                    <Sun className="h-4 w-4" />
                    建议起床时间
                  </>
                )}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {results.recommendedTimes.map((time, index) => (
                  <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-mono text-lg font-semibold">
                      {time}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {7 + index * 0.5}小时睡眠
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">睡眠周期</div>
                <div className="text-lg font-semibold text-green-600">
                  约 {Math.round(8 / 1.5)} 个周期
                </div>
                <div className="text-xs text-muted-foreground">
                  每个周期约90分钟
                </div>
              </div>
              
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">最佳睡眠时长</div>
                <div className="text-lg font-semibold text-purple-600">
                  {results.recommendedHours} 小时
                </div>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground mt-4 p-3 bg-gray-50 rounded">
              <strong>提示：</strong>良好的睡眠质量比睡眠时长更重要。建议保持规律的作息时间，
              睡前避免使用电子设备，创造舒适的睡眠环境。
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
