import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import BMICalculator from '@/components/converters/health/BMICalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Water Intake Calculator',
  'Calculate daily water intake needs based on weight, activity level, and climate. Optimize hydration for health and performance.',
  'water-intake-calculator',
  [
    'water intake calculator',
    'daily water calculator',
    'hydration calculator',
    'water needs calculator',
    'fluid intake calculator'
  ],
  'health'
);

export default function WaterIntakeCalculatorPage() {
  return (
    <ToolLayout
      title="Water Intake Calculator"
      description="Calculate your daily water intake needs based on body weight, activity level, and environmental factors"
      toolId="water-intake-calculator"
      category="health"
      emoji="💧"
      customHowToUse={[
        "输入体重和年龄",
        "选择活动强度等级",
        "考虑气候和环境因素",
        "计算每日推荐水分摄入量",
        "设置饮水提醒计划",
        "跟踪每日水分摄入进度"
      ]}
      customFeatures={[
        "个性化水分需求计算",
        "活动量调整",
        "气候因素考虑",
        "饮水时间规划",
        "进度跟踪工具",
        "健康提醒功能"
      ]}
    >
      <BMICalculator />
    </ToolLayout>
  );
}
