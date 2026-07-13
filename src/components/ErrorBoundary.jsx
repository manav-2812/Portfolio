import { Component } from 'react'

/**
 * ErrorBoundary — wraps Scene3D to catch WebGL init failures gracefully.
 * On corporate laptops with disabled hardware acceleration or outdated GPUs,
 * Three.js can throw during canvas setup. Without this, the entire Hero would
 * go blank. With it, the static gradient background (already in the Suspense
 * fallback) stays visible and the rest of the page functions normally.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // Log for debugging — remove in production if you prefer
    console.warn('[Scene3D] WebGL error caught by boundary:', error, info)
  }

  render() {
    if (this.state.hasError) {
      // Graceful fallback — matches the Suspense fallback background
      return (
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(124,58,237,0.12) 0%, rgba(10,10,15,1) 70%)',
          }}
        />
      )
    }
    return this.props.children
  }
}
