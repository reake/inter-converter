import type { ToolConfig } from '@/types/tools';

export interface ToolCatalogEntry
  extends Pick<ToolConfig, 'id' | 'name' | 'description' | 'keywords'> {
  titleSuffix?: string;
}

export function getLocalizedToolEntry<T extends { id: string }>(
  locale: string,
  toolId: string,
  enCatalog: T[],
  localizedCatalog?: T[],
): T | undefined {
  const normalizedLocale = (locale || 'en').toLowerCase();
  const activeCatalog = normalizedLocale === 'zh' ? localizedCatalog ?? enCatalog : enCatalog;

  return activeCatalog.find((item) => item.id === toolId) ?? enCatalog.find((item) => item.id === toolId);
}
