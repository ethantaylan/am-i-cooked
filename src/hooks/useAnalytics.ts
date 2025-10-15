/**
 * Analytics Hook
 * Track user interactions and events
 * @module hooks/useAnalytics
 */

import { useEffect, useCallback } from "react";
import { logger } from "../utils/logger";

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, unknown>;
}

/**
 * Analytics tracking hook
 * Can be integrated with Google Analytics, Mixpanel, etc.
 */
export const useAnalytics = () => {
  /**
   * Track page view
   */
  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  /**
   * Track custom event
   */
  const track = useCallback((event: string, properties?: Record<string, unknown>) => {
    trackEvent({ event, properties });
  }, []);

  /**
   * Track scenario submission
   */
  const trackScenarioSubmit = useCallback((scenarioLength: number) => {
    track("scenario_submitted", {
      scenario_length: scenarioLength,
      timestamp: new Date().toISOString(),
    });
  }, [track]);

  /**
   * Track judgement result
   */
  const trackJudgementResult = useCallback(
    (isCooked: boolean, percentage: number) => {
      track("judgement_received", {
        is_cooked: isCooked,
        percentage,
        timestamp: new Date().toISOString(),
      });
    },
    [track]
  );

  /**
   * Track error
   */
  const trackError = useCallback(
    (error: string, context?: Record<string, unknown>) => {
      track("error_occurred", {
        error,
        ...context,
        timestamp: new Date().toISOString(),
      });
    },
    [track]
  );

  return {
    track,
    trackScenarioSubmit,
    trackJudgementResult,
    trackError,
  };
};

/**
 * Track page view
 * Replace with actual analytics service
 */
function trackPageView(path: string): void {
  logger.info("Page View", { path });

  // Example: Google Analytics
  // if (typeof window.gtag !== "undefined") {
  //   window.gtag("config", "GA_MEASUREMENT_ID", {
  //     page_path: path,
  //   });
  // }
}

/**
 * Track custom event
 * Replace with actual analytics service
 */
function trackEvent({ event, properties }: AnalyticsEvent): void {
  logger.info("Analytics Event", { event, properties });

  // Example: Google Analytics
  // if (typeof window.gtag !== "undefined") {
  //   window.gtag("event", event, properties);
  // }

  // Example: Mixpanel
  // if (typeof window.mixpanel !== "undefined") {
  //   window.mixpanel.track(event, properties);
  // }
}
