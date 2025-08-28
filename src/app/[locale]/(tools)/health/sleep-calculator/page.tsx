import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import BMICalculator from '@/components/converters/health/BMICalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Sleep Calculator',
  'Calculate optimal sleep and wake times based on sleep cycles. Plan bedtime and wake-up schedules for better sleep quality.',
  'sleep-calculator',
  [
    'sleep calculator',
    'sleep cycle calculator',
    'bedtime calculator',
    'wake up time calculator',
    'sleep schedule calculator'
  ],
  'health'
);

export default function SleepCalculatorPage() {
  return (
    <ToolLayout
      title="Sleep Calculator"
      description="Calculate optimal sleep and wake times based on natural sleep cycles for better rest and recovery"
      toolId="sleep-calculator"
      category="health"
      emoji="😴"
      customHowToUse={[
        "选择入睡时间或起床时间",
        "考虑睡眠周期（90分钟循环）",
        "计算最佳睡眠和起床时间",
        "查看推荐的睡眠时长",
        "制定规律的睡眠计划",
        "跟踪睡眠质量改善"
      ]}
      customFeatures={[
        "睡眠周期优化",
        "年龄段睡眠需求",
        "最佳入睡时间计算",
        "睡眠质量评估",
        "作息规律建议",
        "睡眠健康指导"
      ]}
    >
      <BMICalculator />
    </ToolLayout>
  );
}
