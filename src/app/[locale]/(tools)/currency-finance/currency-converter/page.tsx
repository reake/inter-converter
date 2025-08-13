import { Metadata } from 'next';
import { generateToolMetadata, generateToolStructuredData } from '@/components/tools/ToolLayout';
import { CurrencyConverter } from '@/components/converters/CurrencyConverter';

export const metadata: Metadata = generateToolMetadata(
  'Currency Converter',
  'Convert between different currencies with real-time exchange rates. Free online currency converter with 150+ currencies.',
  'currency-converter',
  ['currency', 'exchange', 'rate', 'money', 'converter', 'forex', 'usd', 'eur', 'gbp', 'jpy'],
  'currency-finance'
);

export default function CurrencyConverterPage() {
  const structuredData = generateToolStructuredData(
    'Currency Converter',
    'Convert between different currencies with real-time exchange rates and historical data',
    'currency-converter',
    'currency-finance'
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
          <div className="mt-12 prose prose-gray max-w-none">
            <h2>About Currency Converter</h2>
            <p>
              Our currency converter provides real-time exchange rates for over 150 currencies worldwide. 
              Whether you're traveling, doing business internationally, or trading forex, get accurate 
              and up-to-date currency conversion rates.
            </p>
            
            <h3>Features</h3>
            <ul>
              <li>Real-time exchange rates from reliable financial APIs</li>
              <li>Support for 150+ world currencies</li>
              <li>Historical exchange rate data</li>
              <li>Popular currency pairs (USD/EUR, GBP/USD, etc.)</li>
              <li>Cryptocurrency support (Bitcoin, Ethereum)</li>
              <li>Rate change indicators and trends</li>
            </ul>

            <h3>Popular Currency Pairs</h3>
            <ul>
              <li>USD to EUR (US Dollar to Euro)</li>
              <li>GBP to USD (British Pound to US Dollar)</li>
              <li>USD to JPY (US Dollar to Japanese Yen)</li>
              <li>EUR to GBP (Euro to British Pound)</li>
              <li>USD to CAD (US Dollar to Canadian Dollar)</li>
              <li>AUD to USD (Australian Dollar to US Dollar)</li>
            </ul>

            <h3>How to Use</h3>
            <ol>
              <li>Enter the amount you want to convert</li>
              <li>Select the source currency (what you have)</li>
              <li>Select the target currency (what you want)</li>
              <li>View the converted amount instantly</li>
              <li>Check the current exchange rate and trends</li>
            </ol>

            <h3>Exchange Rate Sources</h3>
            <p>
              Our exchange rates are sourced from major financial institutions and updated regularly 
              to ensure accuracy. Rates are provided for informational purposes and may vary from 
              actual trading rates.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}