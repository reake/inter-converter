import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { CurrencyConverter } from '@/components/converters/CurrencyConverter';

export const metadata: Metadata = {
  title: 'Currency Converter | Live Exchange Rates Free Tool',
  description: 'Convert currencies with live exchange rates. Free online currency converter for 150+ currencies including USD, EUR, GBP, JPY. Real-time rates.',
  keywords: [
    'currency converter',
    'exchange rate converter',
    'live currency converter',
    'real time currency converter',
    'free currency converter',
    'usd to eur converter',
    'gbp to usd converter',
    'jpy to usd converter',
    'forex converter',
    'money converter',
    'currency exchange calculator',
    'foreign exchange converter',
    'currency rate calculator',
    'international currency converter',
    'multi currency converter'
  ],
  openGraph: {
    title: 'Currency Converter | Live Exchange Rates Free Tool',
    description: 'Convert currencies with live exchange rates. Free online currency converter for 150+ currencies including USD, EUR, GBP, JPY.',
    type: 'website',
    url: 'https://interconverter.com/finance/currency-converter',
    siteName: 'InterConverter',
    images: [
      {
        url: '/images/currency-converter-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Currency Converter Tool with Live Exchange Rates'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Currency Converter | Live Exchange Rates Free Tool',
    description: 'Convert currencies with live exchange rates. Free online currency converter for 150+ currencies.',
    images: ['/images/currency-converter-twitter.jpg']
  },
  alternates: {
    canonical: 'https://interconverter.com/finance/currency-converter'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};

export default function CurrencyConverterPage() {
  const structuredData = generateToolStructuredData(
    'Currency Converter',
    'Convert between different currencies with real-time exchange rates and historical data',
    'currency-converter',
    'finance'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* SEO Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4">
              💱 Currency Converter
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Convert between 150+ currencies with real-time exchange rates. 
              Get accurate currency conversion for travel, business, and trading.
            </p>
          </div>

          {/* Tool Component */}
          <CurrencyConverter />

          {/* SEO Content */}
          <ModernSEOContent
            title="Currency Converter"
            description="Our currency converter provides real-time exchange rates for over 150 currencies worldwide. Whether you're traveling, doing business internationally, or trading forex, get accurate and up-to-date currency conversion rates."
            features={[
              "Real-time exchange rates from reliable financial APIs",
              "Support for 150+ world currencies",
              "Historical exchange rate data",
              "Popular currency pairs (USD/EUR, GBP/USD, etc.)",
              "Cryptocurrency support (Bitcoin, Ethereum)",
              "Rate change indicators and trends"
            ]}
            useCases={[
              {
                category: "Travel",
                examples: ["Budget planning for trips", "Shopping abroad", "Hotel and restaurant costs", "Currency exchange planning"]
              },
              {
                category: "Business",
                examples: ["International trade", "Import/export calculations", "Invoice conversions", "Financial reporting"]
              },
              {
                category: "Investment",
                examples: ["Forex trading", "International stocks", "Currency hedging", "Portfolio diversification"]
              },
              {
                category: "Personal Finance",
                examples: ["Online shopping", "Remittances", "Salary comparisons", "Cost of living analysis"]
              }
            ]}
            howToUse={[
              "Enter the amount you want to convert",
              "Select the source currency (what you have)",
              "Select the target currency (what you want)",
              "View the converted amount instantly",
              "Check the current exchange rate and trends"
            ]}
            tips={[
              "Check rates regularly as they fluctuate throughout the day",
              "Consider exchange fees when planning transactions",
              "Use historical data to identify trends",
              "Set up rate alerts for important currency pairs",
              "Compare rates from multiple sources for large transactions"
            ]}
            technicalDetails={[
              {
                term: "Exchange Rate",
                definition: "The value of one currency expressed in terms of another currency"
              },
              {
                term: "Base Currency",
                definition: "The first currency in a currency pair, used as the reference point"
              },
              {
                term: "Quote Currency",
                definition: "The second currency in a pair, showing how much is needed to buy one unit of the base currency"
              },
              {
                term: "Spread",
                definition: "The difference between the buying and selling price of a currency"
              }
            ]}
            faqs={[
              {
                question: "How often are exchange rates updated?",
                answer: "Our exchange rates are updated in real-time during market hours, typically every few minutes. Rates may be less frequent during weekends and holidays when markets are closed."
              },
              {
                question: "Are the rates shown the same as bank rates?",
                answer: "The rates shown are mid-market rates for reference. Banks and exchange services typically add a margin, so actual rates may differ. Always check with your financial institution for exact rates."
              },
              {
                question: "Can I convert cryptocurrencies?",
                answer: "Yes, our converter supports major cryptocurrencies like Bitcoin, Ethereum, and others. Crypto rates are highly volatile and update frequently."
              },
              {
                question: "Why do exchange rates change?",
                answer: "Exchange rates fluctuate due to various factors including economic indicators, political events, market sentiment, interest rates, and supply and demand in the forex market."
              }
            ]}
            currentToolId="currency-converter"
            category="finance"
          />
        </div>
      </div>
    </>
  );
}