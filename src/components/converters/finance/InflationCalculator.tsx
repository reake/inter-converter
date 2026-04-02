'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingDown, DollarSign, Clock } from 'lucide-react';

export function InflationCalculator() {
  const [initialAmount, setInitialAmount] = useState<string>('');
  const [inflationRate, setInflationRate] = useState<string>('3');
  const [timePeriod, setTimePeriod] = useState<string>('10');
  const [results, setResults] = useState<{
    futureValue: number;
    purchasingPowerLoss: number;
    realValue: number;
    totalInflation: number;
    yearlyBreakdown: Array<{year: number, value: number, realValue: number}>;
  } | null>(null);

  const calculateInflation = useCallback(() => {
    const initial = parseFloat(initialAmount) || 0;
    const rate = parseFloat(inflationRate) || 0;
    const years = parseFloat(timePeriod) || 0;
    
    if (initial <= 0 || years <= 0) return;

    const futureValue = initial * Math.pow(1 + rate / 100, years);
    const realValue = initial / Math.pow(1 + rate / 100, years);
    const purchasingPowerLoss = initial - realValue;
    const totalInflation = ((futureValue - initial) / initial) * 100;

    // Calculate yearly breakdown
    const yearlyBreakdown = [];
    for (let year = 1; year <= Math.min(years, 20); year++) {
      const value = initial * Math.pow(1 + rate / 100, year);
      const realVal = initial / Math.pow(1 + rate / 100, year);
      yearlyBreakdown.push({
        year,
        value,
        realValue: realVal
      });
    }

    setResults({
      futureValue,
      purchasingPowerLoss,
      realValue,
      totalInflation,
      yearlyBreakdown
    });
  }, [initialAmount, inflationRate, timePeriod]);

  useEffect(() => {
    if (initialAmount && inflationRate && timePeriod) {
      calculateInflation();
    }
  }, [initialAmount, inflationRate, timePeriod, calculateInflation]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (rate: number) => {
    return `${rate.toFixed(2)}%`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Calculator className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">通胀计算器</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          计算通胀对货币价值的长期影响
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>通胀参数</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="initialAmount">初始金额 ($)</Label>
              <Input
                id="initialAmount"
                type="number"
                placeholder="输入初始金额"
                value={initialAmount}
                onChange={(e) => setInitialAmount(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="inflationRate">年通胀率 (%)</Label>
              <Input
                id="inflationRate"
                type="number"
                step="0.1"
                placeholder="输入年通胀率"
                value={inflationRate}
                onChange={(e) => setInflationRate(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="timePeriod">时间周期 (年)</Label>
              <Input
                id="timePeriod"
                type="number"
                placeholder="输入年数"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="mt-1"
              />
            </div>

            <Button onClick={calculateInflation} className="w-full">
              计算通胀影响
            </Button>
          </CardContent>
        </Card>

        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingDown className="h-5 w-5" />
                <span>通胀影响分析</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600 font-medium">名义价值</div>
                  <div className="text-lg font-bold text-blue-900">
                    {formatCurrency(results.futureValue)}
                  </div>
                </div>

                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="text-sm text-red-600 font-medium">实际价值</div>
                  <div className="text-lg font-bold text-red-900">
                    {formatCurrency(results.realValue)}
                  </div>
                </div>

                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="text-sm text-orange-600 font-medium">购买力损失</div>
                  <div className="text-lg font-bold text-orange-900">
                    {formatCurrency(results.purchasingPowerLoss)}
                  </div>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="text-sm text-purple-600 font-medium">总通胀率</div>
                  <div className="text-lg font-bold text-purple-900">
                    {formatPercentage(results.totalInflation)}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center space-x-2 mb-3">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">年度分解</span>
                </div>
                <div className="max-h-48 overflow-y-auto space-y-1">
                  {results.yearlyBreakdown.slice(0, 10).map((year) => (
                    <div key={year.year} className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm">
                      <span>第 {year.year} 年</span>
                      <div className="flex space-x-4">
                        <span className="text-blue-600">{formatCurrency(year.value)}</span>
                        <span className="text-red-600">{formatCurrency(year.realValue)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>通胀基准参考</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">历史通胀率</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• 美国长期平均: 3.2%</li>
                <li>• 近20年平均: 2.5%</li>
                <li>• 联储目标: 2.0%</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">通胀影响</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 降低购买力</li>
                <li>• 影响储蓄价值</li>
                <li>• 推高生活成本</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">应对策略</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• 投资抗通胀资产</li>
                <li>• 考虑实物资产</li>
                <li>• 调整投资组合</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
