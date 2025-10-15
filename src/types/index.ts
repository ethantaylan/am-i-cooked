/**
 * Application types
 */

export type CookStatus = boolean | null;

export interface AppState {
  name: string;
  isC00ked: CookStatus;
}

export interface AIJudgement {
  percentage: number;
  verdict: string;
  isCooked: boolean;
}

export interface JudgeResponse {
  loading: boolean;
  data: AIJudgement | null;
  error: string | null;
}
