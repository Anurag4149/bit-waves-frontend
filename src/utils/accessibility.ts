/**
 * Accessibility utility functions
 * FR-040, FR-041: Focus management and keyboard navigation
 */

/**
 * Trap focus within a modal or dialog
 * Used for accessible modals and mobile menus
 */
export function trapFocus(element: HTMLElement): () => void {
  const focusableElements = element.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab: focus last element if current is first
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable?.focus();
      }
    } else {
      // Tab: focus first element if current is last
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);

  // Focus first element
  firstFocusable?.focus();

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
}

/**
 * Restore focus to previously focused element
 * Used when closing modals or navigating back
 */
export function saveFocus(): () => void {
  const previouslyFocused = document.activeElement as HTMLElement;

  return () => {
    if (previouslyFocused && previouslyFocused.focus) {
      previouslyFocused.focus();
    }
  };
}

/**
 * Focus element with optional delay
 * Useful for focusing after DOM updates
 */
export function focusElement(selector: string, delay = 0): void {
  const focus = () => {
    const element = document.querySelector<HTMLElement>(selector);
    if (element) {
      element.focus();
    }
  };

  if (delay > 0) {
    setTimeout(focus, delay);
  } else {
    focus();
  }
}

/**
 * Create skip link for keyboard navigation
 * FR-088: Skip links for keyboard users
 */
export interface SkipLink {
  href: string;
  label: string;
}

/**
 * Generate skip link component props
 */
export function createSkipLink(targetId: string, label: string): SkipLink {
  return {
    href: `#${targetId}`,
    label,
  };
}

/**
 * Check if user prefers reduced motion
 * FR-045: Respect prefers-reduced-motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Add reduced motion listener
 * Returns cleanup function
 */
export function onReducedMotionChange(callback: (prefersReduced: boolean) => void): () => void {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
    callback(e.matches);
  };

  // Call immediately with current state
  handleChange(mediaQuery);

  // Listen for changes
  mediaQuery.addEventListener('change', handleChange);

  // Return cleanup function
  return () => {
    mediaQuery.removeEventListener('change', handleChange);
  };
}

/**
 * Announce message to screen readers
 * Uses ARIA live region
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  // Find or create live region
  let liveRegion = document.getElementById('aria-live-region');
  
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'aria-live-region';
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only'; // Visually hidden
    document.body.appendChild(liveRegion);
  }

  // Update aria-live priority if needed
  if (liveRegion.getAttribute('aria-live') !== priority) {
    liveRegion.setAttribute('aria-live', priority);
  }

  // Clear and set new message
  liveRegion.textContent = '';
  setTimeout(() => {
    liveRegion!.textContent = message;
  }, 100); // Small delay ensures screen reader picks up the change
}

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
  return Array.from(container.querySelectorAll<HTMLElement>(selector));
}

/**
 * Check if element is visible
 */
export function isElementVisible(element: HTMLElement): boolean {
  return !!(
    element.offsetWidth ||
    element.offsetHeight ||
    element.getClientRects().length
  );
}




