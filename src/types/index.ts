/**
 * Application types
 */

export type CookStatus = boolean | null;

export interface AppState {
  name: string;
  isCooked: CookStatus;
}
