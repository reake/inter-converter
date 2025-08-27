import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { BMICalculator } from '@/components/converters/health/BMICalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Ovulation Calculator',
  'Calculate ovulation dates and fertile window for family planning. Track menstrual cycle and predict best conception times.',
  'ovulation-calculator',
  [
    'ovulation calculator',
    'fertile window calculator',
    'ovulation predictor',
    'fertility calculator',
    'menstrual cycle calculator'
  ],
  'health'
);

export default function OvulationCalculatorPage() {
  return (
    <ToolLayout
      title="Ovulation Calculator"
      description="Calculate ovulation dates and fertile window to optimize conception chances and track menstrual cycle patterns"
      toolId="ovulation-calculator"
      category="health"
      emoji="🌸"
      customHowToUse={[
        "输入末次月经开始日期",
        "设置平均月经周期长度",
        "计算排卵日和受孕窗口期",
        "查看最佳受孕时间",
        "跟踪月经周期规律",
        "获取备孕指导建议"
      ]}
      customFeatures={[
        "精确排卵日预测",
        "受孕窗口期计算",
        "月经周期跟踪",
        "生育力评估",
        "备孕时间规划",
        "个性化建议"
      ]}
    >
      <BMICalculator />
    </ToolLayout>
  );
}
