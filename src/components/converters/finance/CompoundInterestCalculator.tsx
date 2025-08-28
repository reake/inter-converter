'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CompoundResults {
  finalAmount: number;
  totalContributions: number;
  totalInterest: number;
  yearlyBreakdown: Array<{
    year: number;
    startingBalance: number;
    contributions: number;
    interest: number;
    endingBalance: number;
  }>;
}

export default function CompoundInterestCalculator() {
  const [initialAmount, setInitialAmount] = useState<string>('1000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('100');
  const [annualRate, setAnnualRate] = useState<string>('7');
  const [years, setYears] = useState<string>('20');
  const [compoundFrequency, setCompoundFrequency] = useState<string>('12');
  const [contributionFrequency, setContributionFrequency] = useState<string>('12');
  const [results, setResults] = useState<CompoundResults | null>(null);

  const frequencies = {
    '1': 'Annually',
    '4': 'Quarterly', 
    '12': 'Monthly',
    '365': 'Daily'
  };

  const calculateCompoundInterest = () => {
    const principal = parseFloat(initialAmount);
    const monthlyAdd = parseFloat(monthlyContribution);
    const rate = parseFloat(annualRate) / 100;
    const time = parseFloat(years);
    const compoundPeriods = parseFloat(compoundFrequency);
    const contributionPeriods = parseFloat(contributionFrequency);

    if (principal < 0 || rate < 0 || time <= 0) return;

    const yearlyBreakdown: CompoundResults['yearlyBreakdown'] = [];
    let currentBalance = principal;
    let totalContributions = principal;

    for (let year = 1; year <= time; year++) {
      const startingBalance = currentBalance;
      
      // Calculate contributions for this year
      const yearlyContributions = monthlyAdd * contributionPeriods;
      
      // Calculate compound interest with regular contributions
      // Using the formula for compound interest with regular payments
      const periodicRate = rate / compoundPeriods;
      const periodsInYear = compoundPeriods;
      
      // Interest on existing balance
      const interestOnBalance = startingBalance * Math.pow(1 + periodicRate, periodsInYear) - startingBalance;
      
      // Future value of annuity (contributions)
      let contributionGrowth = 0;
      if (monthlyAdd > 0) {
        const contributionPerPeriod = yearlyContributions / compoundPeriods;
        contributionGrowth = contributionPerPeriod * 
          ((Math.pow(1 + periodicRate, periodsInYear) - 1) / periodicRate);
      }
      
      const totalInterest = interestOnBalance + (contributionGrowth - yearlyContributions);
      currentBalance = startingBalance + yearlyContributions + totalInterest;
      totalContributions += yearlyContributions;

      yearlyBreakdown.push({
        year,
        startingBalance,
        contributions: yearlyContributions,
        interest: totalInterest,
        endingBalance: currentBalance
      });
    }

    const finalAmount = currentBalance;
    const totalInterest = finalAmount - totalContributions;

    setResults({
      finalAmount,
      totalContributions,
      totalInterest,
      yearlyBreakdown
    });
  };

  useEffect(() => {
    calculateCompoundInterest();
  }, [initialAmount, monthlyContribution, annualRate, years, compoundFrequency, contributionFrequency]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getGrowthRate = () => {
    if (!results || results.totalContributions === 0) return 0;
    return ((results.finalAmount / results.totalContributions - 1) * 100);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📈 复利计算器
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">计算器</TabsTrigger>
              <TabsTrigger value="breakdown">年度明细</TabsTrigger>
              <TabsTrigger value="insights">投资洞察</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="initialAmount">初始投资金额</Label>
                    <Input
                      id="initialAmount"
                      type="number"
                      value={initialAmount}
                      onChange={(e) => setInitialAmount(e.target.value)}
                      placeholder="输入初始金额"
                    />
                  </div>

                  <div>
                    <Label htmlFor="monthlyContribution">定期投资金额</Label>
                    <Input
                      id="monthlyContribution"
                      type="number"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(e.target.value)}
                      placeholder="输入定期投资金额"
                    />
                  </div>

                  <div>
                    <Label htmlFor="annualRate">年化收益率 (%)</Label>
                    <Input
                      id="annualRate"
                      type="number"
                      step="0.1"
                      value={annualRate}
                      onChange={(e) => setAnnualRate(e.target.value)}
                      placeholder="输入年化收益率"
                    />
                  </div>

                  <div>
                    <Label htmlFor="years">投资年限</Label>
                    <Input
                      id="years"
                      type="number"
                      value={years}
                      onChange={(e) => setYears(e.target.value)}
                      placeholder="输入投资年限"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="compoundFrequency">复利频率</Label>
                    <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择复利频率" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(frequencies).map(([key, label]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="contributionFrequency">投资频率</Label>
                    <Select value={contributionFrequency} onValueChange={setContributionFrequency}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择投资频率" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(frequencies).map(([key, label]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">投资摘要</h4>
                    <div className="text-sm space-y-1">
                      <div>投资期限: {years} 年</div>
                      <div>年化收益率: {annualRate}%</div>
                      <div>复利频率: {frequencies[compoundFrequency as keyof typeof frequencies]}</div>
                    </div>
                  </div>
                </div>
              </div>

              {results && (
                <Card className="bg-green-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800">复利增长结果</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(results.finalAmount)}
                        </div>
                        <div className="text-sm text-green-600">最终金额</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(results.totalContributions)}
                        </div>
                        <div className="text-sm text-blue-600">总投入</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {formatCurrency(results.totalInterest)}
                        </div>
                        <div className="text-sm text-purple-600">复利收益</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {getGrowthRate().toFixed(1)}%
                        </div>
                        <div className="text-sm text-orange-600">总增长率</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">
                          复利的力量: 您的投资增长了 {((results.totalInterest / results.totalContributions) * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                          通过 {years} 年的复利增长，您的 {formatCurrency(results.totalContributions)} 投入变成了 {formatCurrency(results.finalAmount)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="breakdown" className="space-y-4">
              {results && (
                <Card>
                  <CardHeader>
                    <CardTitle>年度增长明细</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">年份</th>
                            <th className="text-right p-2">期初余额</th>
                            <th className="text-right p-2">年度投入</th>
                            <th className="text-right p-2">复利收益</th>
                            <th className="text-right p-2">期末余额</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.yearlyBreakdown.map((year) => (
                            <tr key={year.year} className="border-b hover:bg-gray-50">
                              <td className="p-2 font-semibold">{year.year}</td>
                              <td className="p-2 text-right">{formatCurrency(year.startingBalance)}</td>
                              <td className="p-2 text-right text-blue-600">{formatCurrency(year.contributions)}</td>
                              <td className="p-2 text-right text-green-600">{formatCurrency(year.interest)}</td>
                              <td className="p-2 text-right font-semibold">{formatCurrency(year.endingBalance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800">复利优势</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>时间是复利的最好朋友 - 越早开始越好</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>定期投资比一次性投资风险更低</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>复利频率越高，最终收益越大</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>即使小额投资也能产生显著收益</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800">投资建议</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>保持投资纪律，定期投入</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>选择费用低廉的投资产品</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>分散投资降低风险</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>避免频繁交易和择时</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {results && (
                <Card>
                  <CardHeader>
                    <CardTitle>投资场景对比</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="text-lg font-bold text-red-600">
                          {formatCurrency(parseFloat(initialAmount))}
                        </div>
                        <div className="text-sm text-red-600">仅初始投资</div>
                        <div className="text-xs text-gray-500 mt-1">无定期投入</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-lg font-bold text-yellow-600">
                          {formatCurrency(results.totalContributions)}
                        </div>
                        <div className="text-sm text-yellow-600">无复利增长</div>
                        <div className="text-xs text-gray-500 mt-1">仅储蓄不投资</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">
                          {formatCurrency(results.finalAmount)}
                        </div>
                        <div className="text-sm text-green-600">复利投资</div>
                        <div className="text-xs text-gray-500 mt-1">定期投入+复利</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
