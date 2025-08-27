import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { BMICalculator } from '@/components/converters/health/BMICalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Macro Calculator',
  'Calculate macronutrient ratios (carbs, protein, fat) based on fitness goals, activity level, and dietary preferences.',
  'macro-calculator',
  [
    'macro calculator',
    'macronutrient calculator',
    'carbs protein fat calculator',
    'nutrition macro calculator',
    'diet macro calculator'
  ],
  'health'
);

export default function MacroCalculatorPage() {
  return (
    <ToolLayout
      title="Macro Calculator"
      description="Calculate optimal macronutrient ratios for carbohydrates, protein, and fat based on your fitness goals and lifestyle"
      toolId="macro-calculator"
      category="health"
      emoji="🍽️"
      customHowToUse={[
        "输入基本信息（体重、身高、年龄）",
        "选择健身目标（减脂、增肌、维持）",
        "设置活动强度等级",
        "选择饮食偏好和限制",
        "计算每日宏量营养素需求",
        "制定个性化饮食计划"
      ]}
      customFeatures={[
        "个性化宏量营养素比例",
        "多种健身目标支持",
        "饮食偏好调整",
        "每日卡路里分配",
        "营养时间安排",
        "进度跟踪工具"
      ]}
    >
      <BMICalculator />
    </ToolLayout>
  );
}
