import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from '@/components/theme-provider';
import { WebVitals, PerformanceMonitor, ResourceMonitor } from '@/components/performance/WebVitals';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import "./globals.css";
import type { Metadata } from "next";

// Ensure static rendering for static export builds
export const dynamic = 'force-static';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://interconverter.com'),
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  // For root layout, we might not have locale in params
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || "en";

  // Load messages differently in static export to avoid using headers()
  let messages: any;
  if (process.env.BUILD_TARGET === 'static') {
    messages = (await import(`../messages/${locale}.json`)).default;
  } else {
    // Providing all messages to the client side is the easiest way to get started
    messages = await getMessages();
  }

  const defaultThemeEnv = process.env.NEXT_PUBLIC_DEFAULT_THEME || 'light';
  const enableSystemTheme = defaultThemeEnv === 'system';

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="InterConverter" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>
        <GoogleAnalytics />
        <ThemeProvider
          attribute="class"
          defaultTheme={defaultThemeEnv as any}
          enableSystem={enableSystemTheme}
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
            <WebVitals />
            <PerformanceMonitor />
            <ResourceMonitor />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
