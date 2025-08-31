import { routing } from '@/i18n/routing';

interface HreflangLinksProps {
  currentLocale: string;
  pathname: string;
}

export function HreflangLinks({ currentLocale, pathname }: HreflangLinksProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://interconverter.com';
  
  return (
    <>
      {routing.locales.map((locale) => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={locale}
          href={`${baseUrl}${locale === 'en' ? '' : `/${locale}`}${pathname}`}
        />
      ))}
      {/* x-default for English */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${baseUrl}${pathname}`}
      />
    </>
  );
}
