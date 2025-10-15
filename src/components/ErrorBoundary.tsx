/* eslint-disable react/no-unescaped-entities */
/**
 * Error Boundary Component
 * Catches and handles React errors gracefully
 * @module components/ErrorBoundary
 */

import { Component, ErrorInfo, ReactNode } from "react";
import { logger } from "../utils/logger";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary to catch React errors
 * Prevents the entire app from crashing
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console
    logger.error("React Error Boundary caught an error", {
      error: error.toString(),
      componentStack: errorInfo.componentStack,
    });

    // Update state
    this.setState({
      error,
      errorInfo,
    });

    // Here you could send to error tracking service (Sentry, etc.)
    // trackError(error, errorInfo);
  }

  private handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen w-screen bg-black flex items-center justify-center text-white p-8">
          <div className="max-w-md text-center space-y-6">
            <div className="text-6xl">💥</div>
            <h1 className="text-3xl font-bold">Oops! Something went wrong</h1>
            <p className="text-gray-400">
              We encountered an unexpected error. Don&apos;t worry, it&apos;s not your
              fault!
            </p>

            {import.meta.env.MODE === "development" && this.state.error && (
              <details className="text-left bg-gray-900 rounded-lg p-4 mt-4">
                <summary className="cursor-pointer text-red-400 font-mono text-sm mb-2">
                  Error Details (Dev Only)
                </summary>
                <pre className="text-xs overflow-auto text-gray-300">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <button
              onClick={this.handleReset}
              className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Try Again
            </button>

            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-gray-800 text-white font-bold rounded-full hover:bg-gray-700 transition-all duration-300 ml-4"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
