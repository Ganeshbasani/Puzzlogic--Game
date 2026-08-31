import { Component, type ReactNode } from "react";

interface Props { children: ReactNode }
interface State { hasError: boolean; message: string }

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <div className="text-5xl">🌊</div>
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground mb-2">Something went wrong</h2>
          <p className="text-sm text-muted-foreground mb-6">Don't worry — your progress is saved. Try refreshing.</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary-gradient px-8 py-3"
        >
          Refresh App
        </button>
      </div>
    );
  }
}

export default ErrorBoundary;
