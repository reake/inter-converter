'use client';

import Script from 'next/script';

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export function GoogleAdsense() {
  if (!ADSENSE_CLIENT || process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <Script
      id="google-adsense"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
        ADSENSE_CLIENT
      )}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
