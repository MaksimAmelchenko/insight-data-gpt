import React from 'react';

export class ErrorBoundary extends React.Component<any> {
  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(errorInfo);
    // window.Sentry?.captureException(error);
    if (process.env.NODE_ENV === 'production') {
      window.location.reload();
    }
  }

  override render() {
    return this.props.children;
  }
}
