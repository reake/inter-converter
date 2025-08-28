import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import BMICalculator from '@/components/converters/health/BMICalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Ideal Weight Calculator',
  'Calculate ideal body weight using multiple formulas including Hamwi, Devine, Robinson, and Miller methods based on height and frame size.',
  'ideal-weight-calculator',
  [
    'ideal weight calculator',
    'ideal body weight calculator',
    'target weight calculator',
    'healthy weight calculator',
    'optimal weight calculator'
  ],
  'health'
);

export default function IdealWeightCalculatorPage() {
  return (
    <ToolLayout
      title="Ideal Weight Calculator"
      description="Calculate your ideal body weight using proven medical formulas and determine healthy weight ranges"
      toolId="ideal-weight-calculator"
      category="health"
      emoji="⚖️"
      customHowToUse={[
        "输入身高和性别",
        "选择体型框架（小、中、大）",
        "查看多种公式计算结果",
        "比较不同方法的理想体重",
        "设定健康的减重或增重目标",
        "制定个性化体重管理计划"
      ]}
      customFeatures={[
        "多种医学公式计算",
        "体型框架调整",
        "健康体重范围",
        "目标设定工具",
        "进度跟踪功能",
        "个性化建议"
      ]}
    >
      <BMICalculator />
    </ToolLayout>
  );
}
