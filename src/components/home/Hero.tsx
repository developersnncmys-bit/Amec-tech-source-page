"use client";

import { Fragment, useRef } from "react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { ArrowRight } from "@/components/Icons";

const INTRO_TEXT =
  "AMEC TECHNOLOGY is the engineering execution arm of AMEC Group. We develop production ready systems across electric mobility, renewable energy, and OEM engineering—bridging concepts and deployment through strong engineering fundamentals, validation, and scalable design.";

const INTRO_WORDS = INTRO_TEXT.split(" ");

export function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = rootRef.current;
    const pinTarget = pinRef.current;
    if (!el || !pinTarget) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-media]", { autoAlpha: 0, scale: 1.05, duration: 1.4 })
        .from("[data-hero-eyebrow]", { autoAlpha: 0, y: 12, duration: 0.6 }, "-=0.8")
        .from("[data-hero-title] span", { autoAlpha: 0, y: 24, stagger: 0.08, duration: 0.8 }, "-=0.4")
        .from("[data-hero-sub]", { autoAlpha: 0, y: 16, duration: 0.6 }, "-=0.5")
        .from("[data-hero-cta]", { autoAlpha: 0, y: 12, duration: 0.5 }, "-=0.4");

      ScrollTrigger.create({
        trigger: pinTarget,
        start: "top top",
        end: "+=100%",
        pin: pinTarget,
        pinSpacing: true,
        anticipatePin: 1,
      });

      const words = gsap.utils.toArray<HTMLElement>("[data-intro-word]");
      gsap.set(words, { autoAlpha: 0.12 });
      gsap.to(words, {
        autoAlpha: 1,
        ease: "none",
        duration: 0.5,
        stagger: 0.5,
        scrollTrigger: {
          trigger: "[data-intro]",
          start: "top 85%",
          end: "top 25%",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
    }, el);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  const scrollToIntro = () => {
    const target = document.getElementById("technology-intro");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section ref={rootRef} className="relative isolate">
      <div ref={pinRef} className="relative overflow-hidden bg-bg-card">
          {/*
            Video expects /public/videos/hero.mp4. Until the file exists, a
            layered gradient + poster acts as the visible placeholder so the
            hero never renders empty.
          */}
          <div data-hero-media className="relative h-screen w-full">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%), radial-gradient(60% 80% at 20% 30%, rgba(255,255,255,0.06) 0%, transparent 60%)",
              }}
              aria-hidden
            />
            <video
              className="relative h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/images/hero.jpg"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.6) 100%)",
              }}
              aria-hidden
            />
          </div>

          <div className="absolute inset-0 flex items-end justify-between gap-16 px-6 pb-10 md:px-24 md:pb-16">
            <div className="max-w-[60%] text-left">
              <p data-hero-eyebrow className="eyebrow">AMEC</p>
              <h1 data-hero-title className="mt-2 heading-xl">
                {"TECHNOLOGY".split("").map((c, i) => (
                  <span key={i} className="inline-block">{c}</span>
                ))}
              </h1>
              <p data-hero-sub className="mt-3 body-hero md:!text-[22px] whitespace-normal md:whitespace-nowrap">
                Engineering Powertrain, Energy & Scalable Technologies
              </p>
            </div>
            <div data-hero-cta className="shrink-0 self-end">
              <button type="button" onClick={scrollToIntro} className="btn-primary group">
                Explore more
                <span className="btn-arrow"><ArrowRight className="h-3 w-3" /></span>
              </button>
            </div>
          </div>
      </div>

      <div id="technology-intro" className="shell mt-16 mb-6 md:mt-24 md:mb-10">
        <p
          data-intro
          className="mx-auto max-w-3xl text-center font-display text-base leading-relaxed text-white/70 md:text-lg"
        >
          {INTRO_WORDS.map((word, i) => (
            <Fragment key={i}>
              <span
                data-intro-word
                className={`inline-block ${i < 2 ? "font-semibold text-white" : ""}`}
              >
                {word}
              </span>
              {i < INTRO_WORDS.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}
