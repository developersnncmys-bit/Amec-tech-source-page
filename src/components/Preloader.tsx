"use client";

import { useEffect, useState } from "react";

const MIN_DISPLAY_MS = 1400;
const FADE_MS = 700;

export function Preloader() {
  const [phase, setPhase] = useState<"visible" | "fading" | "hidden">("visible");

  useEffect(() => {
    let removeTimer: number | undefined;
    const startFade = window.setTimeout(() => {
      setPhase("fading");
      removeTimer = window.setTimeout(() => setPhase("hidden"), FADE_MS);
    }, MIN_DISPLAY_MS);

    return () => {
      window.clearTimeout(startFade);
      if (removeTimer !== undefined) window.clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div
      aria-hidden={phase !== "visible"}
      role="status"
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-black"
      style={{
        opacity: phase === "visible" ? 1 : 0,
        visibility: phase === "hidden" ? "hidden" : "visible",
        transition: `opacity ${FADE_MS}ms ease`,
      }}
    >
      <div className="relative flex flex-col items-center gap-6">
        {/* Plain <img> — avoids next/image wrapper elements interacting with
            page-level GSAP pin-spacers during hydration. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/amec logo.png"
          alt="AMEC Technology"
          width={200}
          height={50}
          className="h-8 w-auto md:h-10"
          style={{ animation: "preloader-fade-in 900ms ease-out both" }}
        />

        {/* Thin light bar loader */}
        <div className="relative h-px w-40 overflow-hidden bg-white/10">
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-1/3 bg-white/80"
            style={{ animation: "preloader-sweep 1.6s ease-in-out infinite" }}
          />
        </div>
      </div>
    </div>
  );
}
