"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Direction = "up" | "down" | "left" | "right" | "none";

type Props = {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  from?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
  className?: string;
  /**
   * If true, animate immediate children individually (used for grids/lists).
   */
  stagger_children?: boolean;
};

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 32 },
  down: { x: 0, y: -32 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
};

export function AnimateIn({
  children,
  as: Tag = "div",
  from = "up",
  distance,
  delay = 0,
  duration = 0.9,
  stagger = 0.08,
  start = "top 82%",
  once = true,
  className,
  stagger_children = false,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger_children ? Array.from(el.children) : [el];
    const { x, y } = offsets[from];
    const overrideX = distance != null && x !== 0 ? Math.sign(x) * distance : x;
    const overrideY = distance != null && y !== 0 ? Math.sign(y) * distance : y;

    gsap.set(targets, { autoAlpha: 0, x: overrideX, y: overrideY });

    const tween = gsap.to(targets, {
      autoAlpha: 1,
      x: 0,
      y: 0,
      duration,
      ease: "power3.out",
      delay,
      stagger: stagger_children ? stagger : 0,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: once ? "play none none none" : "play none none reverse",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [from, distance, delay, duration, stagger, start, once, stagger_children]);

  const Component = Tag as any;
  return (
    <Component ref={ref as any} data-animate className={className}>
      {children}
    </Component>
  );
}

/**
 * Refreshes ScrollTrigger after route or layout changes. Call once at the top
 * of a page component if content height is dynamic.
 */
export function useScrollTriggerRefresh() {
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => window.clearTimeout(id);
  }, []);
}
