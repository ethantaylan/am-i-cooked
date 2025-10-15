/**
 * Centralized Logging Utility
 * Production-ready logging with different levels and formatting
 * @module utils/logger
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LoggerConfig {
  enabled: boolean;
  level: LogLevel;
  timestamp: boolean;
}

/**
 * Logger class for structured logging
 */
class Logger {
  private config: LoggerConfig;
  private readonly levels: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      enabled: import.meta.env.MODE === "development",
      level: (import.meta.env.VITE_LOG_LEVEL as LogLevel) || "info",
      timestamp: true,
      ...config,
    };
  }

  private shouldLog(level: LogLevel): boolean {
    if (!this.config.enabled) return false;
    return this.levels[level] >= this.levels[this.config.level];
  }

  private formatMessage(level: LogLevel, message: string, data?: unknown): string {
    const timestamp = this.config.timestamp
      ? `[${new Date().toISOString()}]`
      : "";
    const prefix = `${timestamp} [${level.toUpperCase()}]`;
    const dataStr = data ? `\n${JSON.stringify(data, null, 2)}` : "";
    return `${prefix} ${message}${dataStr}`;
  }

  /**
   * Debug level logging
   */
  debug(message: string, data?: unknown): void {
    if (this.shouldLog("debug")) {
      console.debug(this.formatMessage("debug", message, data));
    }
  }

  /**
   * Info level logging
   */
  info(message: string, data?: unknown): void {
    if (this.shouldLog("info")) {
      console.info(this.formatMessage("info", message, data));
    }
  }

  /**
   * Warning level logging
   */
  warn(message: string, data?: unknown): void {
    if (this.shouldLog("warn")) {
      console.warn(this.formatMessage("warn", message, data));
    }
  }

  /**
   * Error level logging
   */
  error(message: string, error?: unknown): void {
    if (this.shouldLog("error")) {
      const errorData = error instanceof Error
        ? { name: error.name, message: error.message, stack: error.stack }
        : error;
      console.error(this.formatMessage("error", message, errorData));
    }
  }

  /**
   * Performance measurement
   */
  time(label: string): void {
    if (this.config.enabled) {
      console.time(label);
    }
  }

  /**
   * End performance measurement
   */
  timeEnd(label: string): void {
    if (this.config.enabled) {
      console.timeEnd(label);
    }
  }
}

/**
 * Singleton logger instance
 */
export const logger = new Logger();
