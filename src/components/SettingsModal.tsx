/**
 * Settings Modal Component
 * Allows users to change theme and language
 * @module components/SettingsModal
 */

import { X, Moon, Sun, Languages } from "lucide-react";
import { useApp } from "../contexts/AppContext";

export const SettingsModal: React.FC = () => {
  const {
    isSettingsOpen,
    closeSettings,
    theme,
    setTheme,
    language,
    setLanguage,
    t,
  } = useApp();

  if (!isSettingsOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fadeInSlow_0.3s_ease-out]"
      onClick={closeSettings}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 sm:p-8 animate-[fadeInUp_0.4s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white">
            {t.settingsTitle}
          </h2>
          <button
            onClick={closeSettings}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label="Close settings"
          >
            <X className="w-6 h-6 text-black dark:text-white" />
          </button>
        </div>

        {/* Settings Content */}
        <div className="space-y-6">
          {/* Theme Setting */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {theme === "dark" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
              {t.theme}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTheme("dark")}
                className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  theme === "dark"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                }`}
              >
                <Moon
                  className={`w-6 h-6 mx-auto mb-2 ${
                    theme === "dark"
                      ? "text-blue-500"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                />
                <div
                  className={`text-sm font-medium ${
                    theme === "dark"
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {t.darkMode}
                </div>
              </button>

              <button
                onClick={() => setTheme("light")}
                className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  theme === "light"
                    ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                    : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                }`}
              >
                <Sun
                  className={`w-6 h-6 mx-auto mb-2 ${
                    theme === "light"
                      ? "text-yellow-500"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                />
                <div
                  className={`text-sm font-medium ${
                    theme === "light"
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {t.lightMode}
                </div>
              </button>
            </div>
          </div>

          {/* Language Setting */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <Languages className="w-4 h-4" />
              {t.language}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setLanguage("en")}
                className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  language === "en"
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                }`}
              >
                <div
                  className={`text-2xl mb-2 ${
                    language === "en" ? "grayscale-0" : "grayscale"
                  }`}
                >
                  🇬🇧
                </div>
                <div
                  className={`text-sm font-medium ${
                    language === "en"
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  English
                </div>
              </button>

              <button
                onClick={() => setLanguage("fr")}
                className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  language === "fr"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                }`}
              >
                <div
                  className={`text-2xl mb-2 ${
                    language === "fr" ? "grayscale-0" : "grayscale"
                  }`}
                >
                  🇫🇷
                </div>
                <div
                  className={`text-sm font-medium ${
                    language === "fr"
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Français
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={closeSettings}
          className="w-full mt-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          {t.close}
        </button>
      </div>
    </div>
  );
};
