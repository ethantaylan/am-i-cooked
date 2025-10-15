/**
 * Application Configuration
 * Centralized configuration for the entire application
 */

export const APP_CONFIG = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8888",
    endpoints: {
      judge: "/.netlify/functions/judge",
      health: "/api/health",
    },
    timeout: 30000, // 30 seconds
  },

  // Validation Rules
  validation: {
    maxScenarioLength: 200,
    minScenarioLength: 1,
  },

  // Animation Timings
  animations: {
    videoFadeIn: 2000, // 2s
    overlayFadeIn: 3000, // 3s
    closeButtonDelay: 2000, // 2s
    quickFade: 400, // 0.4s
    mediumFade: 600, // 0.6s
  },

  // UI Constants
  ui: {
    judgementThreshold: 50, // Percentage threshold for being "cooked"
  },
} as const;
