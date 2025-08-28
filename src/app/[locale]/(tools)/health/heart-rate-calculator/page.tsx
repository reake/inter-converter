import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import BMICalculator from '@/components/converters/health/BMICalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Heart Rate Calculator',
  'Calculate target heart rate zones for exercise and fitness training. Determine maximum heart rate and optimal training zones.',
  'heart-rate-calculator',
  [
    'heart rate calculator',
    'target heart rate calculator',
    'maximum heart rate calculator',
    'heart rate zone calculator',
    'cardio heart rate calculator'
  ],
  'health'
);

export default function HeartRateCalculatorPage() {
  return (
    <ToolLayout
      title="Heart Rate Calculator"
      description="Calculate target heart rate zones for optimal cardiovascular training and fitness performance"
      toolId="heart-rate-calculator"
      category="health"
      emoji="❤️"
      customHowToUse={[
        "输入年龄和静息心率",
        "选择健身水平和目标",
        "计算最大心率和储备心率",
        "查看不同训练强度区间",
        "制定心率训练计划",
        "监测运动强度效果"
      ]}
      customFeatures={[
        "多种心率公式计算",
        "训练强度区间划分",
        "个性化目标设定",
        "运动类型推荐",
        "进度跟踪工具",
        "安全训练指导"
      ]}
    >
      <BMICalculator />
    </ToolLayout>
  );
}
