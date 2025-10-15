/**
 * Environment Variable Validation
 * Ensures all required environment variables are present and valid
 * @module config/env.validation
 */

interface EnvironmentConfig {
  apiUrl: string;
  cookedNames: string[];
  nodeEnv: "development" | "production" | "test";
}

/**
 * Validates and parses environment variables
 * @throws {Error} If required environment variables are missing or invalid
 * @returns {EnvironmentConfig} Validated environment configuration
 */
export function validateEnvironment(): EnvironmentConfig {
  const errors: string[] = [];

  // Validate VITE_C00KED_NAMES
  const cookedNamesRaw = import.meta.env.VITE_C00KED_NAMES;
  if (!cookedNamesRaw) {
    console.warn("⚠️ VITE_C00KED_NAMES not configured - predefined triggers will be disabled");
  }

  const cookedNames = cookedNamesRaw
    ? cookedNamesRaw.split(",").map((name: string) => name.trim().toLowerCase())
    : [];

  // Validate API URL
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
  try {
    new URL(apiUrl);
  } catch {
    errors.push(`Invalid VITE_API_URL: "${apiUrl}"`);
  }

  // Validate Node Environment
  const nodeEnv = import.meta.env.MODE || "development";
  if (!["development", "production", "test"].includes(nodeEnv)) {
    errors.push(`Invalid NODE_ENV: "${nodeEnv}"`);
  }

  if (errors.length > 0) {
    throw new Error(
      `Environment validation failed:\n${errors.map((e) => `  - ${e}`).join("\n")}`
    );
  }

  return {
    apiUrl,
    cookedNames,
    nodeEnv: nodeEnv as "development" | "production" | "test",
  };
}

/**
 * Singleton environment configuration
 * Validated once at application startup
 */
export const ENV = validateEnvironment();
