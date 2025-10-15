/**
 * Application types
 */

export type CookStatus = boolean | null;

export interface AppState {
  name: string;
  isC00ked: CookStatus;
}
