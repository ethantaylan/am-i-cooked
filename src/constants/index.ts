/**
 * Application constants
 */

// Load C00KED names from environment variables to keep them secret
const getC00kedNames = (): readonly string[] => {
  const envNames = import.meta.env.VITE_C00KED_NAMES;

  if (!envNames) {
    console.warn("VITE_C00KED_NAMES not found in environment variables");
    return [];
  }
  console.log(`
██     ███████ ███████ ███████     ██    ██  ██████  ██    ██ 
██     ██      ██      ██           ██  ██  ██    ██ ██    ██ 
██     ███████ █████   █████         ████   ██    ██ ██    ██ 
██          ██ ██      ██             ██    ██    ██ ██    ██ 
██     ███████ ███████ ███████        ██     ██████   ██████
`);
  return envNames.split(",").map((name: string) => name.trim().toLowerCase());
};

export const C00KED_NAMES = getC00kedNames();

export const MESSAGES = {
  SUCCESS: "😎 you are good, for now",
  C00KED: "C00KED",
  TITLE: "AM I C00KED?",
  PLACEHOLDER: "type something...",
} as const;

export const ANIMATION_DURATIONS = {
  VIDEO_FADE_IN: 2000, // 2s
  OVERLAY_FADE_IN: 3000, // 3s
  CLOSE_BUTTON_DELAY: 2000, // 2s
} as const;
