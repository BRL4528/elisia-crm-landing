import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Isolates 3D/WebGL crashes. If the scene throws, the rest of the page
 * (DOM sections, panels, cursor, scroll) still renders normally, and
 * the actual error.message is exposed in a fixed banner at the top so
 * we can see exactly which prop/instance is failing.
 */
export class SceneErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error("[SceneErrorBoundary]", error.message, error);
  }

  render() {
    if (this.state.error) {
      return (
        <>
          {/* Visual fallback so the page is not blank */}
          <div
            className="scene-layer"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse at 50% 35%, rgba(52,211,153,0.18), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(34,211,238,0.14), transparent 60%), #0b1418",
            }}
          />
          {/* Diagnostic banner — shows the actual error.message */}
          <div
            role="alert"
            className="fixed top-0 inset-x-0 z-[9999] bg-red-950/95 text-red-50 border-b border-red-400/40 px-4 py-2 text-[12px] font-mono backdrop-blur-md"
          >
            <strong className="text-red-300 mr-2">[scene]</strong>
            <span className="opacity-90">{this.state.error.message}</span>
          </div>
        </>
      );
    }
    return this.props.children;
  }
}
