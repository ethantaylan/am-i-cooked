/**
 * Client Entry Point for SSR
 * Hydrates the server-rendered HTML on the client side
 * @module entry-client
 */

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AppProvider } from "./contexts/AppContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { logger } from "./utils/logger";
import "./index.css";

// Log application startup
logger.info("🚀 Client hydration starting...", {
  mode: import.meta.env.MODE,
  version: import.meta.env.VITE_APP_VERSION || "2.0.0",
});

// Performance monitoring
if (import.meta.env.MODE === "development") {
  logger.time("Client Hydration");
}

// Hydrate the server-rendered HTML
ReactDOM.hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <ErrorBoundary>
      <AppProvider>
        <App />
      </AppProvider>
    </ErrorBoundary>
  </StrictMode>
);

// Log successful hydration
if (import.meta.env.MODE === "development") {
  logger.timeEnd("Client Hydration");
  logger.info("✅ Client hydration completed successfully");
}
