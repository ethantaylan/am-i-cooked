/**
 * Application constants
 */

export const COOKED_NAMES = [
  "REDACTED",
  "REDACTED",
  "REDACTED",
  "REDACTED",
  "REDACTED",
  "REDACTED",
  "REDACTED",
  "REDACTED",
  "REDACTED",
  "REDACTED",
  "REDACTED",
  "REDACTED",
  "REDACTED",
  "REDACTED",
  "REDACTED",
] as const;

export const MESSAGES = {
  SUCCESS: "😎 you are good, for now",
  COOKED: "COOKED",
  TITLE: "am i cooked?",
  PLACEHOLDER: "type something...",
} as const;

export const ANIMATION_DURATIONS = {
  VIDEO_FADE_IN: 2000, // 2s
  OVERLAY_FADE_IN: 3000, // 3s
  CLOSE_BUTTON_DELAY: 2000, // 2s
} as const;
