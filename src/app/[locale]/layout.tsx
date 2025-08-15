import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SearchProvider } from '@/lib/search-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

// Generate static params for all supported locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  return (
    <SearchProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </SearchProvider>
  );
}
