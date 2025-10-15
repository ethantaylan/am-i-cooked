/**
 * Application Entry Point
 * Sets up React root with providers, Error Boundary, and theming
 * @module main
 */

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AppProvider } from "./contexts/AppContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { logger } from "./utils/logger";
import "./index.css";

// Log application startup
logger.info("🚀 Application starting...", {
  mode: import.meta.env.MODE,
  version: import.meta.env.VITE_APP_VERSION || "2.0.0",
});

// Performance monitoring
if (import.meta.env.MODE === "development") {
  logger.time("App Initial Render");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <AppProvider>
        <App />
      </AppProvider>
    </ErrorBoundary>
  </StrictMode>
);

// Log successful render
if (import.meta.env.MODE === "development") {
  logger.timeEnd("App Initial Render");
  logger.info("✅ Application rendered successfully");
}
