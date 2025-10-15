/**
 * Application Context
 * Manages global state: theme, language, settings
 * @module contexts/AppContext
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { Language, translations } from "../i18n/translations";
import { logger } from "../utils/logger";

export type Theme = "dark" | "light";

interface AppContextType {
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;

  // Language
  language: Language;
  setLanguage: (language: Language) => void;
  t: typeof translations.en; // Translation object

  // Settings
  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  THEME: "am-i-cooked-theme",
  LANGUAGE: "am-i-cooked-language",
};

/**
 * App Context Provider
 */
export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initialize theme from localStorage or system preference
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME) as Theme;
    if (saved) return saved;

    // Check system preference
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    }
    return "dark";
  });

  // Initialize language from localStorage or browser
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE) as Language;
    if (saved) return saved;

    // Check browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("fr")) return "fr";
    return "en";
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    logger.info("Theme changed", { theme });
  }, [theme]);

  // Save language to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
    logger.info("Language changed", { language });
  }, [language]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage);
  }, []);

  const openSettings = useCallback(() => {
    setIsSettingsOpen(true);
  }, []);

  const closeSettings = useCallback(() => {
    setIsSettingsOpen(false);
  }, []);

  // Get current translations
  const t = translations[language];

  const value: AppContextType = {
    theme,
    setTheme,
    toggleTheme,
    language,
    setLanguage,
    t,
    isSettingsOpen,
    openSettings,
    closeSettings,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * Hook to use App Context
 */
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};
