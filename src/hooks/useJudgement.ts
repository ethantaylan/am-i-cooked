/**
 * Custom Hook: useJudgement
 * Manages the judgement state and logic
 */

import { useState, useCallback } from "react";
import { judgeScenario } from "../services/judgement.service";
import type { AIJudgement, CookStatus } from "../types";
import { useApp } from "../contexts/AppContext";

interface UseJudgementReturn {
  isCooked: CookStatus;
  aiJudgement: AIJudgement | null;
  loading: boolean;
  error: string | null;
  judge: (scenario: string) => Promise<void>;
  reset: () => void;
}

/**
 * Hook to manage scenario judgement
 */
export const useJudgement = (): UseJudgementReturn => {
  const [isCooked, setIsCooked] = useState<CookStatus>(null);
  const [aiJudgement, setAiJudgement] = useState<AIJudgement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { language } = useApp();

  const judge = useCallback(async (scenario: string) => {
    if (!scenario.trim()) {
      reset();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await judgeScenario(scenario, language);
      setIsCooked(result.isCooked);
      setAiJudgement(result.judgement);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("Error judging scenario:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsCooked(null);
    setAiJudgement(null);
    setError(null);
  }, []);

  return {
    isCooked,
    aiJudgement,
    loading,
    error,
    judge,
    reset,
  };
};
