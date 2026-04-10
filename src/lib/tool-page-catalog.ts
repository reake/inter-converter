import type { ToolConfig } from '@/types/tools';
import { sanitizeToolCatalogEntry } from '@/config/tools';

export interface ToolCatalogEntry
  extends Pick<ToolConfig, 'id' | 'name' | 'description' | 'keywords'> {
  titleSuffix?: string;
}

export function getLocalizedToolEntry<T extends { id: string; description?: string; category?: string; path?: string }>(
  locale: string,
  toolId: string,
  enCatalog: T[],
  localizedCatalog?: T[],
): T | undefined {
  const normalizedLocale = (locale || 'en').toLowerCase();
  const activeCatalog = normalizedLocale === 'zh' ? localizedCatalog ?? enCatalog : enCatalog;

  const entry = activeCatalog.find((item) => item.id === toolId) ?? enCatalog.find((item) => item.id === toolId);

  return entry ? sanitizeToolCatalogEntry(entry) : undefined;
}
