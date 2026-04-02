'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CostResult {
  totalMonthlyCost: number;
  annualCost: number;
  breakdown: {
    housing: number;
    food: number;
    transportation: number;
    healthcare: number;
    utilities: number;
    entertainment: number;
    other: number;
  };
  comparison: {
    currentCity: string;
    newCity: string;
    difference: number;
    percentChange: number;
  };
}

export default function CostOfLivingCalculator() {
  const [currentCity, setCurrentCity] = useState<string>('national-average');
  const [newCity, setNewCity] = useState<string>('san-francisco');
  const [housingCost, setHousingCost] = useState<string>('2500');
  const [foodCost, setFoodCost] = useState<string>('600');
  const [transportationCost, setTransportationCost] = useState<string>('400');
  const [healthcareCost, setHealthcareCost] = useState<string>('300');
  const [utilitiesCost, setUtilitiesCost] = useState<string>('200');
  const [entertainmentCost, setEntertainmentCost] = useState<string>('300');
  const [otherCost, setOtherCost] = useState<string>('500');
  const [result, setResult] = useState<CostResult | null>(null);

  // Cost of living multipliers for different cities (relative to national average)
  const cityMultipliers: Record<string, { name: string; multiplier: number }> = {
    'national-average': { name: 'National Average', multiplier: 1.0 },
    'san-francisco': { name: 'San Francisco, CA', multiplier: 1.8 },
    'new-york': { name: 'New York, NY', multiplier: 1.7 },
    'los-angeles': { name: 'Los Angeles, CA', multiplier: 1.5 },
    'seattle': { name: 'Seattle, WA', multiplier: 1.4 },
    'boston': { name: 'Boston, MA', multiplier: 1.3 },
    'chicago': { name: 'Chicago, IL', multiplier: 1.1 },
    'austin': { name: 'Austin, TX', multiplier: 1.0 },
    'atlanta': { name: 'Atlanta, GA', multiplier: 0.9 },
    'phoenix': { name: 'Phoenix, AZ', multiplier: 0.9 },
    'dallas': { name: 'Dallas, TX', multiplier: 0.9 },
    'denver': { name: 'Denver, CO', multiplier: 1.1 },
    'miami': { name: 'Miami, FL', multiplier: 1.2 },
    'las-vegas': { name: 'Las Vegas, NV', multiplier: 0.9 }
  };

  const calculateCostOfLiving = () => {
    const housing = parseFloat(housingCost) || 0;
    const food = parseFloat(foodCost) || 0;
    const transportation = parseFloat(transportationCost) || 0;
    const healthcare = parseFloat(healthcareCost) || 0;
    const utilities = parseFloat(utilitiesCost) || 0;
    const entertainment = parseFloat(entertainmentCost) || 0;
    const other = parseFloat(otherCost) || 0;

    const currentMultiplier = cityMultipliers[currentCity]?.multiplier || 1.0;
    const newMultiplier = cityMultipliers[newCity]?.multiplier || 1.0;

    // Calculate current costs
    const currentTotalMonthlyCost = housing + food + transportation + healthcare + utilities + entertainment + other;
    
    // Adjust for new city
    const adjustmentRatio = newMultiplier / currentMultiplier;
    
    const newBreakdown = {
      housing: Math.round(housing * adjustmentRatio),
      food: Math.round(food * adjustmentRatio),
      transportation: Math.round(transportation * adjustmentRatio),
      healthcare: Math.round(healthcare * adjustmentRatio),
      utilities: Math.round(utilities * adjustmentRatio),
      entertainment: Math.round(entertainment * adjustmentRatio),
      other: Math.round(other * adjustmentRatio)
    };

    const newTotalMonthlyCost = Object.values(newBreakdown).reduce((sum, cost) => sum + cost, 0);
    const difference = newTotalMonthlyCost - currentTotalMonthlyCost;
    const percentChange = currentTotalMonthlyCost > 0 ? (difference / currentTotalMonthlyCost) * 100 : 0;

    setResult({
      totalMonthlyCost: newTotalMonthlyCost,
      annualCost: newTotalMonthlyCost * 12,
      breakdown: newBreakdown,
      comparison: {
        currentCity: cityMultipliers[currentCity]?.name || 'Current City',
        newCity: cityMultipliers[newCity]?.name || 'New City',
        difference: Math.round(difference),
        percentChange: Math.round(percentChange * 100) / 100
      }
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏙️ Cost of Living Calculator
          </CardTitle>
          <CardDescription>
            Compare living costs between different cities and plan your budget
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="current-city">Current City</Label>
              <Select value={currentCity} onValueChange={setCurrentCity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(cityMultipliers).map(([key, city]) => (
                    <SelectItem key={key} value={key}>{city.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-city">Target City</Label>
              <Select value={newCity} onValueChange={setNewCity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(cityMultipliers).map(([key, city]) => (
                    <SelectItem key={key} value={key}>{city.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="housing-cost">Housing/Rent ($)</Label>
              <Input
                id="housing-cost"
                type="number"
                value={housingCost}
                onChange={(e) => setHousingCost(e.target.value)}
                placeholder="2500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="food-cost">Food & Groceries ($)</Label>
              <Input
                id="food-cost"
                type="number"
                value={foodCost}
                onChange={(e) => setFoodCost(e.target.value)}
                placeholder="600"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transportation-cost">Transportation ($)</Label>
              <Input
                id="transportation-cost"
                type="number"
                value={transportationCost}
                onChange={(e) => setTransportationCost(e.target.value)}
                placeholder="400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="healthcare-cost">Healthcare ($)</Label>
              <Input
                id="healthcare-cost"
                type="number"
                value={healthcareCost}
                onChange={(e) => setHealthcareCost(e.target.value)}
                placeholder="300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="utilities-cost">Utilities ($)</Label>
              <Input
                id="utilities-cost"
                type="number"
                value={utilitiesCost}
                onChange={(e) => setUtilitiesCost(e.target.value)}
                placeholder="200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="entertainment-cost">Entertainment ($)</Label>
              <Input
                id="entertainment-cost"
                type="number"
                value={entertainmentCost}
                onChange={(e) => setEntertainmentCost(e.target.value)}
                placeholder="300"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="other-cost">Other Expenses ($)</Label>
              <Input
                id="other-cost"
                type="number"
                value={otherCost}
                onChange={(e) => setOtherCost(e.target.value)}
                placeholder="500"
              />
            </div>
          </div>

          <Button onClick={calculateCostOfLiving} className="w-full">
            Calculate Cost of Living
          </Button>
        </CardContent>
      </Card>

      {result && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Monthly Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(result.totalMonthlyCost)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Annual Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(result.annualCost)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cost Change</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-bold ${result.comparison.difference >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {result.comparison.difference >= 0 ? '+' : ''}{formatCurrency(result.comparison.difference)}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {result.comparison.percentChange >= 0 ? '+' : ''}{result.comparison.percentChange}%
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cost Breakdown in {result.comparison.newCity}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Housing/Rent</span>
                  <span className="text-lg font-bold">{formatCurrency(result.breakdown.housing)}</span>
                </div>
                <div className="flex justify-between items-center p-2">
                  <span>Food & Groceries</span>
                  <span className="font-medium">{formatCurrency(result.breakdown.food)}</span>
                </div>
                <div className="flex justify-between items-center p-2">
                  <span>Transportation</span>
                  <span className="font-medium">{formatCurrency(result.breakdown.transportation)}</span>
                </div>
                <div className="flex justify-between items-center p-2">
                  <span>Healthcare</span>
                  <span className="font-medium">{formatCurrency(result.breakdown.healthcare)}</span>
                </div>
                <div className="flex justify-between items-center p-2">
                  <span>Utilities</span>
                  <span className="font-medium">{formatCurrency(result.breakdown.utilities)}</span>
                </div>
                <div className="flex justify-between items-center p-2">
                  <span>Entertainment</span>
                  <span className="font-medium">{formatCurrency(result.breakdown.entertainment)}</span>
                </div>
                <div className="flex justify-between items-center p-2">
                  <span>Other Expenses</span>
                  <span className="font-medium">{formatCurrency(result.breakdown.other)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>City Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-lg mb-2">
                  Moving from <strong>{result.comparison.currentCity}</strong> to <strong>{result.comparison.newCity}</strong>
                </p>
                <p className={`text-xl font-bold ${result.comparison.difference >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {result.comparison.difference >= 0 ? 'Costs ' : 'Saves '}{formatCurrency(Math.abs(result.comparison.difference))} per month
                </p>
                <p className="text-gray-600 mt-1">
                  ({Math.abs(result.comparison.percentChange)}% {result.comparison.difference >= 0 ? 'increase' : 'decrease'})
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-900 mb-2">🏙️ Relocation Tips</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Research salary differences between cities</li>
            <li>• Consider state and local tax implications</li>
            <li>• Factor in one-time moving costs</li>
            <li>• Research neighborhood-specific costs</li>
            <li>• Consider quality of life factors beyond cost</li>
            <li>• Account for seasonal cost variations</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
