import { BrowserRouter } from "react-router-dom";
import App from "app/App";
import { ThemeProvider } from "resources/store/ThemeProvider";
import "resources/config/i18n/i18n";
import { ErrorBoundary } from "shared/Error";
import { StoreProvider } from "resources/store/StoreProvider";
import { ErrorWidget } from "widgets/Error";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Could not found root container");
}

const root = createRoot(container);

root.render(
  <StoreProvider>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ErrorBoundary WidgetOfError={ErrorWidget}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StoreProvider>
);
