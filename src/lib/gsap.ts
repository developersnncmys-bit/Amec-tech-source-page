"use client";

import { useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Prevent mobile URL-bar show/hide from re-triggering pin recomputation,
  // which manifests as pinned sections "jumping" on address-bar transitions.
  ScrollTrigger.config({ ignoreMobileResize: true });

  // Coalesce all initial pin setup into a single refresh once the page (and
  // its images) have fully loaded. Without this, every section schedules its
  // own refresh on mount, they all fire at once, each refresh recomputes
  // every trigger, and images resolving late cause pin spacers to jump
  // mid-scroll.
  const runOnceLoaded = () => {
    // Two rAFs: let React finish committing DOM + let the browser lay out
    // pin-spacers before we take the measurement.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => ScrollTrigger.refresh())
    );
  };

  if (document.readyState === "complete") {
    runOnceLoaded();
  } else {
    window.addEventListener("load", runOnceLoaded, { once: true });
  }
}

// GSAP setup MUST run in useLayoutEffect on the client — its cleanup
// (ctx.revert() → unwrap pin-spacer) has to complete synchronously before
// React commits DOM removals, otherwise React throws `removeChild` on
// route navigation because pinned nodes have been moved into GSAP's
// pin-spacer wrapper. On the server we fall back to useEffect to avoid
// the SSR warning; the effect never runs there anyway.
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export { gsap, ScrollTrigger };
