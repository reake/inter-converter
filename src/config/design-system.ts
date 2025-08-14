// InterConverter Design System
// Modern, minimalist design principles for consistent user experience

export const DESIGN_TOKENS = {
  // Color Palette
  colors: {
    // Primary brand colors
    primary: {
      50: '#eff6ff',
      100: '#dbeafe', 
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
    },
    
    // Semantic colors
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    
    // Neutral grays
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    }
  },
  
  // Typography Scale
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Consolas', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    }
  },
  
  // Spacing Scale
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },
  
  // Border Radius
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  }
};

// Component Design Patterns
export const COMPONENT_PATTERNS = {
  // Button variants
  button: {
    primary: 'bg-brand-600 hover:bg-brand-700 text-white font-medium px-4 py-2 rounded-lg transition-colors',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium px-4 py-2 rounded-lg transition-colors',
    outline: 'border border-gray-300 hover:border-gray-400 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors',
    ghost: 'hover:bg-gray-100 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors',
  },
  
  // Card variants
  card: {
    default: 'bg-white rounded-2xl shadow-soft border border-gray-100 p-6',
    elevated: 'bg-white rounded-2xl shadow-medium border border-gray-100 p-6',
    interactive: 'bg-white rounded-2xl shadow-soft border border-gray-100 p-6 hover:shadow-medium transition-shadow cursor-pointer',
  },
  
  // Input variants
  input: {
    default: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors',
    error: 'w-full px-4 py-3 border border-error-500 rounded-lg focus:ring-2 focus:ring-error-500 focus:border-error-500 transition-colors',
    success: 'w-full px-4 py-3 border border-success-500 rounded-lg focus:ring-2 focus:ring-success-500 focus:border-success-500 transition-colors',
  },
  
  // Badge variants
  badge: {
    default: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800',
    success: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-50 text-success-700',
    warning: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-50 text-warning-700',
    error: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-50 text-error-700',
  }
};

// Layout Patterns
export const LAYOUT_PATTERNS = {
  // Container sizes
  container: {
    sm: 'max-w-2xl mx-auto px-4',
    md: 'max-w-4xl mx-auto px-4',
    lg: 'max-w-6xl mx-auto px-4',
    xl: 'max-w-7xl mx-auto px-4',
  },
  
  // Grid patterns
  grid: {
    responsive: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    tools: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
    features: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
  },
  
  // Flex patterns
  flex: {
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    start: 'flex items-center justify-start',
    column: 'flex flex-col',
  }
};

// Animation Patterns
export const ANIMATION_PATTERNS = {
  // Entrance animations
  fadeIn: 'animate-fade-in',
  scaleIn: 'animate-scale-in',
  
  // Hover effects
  hover: {
    lift: 'hover:-translate-y-1 transition-transform duration-200',
    scale: 'hover:scale-105 transition-transform duration-200',
    glow: 'hover:shadow-lg transition-shadow duration-200',
  },
  
  // Loading states
  loading: {
    pulse: 'animate-pulse',
    spin: 'animate-spin',
  }
};

// Accessibility Guidelines
export const ACCESSIBILITY = {
  // Focus styles
  focus: 'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  
  // Color contrast ratios (WCAG AA compliant)
  contrast: {
    normal: '4.5:1', // Normal text
    large: '3:1',    // Large text (18pt+ or 14pt+ bold)
    ui: '3:1',       // UI components
  },
  
  // Touch targets (minimum 44px)
  touchTarget: 'min-h-[44px] min-w-[44px]',
  
  // Screen reader only content
  srOnly: 'sr-only',
};

// Responsive Breakpoints
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Design Principles
export const DESIGN_PRINCIPLES = {
  // Minimalism
  minimalism: {
    description: 'Clean, uncluttered interfaces that focus on essential elements',
    guidelines: [
      'Use plenty of white space',
      'Limit color palette to 2-3 primary colors',
      'Remove unnecessary decorative elements',
      'Focus on typography hierarchy',
    ]
  },
  
  // Consistency
  consistency: {
    description: 'Uniform design patterns across all pages and components',
    guidelines: [
      'Use consistent spacing scale',
      'Apply same interaction patterns',
      'Maintain consistent typography',
      'Use standardized component variants',
    ]
  },
  
  // Accessibility
  accessibility: {
    description: 'Inclusive design that works for all users',
    guidelines: [
      'Maintain WCAG AA color contrast',
      'Provide keyboard navigation',
      'Include proper ARIA labels',
      'Support screen readers',
    ]
  },
  
  // Performance
  performance: {
    description: 'Fast, responsive interfaces that load quickly',
    guidelines: [
      'Optimize images and assets',
      'Use efficient animations',
      'Minimize layout shifts',
      'Implement progressive loading',
    ]
  }
};

// Usage Examples
export const USAGE_EXAMPLES = {
  // Tool card component
  toolCard: `
    <div className="${COMPONENT_PATTERNS.card.interactive}">
      <div className="${LAYOUT_PATTERNS.flex.between} mb-4">
        <h3 className="text-lg font-semibold">Tool Name</h3>
        <span className="${COMPONENT_PATTERNS.badge.default}">Free</span>
      </div>
      <p className="text-gray-600 mb-4">Tool description...</p>
      <button className="${COMPONENT_PATTERNS.button.primary}">
        Try Now
      </button>
    </div>
  `,
  
  // Hero section
  heroSection: `
    <section className="${LAYOUT_PATTERNS.container.lg} py-20">
      <div className="text-center ${ANIMATION_PATTERNS.fadeIn}">
        <h1 className="text-5xl font-bold mb-6">InterConverter</h1>
        <p className="text-xl text-gray-600 mb-8">Professional conversion tools</p>
        <button className="${COMPONENT_PATTERNS.button.primary} ${ANIMATION_PATTERNS.hover.lift}">
          Get Started
        </button>
      </div>
    </section>
  `
};
