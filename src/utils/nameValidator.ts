import { C00KED_NAMES } from "../constants";

/**
 * Normalizes a string by removing accents and converting to lowercase
 * @param value - The string to normalize
 * @returns Normalized string
 */
export const normalizeString = (value: string): string => {
  const cleaned = value.trim().toLowerCase();
  // Remove accents to handle "Léah" and "Leah" the same way
  return cleaned.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

/**
 * Checks if a name is in the "c00ked" list
 * @param name - The name to check
 * @returns true if the name is c00ked, false otherwise
 */
export const isNameC00ked = (name: string): boolean => {
  if (!name.trim()) return false;
  const normalized = normalizeString(name);
  return C00KED_NAMES.includes(normalized as typeof C00KED_NAMES[number]);
};
