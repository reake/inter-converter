import en from '@/messages/en.json';
import zh from '@/messages/zh.json';

export type SupportedLocale = 'en' | 'zh';

const MAP: Record<SupportedLocale, Record<string, unknown>> = {
  en: en as Record<string, unknown>,
  zh: zh as Record<string, unknown>,
};

export function getMessages(locale: string) {
  const l = (locale || 'en').toLowerCase();
  if (l in MAP) return MAP[l as SupportedLocale];
  return en;
}
