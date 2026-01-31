# AGENTS.md - Development Guide for InterConverter

This guide provides essential information for agentic coding agents working on this repository.

## Build & Test Commands

### Development
```bash
npm run dev              # Start development server (Next.js 15)
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint
```

### Testing
```bash
npm test                 # Run all tests
npm run test:watch       # Jest watch mode
npm run test:coverage    # Generate coverage report

# Run single test file
npm test -- path/to/test.test.ts

# Run tests matching pattern
npm test -- --testNamePattern="convertTimestamp"
```

### Static Deployment
```bash
npm run build:static     # Build for static export
npm run deploy:workers   # Deploy to Cloudflare Workers
```

---

## Code Style Guidelines

### TypeScript Configuration
- **Strict mode**: Enabled (`strict: true`)
- **Target**: ES2017
- **Module resolution**: Bundler
- **Path alias**: `@/*` → `src/*`

### Import Conventions
```typescript
// External dependencies first
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Internal imports (use @/ alias)
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ToolConfig } from '@/types/tools';

// Type imports
import type { Metadata } from 'next';
```

### Component Patterns

#### Client Components
```typescript
'use client';

import { useState } from 'react';

export function Converter() {
  const [value, setValue] = useState<string>('');

  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}
```

#### Server Components (default, no 'use client' needed)
```typescript
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { WeightConverter } from '@/components/converters/unit/WeightConverter';

// Force static generation for SEO
export const dynamic = 'force-static';

export default function ToolPage({ params }: { params: Promise<{ locale: string }> }) {
  return (
    <EnhancedToolLayout title="..." description="...">
      <WeightConverter />
    </EnhancedToolLayout>
  );
}
```

### Styling with Tailwind + shadcn/ui

#### Utility Classes
```typescript
import { cn } from '@/lib/utils';

// Use cn() for conditional classes
<div className={cn(
  "base-class",
  isActive && "active-class",
  className
)} />
```

#### shadcn/ui Components
```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Variants using class-variance-authority (CVA)
<Button variant="outline" size="sm">Click</Button>
```

#### Color Tokens (from tailwind.config.ts)
- `bg-background`, `text-foreground` - theme-aware base colors
- `bg-primary`, `text-primary-foreground` - primary actions
- `bg-muted`, `text-muted-foreground` - secondary text
- `bg-destructive` - error/danger states
- Custom brand: `bg-brand-500`, `bg-success-500`, `bg-warning-500`, `bg-error-500`

### File Naming Conventions
- **Components**: PascalCase (`WeightConverter.tsx`, `EnhancedToolLayout.tsx`)
- **Utilities**: camelCase (`cn()`, `formatResult()`)
- **Types/Interfaces**: PascalCase (`ToolConfig`, `ConvertersResult`)
- **Test files**: `*.test.ts` or `*.test.tsx`
- **Pages**: `page.tsx` (Next.js App Router convention)
- **Layouts**: `layout.tsx`

### Error Handling

#### Conversion Functions
```typescript
export interface ConvertersResult<T = unknown> {
  success: boolean;
  result?: T;
  error?: string;
  metadata?: {
    timestamp: Date;
    source?: string;
  };
}

export function convertValue(input: string): ConvertersResult<number> {
  const parsed = parseFloat(input);
  if (isNaN(parsed)) {
    return { success: false, error: 'Invalid input format' };
  }
  return { success: true, result: parsed };
}
```

#### React Error Boundaries
- Use shadcn/ui error components or standard React error boundaries
- Validate props before use, especially for numeric inputs

### Testing Patterns (Jest + React Testing Library)
```typescript
import { render, screen } from '@testing-library/react';
import { ConvertersEngine } from '../conversion-engine';

describe('ConvertersEngine', () => {
  it('should convert valid timestamp', () => {
    const result = ConvertersEngine.convertTimestamp(1640995200);
    expect(result.success).toBe(true);
    expect(result.result).toContain('2022');
  });

  it('should handle invalid input', () => {
    const result = ConvertersEngine.convertTimestamp(NaN);
    expect(result.success).toBe(false);
    expect(result.error).toBe('Invalid timestamp format');
  });
});
```

### Internationalization (i18n)
- **Locales**: `en` (default), `zh`
- **Library**: next-intl
- **Routing**: `localePrefix: 'as-needed'` (no prefix for English)
- **Content files**: JSON in `src/data/tools/` with `-en` and `-zh` suffixes
- **Access locale**: `const { locale } = await params; const l = locale.toLowerCase();`

### ESLint Rules
- Extends: `next/core-web-vitals`, `next/typescript`
- `@typescript-eslint/no-unused-vars`: warn
- `@typescript-eslint/no-explicit-any`: warn
- `react-hooks/exhaustive-deps`: warn
- **Never suppress type errors** with `as any` or `@ts-ignore`

---

## Project Structure

```
src/
├── app/[locale]/          # Localized routes (App Router)
│   ├── (pages)/          # Regular pages (about, contact, etc.)
│   ├── (tools)/          # Tool pages organized by category
│   └── layout.tsx        # Root locale layout
├── components/
│   ├── converters/        # Tool-specific converters (by category)
│   ├── tools/            # Shared tool layouts (EnhancedToolLayout, ToolCard)
│   └── ui/               # shadcn/ui components
├── lib/
│   ├── converters/        # Conversion logic libraries
│   ├── seo/              # SEO utilities
│   └── utils.ts          # General utilities (cn())
├── config/
│   ├── tools.ts          # Tool configuration (re-exports from tools-loader)
│   └── tools-loader.ts   # Loads tool configs from JSON
├── types/
│   └── tools.ts          # TypeScript interfaces
└── data/
    └── tools/            # JSON tool data and content
```

---

## Adding New Tools

1. **Add config** to JSON file in `src/data/tools/[category].json`
2. **Create converter component** in `src/components/converters/[category]/[ToolName]Converter.tsx`
3. **Create page** in `src/app/[locale]/(tools)/[category]/[tool-name]/page.tsx`
4. **Add translations** to `src/data/tools/[tool-name]-en.json` and `-zh.json`
5. **Update routing** in `src/i18n/routing.ts` if needed

---

## Key Principles

1. **Type Safety**: Always use TypeScript interfaces, no `as any`
2. **Performance**: Use `export const dynamic = 'force-static'` for SEO pages
3. **SEO**: Include metadata, structured data, and canonical URLs
4. **Accessibility**: Use semantic HTML, ARIA labels where needed
5. **Testing**: Write tests for conversion logic in `__tests__/` directories
6. **i18n Ready**: Always support both English and Chinese
7. **Component Reusability**: Use shadcn/ui components and existing layouts
