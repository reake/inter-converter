'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, DollarSign, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

interface BudgetItem {
  id: string;
  name: string;
  amount: number;
  category: 'income' | 'fixed' | 'variable' | 'savings';
}

interface BudgetSummary {
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  remainingBudget: number;
  savingsRate: number;
}

export default function BudgetCalculator() {
  const [items, setItems] = useState<BudgetItem[]>([
    { id: '1', name: 'Salary', amount: 5000, category: 'income' },
    { id: '2', name: 'Rent', amount: 1200, category: 'fixed' },
    { id: '3', name: 'Groceries', amount: 400, category: 'variable' },
    { id: '4', name: 'Emergency Fund', amount: 500, category: 'savings' }
  ]);
  const [summary, setSummary] = useState<BudgetSummary>({
    totalIncome: 0,
    totalExpenses: 0,
    totalSavings: 0,
    remainingBudget: 0,
    savingsRate: 0
  });

  useEffect(() => {
    calculateSummary();
  }, [items]);

  const calculateSummary = () => {
    const totalIncome = items.filter(item => item.category === 'income').reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = items.filter(item => ['fixed', 'variable'].includes(item.category)).reduce((sum, item) => sum + item.amount, 0);
    const totalSavings = items.filter(item => item.category === 'savings').reduce((sum, item) => sum + item.amount, 0);
    const remainingBudget = totalIncome - totalExpenses - totalSavings;
    const savingsRate = totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0;

    setSummary({
      totalIncome,
      totalExpenses,
      totalSavings,
      remainingBudget,
      savingsRate
    });
  };

  const addItem = (category: BudgetItem['category']) => {
    const newItem: BudgetItem = {
      id: Date.now().toString(),
      name: '',
      amount: 0,
      category
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, field: keyof BudgetItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getCategoryItems = (category: BudgetItem['category']) => {
    return items.filter(item => item.category === category);
  };

  const getCategoryTotal = (category: BudgetItem['category']) => {
    return getCategoryItems(category).reduce((sum, item) => sum + item.amount, 0);
  };

  const getBudgetStatus = () => {
    if (summary.remainingBudget > 0) {
      return { status: 'surplus', color: 'text-green-600', icon: TrendingUp };
    } else if (summary.remainingBudget < 0) {
      return { status: 'deficit', color: 'text-red-600', icon: TrendingDown };
    } else {
      return { status: 'balanced', color: 'text-blue-600', icon: DollarSign };
    }
  };

  const budgetStatus = getBudgetStatus();
  const StatusIcon = budgetStatus.icon;

  const renderCategorySection = (
    title: string,
    category: BudgetItem['category'],
    color: string,
    icon: React.ReactNode
  ) => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            {title}
          </div>
          <div className="flex items-center gap-2">
            <span className={`font-mono text-lg ${color}`}>
              ${getCategoryTotal(category).toLocaleString()}
            </span>
            <Button
              onClick={() => addItem(category)}
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {getCategoryItems(category).map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <Input
              placeholder="Item name"
              value={item.name}
              onChange={(e) => updateItem(item.id, 'name', e.target.value)}
              className="flex-1"
            />
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="number"
                placeholder="0"
                value={item.amount || ''}
                onChange={(e) => updateItem(item.id, 'amount', parseFloat(e.target.value) || 0)}
                className="pl-8 w-32"
              />
            </div>
            <Button
              onClick={() => removeItem(item.id)}
              size="sm"
              variant="outline"
              className="h-10 w-10 p-0 text-red-500 hover:text-red-700"
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {getCategoryItems(category).length === 0 && (
          <p className="text-gray-500 text-sm text-center py-4">
            No {title.toLowerCase()} items yet. Click + to add one.
          </p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Budget Calculator</h1>
        <p className="text-gray-600">Create and manage your personal budget with income and expense tracking</p>
      </div>

      {/* Budget Summary */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <StatusIcon className={`h-5 w-5 ${budgetStatus.color}`} />
            Budget Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                ${summary.totalIncome.toLocaleString()}
              </div>
              <div className="text-sm text-green-700">Total Income</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                ${summary.totalExpenses.toLocaleString()}
              </div>
              <div className="text-sm text-red-700">Total Expenses</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                ${summary.totalSavings.toLocaleString()}
              </div>
              <div className="text-sm text-blue-700">Total Savings</div>
            </div>
            <div className={`text-center p-4 rounded-lg ${
              summary.remainingBudget >= 0 ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <div className={`text-2xl font-bold ${budgetStatus.color}`}>
                ${Math.abs(summary.remainingBudget).toLocaleString()}
              </div>
              <div className={`text-sm ${budgetStatus.color}`}>
                {summary.remainingBudget >= 0 ? 'Remaining' : 'Over Budget'}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-4">
            <Badge variant={summary.savingsRate >= 20 ? 'default' : summary.savingsRate >= 10 ? 'secondary' : 'destructive'}>
              Savings Rate: {summary.savingsRate.toFixed(1)}%
            </Badge>
            {summary.savingsRate < 10 && (
              <div className="flex items-center gap-1 text-amber-600">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm">Consider increasing savings</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Budget Categories */}
      <div className="grid lg:grid-cols-2 gap-6">
        {renderCategorySection(
          'Income Sources',
          'income',
          'text-green-600',
          <TrendingUp className="h-5 w-5 text-green-600" />
        )}
        
        {renderCategorySection(
          'Fixed Expenses',
          'fixed',
          'text-red-600',
          <DollarSign className="h-5 w-5 text-red-600" />
        )}
        
        {renderCategorySection(
          'Variable Expenses',
          'variable',
          'text-orange-600',
          <TrendingDown className="h-5 w-5 text-orange-600" />
        )}
        
        {renderCategorySection(
          'Savings & Goals',
          'savings',
          'text-blue-600',
          <TrendingUp className="h-5 w-5 text-blue-600" />
        )}
      </div>

      {/* Budget Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-green-600 mb-2">50/30/20 Rule</h4>
              <div className="space-y-1 text-muted-foreground">
                <div>• 50% for needs (rent, utilities)</div>
                <div>• 30% for wants (entertainment)</div>
                <div>• 20% for savings & debt</div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-blue-600 mb-2">Emergency Fund</h4>
              <div className="space-y-1 text-muted-foreground">
                <div>• Save 3-6 months of expenses</div>
                <div>• Keep in high-yield savings</div>
                <div>• Build gradually over time</div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-purple-600 mb-2">Track & Adjust</h4>
              <div className="space-y-1 text-muted-foreground">
                <div>• Review monthly spending</div>
                <div>• Adjust categories as needed</div>
                <div>• Set realistic goals</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
