'use client';

import { useEffect } from 'react';

// Web Vitals monitoring for Core Web Vitals optimization
export function WebVitals() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Dynamic import to avoid loading in development
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      // Core Web Vitals
      onCLS((metric) => {
        // Track Cumulative Layout Shift
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'CLS',
            value: Math.round(metric.value * 1000),
            custom_map: { metric_id: metric.id },
          });
        }
      });

      onINP((metric) => {
        // Track Interaction to Next Paint
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'INP',
            value: Math.round(metric.value),
            custom_map: { metric_id: metric.id },
          });
        }
      });

      onLCP((metric) => {
        // Track Largest Contentful Paint
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'LCP',
            value: Math.round(metric.value),
            custom_map: { metric_id: metric.id },
          });
        }
      });

      // Additional metrics
      onFCP((metric) => {
        // Track First Contentful Paint
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'FCP',
            value: Math.round(metric.value),
            custom_map: { metric_id: metric.id },
          });
        }
      });

      onTTFB((metric) => {
        // Track Time to First Byte
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'TTFB',
            value: Math.round(metric.value),
            custom_map: { metric_id: metric.id },
          });
        }
      });
    }).catch((error) => {
      console.warn('Web Vitals could not be loaded:', error);
    });
  }, []);

  return null;
}

// Performance observer for custom metrics
export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') return;

    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) { // Tasks longer than 50ms
              if (window.gtag) {
                window.gtag('event', 'long_task', {
                  event_category: 'Performance',
                  event_label: 'Long Task',
                  value: Math.round(entry.duration),
                });
              }
            }
          }
        });
        longTaskObserver.observe({ entryTypes: ['longtask'] });

        // Monitor layout shifts
        const layoutShiftObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const layoutShiftEntry = entry as any;
            if (!layoutShiftEntry.hadRecentInput && layoutShiftEntry.value > 0.1) {
              if (window.gtag) {
                window.gtag('event', 'layout_shift', {
                  event_category: 'Performance',
                  event_label: 'Layout Shift',
                  value: Math.round(layoutShiftEntry.value * 1000),
                });
              }
            }
          }
        });
        layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });

        // Cleanup observers
        return () => {
          longTaskObserver.disconnect();
          layoutShiftObserver.disconnect();
        };
      } catch (error) {
        console.warn('Performance monitoring setup failed:', error);
      }
    }
  }, []);

  return null;
}

// Resource loading performance
export function ResourceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') return;

    const handleLoad = () => {
      // Monitor resource loading times
      if ('performance' in window && 'getEntriesByType' in window.performance) {
        const resources = window.performance.getEntriesByType('resource');
        
        resources.forEach((resource: any) => {
          if (resource.duration > 1000) { // Resources taking longer than 1s
            if (window.gtag) {
              window.gtag('event', 'slow_resource', {
                event_category: 'Performance',
                event_label: 'Slow Resource',
                value: Math.round(resource.duration),
                custom_map: { resource_name: resource.name },
              });
            }
          }
        });
      }
    };

    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return null;
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: {
        event_category?: string;
        event_label?: string;
        value?: number;
        custom_map?: Record<string, any>;
      }
    ) => void;
  }
}
