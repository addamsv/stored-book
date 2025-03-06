import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "app/App";
import { ThemeProvider } from "resources/store/ThemeProvider";
import "resources/config/i18n/i18n";
import { ErrorBoundary } from "shared/Error";
import { StoreProvider } from "resources/store/StoreProvider";
import { ErrorWidget } from "widgets/Error";

render(
  <StoreProvider>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ErrorBoundary WidgetOfError={ErrorWidget}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StoreProvider>,

  document.getElementById("root")
);
