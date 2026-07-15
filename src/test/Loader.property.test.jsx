/**
 * Property 1: Loader renders safely without onComplete
 * Validates: Requirements 3.1, 3.2
 *
 * For any render of the Loader component where the onComplete prop is absent
 * or undefined, the component SHALL complete its render cycle without throwing
 * a runtime error, and SHALL display its visual loading indicator.
 */
import { describe, it, expect, beforeAll, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import * as fc from 'fast-check'
import Loader from '../components/Loader'

// jsdom does not implement window.matchMedia — stub it so Loader's useEffect
// can read `prefers-reduced-motion` without throwing.
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  })
})

afterEach(() => {
  cleanup()
})

describe('Property 1: Loader renders safely without onComplete', () => {
  it('mounts without throwing and shows the loader when onComplete is absent', () => {
    // Arbitraries that represent "no onComplete" — undefined or simply omitted
    const noOnComplete = fc.oneof(
      fc.constant(undefined),
      fc.constant(null),
    )

    fc.assert(
      fc.property(noOnComplete, (onCompleteValue) => {
        let container
        expect(() => {
          ;({ container } = render(<Loader onComplete={onCompleteValue} />))
        }).not.toThrow()

        // The loader motion.div has aria-label="Loading portfolio"
        const loaderEl = container.querySelector('[aria-label="Loading portfolio"]')
        expect(loaderEl).toBeInTheDocument()
      }),
      { numRuns: 20 },
    )
  })

  it('mounts without throwing when onComplete prop is not passed at all', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        let container
        expect(() => {
          ;({ container } = render(<Loader />))
        }).not.toThrow()

        const loaderEl = container.querySelector('[aria-label="Loading portfolio"]')
        expect(loaderEl).toBeInTheDocument()
      }),
      { numRuns: 5 },
    )
  })
})
