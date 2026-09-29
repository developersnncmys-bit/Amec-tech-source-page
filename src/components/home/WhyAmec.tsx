"use client";

import { Fragment, useRef } from "react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { AnimateIn } from "@/components/AnimateIn";

const PILLARS = [
  {
    number: "01",
    title: "Engineering-Led Product Development",
    body:
      "At AMEC, engineering drives every decision. We don't start with assumptions or aesthetics—we start with system architecture, performance targets, and real-world constraints. From first principles to final validation, our products are built through disciplined engineering, rigorous testing, and iterative development to ensure reliability, safety, and scalability.",
    image: "/images/whyamec1.png",
  },
  {
    number: "02",
    title: "Deep Domain Expertise",
    body:
      "Our expertise spans electric mobility, power electronics, energy storage systems, control architectures, and embedded intelligence. This multi-domain capability allows us to design complete systems rather than isolated components—ensuring seamless integration, optimized performance, and long-term reliability across mobility and energy platforms.",
    image: "/images/whyamec2.png",
  },
  {
    number: "03",
    title: "Engineering-Led Product Development",
    body:
      "We provide complete product development support—from concept and feasibility to design, prototyping, validation, and production readiness. Our integrated engineering approach ensures every stage of the product lifecycle is optimized for performance, manufacturability, compliance, and scalability.",
    image: "/images/whyamec3.png",
  },
  {
    number: "04",
    title: "Custom Solutions",
    body:
      "Every application has unique technical challenges. We work closely with customers to develop tailored engineering solutions that align with their performance goals, operational requirements, and business objectives. Whether it's a custom battery system, powertrain, OEM product, or renewable energy solution, our designs are built for seamless integration and real-world deployment.",
    image: "/images/whyamec4.png",
  },
];

export function WhyAmec() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Initial state: all cards hidden, first card visible, all words dimmed.
      gsap.set("[data-pillar-card]", { autoAlpha: 0 });
      gsap.set("[data-pillar-card='0']", { autoAlpha: 1 });
      gsap.set("[data-pillar-word]", { autoAlpha: 0.14 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          // Give each pillar more scroll room (130% of viewport per pillar
          // instead of 100%) so the word reveal has time to finish before the
          // card fades out.
          start: "top top",
          end: `+=${PILLARS.length * 130}%`,
          pin: true,
          pinSpacing: true,
          scrub: 0.3,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Timeline: 1 unit per pillar. Within each unit:
      //   - swap-in the card (if not first)
      //   - word-by-word scrub reveal of that card's text — spread across the
      //     full segment via stagger.amount so ALL words finish before swap-out
      //     (regardless of how many words the card has).
      //   - swap-out (if not last)
      const segment = 1;
      const swap = 0.06;
      const bufferBeforeFadeOut = 0.22;
      const wordDuration = 0.1;
      // Total time budget for the word tween within the segment.
      const wordWindow = segment - swap * 2 - bufferBeforeFadeOut;
      // Total stagger spread — first word ends at wordDuration,
      // last word ends at wordWindow.
      const staggerAmount = Math.max(0.1, wordWindow - wordDuration);

      PILLARS.forEach((_, i) => {
        const start = i * segment;

        if (i > 0) {
          tl.to(
            `[data-pillar-card='${i}']`,
            { autoAlpha: 1, duration: swap, ease: "power2.out" },
            start
          );
        }

        tl.to(
          `[data-pillar-word='${i}']`,
          {
            autoAlpha: 1,
            duration: wordDuration,
            ease: "none",
            stagger: { amount: staggerAmount },
          },
          start + swap
        );

        if (i < PILLARS.length - 1) {
          tl.to(
            `[data-pillar-card='${i}']`,
            { autoAlpha: 0, duration: swap, ease: "power2.in" },
            start + segment - swap
          );
        }
      });
    }, section);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col overflow-hidden py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-14">
        <AnimateIn className="text-center">
          <h2 className="heading-lg">WHY AMEC TECHNOLOGY</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
            Engineering-first innovation, deep technical expertise, and collaborative product development that
            transform ideas into reliable, market-ready solutions.
          </p>
        </AnimateIn>

        {/* Card stack — all 3 pillars sit at the same spot; only one is visible at a time */}
        <div className="relative mt-12 w-full md:mt-16">
          {/* Sizing spacer keeps the stack area tall enough for the largest card */}
          <div className="invisible" aria-hidden>
            <PillarCard pillar={PILLARS[0]} indexAttr="__spacer" />
          </div>

          <div className="absolute inset-0">
            {PILLARS.map((pillar, i) => (
              <div
                key={pillar.number}
                data-pillar-card={i}
                className="absolute inset-0"
              >
                <PillarCard pillar={pillar} indexAttr={String(i)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PillarCard({
  pillar,
  indexAttr,
}: {
  pillar: (typeof PILLARS)[number];
  indexAttr: string;
}) {
  const titleWords = pillar.title.split(" ");
  const bodyWords = pillar.body.split(" ");
  const isSpacer = indexAttr === "__spacer";
  return (
    <div className="grid gap-6 md:min-h-[420px] md:grid-cols-[1.2fr_1fr] md:items-stretch md:gap-10">
      <div
        className="order-2 aspect-[16/10] w-full rounded-xl md:order-1 md:aspect-auto md:h-full md:min-h-[340px]"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.5) 100%), url('${pillar.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden
      />
      <div className="order-1 flex h-full flex-col justify-center md:order-2">
        <span className="text-xs font-medium text-white/50">{pillar.number}</span>
        <h3 className="mt-2 heading-md">
          {titleWords.map((word, i) => (
            <Fragment key={i}>
              <span {...(!isSpacer ? { "data-pillar-word": indexAttr } : {})} className="inline-block">
                {word}
              </span>
              {i < titleWords.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
          {bodyWords.map((word, i) => (
            <Fragment key={i}>
              <span {...(!isSpacer ? { "data-pillar-word": indexAttr } : {})} className="inline-block">
                {word}
              </span>
              {i < bodyWords.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </p>
      </div>
    </div>
  );
}
