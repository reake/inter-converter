import en from '@/messages/en.json';
import zh from '@/messages/zh.json';

export type SupportedLocale = 'en' | 'zh';

const MAP: Record<SupportedLocale, any> = {
  en,
  zh,
};

export function getMessages(locale: string) {
  const l = (locale || 'en').toLowerCase();
  if (l in MAP) return MAP[l as SupportedLocale];
  return en;
}
