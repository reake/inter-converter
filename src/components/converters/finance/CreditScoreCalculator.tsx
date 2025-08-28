'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CreditFactors {
  paymentHistory: number;
  creditUtilization: number;
  creditHistoryLength: number;
  creditMix: number;
  newCredit: number;
}

interface CreditScoreResults {
  estimatedScore: number;
  scoreRange: string;
  factors: CreditFactors;
  recommendations: string[];
  potentialImprovements: {
    factor: string;
    currentImpact: number;
    potentialGain: number;
    timeframe: string;
  }[];
}

export default function CreditScoreCalculator() {
  const [paymentHistory, setPaymentHistory] = useState<string>('95');
  const [totalCreditLimit, setTotalCreditLimit] = useState<string>('10000');
  const [currentBalance, setCurrentBalance] = useState<string>('2000');
  const [creditHistoryMonths, setCreditHistoryMonths] = useState<string>('60');
  const [numberOfAccounts, setNumberOfAccounts] = useState<string>('5');
  const [recentInquiries, setRecentInquiries] = useState<string>('1');
  const [accountTypes, setAccountTypes] = useState<string>('mixed');
  const [results, setResults] = useState<CreditScoreResults | null>(null);

  const calculateCreditScore = () => {
    const paymentHistoryPercent = parseFloat(paymentHistory);
    const creditLimit = parseFloat(totalCreditLimit);
    const balance = parseFloat(currentBalance);
    const historyMonths = parseInt(creditHistoryMonths);
    const accounts = parseInt(numberOfAccounts);
    const inquiries = parseInt(recentInquiries);
    
    if (creditLimit <= 0 || balance < 0 || historyMonths <= 0) return;

    // Calculate utilization ratio
    const utilizationRatio = (balance / creditLimit) * 100;
    
    // Credit score factors (FICO model approximation)
    const factors: CreditFactors = {
      paymentHistory: 0,
      creditUtilization: 0,
      creditHistoryLength: 0,
      creditMix: 0,
      newCredit: 0
    };

    // Payment History (35% of score)
    if (paymentHistoryPercent >= 100) factors.paymentHistory = 35;
    else if (paymentHistoryPercent >= 95) factors.paymentHistory = 33;
    else if (paymentHistoryPercent >= 90) factors.paymentHistory = 30;
    else if (paymentHistoryPercent >= 80) factors.paymentHistory = 25;
    else if (paymentHistoryPercent >= 70) factors.paymentHistory = 20;
    else factors.paymentHistory = 10;

    // Credit Utilization (30% of score)
    if (utilizationRatio <= 10) factors.creditUtilization = 30;
    else if (utilizationRatio <= 30) factors.creditUtilization = 25;
    else if (utilizationRatio <= 50) factors.creditUtilization = 20;
    else if (utilizationRatio <= 70) factors.creditUtilization = 15;
    else if (utilizationRatio <= 90) factors.creditUtilization = 10;
    else factors.creditUtilization = 5;

    // Credit History Length (15% of score)
    if (historyMonths >= 120) factors.creditHistoryLength = 15;
    else if (historyMonths >= 84) factors.creditHistoryLength = 13;
    else if (historyMonths >= 60) factors.creditHistoryLength = 11;
    else if (historyMonths >= 36) factors.creditHistoryLength = 9;
    else if (historyMonths >= 24) factors.creditHistoryLength = 7;
    else factors.creditHistoryLength = 5;

    // Credit Mix (10% of score)
    let mixScore = 0;
    if (accountTypes === 'mixed' && accounts >= 5) mixScore = 10;
    else if (accountTypes === 'mixed' && accounts >= 3) mixScore = 8;
    else if (accounts >= 3) mixScore = 6;
    else if (accounts >= 2) mixScore = 4;
    else mixScore = 2;
    factors.creditMix = mixScore;

    // New Credit (10% of score)
    if (inquiries === 0) factors.newCredit = 10;
    else if (inquiries <= 2) factors.newCredit = 8;
    else if (inquiries <= 4) factors.newCredit = 6;
    else if (inquiries <= 6) factors.newCredit = 4;
    else factors.newCredit = 2;

    // Calculate estimated score (300-850 range)
    const totalFactorScore = Object.values(factors).reduce((sum, score) => sum + score, 0);
    const baseScore = 300;
    const maxAdditionalScore = 550;
    const estimatedScore = Math.round(baseScore + (totalFactorScore / 100) * maxAdditionalScore);

    // Determine score range
    let scoreRange = '';
    if (estimatedScore >= 800) scoreRange = 'Exceptional (800-850)';
    else if (estimatedScore >= 740) scoreRange = 'Very Good (740-799)';
    else if (estimatedScore >= 670) scoreRange = 'Good (670-739)';
    else if (estimatedScore >= 580) scoreRange = 'Fair (580-669)';
    else scoreRange = 'Poor (300-579)';

    // Generate recommendations
    const recommendations: string[] = [];
    if (paymentHistoryPercent < 100) {
      recommendations.push('Make all payments on time - payment history is the most important factor');
    }
    if (utilizationRatio > 30) {
      recommendations.push('Reduce credit utilization below 30% of available credit');
    }
    if (utilizationRatio > 10) {
      recommendations.push('For best scores, keep utilization below 10%');
    }
    if (historyMonths < 84) {
      recommendations.push('Keep old accounts open to maintain credit history length');
    }
    if (accounts < 3) {
      recommendations.push('Consider diversifying your credit mix with different account types');
    }
    if (inquiries > 2) {
      recommendations.push('Limit new credit applications to avoid multiple hard inquiries');
    }

    // Potential improvements
    const potentialImprovements = [];
    
    if (utilizationRatio > 10) {
      const newUtilization = Math.min(10, utilizationRatio);
      const potentialGain = Math.round((30 - factors.creditUtilization) * 0.7);
      potentialImprovements.push({
        factor: 'Lower Credit Utilization to 10%',
        currentImpact: factors.creditUtilization,
        potentialGain,
        timeframe: '1-2 months'
      });
    }

    if (paymentHistoryPercent < 100) {
      const potentialGain = Math.round((35 - factors.paymentHistory) * 0.8);
      potentialImprovements.push({
        factor: 'Perfect Payment History',
        currentImpact: factors.paymentHistory,
        potentialGain,
        timeframe: '3-6 months'
      });
    }

    if (accounts < 5 && accountTypes !== 'mixed') {
      const potentialGain = Math.round((10 - factors.creditMix) * 0.6);
      potentialImprovements.push({
        factor: 'Improve Credit Mix',
        currentImpact: factors.creditMix,
        potentialGain,
        timeframe: '6-12 months'
      });
    }

    setResults({
      estimatedScore,
      scoreRange,
      factors,
      recommendations,
      potentialImprovements
    });
  };

  useEffect(() => {
    calculateCreditScore();
  }, [paymentHistory, totalCreditLimit, currentBalance, creditHistoryMonths, numberOfAccounts, recentInquiries, accountTypes]);

  const formatPercent = (value: number) => `${value.toFixed(1)}%`;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📊 Credit Score Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Score Calculator</TabsTrigger>
              <TabsTrigger value="factors">Score Factors</TabsTrigger>
              <TabsTrigger value="improvement">Improvement Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="paymentHistory">Payment History (%)</Label>
                    <Input
                      id="paymentHistory"
                      type="number"
                      min="0"
                      max="100"
                      value={paymentHistory}
                      onChange={(e) => setPaymentHistory(e.target.value)}
                      placeholder="Enter payment history percentage"
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      Percentage of payments made on time (0-100%)
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="totalCreditLimit">Total Credit Limit</Label>
                    <Input
                      id="totalCreditLimit"
                      type="number"
                      value={totalCreditLimit}
                      onChange={(e) => setTotalCreditLimit(e.target.value)}
                      placeholder="Enter total credit limit"
                    />
                  </div>

                  <div>
                    <Label htmlFor="currentBalance">Current Balance</Label>
                    <Input
                      id="currentBalance"
                      type="number"
                      value={currentBalance}
                      onChange={(e) => setCurrentBalance(e.target.value)}
                      placeholder="Enter current balance"
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      Utilization: {((parseFloat(currentBalance) / parseFloat(totalCreditLimit)) * 100 || 0).toFixed(1)}%
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="creditHistoryMonths">Credit History (months)</Label>
                    <Input
                      id="creditHistoryMonths"
                      type="number"
                      value={creditHistoryMonths}
                      onChange={(e) => setCreditHistoryMonths(e.target.value)}
                      placeholder="Enter months of credit history"
                    />
                  </div>

                  <div>
                    <Label htmlFor="numberOfAccounts">Number of Credit Accounts</Label>
                    <Input
                      id="numberOfAccounts"
                      type="number"
                      value={numberOfAccounts}
                      onChange={(e) => setNumberOfAccounts(e.target.value)}
                      placeholder="Enter number of accounts"
                    />
                  </div>

                  <div>
                    <Label htmlFor="accountTypes">Account Types</Label>
                    <Select value={accountTypes} onValueChange={setAccountTypes}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account mix" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit-cards">Credit Cards Only</SelectItem>
                        <SelectItem value="loans">Loans Only</SelectItem>
                        <SelectItem value="mixed">Mixed (Cards + Loans)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="recentInquiries">Hard Inquiries (last 2 years)</Label>
                    <Input
                      id="recentInquiries"
                      type="number"
                      value={recentInquiries}
                      onChange={(e) => setRecentInquiries(e.target.value)}
                      placeholder="Enter number of inquiries"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {results && (
                    <>
                      <Card className="bg-blue-50 border-blue-200">
                        <CardHeader>
                          <CardTitle className="text-blue-800 text-lg">Estimated Credit Score</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center">
                            <div className="text-4xl font-bold text-blue-900 mb-2">
                              {results.estimatedScore}
                            </div>
                            <div className="text-blue-700 font-semibold">
                              {results.scoreRange}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Score Factor Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Payment History (35%):</span>
                              <span className="font-semibold">{results.factors.paymentHistory}/35</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Credit Utilization (30%):</span>
                              <span className="font-semibold">{results.factors.creditUtilization}/30</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Credit History (15%):</span>
                              <span className="font-semibold">{results.factors.creditHistoryLength}/15</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Credit Mix (10%):</span>
                              <span className="font-semibold">{results.factors.creditMix}/10</span>
                            </div>
                            <div className="flex justify-between">
                              <span>New Credit (10%):</span>
                              <span className="font-semibold">{results.factors.newCredit}/10</span>
                            </div>
                            <div className="flex justify-between border-t pt-2 font-semibold">
                              <span>Total Score Impact:</span>
                              <span>{Object.values(results.factors).reduce((sum, score) => sum + score, 0)}/100</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {results.recommendations.length > 0 && (
                        <Card className="bg-green-50 border-green-200">
                          <CardHeader>
                            <CardTitle className="text-green-800 text-sm">Recommendations</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-1 text-sm">
                              {results.recommendations.map((rec, index) => (
                                <div key={index} className="flex items-start gap-2">
                                  <span className="text-green-600">•</span>
                                  <span>{rec}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="factors" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-800 text-sm">Payment History (35%)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📅 <strong>On-time payments:</strong> Most important factor</div>
                      <div>⚠️ <strong>Late payments:</strong> 30+ days hurt score</div>
                      <div>🚫 <strong>Collections:</strong> Severe negative impact</div>
                      <div>💸 <strong>Bankruptcies:</strong> Major score damage</div>
                      <div>🏠 <strong>Foreclosures:</strong> Long-lasting impact</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-800 text-sm">Credit Utilization (30%)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📊 <strong>Overall utilization:</strong> Total balances vs limits</div>
                      <div>💳 <strong>Per-card utilization:</strong> Individual card ratios</div>
                      <div>🎯 <strong>Ideal ratio:</strong> Below 10% for best scores</div>
                      <div>⚠️ <strong>High utilization:</strong> Above 30% hurts score</div>
                      <div>📈 <strong>Quick impact:</strong> Changes affect score fast</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Credit History Length (15%)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📅 <strong>Average age:</strong> Age of all accounts</div>
                      <div>🏆 <strong>Oldest account:</strong> Keep first card open</div>
                      <div>⏰ <strong>Time factor:</strong> Longer history = better</div>
                      <div>🚫 <strong>Closing cards:</strong> Can reduce average age</div>
                      <div>📈 <strong>Patience pays:</strong> History builds over time</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">Credit Mix (10%)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>💳 <strong>Credit cards:</strong> Revolving credit</div>
                      <div>🏠 <strong>Mortgages:</strong> Installment loans</div>
                      <div>🚗 <strong>Auto loans:</strong> Secured installment</div>
                      <div>💰 <strong>Personal loans:</strong> Unsecured installment</div>
                      <div>🎯 <strong>Variety helps:</strong> Mix shows experience</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="improvement" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">Quick Wins (1-3 months)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>💳 <strong>Pay down balances:</strong> Lower utilization fast</div>
                      <div>📞 <strong>Request credit increases:</strong> Improve ratios</div>
                      <div>🔍 <strong>Check for errors:</strong> Dispute inaccuracies</div>
                      <div>💰 <strong>Pay before due date:</strong> Lower reported balances</div>
                      <div>📅 <strong>Set up autopay:</strong> Never miss payments</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Medium-term (3-12 months)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🏦 <strong>Diversify credit:</strong> Add different account types</div>
                      <div>💼 <strong>Become authorized user:</strong> Piggyback on good credit</div>
                      <div>🔒 <strong>Secured cards:</strong> Build credit safely</div>
                      <div>📊 <strong>Monitor regularly:</strong> Track progress monthly</div>
                      <div>🎯 <strong>Strategic applications:</strong> Space out new credit</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">Long-term (1+ years)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>⏰ <strong>Time heals:</strong> Negative marks fade</div>
                      <div>🏆 <strong>Keep old accounts:</strong> Maintain history length</div>
                      <div>📈 <strong>Consistent habits:</strong> Maintain good practices</div>
                      <div>🎯 <strong>Score goals:</strong> Work toward excellent credit</div>
                      <div>💰 <strong>Reap rewards:</strong> Better rates and terms</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-800 text-sm">Avoid These Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>❌ <strong>Closing old cards:</strong> Reduces history length</div>
                      <div>❌ <strong>Maxing out cards:</strong> High utilization hurts</div>
                      <div>❌ <strong>Multiple applications:</strong> Too many inquiries</div>
                      <div>❌ <strong>Ignoring bills:</strong> Late payments damage score</div>
                      <div>❌ <strong>Credit repair scams:</strong> Only time fixes credit</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {results && results.potentialImprovements.length > 0 && (
                <Card className="bg-yellow-50 border-yellow-200">
                  <CardHeader>
                    <CardTitle className="text-yellow-800 text-sm">Your Potential Improvements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {results.potentialImprovements.map((improvement, index) => (
                        <div key={index} className="border-l-4 border-yellow-400 pl-4">
                          <div className="font-semibold text-sm">{improvement.factor}</div>
                          <div className="text-sm text-gray-600">
                            Potential score increase: +{improvement.potentialGain} points
                          </div>
                          <div className="text-sm text-gray-500">
                            Timeframe: {improvement.timeframe}
                          </div>
                        </div>
                      ))}
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
