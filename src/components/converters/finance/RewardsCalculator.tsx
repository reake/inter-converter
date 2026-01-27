'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SpendingCategory {
  id: string;
  name: string;
  monthlySpending: number;
  rewardRate: number;
}

interface RewardsResults {
  monthlyRewards: number;
  annualRewards: number;
  cashValue: number;
  travelValue: number;
  categoryBreakdown: {
    category: string;
    spending: number;
    rewards: number;
  }[];
  annualFee: number;
  netValue: number;
}

export default function RewardsCalculator() {
  const [categories, setCategories] = useState<SpendingCategory[]>([
    { id: '1', name: 'Groceries', monthlySpending: 500, rewardRate: 3 },
    { id: '2', name: 'Gas', monthlySpending: 200, rewardRate: 2 },
    { id: '3', name: 'Dining', monthlySpending: 300, rewardRate: 2 },
    { id: '4', name: 'Other', monthlySpending: 800, rewardRate: 1 }
  ]);
  const [annualFee, setAnnualFee] = useState<string>('95');
  const [rewardType, setRewardType] = useState<string>('cashback');
  const [signupBonus, setSignupBonus] = useState<string>('200');
  const [spendingRequirement, setSpendingRequirement] = useState<string>('3000');
  const [results, setResults] = useState<RewardsResults | null>(null);

  const calculateRewards = useCallback(() => {
    const fee = parseFloat(annualFee) || 0;
    const bonus = parseFloat(signupBonus) || 0;
    const spendReq = parseFloat(spendingRequirement) || 0;
    
    if (categories.length === 0) return;

    let monthlyRewards = 0;
    const categoryBreakdown: { category: string; spending: number; rewards: number; }[] = [];
    
    categories.forEach(category => {
      const categoryRewards = (category.monthlySpending * category.rewardRate) / 100;
      monthlyRewards += categoryRewards;
      
      categoryBreakdown.push({
        category: category.name,
        spending: category.monthlySpending,
        rewards: categoryRewards
      });
    });

    const annualRewards = monthlyRewards * 12;
    
    // Calculate cash vs travel value
    const cashValue = annualRewards;
    const travelValue = rewardType === 'travel' ? annualRewards * 1.25 : annualRewards; // 25% bonus for travel
    
    // Check if spending requirement is met for signup bonus
    const totalMonthlySpending = categories.reduce((sum, cat) => sum + cat.monthlySpending, 0);
    const monthsToMeetRequirement = spendReq / totalMonthlySpending;
    const qualifiesForBonus = monthsToMeetRequirement <= 3; // Assume 3-month requirement

    const netValue = (rewardType === 'travel' ? travelValue : cashValue) - fee + (qualifiesForBonus ? bonus : 0);

    setResults({
      monthlyRewards,
      annualRewards,
      cashValue,
      travelValue,
      categoryBreakdown,
      annualFee: fee,
      netValue
    });
  }, [annualFee, signupBonus, spendingRequirement, categories, rewardType]);

  useEffect(() => {
    calculateRewards();
  }, [calculateRewards]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const addCategory = () => {
    const newId = (categories.length + 1).toString();
    setCategories([...categories, {
      id: newId,
      name: `Category ${newId}`,
      monthlySpending: 100,
      rewardRate: 1
    }]);
  };

  const removeCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const updateCategory = (id: string, field: keyof SpendingCategory, value: string | number) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, [field]: value } : cat
    ));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🎁 Credit Card Rewards Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="strategies">Reward Strategies</TabsTrigger>
              <TabsTrigger value="cards">Card Types</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Spending Categories</h3>
                    <Button onClick={addCategory} size="sm">Add Category</Button>
                  </div>
                  
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {categories.map((category) => (
                      <Card key={category.id} className="p-3">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Input
                              value={category.name}
                              onChange={(e) => updateCategory(category.id, 'name', e.target.value)}
                              className="text-sm"
                              placeholder="Category name"
                            />
                            {categories.length > 1 && (
                              <Button 
                                onClick={() => removeCategory(category.id)} 
                                size="sm" 
                                variant="outline"
                                className="ml-2"
                              >
                                ×
                              </Button>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label className="text-xs">Monthly Spending</Label>
                              <Input
                                type="number"
                                value={category.monthlySpending}
                                onChange={(e) => updateCategory(category.id, 'monthlySpending', parseFloat(e.target.value) || 0)}
                                className="text-xs"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Reward Rate (%)</Label>
                              <Input
                                type="number"
                                step="0.1"
                                value={category.rewardRate}
                                onChange={(e) => updateCategory(category.id, 'rewardRate', parseFloat(e.target.value) || 0)}
                                className="text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div>
                    <Label htmlFor="rewardType">Reward Type</Label>
                    <Select value={rewardType} onValueChange={setRewardType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reward type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cashback">Cash Back</SelectItem>
                        <SelectItem value="travel">Travel Points</SelectItem>
                        <SelectItem value="flexible">Flexible Points</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="annualFee">Annual Fee</Label>
                    <Input
                      id="annualFee"
                      type="number"
                      value={annualFee}
                      onChange={(e) => setAnnualFee(e.target.value)}
                      placeholder="Enter annual fee"
                    />
                  </div>

                  <div>
                    <Label htmlFor="signupBonus">Sign-up Bonus</Label>
                    <Input
                      id="signupBonus"
                      type="number"
                      value={signupBonus}
                      onChange={(e) => setSignupBonus(e.target.value)}
                      placeholder="Enter sign-up bonus value"
                    />
                  </div>

                  <div>
                    <Label htmlFor="spendingRequirement">Spending Requirement</Label>
                    <Input
                      id="spendingRequirement"
                      type="number"
                      value={spendingRequirement}
                      onChange={(e) => setSpendingRequirement(e.target.value)}
                      placeholder="Enter spending requirement for bonus"
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      Amount needed to qualify for sign-up bonus
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {results && (
                    <>
                      <Card className="bg-green-50 border-green-200">
                        <CardHeader>
                          <CardTitle className="text-green-800 text-sm">Rewards Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Monthly Rewards:</span>
                              <span className="font-semibold">{formatCurrency(results.monthlyRewards)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Annual Rewards:</span>
                              <span className="font-semibold">{formatCurrency(results.annualRewards)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Cash Value:</span>
                              <span className="font-semibold">{formatCurrency(results.cashValue)}</span>
                            </div>
                            {rewardType === 'travel' && (
                              <div className="flex justify-between">
                                <span>Travel Value:</span>
                                <span className="font-semibold text-green-600">{formatCurrency(results.travelValue)}</span>
                              </div>
                            )}
                            <div className="flex justify-between text-red-600">
                              <span>Annual Fee:</span>
                              <span className="font-semibold">-{formatCurrency(results.annualFee)}</span>
                            </div>
                            <div className="flex justify-between border-t pt-2">
                              <span>Net Annual Value:</span>
                              <span className={`font-semibold text-lg ${results.netValue > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {formatCurrency(results.netValue)}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Category Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            {results.categoryBreakdown.map((item, index) => (
                              <div key={index} className="flex justify-between">
                                <span>{item.category}:</span>
                                <span className="font-semibold">{formatCurrency(item.rewards * 12)}/year</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-blue-50 border-blue-200">
                        <CardHeader>
                          <CardTitle className="text-blue-800 text-sm">💡 Optimization Tips</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-blue-700">
                            {results.netValue < 0 ? (
                              "This card's annual fee exceeds your rewards. Consider a no-fee card or increase spending in bonus categories."
                            ) : results.netValue < 100 ? (
                              "Your rewards barely justify the annual fee. Look for cards with better rates in your spending categories."
                            ) : (
                              "This card provides good value for your spending pattern. Consider maximizing bonus categories."
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="strategies" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">💰 Maximize Rewards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🎯 <strong>Use bonus categories:</strong> 3-5% vs 1% base rate</div>
                      <div>📅 <strong>Track rotating categories:</strong> Quarterly 5% categories</div>
                      <div>💳 <strong>Multiple cards:</strong> Different cards for different categories</div>
                      <div>🛒 <strong>Shop through portals:</strong> Extra points online</div>
                      <div>🎁 <strong>Sign-up bonuses:</strong> Biggest reward opportunities</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">🎯 Category Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🛒 <strong>Groceries:</strong> 3-6% cards available</div>
                      <div>⛽ <strong>Gas:</strong> 3-4% at gas stations</div>
                      <div>🍽️ <strong>Dining:</strong> 3-4% at restaurants</div>
                      <div>✈️ <strong>Travel:</strong> 2-5% on travel purchases</div>
                      <div>🏪 <strong>Everything else:</strong> 2% flat rate cards</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">🎁 Sign-up Bonuses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>💎 <strong>High value:</strong> $500-$1,000+ bonuses</div>
                      <div>📊 <strong>Meet requirements:</strong> Spend $3,000-$5,000</div>
                      <div>⏰ <strong>Time limit:</strong> Usually 3 months</div>
                      <div>📅 <strong>Plan timing:</strong> Before large purchases</div>
                      <div>🔄 <strong>Churn responsibly:</strong> Space out applications</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-800 text-sm">⚠️ Avoid Pitfalls</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>💸 <strong>Don&apos;t overspend:</strong> Rewards don&apos;t justify debt</div>
                      <div>📅 <strong>Pay in full:</strong> Interest negates rewards</div>
                      <div>💳 <strong>Annual fee math:</strong> Ensure rewards exceed fees</div>
                      <div>📊 <strong>Track spending:</strong> Stay within budget</div>
                      <div>🎯 <strong>Use what you earn:</strong> Don&apos;t let points expire</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="cards" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">💰 Cash Back Cards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🎯 <strong>Flat rate:</strong> 1.5-2% on everything</div>
                      <div>📊 <strong>Category bonus:</strong> 3-6% rotating categories</div>
                      <div>🛒 <strong>Specific categories:</strong> Groceries, gas, dining</div>
                      <div>💵 <strong>Simple redemption:</strong> Statement credit or deposit</div>
                      <div>🎁 <strong>Best for:</strong> Simple rewards, no travel</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">✈️ Travel Cards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🏨 <strong>Hotel points:</strong> Free nights, elite status</div>
                      <div>✈️ <strong>Airline miles:</strong> Free flights, upgrades</div>
                      <div>🌍 <strong>Transfer partners:</strong> Flexible redemptions</div>
                      <div>💎 <strong>Premium perks:</strong> Lounge access, credits</div>
                      <div>🎁 <strong>Best for:</strong> Frequent travelers</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">🔄 Flexible Points</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>💳 <strong>Chase Ultimate Rewards:</strong> 1.25-1.5¢ per point</div>
                      <div>💎 <strong>Amex Membership Rewards:</strong> Transfer partners</div>
                      <div>🏦 <strong>Citi ThankYou:</strong> Various redemption options</div>
                      <div>✈️ <strong>Transfer to airlines:</strong> Often best value</div>
                      <div>🎁 <strong>Best for:</strong> Flexibility and optimization</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-800 text-sm">🚫 Cards to Avoid</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>💸 <strong>High annual fees:</strong> Without matching benefits</div>
                      <div>📊 <strong>Low reward rates:</strong> Less than 1% everywhere</div>
                      <div>⏰ <strong>Expiring points:</strong> Use-it-or-lose-it policies</div>
                      <div>💳 <strong>Store cards:</strong> Limited use, high APR</div>
                      <div>🎯 <strong>Wrong fit:</strong> Doesn&apos;t match spending patterns</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
