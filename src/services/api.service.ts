/**
 * API Service Layer
 * Handles all HTTP communication with the backend
 * @module services/api.service
 */

import axios, { AxiosError, AxiosInstance } from "axios";
import { APP_CONFIG } from "../config/app.config";
import { logger } from "../utils/logger";
import type { AIJudgement } from "../types";

/**
 * Custom API Error class for better error handling
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * API Client singleton
 */
class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: APP_CONFIG.api.baseUrl,
      timeout: APP_CONFIG.api.timeout,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        logger.debug(
          `API Request: ${config.method?.toUpperCase()} ${config.url}`,
          {
            data: config.data,
          }
        );
        return config;
      },
      (error) => {
        logger.error("API Request Error", error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        logger.debug(
          `API Response: ${response.status} ${response.config.url}`,
          {
            data: response.data,
          }
        );
        return response;
      },
      (error: AxiosError) => {
        const message = this.getErrorMessage(error);
        logger.error(
          `API Error: ${error.response?.status || "Network Error"}`,
          {
            url: error.config?.url,
            message,
          }
        );
        throw new ApiError(message, error.response?.status, error);
      }
    );
  }

  /**
   * Extract user-friendly error message from axios error
   */
  private getErrorMessage(error: AxiosError): string {
    if (error.response?.data && typeof error.response.data === "object") {
      const data = error.response.data as { error?: string; message?: string };
      return data.error || data.message || "An unexpected error occurred";
    }

    if (error.message) {
      return error.message;
    }

    return "Network error occurred";
  }

  /**
   * Judge a scenario
   */
  async judgeScenario(scenario: string, language: string): Promise<AIJudgement> {
    const response = await this.client.post<AIJudgement>(
      APP_CONFIG.api.endpoints.judge,
      { scenario, language }
    );
    return response.data;
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<{ status: string }> {
    const response = await this.client.get<{ status: string }>(
      APP_CONFIG.api.endpoints.health
    );
    return response.data;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
