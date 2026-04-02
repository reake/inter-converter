import { Metadata } from 'next';
import { ToolCategory } from '@/types/tools';
import { isReviewApprovedTool } from '@/config/tools';

interface ToolPageMetadataOptions {
  locale: string;
  category: ToolCategory;
  toolId: string;
  title: string;
  description: string;
  keywords: string[];
  path: string;
}

const CATEGORY_FALLBACK_DESCRIPTIONS: Record<ToolCategory, string> = {
  auto: 'Automotive reference tool with formula-based calculations and result review guidance.',
  color: 'Color utility with format-aware output and practical result review guidance.',
  finance: 'Financial planning and reference tool with formula-based estimates and result review guidance.',
  health: 'Health reference tool with estimate-based outputs and clear verification boundaries.',
  media: 'File conversion reference tool with workflow notes and processing boundary guidance.',
  science: 'Scientific reference tool with formula-based outputs and result review guidance.',
  time: 'Time and date reference tool with practical workflow guidance and readable outputs.',
  unit: 'Unit conversion reference tool with formula-based results and clear output guidance.',
};

export function resolveToolPageDescription(
  description: string | undefined,
  category: ToolCategory,
): string {
  const trimmed = description?.trim();

  if (trimmed) {
    return trimmed;
  }

  return CATEGORY_FALLBACK_DESCRIPTIONS[category];
}

export function buildToolPageMetadata({
  locale,
  category,
  toolId,
  title,
  description,
  keywords,
  path,
}: ToolPageMetadataOptions): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://interconverter.com';
  const normalizedLocale = (locale || 'en').toLowerCase();
  const canonicalPath = normalizedLocale === 'en' ? path : `/${normalizedLocale}${path}`;
  const isIndexable = isReviewApprovedTool({ path });

  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      type: 'website',
      locale: normalizedLocale === 'zh' ? 'zh_CN' : 'en_US',
      images: [
        {
          url: '/icons/icon-512x512.png',
          width: 512,
          height: 512,
          alt: title,
        },
      ],
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `/${category}/${toolId}`,
        zh: `/zh/${category}/${toolId}`,
      },
    },
    authors: [{ name: 'InterConverter Team' }],
    creator: 'InterConverter',
    publisher: 'InterConverter',
    robots: {
      index: isIndexable,
      follow: true,
      googleBot: {
        index: isIndexable,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    metadataBase: new URL(baseUrl),
  };
}
