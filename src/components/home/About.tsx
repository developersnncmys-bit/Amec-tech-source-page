"use client";

import { Fragment, useRef } from "react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { AnimateIn } from "@/components/AnimateIn";

const DESC_TEXT =
  "AMEC Technology develops and validates advanced energy and mobility solutions in India while engineering them to meet global performance, safety, and reliability standards. Our design processes align with internationally recognized frameworks, including IEC, ISO, and regional compliance requirements, ensuring every solution is ready for global deployment.";
const DESC_WORDS = DESC_TEXT.split(" ");

const CAPTION_TEXT =
  "Engineered to deliver reliable performance across diverse environments and operating conditions.";
const CAPTION_WORDS = CAPTION_TEXT.split(" ");

const CLOSING_TEXT =
  "Through rigorous testing, validation, and design-for-compliance practices, AMEC creates scalable energy and mobility platforms that are built not only for India but for international markets and evolving global regulatory standards.";
const CLOSING_WORDS = CLOSING_TEXT.split(" ");

export function About() {
  const rootRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = rootRef.current;
    const pinTarget = pinRef.current;
    if (!el || !pinTarget) return;

    const ctx = gsap.context(() => {
      // Heading word-by-word stagger reveal (fires as section enters)
      const headingWords = gsap.utils.toArray<HTMLElement>("[data-about-heading] span");
      if (headingWords.length) {
        gsap.from(headingWords, {
          autoAlpha: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: "[data-about-heading]",
            start: "top 82%",
          },
        });
      }

      // Word-by-word scrub reveal — same treatment for all three paragraphs.
      const paragraphs: Array<{ trigger: string; wordSel: string }> = [
        { trigger: "[data-about-desc]", wordSel: "[data-about-desc-word]" },
        { trigger: "[data-about-caption]", wordSel: "[data-about-caption-word]" },
        { trigger: "[data-about-closing]", wordSel: "[data-about-closing-word]" },
      ];

      paragraphs.forEach(({ trigger, wordSel }) => {
        const words = gsap.utils.toArray<HTMLElement>(wordSel);
        if (!words.length) return;
        gsap.set(words, { autoAlpha: 0.12 });
        gsap.to(words, {
          autoAlpha: 1,
          ease: "none",
          duration: 0.5,
          stagger: 0.5,
          scrollTrigger: {
            trigger,
            start: "top 85%",
            end: "top 30%",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
      });
    }, el);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  const headingWords = "Built in India. Engineered for the World.".split(" ");

  return (
    <section ref={rootRef} className="w-full px-6 py-10 md:px-14 md:py-16">
      <div className="mx-auto w-full max-w-[1600px]">
        <div ref={pinRef} className="flex flex-col items-center">
        <AnimateIn className="text-center">
          <p className="eyebrow">About</p>
          <h2
            data-about-heading
            className="mt-3 font-display text-xl font-semibold tracking-tight md:text-3xl"
          >
            {headingWords.map((word, i) => (
              <span key={i} className="inline-block">
                {word}
                {i < headingWords.length - 1 ? " " : ""}
              </span>
            ))}
          </h2>
        </AnimateIn>

        {/* Paragraph 1 — sits below the header, block-level with generous width */}
          <p
            data-about-desc
            className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-white/70 md:mt-10 md:text-base"
          >
            {DESC_WORDS.map((word, i) => (
              <Fragment key={i}>
                <span data-about-desc-word className="inline-block">
                  {word}
                </span>
                {i < DESC_WORDS.length - 1 ? " " : ""}
              </Fragment>
            ))}
          </p>
        </div>

        {/* Image group: two equal images side by side, caption centered below */}
        <div className="mt-6 md:mt-8">
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <AnimateIn from="left">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-white/[0.06] bg-bg-card">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 100%), url('/images/about1.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  aria-hidden
                />
              </div>
            </AnimateIn>

            <AnimateIn from="right">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-white/[0.06] bg-bg-card">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 100%), url('/images/about2.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  aria-hidden
                />
              </div>
            </AnimateIn>
          </div>

          <p
            data-about-caption
            className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-white/70 md:mt-10 md:text-base"
          >
            {CAPTION_WORDS.map((word, i) => (
              <Fragment key={i}>
                <span data-about-caption-word className="inline-block">
                  {word}
                </span>
                {i < CAPTION_WORDS.length - 1 ? " " : ""}
              </Fragment>
            ))}
          </p>
        </div>

        {/* Paragraph 2 — closing statement (matches description alignment) */}
        <p
          data-about-closing
          className="mx-auto mt-16 max-w-3xl text-center text-sm leading-relaxed text-white/70 md:mt-20 md:text-base"
        >
          {CLOSING_WORDS.map((word, i) => (
            <Fragment key={i}>
              <span data-about-closing-word className="inline-block">
                {word}
              </span>
              {i < CLOSING_WORDS.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}
