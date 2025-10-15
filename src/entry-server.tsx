/**
 * Server Entry Point for SSR
 * Renders the React app to HTML string on the server
 * @module entry-server
 */

import { StrictMode } from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App.tsx";
import { AppProvider } from "./contexts/AppContext";
import { ErrorBoundary } from "./components/ErrorBoundary";

/**
 * Renders the app to an HTML string
 * @returns The rendered HTML string
 */
export function render() {
  const html = ReactDOMServer.renderToString(
    <StrictMode>
      <ErrorBoundary>
        <AppProvider>
          <App />
        </AppProvider>
      </ErrorBoundary>
    </StrictMode>
  );

  return { html };
}
