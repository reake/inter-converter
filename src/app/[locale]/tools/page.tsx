import { Metadata } from 'next';
import { generateToolsMetadata } from '@/components/seo/SEOContent';
import { TOOLS_CONFIG } from '@/config/tools';
import { ToolsPageClient } from '@/components/tools/ToolsPageClient';
import { SEOContent } from '@/components/seo/SEOContent';
import { StructuredData } from '@/components/seo/StructuredData';

interface ToolsPageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    categories?: string;
    difficulties?: string;
    searchVolume?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}

// Generate metadata for SEO

// Cloudflare Pages Edge Runtime 配置
export const runtime = 'edge';
export async function generateMetadata({ params, searchParams }: ToolsPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const allTools = TOOLS_CONFIG.filter(tool => tool.isActive);
  const category = resolvedSearchParams.categories?.split(',')[0]; // Get first category if multiple

  return generateToolsMetadata(allTools, category, resolvedParams.locale);
}

export default async function ToolsPage({ params, searchParams }: ToolsPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const allTools = TOOLS_CONFIG.filter(tool => tool.isActive);
  const category = resolvedSearchParams.categories?.split(',')[0]; // Get first category if multiple

  return (
    <>
      {/* Main Tools Page Content */}
      <ToolsPageClient locale={resolvedParams.locale} />

      {/* SEO Content Section */}
      <SEOContent
        tools={allTools}
        category={category}
        locale={resolvedParams.locale}
      />

      {/* Structured Data */}
      <StructuredData
        tools={allTools}
        category={category}
        locale={resolvedParams.locale}
      />
    </>
  );
}
