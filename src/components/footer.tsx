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
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img 
                src="/logo.png" 
                alt="InterConverter" 
                width={28} 
                height={28}
                className="h-7 w-auto"
              />
              <h3 className="font-bold text-lg">InterConverter</h3>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Free online conversion tools and calculators for everyone.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold mb-4">Featured Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/time/timestamp-converter" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Timestamp Converter</Link></li>
              <li><Link href="/time/timezone-converter" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Time Zone Converter</Link></li>
              <li><Link href="/color/hex-to-rgb-converter" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">HEX to RGB Converter</Link></li>
              <li><Link href="/unit/temperature-converter" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Temperature Converter</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Featured Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/unit" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Units</Link></li>
              <li><Link href="/time" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Time</Link></li>
              <li><Link href="/color" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Color</Link></li>
              <li><Link href="/auto" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Automotive</Link></li>
            </ul>
          </div>

          {/* Public notes */}
          <div>
            <h4 className="font-semibold mb-4">Public Scope</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The public site currently highlights a smaller curated tool set while additional pages
              continue to be reviewed and expanded.
            </p>
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
              Focused on clearer public tool pages
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
