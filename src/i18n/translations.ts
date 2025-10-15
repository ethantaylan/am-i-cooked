/**
 * Internationalization (i18n) Translations
 * Supports French and English
 * @module i18n/translations
 */

export type Language = "en" | "fr";

export interface Translations {
  // Header
  title: string;
  settings: string;

  // Input
  inputPlaceholder: string;
  characterCount: string;

  // Button
  buttonDefault: string;
  buttonLoading: string;

  // Results
  cooked: string;
  safe: string;
  errorTitle: string;
  errorMessage: string;

  // Overlay
  tryAgain: string;
  closeHint: string;

  // Settings Modal
  settingsTitle: string;
  language: string;
  theme: string;
  darkMode: string;
  lightMode: string;
  close: string;
  save: string;

  // Footer
  builtWith: string;

  // Error Boundary
  errorBoundaryTitle: string;
  errorBoundaryMessage: string;
  reload: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    title: "am i c00ked?",
    settings: "Settings",

    // Input
    inputPlaceholder: "Type your situation... be honest 👀",
    characterCount: "{current}/{max}",

    // Button
    buttonDefault: "judge me 🔥",
    buttonLoading: "🔥 judging...",

    // Results
    cooked: "C00KED",
    safe: "YOU'RE SAFE",
    errorTitle: "Error",
    errorMessage: "An error occurred",

    // Overlay
    tryAgain: "Try Again",
    closeHint: "press ✕ to try again",

    // Settings Modal
    settingsTitle: "Settings",
    language: "Language",
    theme: "Theme",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    close: "Close",
    save: "Save",

    // Footer
    builtWith: "Built with",

    // Error Boundary
    errorBoundaryTitle: "Oops! Something went wrong",
    errorBoundaryMessage:
      "We encountered an unexpected error. Don't worry, it's not your fault!",
    reload: "Reload Page",
  },
  fr: {
    // Header
    title: "AM I C00KED?",
    settings: "Paramètres",

    // Input
    inputPlaceholder: "Décris ta situation... sois honnête 👀",
    characterCount: "{current}/{max}",

    // Button
    buttonDefault: "juge-moi 🔥",
    buttonLoading: "🔥 jugement...",

    // Results
    cooked: "CUIT",
    safe: "TU ES SAUVÉ",
    errorTitle: "Erreur",
    errorMessage: "Une erreur s'est produite",

    // Overlay
    tryAgain: "Réessayer",
    closeHint: "appuie sur ✕ pour réessayer",

    // Settings Modal
    settingsTitle: "Paramètres",
    language: "Langue",
    theme: "Thème",
    darkMode: "Mode Sombre",
    lightMode: "Mode Clair",
    close: "Fermer",
    save: "Enregistrer",

    // Footer
    builtWith: "Conçu avec",

    // Error Boundary
    errorBoundaryTitle: "Oups ! Une erreur s'est produite",
    errorBoundaryMessage:
      "Nous avons rencontré une erreur inattendue. Ne t'inquiète pas, ce n'est pas de ta faute !",
    reload: "Recharger la page",
  },
};
