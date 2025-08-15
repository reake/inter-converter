import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported (temporarily only English)
  locales: ['en'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Locale prefix configuration - only show prefix for non-default locales
  localePrefix: 'as-needed',

  // Disable automatic locale detection to prevent browser language override
  localeDetection: false,

  // The `pathnames` object holds pairs of internal and
  // external paths. Based on the locale, the external
  // paths are rewritten to the shared, internal ones.
  pathnames: {
    // If all locales use the same pathname, a single
    // string or only the key can be provided.
    '/': '/',
    '/tools': '/tools',
    '/auto': '/auto',
    '/about': '/about',
    '/timestamp-converter': '/timestamp-converter',
    '/currency-converter': '/currency-converter',
    '/loan-calculator': '/loan-calculator',
    '/pdf-to-word-converter': '/pdf-to-word-converter',
    '/jpg-to-png-converter': '/jpg-to-png-converter',
    '/hex-to-rgb-converter': '/hex-to-rgb-converter',
    '/bmi-calculator': '/bmi-calculator',
    '/unit-converter': '/unit-converter',
    '/countdown-timer': '/countdown-timer',
    '/tax-calculator': '/tax-calculator',
    '/date-difference-calculator': '/date-difference-calculator',
  }
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
