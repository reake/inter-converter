import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import BMICalculator from '@/components/converters/health/BMICalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Protein Calculator',
  'Calculate daily protein needs based on weight, activity level, and fitness goals. Optimize protein intake for muscle building and health.',
  'protein-calculator',
  [
    'protein calculator',
    'daily protein calculator',
    'protein intake calculator',
    'protein needs calculator',
    'muscle building protein calculator'
  ],
  'health'
);

export default function ProteinCalculatorPage() {
  return (
    <ToolLayout
      title="Protein Calculator"
      description="Calculate your daily protein requirements based on body weight, activity level, and fitness goals"
      toolId="protein-calculator"
      category="health"
      emoji="🥩"
      customHowToUse={[
        "输入体重和年龄",
        "选择活动强度和健身目标",
        "考虑特殊需求（怀孕、哺乳等）",
        "计算每日蛋白质需求量",
        "查看蛋白质食物来源建议",
        "制定蛋白质摄入计划"
      ]}
      customFeatures={[
        "个性化蛋白质需求计算",
        "健身目标调整",
        "特殊人群需求",
        "食物来源推荐",
        "营养时间安排",
        "进度跟踪工具"
      ]}
    >
      <BMICalculator />
    </ToolLayout>
  );
}
