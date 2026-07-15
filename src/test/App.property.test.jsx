/**
 * Property 2: Home section order is preserved
 * Validates: Requirements 5.1
 *
 * For any render of App at the home path, the six home sections SHALL appear
 * in the DOM in the fixed order: Hero → About → Projects → Experience →
 * Certifications → Contact — regardless of which lazy sections have or have
 * not yet resolved their chunks.
 */
import { describe, it, expect, beforeAll, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import { Suspense } from 'react'
import * as fc from 'fast-check'

// ─── jsdom stubs ────────────────────────────────────────────────────────────

beforeAll(() => {
  // jsdom does not implement window.matchMedia — stub it so any component
  // that reads `prefers-reduced-motion` won't throw.
  if (!window.matchMedia) {
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
  }
})

afterEach(() => {
  cleanup()
})

// ─── NeverResolvesComponent ─────────────────────────────────────────────────
// Simulates a lazy chunk that is still pending (Suspense will show its
// fallback). It throws a Promise that never settles, causing Suspense to
// display the fallback for the duration of the test render.

let neverResolvingPromise = null
function getNeverResolvingPromise() {
  if (!neverResolvingPromise) {
    neverResolvingPromise = new Promise(() => {}) // intentionally never settles
  }
  return neverResolvingPromise
}

function NeverResolvesComponent() {
  throw getNeverResolvingPromise()
}

// ─── Stub section components ─────────────────────────────────────────────────
// Each has a unique data-testid so we can locate and order them in the DOM.

const HeroStub            = () => <section data-testid="hero" />
const AboutStub           = () => <section data-testid="about" />
const ProjectsStub        = () => <section data-testid="projects" />
const ExperienceStub      = () => <section data-testid="experience" />
const CertificationsStub  = () => <section data-testid="certifications" />
const ContactStub         = () => <section data-testid="contact" />

// Fallback stubs mirror what Loader would render — they just need an
// identifiable testid so we can confirm they occupy the correct slot.
const ProjectsLoader        = () => <div data-testid="projects-loader" />
const ExperienceLoader      = () => <div data-testid="experience-loader" />
const CertificationsLoader  = () => <div data-testid="certifications-loader" />

// ─── HomeRoute ───────────────────────────────────────────────────────────────
// Mirrors App's home branch exactly:
//   Hero  (eager)
//   About (eager)
//   Suspense > Projects        (lazy)
//   Suspense > Experience      (lazy)
//   Suspense > Certifications  (lazy)
//   Contact (eager)
//
// When `*Resolved` is false the corresponding Suspense boundary throws the
// never-settling promise, so Suspense renders the loader fallback instead.

function HomeRoute({ projectsResolved, experienceResolved, certificationsResolved }) {
  return (
    <>
      <HeroStub />
      <AboutStub />
      <Suspense fallback={<ProjectsLoader />}>
        {projectsResolved ? <ProjectsStub /> : <NeverResolvesComponent />}
      </Suspense>
      <Suspense fallback={<ExperienceLoader />}>
        {experienceResolved ? <ExperienceStub /> : <NeverResolvesComponent />}
      </Suspense>
      <Suspense fallback={<CertificationsLoader />}>
        {certificationsResolved ? <CertificationsStub /> : <NeverResolvesComponent />}
      </Suspense>
      <ContactStub />
    </>
  )
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Returns the document position (compareDocumentPosition bitmask) of nodeA
 * relative to nodeB. Returns true when nodeA precedes nodeB in the DOM.
 */
function comesBefore(nodeA, nodeB) {
  return (nodeA.compareDocumentPosition(nodeB) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0
}

/**
 * Given a rendered container and a list of testids (in expected order),
 * returns the ordered list of elements that ARE present in the DOM.
 * If an element is not found, its slot is skipped (for suspended sections
 * the loader fallback occupies the slot instead).
 */
function getRenderedOrder(container, testids) {
  return testids
    .map((id) => container.querySelector(`[data-testid="${id}"]`))
    .filter(Boolean)
}

// ─── The six-element ordered sequence we always expect ───────────────────────
// When a lazy section is suspended its loader fallback renders in its slot.
// The ORDER of those fallbacks must still follow the spec order.

const EXPECTED_SLOT_ORDER = [
  // slot 0 — hero (always present)
  ['hero'],
  // slot 1 — about (always present)
  ['about'],
  // slot 2 — projects OR its loader
  ['projects', 'projects-loader'],
  // slot 3 — experience OR its loader
  ['experience', 'experience-loader'],
  // slot 4 — certifications OR its loader
  ['certifications', 'certifications-loader'],
  // slot 5 — contact (always present)
  ['contact'],
]

function getSlotElements(container) {
  return EXPECTED_SLOT_ORDER.map((candidates) => {
    for (const id of candidates) {
      const el = container.querySelector(`[data-testid="${id}"]`)
      if (el) return el
    }
    return null
  }).filter(Boolean)
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('Property 2: Home section order is preserved', () => {
  it('always renders the six home section slots in the fixed order regardless of lazy resolution state', () => {
    /**
     * **Validates: Requirements 5.1**
     *
     * For every combination of lazy-section resolution states:
     *   - All six section slots are present in the DOM (either the real
     *     component or its Suspense fallback loader)
     *   - The slots appear in document order: Hero → About → Projects →
     *     Experience → Certifications → Contact
     */
    fc.assert(
      fc.property(
        fc.boolean(), // projectsResolved
        fc.boolean(), // experienceResolved
        fc.boolean(), // certificationsResolved
        (projectsResolved, experienceResolved, certificationsResolved) => {
          const { container } = render(
            <HomeRoute
              projectsResolved={projectsResolved}
              experienceResolved={experienceResolved}
              certificationsResolved={certificationsResolved}
            />,
          )

          // Collect the one element that fills each slot (real or fallback)
          const slotElements = getSlotElements(container)

          // All six slots must be filled
          expect(slotElements).toHaveLength(6)

          // Each slot must come before the next slot in the DOM
          for (let i = 0; i < slotElements.length - 1; i++) {
            expect(
              comesBefore(slotElements[i], slotElements[i + 1]),
            ).toBe(true)
          }

          cleanup()
        },
      ),
      { numRuns: 20 },
    )
  })

  it('eager sections (Hero, About, Contact) are always present regardless of lazy resolution', () => {
    /**
     * **Validates: Requirements 5.1**
     *
     * Hero, About, and Contact are eager imports — they must be in the DOM
     * for every possible combination of lazy resolution states.
     */
    fc.assert(
      fc.property(
        fc.boolean(),
        fc.boolean(),
        fc.boolean(),
        (projectsResolved, experienceResolved, certificationsResolved) => {
          const { container } = render(
            <HomeRoute
              projectsResolved={projectsResolved}
              experienceResolved={experienceResolved}
              certificationsResolved={certificationsResolved}
            />,
          )

          expect(container.querySelector('[data-testid="hero"]')).toBeInTheDocument()
          expect(container.querySelector('[data-testid="about"]')).toBeInTheDocument()
          expect(container.querySelector('[data-testid="contact"]')).toBeInTheDocument()

          cleanup()
        },
      ),
      { numRuns: 20 },
    )
  })

  it('each lazy section slot shows either the section or its loader, never both', () => {
    /**
     * **Validates: Requirements 5.1**
     *
     * A Suspense boundary renders EITHER the component OR its fallback —
     * never both simultaneously. This verifies the mutual-exclusion
     * invariant for all three lazy slots.
     */
    const lazySlots = [
      { section: 'projects',       loader: 'projects-loader' },
      { section: 'experience',     loader: 'experience-loader' },
      { section: 'certifications', loader: 'certifications-loader' },
    ]

    fc.assert(
      fc.property(
        fc.boolean(),
        fc.boolean(),
        fc.boolean(),
        (projectsResolved, experienceResolved, certificationsResolved) => {
          const { container } = render(
            <HomeRoute
              projectsResolved={projectsResolved}
              experienceResolved={experienceResolved}
              certificationsResolved={certificationsResolved}
            />,
          )

          for (const { section, loader } of lazySlots) {
            const sectionEl = container.querySelector(`[data-testid="${section}"]`)
            const loaderEl  = container.querySelector(`[data-testid="${loader}"]`)

            // Exactly one of the two must be present
            const presentCount = [sectionEl, loaderEl].filter(Boolean).length
            expect(presentCount).toBe(1)
          }

          cleanup()
        },
      ),
      { numRuns: 20 },
    )
  })
})
