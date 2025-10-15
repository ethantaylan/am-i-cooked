/**
 * Judgement Service
 * Business logic for judging scenarios
 */

import { isNameC00ked } from "../utils/nameValidator";
import { apiClient } from "./api.service";
import type { AIJudgement } from "../types";
import { APP_CONFIG } from "../config/app.config";
import { Language } from "../i18n/translations";

/**
 * Validates a scenario before sending to API
 */
export const validateScenario = (
  scenario: string
): { valid: boolean; error?: string } => {
  const trimmed = scenario.trim();

  if (!trimmed) {
    return { valid: false, error: "Scenario cannot be empty" };
  }

  if (trimmed.length > APP_CONFIG.validation.maxScenarioLength) {
    return {
      valid: false,
      error: `Scenario too long. Max ${APP_CONFIG.validation.maxScenarioLength} characters.`,
    };
  }

  return { valid: true };
};

/**
 * Judge a scenario - handles both predefined names and AI judgement
 */
export const judgeScenario = async (
  scenario: string,
  language: Language
): Promise<{ isCooked: boolean; judgement: AIJudgement | null }> => {
  // Validate input
  const validation = validateScenario(scenario);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Check if it's a predefined cooked name
  if (isNameC00ked(scenario)) {
    return {
      isCooked: true,
      judgement: null, // Predefined names don't need AI judgement
    };
  }

  // Call AI API for judgement
  const judgement = await apiClient.judgeScenario(scenario, language);

  return {
    isCooked: judgement.percentage >= APP_CONFIG.ui.judgementThreshold,
    judgement,
  };
};
