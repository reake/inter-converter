import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { SearchProvider } from '@/lib/search-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

interface LocaleMessages {
  [key: string]: unknown;
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

async function getLocaleMessages(locale: string): Promise<LocaleMessages> {
  return (await import(`@/messages/${locale}.json`)).default as LocaleMessages;
}

// Generate static params for all supported locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getLocaleMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SearchProvider>
        <div className="min-h-screen bg-background flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
        </div>
      </SearchProvider>
    </NextIntlClientProvider>
  );
}
