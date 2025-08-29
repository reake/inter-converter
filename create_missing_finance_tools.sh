#!/bin/bash

# 批量创建缺失的财务工具页面脚本
echo "开始创建缺失的财务工具页面..."

# 定义需要创建的工具列表 (优先创建高搜索量的)
declare -A tools=(
    ["net-worth-calculator"]="Net Worth Calculator|Calculate your total net worth including assets and liabilities"
    ["present-value-calculator"]="Present Value Calculator|Calculate present value of future cash flows and investments"
    ["future-value-calculator"]="Future Value Calculator|Calculate future value of investments with compound interest"
    ["options-calculator"]="Options Calculator|Calculate options pricing, Greeks, and profit/loss scenarios"
    ["sba-loan-calculator"]="SBA Loan Calculator|Calculate SBA loan payments and qualification requirements"
    ["effective-interest-rate-calculator"]="Effective Interest Rate Calculator|Calculate effective annual interest rate with compounding"
    ["balloon-payment-calculator"]="Balloon Payment Calculator|Calculate balloon loan payments and final balloon amount"
    ["disability-insurance-calculator"]="Disability Insurance Calculator|Calculate disability insurance needs and benefit amounts"
    ["umbrella-insurance-calculator"]="Umbrella Insurance Calculator|Calculate umbrella insurance needs and coverage amounts"
)

# 创建页面和组件的函数
create_tool() {
    local tool_id=$1
    local tool_name=$2
    local tool_desc=$3
    
    echo "创建 $tool_name..."
    
    # 创建页面目录
    mkdir -p "src/app/[locale]/(tools)/finance/$tool_id"
    
    # 生成组件名 (首字母大写，去掉连字符)
    local component_name=$(echo "$tool_id" | sed 's/-/ /g' | sed 's/\b\w/\U&/g' | sed 's/ //g')
    
    # 创建页面文件
    cat > "src/app/[locale]/(tools)/finance/$tool_id/page.tsx" << EOF
import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { $component_name } from '@/components/converters/finance/$component_name';

export const metadata: Metadata = {
  title: '$tool_name | InterConverter',
  description: '$tool_desc',
  keywords: ['$(echo $tool_id | sed 's/-/ /g')', 'calculator', 'finance'],
  openGraph: {
    title: '$tool_name',
    description: '$tool_desc',
    type: 'website',
  },
};

const toolConfig = {
  title: '$tool_name',
  description: '$tool_desc',
  features: [
    'Accurate calculations',
    'Real-time results',
    'Professional analysis',
    'Easy to use interface'
  ],
  usageGuide: [
    'Enter required values',
    'Review calculations',
    'Analyze results',
    'Make informed decisions'
  ],
  faqs: [
    {
      question: 'How does this calculator work?',
      answer: 'This calculator uses standard financial formulas to provide accurate results based on your inputs.'
    }
  ]
};

export default function ${component_name}Page() {
  return (
    <EnhancedToolLayout
      title={toolConfig.title}
      description={toolConfig.description}
      customFeatures={toolConfig.features}
      customHowToUse={toolConfig.usageGuide}
      faqs={toolConfig.faqs}
      toolId="$tool_id"
      category="finance"
    >
      <$component_name />
    </EnhancedToolLayout>
  );
}
EOF

    # 创建基础组件文件
    cat > "src/components/converters/finance/$component_name.tsx" << EOF
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, DollarSign } from 'lucide-react';

export function $component_name() {
  const [amount, setAmount] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const value = parseFloat(amount) || 0;
    // TODO: 实现具体的计算逻辑
    setResult(value);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Calculator className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">$tool_name</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          $tool_desc
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Calculator Input</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="amount">Amount (\$)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1"
              />
            </div>

            <Button onClick={calculate} className="w-full">
              Calculate
            </Button>
          </CardContent>
        </Card>

        {result !== null && (
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-600 font-medium">Result</div>
                <div className="text-lg font-bold text-blue-900">
                  {formatCurrency(result)}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
EOF

    echo "✅ 已创建 $tool_name"
}

# 批量创建工具
for tool_id in "${!tools[@]}"; do
    IFS='|' read -r tool_name tool_desc <<< "${tools[$tool_id]}"
    create_tool "$tool_id" "$tool_name" "$tool_desc"
done

echo "🎉 完成创建 ${#tools[@]} 个财务工具页面"
echo "注意: 组件包含基础结构，需要根据具体需求实现计算逻辑"
