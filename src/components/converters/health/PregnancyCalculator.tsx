'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Baby, Calendar } from 'lucide-react';

export default function PregnancyCalculator() {
  const [lastPeriodDate, setLastPeriodDate] = useState<string>('');
  const [cycleLength, setCycleLength] = useState<string>('28');
  const [results, setResults] = useState<{
    dueDate: string;
    currentWeek: number;
    currentDay: number;
    trimester: number;
    conceptionDate: string;
    daysRemaining: number;
  } | null>(null);

  const calculatePregnancy = () => {
    if (!lastPeriodDate) return;

    const lastPeriod = new Date(lastPeriodDate);
    const today = new Date();
    
    // 预产期：末次月经日期 + 280天
    const dueDate = new Date(lastPeriod);
    dueDate.setDate(lastPeriod.getDate() + 280);
    
    // 受孕日期：末次月经日期 + 14天（平均排卵期）
    const conceptionDate = new Date(lastPeriod);
    conceptionDate.setDate(lastPeriod.getDate() + 14);
    
    // 计算当前孕周
    const daysSinceLastPeriod = Math.floor((today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
    const currentWeek = Math.floor(daysSinceLastPeriod / 7);
    const currentDay = daysSinceLastPeriod % 7;
    
    // 确定孕期阶段
    let trimester = 1;
    if (currentWeek >= 13 && currentWeek < 27) {
      trimester = 2;
    } else if (currentWeek >= 27) {
      trimester = 3;
    }
    
    // 距离预产期剩余天数
    const daysRemaining = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setResults({
      dueDate: dueDate.toLocaleDateString(),
      currentWeek,
      currentDay,
      trimester,
      conceptionDate: conceptionDate.toLocaleDateString(),
      daysRemaining: Math.max(0, daysRemaining)
    });
  };

  const getTrimesterInfo = (trimester: number) => {
    const info = {
      1: { name: '孕早期', color: 'text-green-600', bg: 'bg-green-50', weeks: '1-12周' },
      2: { name: '孕中期', color: 'text-blue-600', bg: 'bg-blue-50', weeks: '13-26周' },
      3: { name: '孕晚期', color: 'text-purple-600', bg: 'bg-purple-50', weeks: '27-40周' }
    };
    return info[trimester as keyof typeof info];
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Baby className="h-5 w-5 text-pink-500" />
            孕期计算器
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lastPeriod">末次月经开始日期</Label>
              <Input
                id="lastPeriod"
                type="date"
                value={lastPeriodDate}
                onChange={(e) => setLastPeriodDate(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cycleLength">月经周期长度（天）</Label>
              <Input
                id="cycleLength"
                type="number"
                min="21"
                max="35"
                value={cycleLength}
                onChange={(e) => setCycleLength(e.target.value)}
                placeholder="28"
              />
            </div>
          </div>
          
          <Button 
            onClick={calculatePregnancy} 
            className="w-full"
            disabled={!lastPeriodDate}
          >
            <Calendar className="mr-2 h-4 w-4" />
            计算孕期信息
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>孕期信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-pink-50 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">预产期</div>
                <div className="text-lg font-semibold text-pink-600">
                  {results.dueDate}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  还有 {results.daysRemaining} 天
                </div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">受孕日期</div>
                <div className="text-lg font-semibold text-blue-600">
                  {results.conceptionDate}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">当前孕周</div>
                <div className="text-2xl font-bold text-green-600">
                  {results.currentWeek}周{results.currentDay > 0 && `+${results.currentDay}天`}
                </div>
              </div>
              
              {results.trimester && (
                <div className={`text-center p-4 rounded-lg ${getTrimesterInfo(results.trimester).bg}`}>
                  <div className="text-sm text-muted-foreground mb-1">孕期阶段</div>
                  <div className={`text-lg font-semibold ${getTrimesterInfo(results.trimester).color}`}>
                    {getTrimesterInfo(results.trimester).name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ({getTrimesterInfo(results.trimester).weeks})
                  </div>
                </div>
              )}
            </div>
            
            <div className="text-xs text-muted-foreground mt-4 p-3 bg-gray-50 rounded">
              <strong>注意：</strong>此计算器提供的是估算值，实际预产期可能因个体差异而有所不同。
              请定期进行产检并遵循医生的专业建议。
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
