/**
 * App Component - Mobile-First, Responsive, Multi-language
 * Complete refactor with i18n and theme support
 */

import { useCallback } from "react";
import { Settings } from "lucide-react";
import { useJudgement } from "./hooks/useJudgement";
import { useScenarioInput } from "./hooks/useScenarioInput";
import { useApp } from "./contexts/AppContext";
import {
  VideoHeader,
  ErrorMessage,
  ResultOverlay,
  Footer,
  SettingsModal,
} from "./components";

export default function App() {
  const { t, openSettings, theme } = useApp();
  const { scenario, handleChange, handleClear, isValid } = useScenarioInput();
  const { isCooked, aiJudgement, loading, error, judge, reset } =
    useJudgement();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isValid && !loading) {
        judge(scenario);
      }
    },
    [scenario, isValid, loading, judge]
  );

  const handleCloseOverlay = useCallback(() => {
    reset();
    handleClear();
  }, [reset, handleClear]);

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen w-screen flex items-center justify-center overflow-hidden transition-colors duration-300 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Settings Button - Top Right */}
      <button
        onClick={openSettings}
        className={`cursor-pointer fixed top-4 flex items-center justify-center right-4 sm:top-6 sm:right-6 z-50 p-2 sm:p-3 rounded-full border hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg ${
          isDark
            ? "bg-gray-900 border-gray-700 text-white"
            : "bg-gray-200 border-gray-300 text-black"
        }`}
        aria-label={t.settings}
      >
        <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Main Content */}
      <div className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-[600px] px-4 sm:px-6 md:px-8 text-center animate-[fadeInUp_0.8s_ease-out]">
        <VideoHeader />

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto w-full flex flex-col items-center justify-center mt-6 sm:mt-8 md:mt-10 gap-4 sm:gap-6"
        >
          {/* Scenario Input */}
          <div className="w-full relative">
            <input
              aria-label="scenario-input"
              value={scenario}
              onChange={(e) => handleChange(e.target.value)}
              className={`w-full bg-transparent border-2 rounded-2xl p-3 sm:p-4 md:p-5 text-sm sm:text-base placeholder:text-sm sm:placeholder:text-base focus:outline-none transition-all duration-300 ${
                isDark
                  ? "border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-500"
                  : "border-gray-300 text-black placeholder:text-gray-400 focus:border-gray-400"
              }`}
              placeholder={t.inputPlaceholder}
              disabled={loading}
              maxLength={200}
            />
            <div
              className={`absolute -bottom-5 right-2 text-xs ${
                isDark ? "text-gray-600" : "text-gray-400"
              }`}
            >
              {scenario.length}/200
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid || loading}
            className={`w-full sm:w-auto mt-5 group relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 font-bold text-base sm:text-lg rounded-full hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 active:scale-95 ${
              isDark
                ? "bg-white text-black disabled:hover:bg-white disabled:hover:text-black"
                : "bg-black text-white disabled:hover:bg-black disabled:hover:text-white"
            }`}
          >
            <span className="relative z-10 uppercase text-sm sm:text-base">
              {loading ? t.buttonLoading : t.buttonDefault}
            </span>
          </button>
        </form>

        {/* Error Message */}
        <ErrorMessage error={error} />
      </div>

      {/* Result Overlay */}
      {isCooked !== null && (
        <ResultOverlay
          isCooked={isCooked}
          aiJudgement={aiJudgement}
          onClose={handleCloseOverlay}
        />
      )}

      {/* Footer */}
      <Footer />

      {/* Settings Modal */}
      <SettingsModal />
    </div>
  );
}
