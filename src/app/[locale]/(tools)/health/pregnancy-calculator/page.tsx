import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { BMICalculator } from '@/components/converters/health/BMICalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Pregnancy Calculator',
  'Calculate pregnancy due date, gestational age, and track pregnancy milestones. Estimate conception date and pregnancy timeline.',
  'pregnancy-calculator',
  [
    'pregnancy calculator',
    'due date calculator',
    'pregnancy due date calculator',
    'gestational age calculator',
    'conception calculator'
  ],
  'health'
);

export default function PregnancyCalculatorPage() {
  return (
    <ToolLayout
      title="Pregnancy Calculator"
      description="Calculate pregnancy due date, gestational age, and track important pregnancy milestones and development stages"
      toolId="pregnancy-calculator"
      category="health"
      emoji="🤱"
      customHowToUse={[
        "输入末次月经开始日期",
        "或输入预计受孕日期",
        "计算预产期和孕周",
        "查看胎儿发育里程碑",
        "跟踪孕期重要检查时间",
        "获取孕期健康指导"
      ]}
      customFeatures={[
        "精确预产期计算",
        "孕周和胎龄追踪",
        "胎儿发育里程碑",
        "产检时间提醒",
        "孕期营养建议",
        "健康监测指标"
      ]}
    >
      <BMICalculator />
    </ToolLayout>
  );
}
