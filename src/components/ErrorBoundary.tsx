// ============================================
// ErrorBoundary — catches React render errors in the overlay
// Prevents a single component crash from taking down
// the entire sync UI.
// ============================================
import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('[EFT] React overlay error:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div
          style={{
            position: 'fixed',
            right: 10,
            bottom: 10,
            zIndex: 99999,
            background: '#1a1a2e',
            padding: 10,
            border: '1px solid #f44336',
            borderRadius: 8,
            maxWidth: 280,
            color: '#f44336',
            fontSize: 12,
          }}
        >
          <strong>⚠ 同步面板出错</strong>
          <div style={{ marginTop: 4, color: '#aaa' }}>
            {this.state.error?.message ?? '未知错误'}
          </div>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: 6,
              padding: '2px 8px',
              background: '#f44336',
              color: '#fff',
              border: 'none',
              borderRadius: 3,
              cursor: 'pointer',
            }}
          >
            重试
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
