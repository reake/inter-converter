import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-4">InterConverter</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Free online conversion tools and calculators for everyone.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold mb-4">Popular Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/finance/currency-converter" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Currency Converter</Link></li>
              <li><Link href="/time/timestamp-converter" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Timestamp Converter</Link></li>
              <li><Link href="/color/hex-to-rgb-converter" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Color Converter</Link></li>
              <li><Link href="/unit/unit-converter" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Unit Converter</Link></li>
            </ul>
          </div>

          {/* Calculators */}
          <div>
            <h4 className="font-semibold mb-4">Calculators</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/finance/loan-calculator" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Loan Calculator</Link></li>
              <li><Link href="/health/bmi-calculator" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">BMI Calculator</Link></li>
              <li><Link href="/finance/tax-calculator" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Tax Calculator</Link></li>
              <li><Link href="/time/date-difference-calculator" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Date Calculator</Link></li>
            </ul>
          </div>

          {/* Automotive */}
          <div>
            <h4 className="font-semibold mb-4">Automotive</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/auto/engine-displacement-calculator" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Engine Displacement</Link></li>
              <li><Link href="/auto/torque-horsepower-calculator" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Torque & Horsepower</Link></li>
              <li><Link href="/auto/ram-air-calculator" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Ram Air Calculator</Link></li>
              <li><Link href="/auto/gear-ratio-calculator" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Gear Ratio</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">About</Link></li>
              <li><Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Privacy</Link></li>
              <li><Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Terms</Link></li>
              <li><Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {currentYear} InterConverter. All rights reserved.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Made with ❤️ for developers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
