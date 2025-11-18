import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { TOOLS_CONFIG, TOOL_CATEGORIES } from '@/config/tools';

// Build pathnames from config to cover every category + tool page for hreflang/canonical accuracy
const basePathnames = ['/', '/tools', '/about'];
const categoryPathnames = Object.keys(TOOL_CATEGORIES).map((slug) => `/${slug}`);
const toolPathnames = TOOLS_CONFIG.map((tool) => tool.path);

// Deduplicate and map to the shared internal path (same as external here)
const pathnames = [...new Set([...basePathnames, ...categoryPathnames, ...toolPathnames])].reduce(
  (acc, pathname) => {
    acc[pathname] = pathname;
    return acc;
  },
  {} as Record<string, string>
);

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'zh'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Locale prefix configuration - only show prefix for non-default locales
  localePrefix: 'as-needed',

  // Disable automatic locale detection to prevent browser language override
  localeDetection: false,

  // The `pathnames` object holds pairs of internal and
  // external paths. Based on the locale, the external
  // paths are rewritten to the shared, internal ones.
  pathnames,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
