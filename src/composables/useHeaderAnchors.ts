import slugifyLib from 'slugify';

export interface UseHeaderAnchorsOptions {
  rootSelector?: string;
  headingSelector?: string; // e.g. 'h2, h3' or 'h1, h2, h3, h4'
}

/**
 * Ensure all headings under the root have stable ids, tabindex and a header anchor.
 * Ids are slugified from the visible text if missing.
 */
export function ensureHeaderAnchors(options: UseHeaderAnchorsOptions = {}): void {
  if (typeof window === 'undefined') return;

  const rootSelector = options.rootSelector || '.is--content, .VPDoc, main, #app';
  const headingSelector = options.headingSelector || 'h2, h3';

  const root = document.querySelector(rootSelector);
  if (!root) return;

  const headings = root.querySelectorAll(headingSelector);
  headings.forEach((h) => {
    const heading = h as HTMLElement;

    let id = heading.getAttribute('id');
    if (!id) {
      const text = heading.textContent?.trim() || '';
      if (!text) return;
      id = slugifyLib(text, { lower: true, strict: true });
      heading.setAttribute('id', id);
    }

    if (!heading.hasAttribute('tabindex')) {
      heading.setAttribute('tabindex', '-1');
    }

    const existing = heading.querySelector('a.header-anchor') as HTMLAnchorElement | null;
    if (existing) {
      if (existing.getAttribute('href') !== `#${id}`) {
        existing.setAttribute('href', `#${id}`);
      }
      // Remove aria-hidden to fix accessibility issue - anchor links are focusable
      existing.removeAttribute('aria-hidden');
      // Add tabindex="-1" to keep it out of tab order but allow programmatic focus
      if (existing.getAttribute('tabindex') !== '-1') {
        existing.setAttribute('tabindex', '-1');
      }
      // Add aria-label for better accessibility
      if (!existing.getAttribute('aria-label')) {
        existing.setAttribute('aria-label', `Link to this section: ${heading.textContent?.trim() || ''}`);
      }
      return;
    }

    const a = document.createElement('a');
    a.className = 'header-anchor';
    a.setAttribute('href', `#${id}`);
    a.setAttribute('tabindex', '-1');
    a.setAttribute('aria-label', `Link to this section: ${heading.textContent?.trim() || ''}`);
    heading.insertBefore(a, heading.firstChild);
  });
}

/**
 * Waits until at least one heading exists with non-empty content under the root.
 */
export function waitForHeadings(options: UseHeaderAnchorsOptions = {}, timeoutMs = 3000): Promise<void> {
  return new Promise<void>((resolve) => {
    const rootSelector = options.rootSelector || '.is--content, .VPDoc, main, #app';
    const headingSelector = options.headingSelector || 'h2, h3';

    const root = document.querySelector(rootSelector);
    if (!root) {
      resolve();
      return;
    }

    const found = () => {
      const headings = root.querySelectorAll(headingSelector);
      return headings.length > 0 && Array.from(headings).some(h => h.textContent?.trim());
    };

    if (found()) {
      setTimeout(() => resolve(), 100);
      return;
    }

    const observer = new MutationObserver(() => {
      if (found()) {
        observer.disconnect();
        setTimeout(() => resolve(), 100);
      }
    });

    observer.observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
    });

    setTimeout(() => {
      observer.disconnect();
      resolve();
    }, timeoutMs);
  });
}

/**
 * Convenience helper to run normalization now and on demand.
 */
export function useHeaderAnchors(options: UseHeaderAnchorsOptions = {}) {
  return {
    ensure: () => ensureHeaderAnchors(options),
    wait: (timeoutMs?: number) => waitForHeadings(options, timeoutMs),
  };
}


