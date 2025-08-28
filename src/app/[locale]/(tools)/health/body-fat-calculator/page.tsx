import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import BMICalculator from '@/components/converters/health/BMICalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Body Fat Calculator',
  'Calculate body fat percentage using various methods including skinfold, bioelectrical impedance, and body measurements.',
  'body-fat-calculator',
  [
    'body fat calculator',
    'body fat percentage calculator',
    'body composition calculator',
    'fat percentage calculator',
    'lean body mass calculator'
  ],
  'health'
);

export default function BodyFatCalculatorPage() {
  return (
    <ToolLayout
      title="Body Fat Calculator"
      description="Calculate your body fat percentage using multiple methods and track your body composition progress"
      toolId="body-fat-calculator"
      category="health"
      emoji="📏"
      customHowToUse={[
        "选择计算方法（皮褶厚度、生物电阻抗等）",
        "输入身高、体重和年龄",
        "测量并输入相关身体部位尺寸",
        "计算体脂百分比",
        "查看健康范围对比",
        "跟踪身体成分变化"
      ]}
      customFeatures={[
        "多种计算方法支持",
        "性别和年龄调整",
        "健康范围参考",
        "瘦体重计算",
        "进度跟踪工具",
        "个性化建议"
      ]}
    >
      <BMICalculator />
    </ToolLayout>
  );
}
