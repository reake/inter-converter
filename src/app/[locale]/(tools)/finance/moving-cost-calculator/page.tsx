import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import CostOfLivingCalculator from '@/components/converters/finance/CostOfLivingCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Moving Cost Calculator',
  'Calculate moving costs and expenses for local and long-distance relocations. Estimate packing, transportation, and additional moving expenses.',
  'moving-cost-calculator',
  [
    'moving cost calculator',
    'relocation cost calculator',
    'moving expense calculator',
    'moving budget calculator',
    'relocation budget planner'
  ],
  'moving'
);

export default function MovingCostCalculatorPage() {
  return (
    <ToolLayout
      title="Moving Cost Calculator"
      description="Calculate comprehensive moving costs including packing, transportation, and additional expenses for your relocation"
      toolId="moving-cost-calculator"
      category="moving"
      emoji="📦"
      customHowToUse={[
        "Enter origin and destination locations",
        "Select home size and room count",
        "Choose moving service type (full-service, DIY, etc.)",
        "Add packing and storage needs",
        "Include additional services and fees",
        "Calculate total moving budget"
      ]}
      customFeatures={[
        "Local vs long-distance calculations",
        "Full-service vs DIY options",
        "Packing service estimates",
        "Storage cost calculations",
        "Insurance and protection plans",
        "Hidden cost identification"
      ]}
    >
      <CostOfLivingCalculator />
    </ToolLayout>
  );
}
