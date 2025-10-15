/**
 * Custom Hook: useScenarioInput
 * Manages scenario input state and validation
 */

import { useState, useCallback } from "react";
import { APP_CONFIG } from "../config/app.config";

interface UseScenarioInputReturn {
  scenario: string;
  handleChange: (value: string) => void;
  handleClear: () => void;
  isValid: boolean;
  remainingChars: number;
}

/**
 * Hook to manage scenario input with validation
 */
export const useScenarioInput = (): UseScenarioInputReturn => {
  const [scenario, setScenario] = useState("");

  const handleChange = useCallback((value: string) => {
    // Enforce character limit
    if (value.length > APP_CONFIG.validation.maxScenarioLength) {
      return;
    }
    setScenario(value);
  }, []);

  const handleClear = useCallback(() => {
    setScenario("");
  }, []);

  const isValid = scenario.trim().length >= APP_CONFIG.validation.minScenarioLength;
  const remainingChars = APP_CONFIG.validation.maxScenarioLength - scenario.length;

  return {
    scenario,
    handleChange,
    handleClear,
    isValid,
    remainingChars,
  };
};
