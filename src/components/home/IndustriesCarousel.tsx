"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { AnimateIn } from "@/components/AnimateIn";
import { ChevronLeft, ChevronRight } from "@/components/Icons";

const INDUSTRIES = [
  { title: "Electric Mobility", image: "/images/electric--mobility.png" },
  { title: "Renewable Energy", image: "/images/renewable-energy.png" },
  { title: "OEMs & Startups", image: "/images/OEM%20%26%20Startup.png" },
  { title: "Automotive EV", image: "/images/Automotive-EV.png" },
  { title: "Defense", image: "/images/Industry.png" },
];

export function IndustriesCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const update = () => {
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Mouse drag / swipe support (desktop). Touch swipe is already handled by
  // native `overflow-x-auto` on mobile.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let isDown = false;
    let moved = false;
    let startX = 0;
    let scrollStart = 0;

    const beginDrag = (clientX: number, target: EventTarget | null) => {
      // Ignore drags that start on the arrow buttons (siblings, but safe).
      if (target && (target as HTMLElement).closest("button")) return;
      isDown = true;
      moved = false;
      startX = clientX;
      scrollStart = el.scrollLeft;
      el.style.cursor = "grabbing";
      el.style.userSelect = "none";
      // Direct scrollLeft assignment needs auto scroll-behavior; smooth
      // would animate every pixel update and destroy drag responsiveness.
      el.style.scrollBehavior = "auto";
    };

    const dragTo = (clientX: number) => {
      if (!isDown) return;
      const walk = clientX - startX;
      if (Math.abs(walk) > 3) moved = true;
      el.scrollLeft = scrollStart - walk;
    };

    const endDrag = () => {
      if (!isDown) return;
      isDown = false;
      el.style.cursor = "";
      el.style.userSelect = "";
      el.style.scrollBehavior = "";
    };

    const onMouseDown = (e: MouseEvent) => {
      // Only left button.
      if (e.button !== 0) return;
      beginDrag(e.clientX, e.target);
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      dragTo(e.clientX);
    };
    // Suppress click events that happen right after a drag so links inside
    // cards (if any) don't fire when the user was just dragging.
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", endDrag);
    el.addEventListener("click", onClickCapture, true);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", endDrag);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    const pinTarget = pinRef.current;
    if (!pinTarget) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinTarget,
        start: "top top",
        end: "+=100%",
        pin: pinTarget,
        pinSpacing: true,
        anticipatePin: 1,
      });
    }, pinTarget);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-carousel-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section ref={pinRef} className="flex min-h-screen flex-col justify-center py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1464px] px-6 md:px-14">
        <AnimateIn>
          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-12">
            <h2 className="heading-lg">INDUSTRIES WE SERVE</h2>
            <p className="max-w-xl font-display text-base leading-relaxed text-white/70 md:ml-auto md:pb-2 md:text-right md:text-lg">
              From electric mobility to renewable energy and defense, our technologies enable innovation across industries.
            </p>
          </div>
        </AnimateIn>
      </div>

      <div className="relative mx-auto mt-14 w-full max-w-[1464px]">
        <div
          ref={trackRef}
          className="flex cursor-grab snap-x snap-proximity gap-6 overflow-x-auto scroll-smooth px-6 pb-4 md:px-14"
          style={{ scrollbarWidth: "none" }}
        >
          <style jsx>{`
            div::-webkit-scrollbar { display: none; }
          `}</style>
          {INDUSTRIES.map((item) => (
            <div
              key={item.title}
              data-carousel-card
              className="relative aspect-[4/5] w-[75vw] shrink-0 snap-start overflow-hidden rounded-card border border-white/[0.06] md:w-[280px] lg:w-[320px]"
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%), url('${item.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                aria-hidden
              />
              <h3 className="absolute inset-x-6 top-6 text-lg font-semibold text-white">{item.title}</h3>
            </div>
          ))}
        </div>

        <button
          onClick={() => scrollBy(-1)}
          disabled={!canScrollLeft}
          aria-label="Previous"
          className="absolute left-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md transition hover:border-white/40 hover:bg-black/80 disabled:pointer-events-none disabled:opacity-30 md:left-6"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => scrollBy(1)}
          disabled={!canScrollRight}
          aria-label="Next"
          className="absolute right-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md transition hover:border-white/40 hover:bg-black/80 disabled:pointer-events-none disabled:opacity-30 md:right-6"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
