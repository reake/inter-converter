import { Metadata } from 'next';
import { TOOLS_CONFIG, TOOL_CATEGORIES } from '@/config/tools';
import { ToolsPageClient } from '@/components/tools/ToolsPageClient';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'All Free Online Converters & Calculators | InterConverter',
  description: 'Browse all free online converters and calculators at InterConverter. Find tools for currency, units, colors, health, time, finance, and more – fast and easy.',
};

export default function ToolsPage() {
  return <ToolsPageClient locale="en" />;
}
