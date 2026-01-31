'use client';

import { useCallback } from 'react';

interface GtagCommand {
  (command: 'event', eventName: string, params?: Record<string, unknown>): void;
  (command: 'config', targetId: string, params?: Record<string, unknown>): void;
  (command: 'set', params: Record<string, unknown>): void;
}

interface Gtag {
  (command: string, ...args: unknown[]): void;
  getAll?: () => string[];
}

interface WindowWithGtag {
  gtag?: Gtag;
}

interface ToolConversionEvent {
  toolId: string;
  toolName: string;
  category: string;
  inputType: string;
  outputType: string;
  inputValue: string;
  outputValue: string;
}

interface SearchEvent {
  query: string;
  resultsCount: number;
  hasResults: boolean;
}

interface ToolViewEvent {
  toolId: string;
  toolName: string;
  category: string;
}

export function useAnalytics() {
  const trackToolConversion = useCallback((event: ToolConversionEvent) => {
    if (typeof window !== 'undefined' && (window as WindowWithGtag).gtag) {
      (window as WindowWithGtag).gtag!('event', 'tool_conversion', {
        tool_id: event.toolId,
        tool_name: event.toolName,
        category: event.category,
        input_type: event.inputType,
        output_type: event.outputType,
        input_value: event.inputValue,
        output_value: event.outputValue
      });
    }
  }, []);

  const trackToolView = useCallback((event: ToolViewEvent) => {
    if (typeof window !== 'undefined' && (window as WindowWithGtag).gtag) {
      (window as WindowWithGtag).gtag!('event', 'tool_view', {
        tool_id: event.toolId,
        tool_name: event.toolName,
        category: event.category
      });
    }
  }, []);

  const trackSearch = useCallback((event: SearchEvent) => {
    if (typeof window !== 'undefined' && (window as WindowWithGtag).gtag) {
      (window as WindowWithGtag).gtag!('event', 'search', {
        search_term: event.query,
        results_count: event.resultsCount,
        has_results: event.hasResults
      });
    }
  }, []);

  const trackResultCopy = useCallback((toolId: string, toolName: string) => {
    if (typeof window !== 'undefined' && (window as WindowWithGtag).gtag) {
      (window as WindowWithGtag).gtag!('event', 'result_copied', {
        tool_id: toolId,
        tool_name: toolName
      });
    }
  }, []);

  const trackPageView = useCallback((pagePath: string, pageTitle: string) => {
    if (typeof window !== 'undefined' && (window as WindowWithGtag).gtag) {
      const measurementId = (window as WindowWithGtag).gtag?.getAll?.()?.[0]?.split('/')?.pop() || '';
      (window as WindowWithGtag).gtag!('config', measurementId, {
        page_path: pagePath,
        page_title: pageTitle
      });
    }
  }, []);

  return {
    trackToolConversion,
    trackToolView,
    trackSearch,
    trackResultCopy,
    trackPageView
  };
}
