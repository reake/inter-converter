import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SearchProvider } from '@/lib/search-context';
import { Header } from '@/components/header';

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
      <div className="min-h-screen bg-background">
        <Header />
        <main>{children}</main>
      </div>
    </SearchProvider>
  );
}
