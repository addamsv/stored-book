import React, { ComponentType, ErrorInfo, ReactNode, ReactPropTypes, Suspense } from "react";

interface ErrorBoundaryProps {
  WidgetOfError?: ComponentType<any>;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log("appLoggerService:"); // , error, errorInfo
  }

  render(): React.ReactNode {
    const { hasError } = this.state;
    const { children, WidgetOfError = null } = this.props;

    const Err = (WidgetOfError ? <WidgetOfError /> : null);
    return hasError ? (
      <Suspense fallback="">
        {Err}
      </Suspense>
    ) : children;
  }
}

export default ErrorBoundary;
