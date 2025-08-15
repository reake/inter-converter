import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from '@/components/theme-provider';
import { WebVitals, PerformanceMonitor, ResourceMonitor } from '@/components/performance/WebVitals';
import "./globals.css";



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

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
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
