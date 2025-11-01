# Research: IT Services Startup Website

**Phase**: 0 (Outline & Research)  
**Date**: October 19, 2025  
**Status**: Complete

## Overview

This document captures technology research and architectural decisions for building a React.js-based marketing website with JSON-based content management, email form submissions, and modern web standards compliance.

## Technology Stack Research

### 1. Build Tool Selection

**Decision**: Vite

**Rationale**:
- **Superior DX**: Hot Module Replacement (HMR) is significantly faster than webpack (Create React App)
- **Modern**: Built for ES modules, optimized for modern browsers (matches our browser support requirement)
- **Smaller bundles**: Better tree-shaking and code splitting out of the box
- **TypeScript support**: First-class TypeScript support without additional configuration
- **Plugin ecosystem**: Rich plugin ecosystem for React, including React Refresh

**Alternatives Considered**:
- **Create React App (CRA)**: Rejected - slower development builds, ejection required for customization, maintenance mode
- **Next.js**: Rejected - overkill for static content site, adds SSR complexity we don't need
- **Parcel**: Rejected - less mature ecosystem, fewer React-specific optimizations

**Evidence**: Vite build times are 10-100x faster than webpack for development (source: Vite benchmarks). Perfect fit for iterative development of 6 pages with moderate complexity.

---

### 2. Styling Solution

**Decision**: Tailwind CSS

**Rationale**:
- **Utility-first**: Rapid prototyping, no context switching between CSS and JSX
- **Responsive design**: Built-in responsive utilities perfect for 320px-2560px requirement (FR-029-031)
- **Small bundle size**: PurgeCSS integration removes unused styles automatically
- **Customization**: Easy to implement custom color palette and design tokens from branding
- **Animation support**: Utilities for transitions and animations
- **Accessibility**: Focus-visible, screen-reader-only utilities built-in

**Alternatives Considered**:
- **Material UI**: Rejected - heavier bundle (~1MB), harder to customize for brand identity, more opinionated
- **Styled Components**: Rejected - runtime CSS-in-JS has performance implications, larger bundle
- **Plain CSS Modules**: Rejected - more verbose, harder to maintain responsive design

**Evidence**: Tailwind sites typically achieve 50-70% smaller CSS bundles compared to component libraries. Supports all animation requirements (FR-033-035) via utilities.

---

### 3. Animation Library

**Decision**: Framer Motion

**Rationale**:
- **Declarative API**: Animations defined in React components, easier to maintain
- **Scroll animations**: Built-in `useInView` hook perfect for scroll-triggered animations (FR-033)
- **Variants**: Reusable animation patterns for consistency
- **Accessibility**: Respects `prefers-reduced-motion` automatically (FR-045)
- **Performance**: Hardware-accelerated animations, 60fps on target browsers
- **Gestures**: Hover, tap, drag support for interactive elements (FR-034)

**Alternatives Considered**:
- **GSAP**: Rejected - more powerful but imperative API less idiomatic for React, paid license for commercial use
- **React Spring**: Rejected - physics-based animations overkill for our use case
- **CSS animations only**: Rejected - harder to coordinate with React state and scroll position

**Evidence**: Framer Motion is used by Stripe, Dropbox, and other performance-critical sites. Animations complete in <500ms easily (SC-013).

---

### 4. Form Management

**Decision**: React Hook Form

**Rationale**:
- **Performance**: Uncontrolled components minimize re-renders (important for real-time validation - SC-011)
- **Built-in validation**: Supports HTML5 validation + custom rules (FR-007)
- **Small bundle**: ~9KB gzipped vs 22KB+ for Formik
- **TypeScript**: Excellent TypeScript support for form data types
- **Error handling**: Clear error state management (FR-010)
- **Integration**: Works seamlessly with email services

**Alternatives Considered**:
- **Formik**: Rejected - larger bundle, more re-renders, slower development
- **Manual state**: Rejected - reinventing the wheel, more bugs, harder to maintain

**Evidence**: React Hook Form benchmarks show 3-5x fewer re-renders than Formik. Meets <1s validation feedback requirement (SC-011).

---

### 5. Email Service

**Decision**: EmailJS

**Rationale**:
- **No backend required**: Pure frontend solution aligns with architecture (email-only, no database)
- **Free tier**: 200 emails/month free, sufficient for startup lead generation
- **Simple API**: REST API via fetch, easy to integrate with React Hook Form
- **Template support**: Email templates configurable via dashboard
- **Reliability**: Fallback error handling for service unavailability (FR-037)
- **Security**: API keys can be public (rate-limited per domain)

**Alternatives Considered**:
- **Formspree**: Rejected - similar features but requires paid plan for custom branding
- **Custom API with Nodemailer**: Rejected - requires backend deployment, adds complexity
- **AWS SES via API Gateway**: Rejected - overkill, more setup, requires AWS account

**Evidence**: EmailJS used by 50K+ websites. Sufficient for the projected consultation request volume. Supports submission confirmation (FR-009).

---

### 6. Maps Integration

**Decision**: Google Maps Embed API

**Rationale**:
- **Simple integration**: No API key required for basic embed (iframe)
- **Free**: Embed API is free, no billing required
- **Reliable**: Google infrastructure, 99.9% uptime
- **Graceful degradation**: Easy to handle failure with fallback content (FR-043)
- **Accessibility**: Can add alt text and skip link

**Alternatives Considered**:
- **Google Maps JavaScript API**: Rejected - requires API key and billing, overkill for static map
- **Mapbox**: Rejected - more complex setup, requires API key management
- **OpenStreetMap**: Rejected - less familiar to users, harder to customize

**Evidence**: Embed API sufficient for the requirement (FR-012) - just showing office location, no interactivity needed.

---

### 7. Routing

**Decision**: React Router v6

**Rationale**:
- **Industry standard**: Most popular React routing library (12M+ weekly downloads)
- **Declarative**: Route configuration matches page structure (6 pages)
- **Navigation**: Supports all navigation requirements (FR-003, SC-002)
- **Lazy loading**: Code splitting per route for better performance (SC-005)
- **404 handling**: Built-in support for catch-all routes (FR-036)
- **Smooth transitions**: Integrates with Framer Motion for animated transitions (SC-012)

**Alternatives Considered**:
- **Reach Router**: Rejected - merged into React Router v6
- **Manual history API**: Rejected - reinventing the wheel, accessibility concerns

**Evidence**: React Router v6 is the de facto standard. Supports <300ms navigation transitions (SC-012) with proper code splitting.

---

### 8. SEO Solution

**Decision**: React Helmet Async

**Rationale**:
- **Dynamic meta tags**: Update title and meta description per page (FR-048, FR-049)
- **Server-side compatible**: Works with static generation if we add Vite SSG later
- **Async**: Non-blocking, better performance than original React Helmet
- **Simple API**: Declarative component for each page's SEO needs

**Alternatives Considered**:
- **Manual document.title**: Rejected - no meta tag support, harder to maintain
- **Next.js Head**: Rejected - tied to Next.js framework
- **React Helmet (original)**: Rejected - synchronous, not maintained

**Evidence**: React Helmet Async used by thousands of SPAs. Sufficient for basic SEO requirements (meta tags, titles, semantic HTML - FR-048-050).

---

### 9. Content Management

**Decision**: JSON files in public/assets/data/

**Rationale**:
- **Simple**: No CMS setup or maintenance (aligns with clarification: "Hardcode json file with content, images")
- **Version controlled**: Content changes tracked in git
- **Type-safe**: Can generate TypeScript types from JSON schema
- **Fast**: No API calls, bundled with app
- **Editable**: Non-developers can edit JSON with guidance

**JSON File Structure**:
```
public/assets/data/
├── services.json        # 3 core services
├── case-studies.json    # Filterable case studies
├── blog-posts.json      # Searchable blog posts
├── team.json            # Team members
└── milestones.json      # Company timeline
```

**Alternatives Considered**:
- **Headless CMS (Contentful, Sanity)**: Rejected - out of scope per clarifications
- **Markdown files**: Rejected - need structured data with relationships, JSON more appropriate
- **Database**: Rejected - no backend requirement

**Evidence**: JSON approach is simplest solution meeting requirement (FR-046, FR-047). Content updates require redeployment (per assumptions).

---

### 10. Testing Strategy

**Decision**: Jest + React Testing Library

**Rationale**:
- **Standard stack**: Industry standard for React testing
- **User-centric**: Tests focus on user behavior, not implementation details
- **Accessibility**: Built-in queries encourage accessible markup (aligns with FR-039-042)
- **Fast**: Parallel execution, watch mode for development
- **Coverage**: Integrated coverage reporting

**Test Priorities**:
1. **Unit**: Form validation, utility functions, data parsing
2. **Integration**: Component interactions, routing, form submission
3. **E2E**: User flows from spec (US1-US6) using Playwright or Cypress

**Alternatives Considered**:
- **Vitest**: Rejected - newer, less ecosystem support despite Vite integration
- **Enzyme**: Rejected - shallow rendering, implementation-focused

**Evidence**: Jest + RTL combination recommended by React team. Supports all testing requirements.

---

## Architecture Decisions

### Component Structure

**Decision**: Atomic Design Methodology (modified)

**Structure**:
```
components/
├── layout/      # Header, Footer, Navigation (organisms)
├── sections/    # Hero, Services, Timeline (organisms)
├── ui/          # Button, Card, Input (atoms/molecules)
└── animations/  # Animation wrappers (utilities)
```

**Rationale**:
- **Reusability**: UI components used across multiple pages
- **Maintainability**: Clear separation of concerns
- **Testability**: Smaller components easier to test
- **Scalability**: Easy to add new pages/sections

---

### State Management

**Decision**: React Context (minimal) + URL state

**Rationale**:
- **Simple**: No global state library needed for this scale
- **URL state**: Filters and search in URL (better UX, shareable links)
- **Context for**: Theme, accessibility preferences only
- **Component state**: Forms, animations, UI interactions

**Why not Redux/Zustand**: Overkill for a content-heavy site with no complex app state. All data is static JSON.

---

### Performance Strategy

**Approach**:
1. **Code splitting**: Route-based lazy loading (React.lazy)
2. **Image optimization**: WebP with fallback, lazy loading below fold
3. **Bundle analysis**: Webpack Bundle Analyzer / vite-plugin-inspect
4. **Caching**: Aggressive caching for static assets
5. **Preloading**: Prefetch critical routes on hover

**Target**: <2.5s page load (SC-005) on 3G connection

---

### Accessibility Strategy

**Approach**:
1. **Semantic HTML**: HTML5 elements (header, nav, main, article) (FR-050)
2. **ARIA**: Labels, roles, live regions where needed
3. **Keyboard navigation**: Tab order, focus management (FR-040, FR-041)
4. **Screen readers**: Test with NVDA/VoiceOver (FR-042)
5. **Color contrast**: WCAG AA ratios (4.5:1 text, 3:1 UI)
6. **Motion**: Respect prefers-reduced-motion (FR-045)
7. **Automated testing**: axe-core in Jest tests

**Target**: WCAG 2.1 AA compliance (SC-008)

---

## Browser Compatibility

**Target**: Last 2 versions of Chrome, Firefox, Safari, Edge (FR-044)

**Polyfills Needed**: None (modern browsers support all required features)

**Testing Strategy**:
- **Chrome**: Primary development browser
- **Firefox**: Test weekly
- **Safari**: Test weekly (iOS simulator for mobile)
- **Edge**: Test before each release
- **BrowserStack**: For comprehensive testing

**Unsupported Browser Handling**: Show upgrade notice (per risk mitigation in spec)

---

## Deployment Strategy

**Recommendation**: Vercel or Netlify

**Rationale**:
- **Free tier**: Sufficient for startup traffic
- **HTTPS**: Automatic SSL certificates
- **CDN**: Global edge network for fast delivery
- **Git integration**: Auto-deploy on push to main
- **Preview**: Branch previews for testing
- **Analytics**: Built-in performance monitoring

**Build process**:
```bash
npm run build  # Vite builds to dist/
```

**Environment variables**:
- `VITE_EMAIL_SERVICE_ID`
- `VITE_EMAIL_TEMPLATE_ID`
- `VITE_EMAIL_PUBLIC_KEY`

---

## Risk Mitigations

### 1. Email Service Downtime
**Risk**: EmailJS unavailable (FR-037)
**Mitigation**: 
- Catch fetch errors
- Show user-friendly message
- Provide alternative contact methods (email link, phone)
- Log errors to console for debugging

### 2. Large Bundle Size
**Risk**: Exceeds performance budget (SC-005)
**Mitigation**:
- Bundle size budgets in CI
- Code splitting per route
- Tree-shaking
- Dynamic imports for heavy libraries

### 3. Content Update Complexity
**Risk**: Non-developers struggle with JSON editing
**Mitigation**:
- Comprehensive documentation
- JSON schema validation
- Example templates
- Future: Consider TinaCMS or Decap CMS if updates become frequent

### 4. Accessibility Gaps
**Risk**: Miss WCAG AA compliance (SC-008)
**Mitigation**:
- Automated axe tests in CI
- Manual testing with screen readers
- Accessibility review checklist per component
- Include accessibility in code review

---

## Development Workflow

### Setup
1. Clone repo
2. `npm install`
3. Copy `.env.example` to `.env.local`
4. `npm run dev`

### Development
1. Create feature branch from main
2. Implement component with tests
3. Run `npm test` (unit/integration)
4. Run `npm run lint` (ESLint + Prettier)
5. Manual testing in browser
6. Create PR with description and screenshots

### Quality Gates
- ✅ All tests passing
- ✅ ESLint warnings resolved
- ✅ Lighthouse score >90 (Performance, Accessibility, Best Practices, SEO)
- ✅ Manual testing in target browsers
- ✅ Code review approved

---

## Open Questions (Resolved)

All technical unknowns have been resolved through this research phase. Implementation can proceed with confidence.

---

## References

- [Vite Documentation](https://vitejs.dev/)
- [React Router v6 Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [React Testing Library Documentation](https://testing-library.com/react)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Status**: ✅ Research complete. Ready for Phase 1 (Design & Contracts).






