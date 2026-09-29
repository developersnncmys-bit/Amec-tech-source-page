"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { AnimateIn } from "@/components/AnimateIn";
import { ArrowRight, Facebook, Instagram, Linkedin, Twitter, YouTube } from "@/components/Icons";
import { Logo } from "@/components/Logo";

const SOURCE_IMG = "/images/Source.png";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const MODES = [
  {
    id: "on-grid",
    label: "ON-Grid",
    body:
      "In on-grid operation, SOURCE prioritizes solar power for connected loads while intelligently interacting with the utility grid. Excess solar energy can be utilized efficiently, while the grid supplements power when solar generation is insufficient.",
  },
  {
    id: "off-grid",
    label: "OFF-Grid",
    body:
      "Complete energy independence for remote and rural installations. SOURCE runs the home directly from solar and battery, with intelligent load management ensuring reliable 24/7 power.",
  },
  {
    id: "hybrid",
    label: "Hybrid",
    body:
      "Best of both worlds. SOURCE decides in real time whether to draw from solar, storage, or grid based on load, tariff, and weather forecasts — optimising cost and reliability.",
  },
  {
    id: "back-up",
    label: "Back-Up",
    body:
      "Automatic islanding within 20 ms when a grid outage is detected. Critical loads keep running from stored energy; no manual switching, no downtime.",
  },
];

const KEY_FEATURES: Array<{ title: string; icon: React.ReactNode }> = [
  {
    title: "Smart Energy Intelligence",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
      </svg>
    ),
  },
  {
    title: "Dynamic Power Management",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-3.5-7.1" />
        <path d="M21 3v6h-6" />
      </svg>
    ),
  },
  {
    title: "Grid Protection",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 4 5v7c0 5 3.5 8.7 8 10 4.5-1.3 8-5 8-10V5l-8-3Z" />
      </svg>
    ),
  },
  {
    title: "Liquid-Cooled Thermal System",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3s6 7 6 12a6 6 0 0 1-12 0c0-5 6-12 6-12Z" />
      </svg>
    ),
  },
  {
    title: "Intelligent Auto Diagnostics",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    title: "Easy Service & Maintenance",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-2.4 2.5-2.5Z" />
      </svg>
    ),
  },
];

const SPECS = [
  {
    group: "Inverter Module",
    rows: [
      ["Continuous Power Output", "6 kW"],
      ["AC Output Voltage", "230 V AC ±5%, 50 Hz"],
      ["DC Input Range", "42 V – 60 V"],
      ["Surge Power Protection (10s)", "9 kW"],
      ["Transfer Switch Time", "< 20 ms"],
      ["Operating Modes", "On-Grid, Off-Grid, Hybrid, Backup"],
    ],
  },
  {
    group: "Battery Module",
    rows: [
      ["Battery Capacity", "6.5 kWh"],
      ["Nominal Voltage", "51 V"],
      ["Battery Chemistry", "LiFePO₄ (LFP)"],
      ["Operating Temperature", "-10 °C to 55 °C"],
      ["Warranty", "10 Years"],
    ],
  },
  {
    group: "General",
    rows: [
      ["Weight", "65 kg"],
      ["Monitoring", "SOURCE™ App (BLE 5.2 / Wi-Fi)"],
      ["Housing Material", "Die-Cast Aluminum Alloy"],
      ["Mounting Options", "Wall Mount / Ground Mount"],
      ["Dimensions (L × W × D)", "930 × 485 × 200 mm"],
    ],
  },
];

const APPLICATIONS = [
  {
    title: "Residential",
    body: "Rooftop solar with 24/7 backup for homes and villas.",
    image: "/images/Source-Residential.png",
  },
  {
    title: "Commercial",
    body: "Peak-shaving and demand response for offices and retail.",
    image: "/images/Source-commercial.png",
  },
  {
    title: "Small-Scale Industry",
    body: "Continuous power for workshops and light manufacturing.",
    image: "/images/source-smallscale.png",
  },
  {
    title: "Remote Sites",
    body: "Microgrid-grade hybrid power for off-grid installations.",
    image: "/images/Source-remote.png",
  },
];

const FAQ_ITEMS = [
  {
    q: "How does SOURCE decide whether to use solar, battery, or grid power?",
    a: "SOURCE continuously monitors solar generation, battery status, grid availability, and power demand using intelligent energy management algorithms. It automatically prioritizes solar energy first, then battery storage, and finally the utility grid when required, ensuring maximum efficiency and uninterrupted power.",
  },
  {
    q: "What happens during a power outage?",
    a: "SOURCE automatically islands from the grid within 20 ms and continues supplying critical loads from stored battery energy. No manual switching, no downtime — connected appliances keep running seamlessly.",
  },
  {
    q: "Can SOURCE operate without a utility grid?",
    a: "Yes. In off-grid mode SOURCE runs the site entirely from solar and battery, with intelligent load management ensuring reliable 24/7 power — ideal for remote and rural installations.",
  },
  {
    q: "How can I monitor and control my SOURCE system?",
    a: "The SOURCE™ app (iOS & Android) provides real-time energy views, remote control, and analytics. Connectivity is over BLE 5.2 and Wi-Fi, and cloud sync means you can also manage the system from a browser.",
  },
  {
    q: "What type of battery does SOURCE use, and how long does it last?",
    a: "SOURCE uses LiFePO₄ (LFP) battery modules — chosen for their thermal stability, long cycle life, and safety. Every unit ships with an industry-leading 10-year warranty on both the inverter and battery.",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SourcePage() {
  return (
    <>
      <Hero />
      <ProductOverview />
      <SceneBand />
      <HybridEnergyManagement />
      <KeyFeatures />
      <SmartFeatures />
      <TechnicalSpecifications />
      <ModelDimensionsAndResources />
      <RemoteControl />
      <WhereSourceWorks />
      <MonitoringSection />
      <FAQ />
      <ClosingCTA />
      <SourceFooter />
    </>
  );
}

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

function Shell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1600px] px-6 md:px-14 ${className}`}>{children}</div>;
}

function Hero() {
  const pinRef = useRef<HTMLElement | null>(null);

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
        invalidateOnRefresh: true,
      });
    }, pinTarget);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={pinRef} className="relative isolate w-full overflow-hidden bg-[#151515]">
      <div className="relative h-screen w-full">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/Source-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%), radial-gradient(60% 80% at 20% 30%, rgba(255,255,255,0.06) 0%, transparent 60%)",
          }}
        />
      </div>
      {/* Top-center: eyebrow + main heading */}
      <div className="absolute inset-x-0 top-0 flex flex-col items-center px-6 pt-28 text-center md:pt-36">
        <AnimateIn>
          <p className="eyebrow">Source</p>
          <h1 className="mt-3 heading-xl">Hybrid Energy System</h1>
        </AnimateIn>
      </div>

      {/* Bottom: description on the left, CTAs on the right */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 px-6 pb-12 md:flex-row md:items-end md:justify-between md:px-14 md:pb-16">
        <AnimateIn className="max-w-xl">
          <p className="text-base leading-relaxed text-white/85 md:text-lg">
            Seamlessly manage solar, grid, and battery power for maximum efficiency and uninterrupted energy.
          </p>
        </AnimateIn>
        <AnimateIn>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link href="/contact" className="btn-primary">
              Request a Quote
              <span className="btn-arrow"><ArrowRight className="h-3 w-3" /></span>
            </Link>
            <Link href="/contact" className="btn-ghost">Talk to an Expert</Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

const OVERVIEW_TITLE = "Power that adapts.";
const OVERVIEW_TITLE_WORDS = OVERVIEW_TITLE.split(" ");

const OVERVIEW_TEXT =
  "SOURCE is an intelligent energy management platform that seamlessly optimises power flow across solar, grid, and battery systems for maximum efficiency and reliability.";
const OVERVIEW_WORDS = OVERVIEW_TEXT.split(" ");

const PROBLEM_TEXT =
  "SOURCE overcomes grid instability and power disruptions by intelligently balancing solar, grid, and battery energy—ensuring reliable, efficient, and uninterrupted power.";
const PROBLEM_WORDS = PROBLEM_TEXT.split(" ");

function ProductOverview() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Initial state: everything dim
      gsap.set("[data-block1-word], [data-block2-word]", { autoAlpha: 0.15 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=180%",
          pin: true,
          pinSpacing: true,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Sequential reveal:
      //   0.00 → 0.45   block 1 words light up
      //   0.45 → 0.55   short pause / buffer
      //   0.55 → 1.00   block 2 words light up
      // Un-revealed words stay at autoAlpha 0.15.
      tl.to(
        "[data-block1-word]",
        {
          autoAlpha: 1,
          ease: "none",
          duration: 0.1,
          stagger: { amount: 0.35 },
        },
        0
      );

      tl.to(
        "[data-block2-word]",
        {
          autoAlpha: 1,
          ease: "none",
          duration: 0.1,
          stagger: { amount: 0.35 },
        },
        0.55
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="flex min-h-screen w-full flex-col justify-center py-16 md:py-24">
      <Shell>
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-16">
          <div>
            {/* 01 — Product Overview */}
            <div className="grid grid-cols-[auto_1fr] gap-6 md:gap-8">
              <div className="flex flex-col items-center">
                <span className="font-display text-xl font-semibold text-white/40 md:text-2xl">01</span>
                <span className="mt-3 h-full w-px flex-1 bg-white/10" aria-hidden />
              </div>
              <div className="pb-12">
                <p className="eyebrow">Product Overview</p>
                <h2 className="mt-3 heading-lg">
                  {OVERVIEW_TITLE_WORDS.map((word, i) => (
                    <Fragment key={i}>
                      <span data-block1-word className="inline-block">{word}</span>
                      {i < OVERVIEW_TITLE_WORDS.length - 1 ? " " : ""}
                    </Fragment>
                  ))}
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                  {OVERVIEW_WORDS.map((word, i) => (
                    <Fragment key={i}>
                      <span data-block1-word className="inline-block">{word}</span>
                      {i < OVERVIEW_WORDS.length - 1 ? " " : ""}
                    </Fragment>
                  ))}
                </p>
              </div>
            </div>

            {/* 02 — Problem it Solves */}
            <div className="grid grid-cols-[auto_1fr] gap-6 md:gap-8">
              <div className="flex flex-col items-center">
                <span className="font-display text-xl font-semibold text-white/40 md:text-2xl">02</span>
              </div>
              <div>
                <p className="eyebrow">Problem it Solves</p>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                  {PROBLEM_WORDS.map((word, i) => (
                    <Fragment key={i}>
                      <span data-block2-word className="inline-block">{word}</span>
                      {i < PROBLEM_WORDS.length - 1 ? " " : ""}
                    </Fragment>
                  ))}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 md:justify-end">
            <img
              src="/images/source-product1.png"
              alt="SOURCE product front"
              className="max-h-[420px] w-auto object-contain"
            />
            <img
              src="/images/source-product2.png"
              alt="SOURCE product side"
              className="max-h-[420px] w-auto object-contain"
            />
          </div>
        </div>
      </Shell>
    </section>
  );
}

function SceneBand() {
  const pinRef = useRef<HTMLElement | null>(null);
  const [view, setView] = useState<"morning" | "night">("morning");

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
        invalidateOnRefresh: true,
      });
    }, pinTarget);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={pinRef}
      className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-[#0f0f0f]"
    >
      {/* Cross-fade background layers */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 100%), url('/images/sourcemorning.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: view === "morning" ? 1 : 0,
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          backgroundImage: "url('/images/sourcenight.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: view === "night" ? 1 : 0,
        }}
        aria-hidden
      />

      <div className="relative flex flex-col items-center gap-6 px-6 pb-20 text-center md:px-14 md:pb-28">
        <div className="flex justify-center gap-2 rounded-full border border-white/15 bg-black/40 p-1 backdrop-blur">
          <button
            type="button"
            onClick={() => setView("morning")}
            className={`rounded-full px-5 py-2 text-sm font-medium transition md:text-base ${
              view === "morning" ? "bg-white text-black" : "text-white/80 hover:text-white"
            }`}
          >
            Morning View
          </button>
          <button
            type="button"
            onClick={() => setView("night")}
            className={`rounded-full px-5 py-2 text-sm font-medium transition md:text-base ${
              view === "night" ? "bg-white text-black" : "text-white/80 hover:text-white"
            }`}
          >
            Night View
          </button>
        </div>
        <p className="mx-auto max-w-3xl text-sm leading-relaxed text-white/85 md:text-base">
          Seamlessly balances power between solar, grid, battery, and connected loads to maximise efficiency, reliability,
          and energy availability.
        </p>
      </div>
    </section>
  );
}

function HybridEnergyManagement() {
  const pinRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(MODES[0].id);
  const activeMode = MODES.find((m) => m.id === active)!;
  const activeWords = activeMode.body.split(" ");

  // Pin the section for enough scroll (180%) that the word reveal has time
  // to complete BEFORE the pin releases. Runs once on mount.
  useIsomorphicLayoutEffect(() => {
    const pinTarget = pinRef.current;
    if (!pinTarget) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinTarget,
        start: "top top",
        end: "+=180%",
        pin: pinTarget,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
    }, pinTarget);

    return () => ctx.revert();
  }, []);

  // Word-by-word scrub reveal for the active-mode description. Re-attaches
  // whenever `active` changes (React remounts the <p>, so GSAP has to rebind
  // to the fresh DOM nodes). Reveal finishes at ~130% of the pin, leaving a
  // ~50% "read" buffer before the pin releases at 180%.
  useIsomorphicLayoutEffect(() => {
    const pinTarget = pinRef.current;
    if (!pinTarget) return;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>("[data-hem-word]");
      if (!words.length) return;
      gsap.set(words, { autoAlpha: 0.15 });
      gsap.to(words, {
        autoAlpha: 1,
        ease: "none",
        duration: 0.1,
        stagger: { amount: 1 },
        scrollTrigger: {
          trigger: pinTarget,
          start: "top top",
          end: "+=130%",
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });
    }, pinTarget);

    return () => ctx.revert();
  }, [active]);

  return (
    <section ref={pinRef} className="flex h-screen w-full flex-col overflow-hidden pb-6 pt-24 md:pb-8 md:pt-28">
      <Shell className="flex flex-1 min-h-0 flex-col">
        {/*
          Top block — text left, image right. `flex-1 min-h-0` lets this row
          absorb the space above the tabs so the image scales to fit.
        */}
        <div className="grid flex-1 min-h-0 gap-6 md:grid-cols-2 md:items-center md:gap-12">
          {/* Left column — heading + description stacked */}
          <AnimateIn className="flex flex-col justify-center">
            <h2 className="heading-lg">
              HYBRID<br />ENERGY MANAGEMENT
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70 md:mt-6 md:text-base">
              Seamlessly balances power between solar, grid, battery, and connected loads to maximise efficiency,
              reliability, and energy availability.
            </p>
          </AnimateIn>

          {/* Right column — image, scales down to fit vertically */}
          <div className="flex min-h-0 items-center justify-center overflow-hidden">
            <img
              src="/images/Hybrid-energy.png"
              alt="SOURCE hybrid energy management diagram"
              className="h-full max-h-[420px] w-auto max-w-full object-contain"
            />
          </div>
        </div>

        {/* Bottom block — tabs + active-mode description, centered */}
        <div className="mt-6 flex flex-col items-center md:mt-8">
          <div
            role="tablist"
            aria-label="Operating mode"
            className="grid w-full max-w-3xl grid-cols-2 gap-3 md:grid-cols-4"
          >
            {MODES.map((m) => {
              const isActive = m.id === active;
              return (
                <button
                  key={m.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(m.id)}
                  className={`rounded-full border px-5 py-2.5 text-sm font-medium transition md:text-base ${
                    isActive
                      ? "border-white bg-white text-black"
                      : "border-white/15 text-white/70 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {m.label}
                </button>
              );
            })}
          </div>

          <p
            key={activeMode.id}
            className="mt-5 max-w-2xl text-center text-sm leading-relaxed text-white/70 md:mt-6 md:text-base"
          >
            {activeWords.map((word, i) => (
              <Fragment key={i}>
                <span data-hem-word className="inline-block">
                  {word}
                </span>
                {i < activeWords.length - 1 ? " " : ""}
              </Fragment>
            ))}
          </p>
        </div>
      </Shell>
    </section>
  );
}

function KeyFeatures() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Initial state — header dimmed to 0, image slightly off + dim, features hidden.
      gsap.set("[data-kf-header]", { autoAlpha: 0, y: 20 });
      gsap.set("[data-kf-image]", { autoAlpha: 0, xPercent: 8, scale: 0.96 });
      gsap.set("[data-kf-item]", { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=140%",
          pin: true,
          pinSpacing: true,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to("[data-kf-header]", { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0)
        .to("[data-kf-image]", { autoAlpha: 1, xPercent: 0, scale: 1, duration: 0.6, ease: "power3.out" }, 0.1)
        .to(
          "[data-kf-item]",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: { amount: 1.2, from: "start" },
          },
          0.35
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col overflow-hidden pb-10 pt-28 md:pb-16 md:pt-32"
    >
      {/* Ambient spotlight — matches Figma's dark-with-highlight look */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 65% at 72% 50%, rgba(255,255,255,0.07) 0%, transparent 60%), #0d0d0d",
        }}
      />

      <div className="relative">
        <Shell>
          <div data-kf-header className="text-center">
            <h2 className="heading-lg">KEY FEATURES</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
              Advanced technologies engineered to maximise efficiency, reliability, and intelligent energy management.
            </p>
          </div>

          {/* Surround layout: 3 features on left, product image in centre, 3 on right.
              On mobile collapses to a 2-col icon grid above the image. */}
          <div className="mt-8 md:mt-10">
            {/* Mobile: 2-col grid then image */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:hidden">
              {KEY_FEATURES.map((f) => (
                <div key={f.title} data-kf-item className="flex flex-col items-center text-center">
                  <span className="grid h-8 w-8 place-items-center text-white">{f.icon}</span>
                  <h3 className="mt-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                    {f.title}
                  </h3>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center md:hidden">
              <img
                src="/images/source-product2.png"
                alt="SOURCE product render"
                className="max-h-[380px] w-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
              />
            </div>

            {/* Desktop: [left column] [image] [right column] */}
            <div className="hidden items-center gap-8 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-12 lg:gap-20">
              {/* Left column — features 0, 1, 2 (right-aligned) */}
              <div className="flex flex-col items-end gap-10 lg:gap-14">
                {KEY_FEATURES.slice(0, 3).map((f) => (
                  <div key={f.title} data-kf-item className="flex flex-col items-center text-center">
                    <span className="grid h-10 w-10 place-items-center text-white">{f.icon}</span>
                    <h3 className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                      {f.title}
                    </h3>
                  </div>
                ))}
              </div>

              {/* Product image in the middle */}
              <div data-kf-image className="flex justify-center">
                <img
                  src="/images/source-product2.png"
                  alt="SOURCE product render"
                  className="max-h-[340px] w-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)] lg:max-h-[400px]"
                />
              </div>

              {/* Right column — features 3, 4, 5 (left-aligned) */}
              <div className="flex flex-col items-start gap-10 lg:gap-14">
                {KEY_FEATURES.slice(3, 6).map((f) => (
                  <div key={f.title} data-kf-item className="flex flex-col items-center text-center">
                    <span className="grid h-10 w-10 place-items-center text-white">{f.icon}</span>
                    <h3 className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                      {f.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Shell>
      </div>
    </section>
  );
}

function SmartFeatures() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Section header — fires on first entry, independent of the pinned
      // timeline so the eyebrow + title are visible immediately.
      gsap.from("[data-smart-eyebrow], [data-smart-heading], [data-smart-sub]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%" },
      });

      // Pre-set the chart line's dash so it starts hidden before the pin
      // begins (avoids a flash of the fully-drawn line).
      const lines = gsap.utils.toArray<SVGPathElement>("[data-chart-line]");
      lines.forEach((line) => {
        const len = line.getTotalLength();
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
      });

      // MASTER TIMELINE — pinned to the section, scrubbed to scroll.
      // Each card reveals, then its inner animation plays, THEN the next
      // card starts. Total ≈ 7 slots so nothing plays out invisibly.
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%", // pin for 3 viewport heights of scroll
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Walk through each card in DOM order. For each: reveal the card,
      // then animate any inner elements it contains. Reserve a fixed
      // "slot" of timeline time per card so the sequence is predictable.
      const cards = gsap.utils.toArray<HTMLElement>("[data-smart-card]");
      const SLOT = 1.2; // seconds of timeline per card

      cards.forEach((card, i) => {
        const cardAt = i * SLOT;
        const innerAt = cardAt + 0.5; // inner animations start after reveal

        // 1. Card reveal
        tl.from(
          card,
          {
            autoAlpha: 0,
            y: 60,
            scale: 0.92,
            duration: 0.5,
          },
          cardAt
        );

        // 2. Inner animations — scoped to this card only
        const metallicNum = card.querySelector("[data-metallic-num]");
        if (metallicNum) {
          tl.from(
            metallicNum,
            {
              autoAlpha: 0,
              scale: 0.6,
              duration: 0.45,
              ease: "back.out(1.6)",
            },
            innerAt
          );
        }

        const aiBlock = card.querySelector("[data-ai-block]");
        if (aiBlock) {
          tl.from(
            aiBlock,
            {
              autoAlpha: 0,
              scale: 0.7,
              rotate: -4,
              duration: 0.5,
              ease: "back.out(1.6)",
            },
            innerAt
          );

          const cardSparkles = card.querySelectorAll("[data-sparkle]");
          if (cardSparkles.length) {
            tl.from(
              cardSparkles,
              {
                autoAlpha: 0,
                scale: 0,
                duration: 0.35,
                stagger: 0.08,
                ease: "back.out(2)",
              },
              innerAt + 0.2
            );
          }
        }

        const cardLines = card.querySelectorAll("[data-chart-line]");
        cardLines.forEach((line) => {
          tl.to(
            line,
            {
              strokeDashoffset: 0,
              duration: 0.7,
              ease: "power2.inOut",
            },
            innerAt
          );
        });

        const cardAreas = card.querySelectorAll("[data-chart-area]");
        if (cardAreas.length) {
          tl.from(
            cardAreas,
            {
              autoAlpha: 0,
              duration: 0.5,
            },
            innerAt + 0.25
          );
        }

        const cardDots = card.querySelectorAll("[data-chart-dot]");
        if (cardDots.length) {
          tl.from(
            cardDots,
            {
              autoAlpha: 0,
              scale: 0,
              transformOrigin: "center",
              duration: 0.25,
              stagger: 0.05,
              ease: "back.out(2)",
            },
            innerAt + 0.5
          );
        }

        // Captions live inside cards with metallic numbers or AI block —
        // fade them up last, so the reader sees the big visual first.
        const caption = card.querySelector("[data-caption]");
        if (caption) {
          tl.from(
            caption,
            {
              autoAlpha: 0,
              y: 10,
              duration: 0.35,
              ease: "power2.out",
            },
            innerAt + 0.35
          );
        }
      });

      // Sparkle twinkle loop — runs independently of the scrubbed timeline
      // so they keep shimmering after the pin releases.
      const allSparkles = gsap.utils.toArray<HTMLElement>("[data-sparkle]");
      allSparkles.forEach((el, i) => {
        gsap.to(el, {
          scale: 1.25,
          rotate: 25,
          opacity: 0.55,
          duration: 1.2 + i * 0.15,
          delay: i * 0.25,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex min-h-screen w-full flex-col justify-start overflow-hidden pb-6 pt-24 md:pb-10 md:pt-28"
    >
      <Shell>
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-12">
          <div>
            <p data-smart-eyebrow className="eyebrow">Smart Features</p>
            <h2 data-smart-heading className="mt-3 heading-lg">Intelligent by design.</h2>
          </div>
          <p
            data-smart-sub
            className="max-w-md text-sm leading-relaxed text-white/70 md:ml-auto md:pb-2 md:text-right md:text-base"
          >
            Advanced technologies engineered to maximize efficiency, reliability, and intelligent energy management.
          </p>
        </div>

        <div
          data-smart-grid
          className="mt-6 grid gap-4 md:mt-8 md:grid-cols-3 md:gap-6 md:[grid-template-rows:200px_200px_200px]"
        >
          {/* Row 1 col 1 — tall Smart Appliance (image, spans rows 1–2) */}
          <SmartCard className="h-[360px] md:h-[424px] md:row-span-2">
            <ImageVisual
              src="/images/Source-smartappliance.png"
              title="SMART APPLIANCE"
              subtitle="PRIORITY SWITCHING"
              alignTitle="top"
              titlePadClass="pt-8 md:pt-10"
              objectPosition="60% 100%"
            />
          </SmartCard>

          {/* Row 1 col 2 — 24/7 */}
          <SmartCard>
            <TwentyFourSevenVisual />
          </SmartCard>

          {/* Row 1 col 3 — Grid Usage chart */}
          <SmartCard>
            <GridUsageVisual />
          </SmartCard>

          {/* Row 2 col 2 — Adaptive Charging (image) */}
          <SmartCard>
            <ImageVisual
              src="/images/source-adapti.png"
              title="ADAPTIVE CHARGING"
              alignTitle="top"
            />
          </SmartCard>

          {/* Row 2 col 3 — AI Optimization Logic */}
          <SmartCard>
            <AiVisual />
          </SmartCard>

          {/* Row 3 col 1 — 10 Years Warranty */}
          <SmartCard>
            <WarrantyVisual />
          </SmartCard>

          {/* Row 3 cols 2–3 — Real-Time Energy Monitoring (image + text side by side) */}
          <SmartCard className="md:col-span-2">
            <div className="flex h-full w-full items-center">
              {/* Image on the left — right-aligned so the phone hugs the centre */}
              <div className="relative h-full flex-[1.15]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/Source-real-time.png"
                  alt="Real-Time Energy Monitoring"
                  className="absolute inset-0 h-full w-full object-contain object-right-bottom pl-2 pr-2 pt-2 md:pl-3 md:pr-3 md:pt-3"
                />
              </div>
              {/* Title on the right — left-aligned so it sits close to the image */}
              <div className="flex-[0.85] pl-0 pr-6 text-left md:pl-0 md:pr-10">
                <p className="font-display text-lg font-semibold uppercase leading-tight tracking-wide text-white md:text-2xl">
                  REAL-TIME ENERGY
                </p>
                <p className="font-display text-lg font-semibold uppercase leading-tight tracking-wide text-white md:text-2xl">
                  MONITORING
                </p>
              </div>
            </div>
          </SmartCard>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Smart Features — card shell + individual visuals
// ---------------------------------------------------------------------------

function SmartCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-smart-card
      className={`relative h-[200px] overflow-hidden rounded-card bg-bg-card md:h-auto ${className}`}
    >
      {children}
    </div>
  );
}

function ImageVisual({
  src,
  title,
  subtitle,
  alignTitle = "top",
  titlePadClass = "pt-6 md:pt-8",
  objectPosition = "center bottom",
}: {
  src: string;
  title: string;
  subtitle?: string;
  alignTitle?: "top" | "bottom";
  /** Tailwind class for the title strip's outer padding (top for `top`, bottom for `bottom`). */
  titlePadClass?: string;
  /** CSS `object-position` value for the image. */
  objectPosition?: string;
}) {
  const isTop = alignTitle === "top";
  return (
    <div className="flex h-full w-full flex-col">
      {isTop && (
        <div className={`shrink-0 px-6 text-center ${titlePadClass}`}>
          <p className="font-display text-lg font-semibold uppercase leading-tight tracking-wide text-white md:text-2xl">
            {title}
          </p>
          {subtitle && (
            <p className="font-display text-lg font-semibold uppercase leading-tight tracking-wide text-white md:text-2xl">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className="relative min-h-0 flex-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={title}
          className="absolute inset-0 h-full w-full object-contain px-4 pt-4 md:px-6 md:pt-6"
          style={{ objectPosition }}
        />
      </div>
      {!isTop && (
        <div className={`shrink-0 px-6 text-center ${titlePadClass}`}>
          <p className="font-display text-lg font-semibold uppercase leading-tight tracking-wide text-white md:text-2xl">
            {title}
          </p>
          {subtitle && (
            <p className="font-display text-lg font-semibold uppercase leading-tight tracking-wide text-white md:text-2xl">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function TwentyFourSevenVisual() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between px-6 pt-8 pb-6 md:pt-10 md:pb-8">
      <span
        data-metallic-num
        className="font-display text-[5rem] font-bold leading-none tracking-tight md:text-[7rem]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        24/7
      </span>
      <p data-caption className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 md:text-sm">
        Power Availability
      </p>
    </div>
  );
}

function GridUsageVisual() {
  return (
    <div className="relative flex h-full w-full flex-col px-5 py-4 md:px-6 md:py-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white md:text-sm">
        Grid Usage
      </p>

      {/* Chart area */}
      <div className="relative mt-2 flex-1">
        {/* Right-side badges */}
        <div className="absolute right-0 top-0 text-right text-[10px] leading-tight text-white/60">
          <div>Imported</div>
          <div className="font-medium text-white">4 kW</div>
        </div>
        <div className="absolute bottom-6 right-0 text-right text-[10px] leading-tight text-white/60">
          <div>Exported</div>
          <div className="font-medium text-white">4 kW</div>
        </div>

        {/* Y-axis labels (left) */}
        <div className="absolute inset-y-0 left-0 flex flex-col justify-between py-1 text-[9px] text-white/40">
          <span>4 kW</span>
          <span>2 kW</span>
          <span>0 kW</span>
          <span>2 kW</span>
          <span>4 kW</span>
        </div>

        {/* Chart SVG — from left-8 to right-14 so labels don't overlap */}
        <div className="absolute inset-y-0 left-8 right-14 bottom-6">
          <svg viewBox="0 0 200 100" className="h-full w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gu-gold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(251,191,36,0.55)" />
                <stop offset="100%" stopColor="rgba(251,191,36,0)" />
              </linearGradient>
              <linearGradient id="gu-blue" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="rgba(59,130,246,0.5)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0)" />
              </linearGradient>
            </defs>
            {/* 0-line */}
            <line x1="0" y1="50" x2="200" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />

            {/* Import area (above zero) */}
            <path
              data-chart-area
              d="M0,45 L30,10 L60,50 L60,50 L0,50 Z"
              fill="url(#gu-gold)"
            />
            {/* Export area (below zero) */}
            <path
              data-chart-area
              d="M60,50 L110,50 L140,85 L200,60 L200,50 Z"
              fill="url(#gu-blue)"
            />

            {/* Chart line */}
            <path
              data-chart-line
              d="M0,45 L30,10 L60,50 L110,50 L140,85 L200,60"
              fill="none"
              stroke="rgba(96,165,250,0.9)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {[
              { x: 30, y: 10 },
              { x: 60, y: 50 },
              { x: 110, y: 50 },
              { x: 140, y: 85 },
              { x: 200, y: 60 },
            ].map((p, i) => (
              <circle data-chart-dot key={i} cx={p.x} cy={p.y} r="1.5" fill="#60a5fa" />
            ))}
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="absolute inset-x-8 bottom-0 flex justify-between text-[9px] text-white/40">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>24:00</span>
        </div>
      </div>
    </div>
  );
}

function AiVisual() {
  // Gradient tuned to match Figma: pink hits only top-left, teal dominates the rest.
  const AI_GRADIENT =
    "linear-gradient(135deg, #ff4bb8 0%, #c65cff 22%, #22d3ee 55%, #5eead4 100%)";

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-6 py-6">
      {/* Sparkles — smoother 4-point twinkles, sized/placed to match Figma */}
      <Sparkle className="absolute left-[18%] top-[20%] h-7 w-7 text-fuchsia-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.55)]" />
      <Sparkle className="absolute right-[22%] top-[14%] h-9 w-9 text-pink-300 drop-shadow-[0_0_14px_rgba(249,168,212,0.6)]" />
      <Sparkle className="absolute right-[16%] top-[46%] h-4 w-4 text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.55)]" />
      <Sparkle className="absolute left-[30%] bottom-[28%] h-3 w-3 text-cyan-200/80" />

      {/* AI block — gradient border via padded wrapper (crisper than border-image) */}
      <div
        data-ai-block
        className="relative rounded-[22px] p-[2px] md:p-[2.5px]"
        style={{ background: AI_GRADIENT }}
      >
        <div className="rounded-[20px] bg-bg-card px-6 py-2 md:px-8 md:py-3">
          <span
            className="font-display text-[3.5rem] font-bold leading-none tracking-tight md:text-[5rem]"
            style={{
              background: AI_GRADIENT,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AI
          </span>
        </div>
      </div>

      <p data-caption className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 md:text-sm">
        AI Optimization Logic
      </p>
    </div>
  );
}

function Sparkle({ className = "" }: { className?: string }) {
  // Claude-style 4-point twinkle: curved concave sides for a soft glint.
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
    </svg>
  );
}

function WarrantyVisual() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6 py-6">
      <span
        data-metallic-num
        className="font-display text-[6rem] font-bold leading-none tracking-tight md:text-[8rem]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.25) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        10
      </span>
      <p data-caption className="mt-3 text-sm font-semibold uppercase tracking-[0.25em] text-white md:text-base">
        Years Warranty
      </p>
    </div>
  );
}


function TechnicalSpecifications() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const summaries: Record<string, string> = {
    "Inverter Module": "6 kW • 230 V AC",
    "Battery Module": "6.5 kWh • LiFePO₄",
    General: "65 kg • 930 × 485 × 200 mm",
  };

  return (
    <section className="bg-white py-16 text-black md:py-24">
      <Shell>
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
          {/* Left column — title, description, CTA */}
          <div className="md:sticky md:top-28 md:self-start">
            <AnimateIn>
              <h2 className="heading-lg text-black">Technical details.</h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-black/60 md:text-base">
                Every SOURCE unit is engineered to IEC standards and shipped with a full datasheet — inverter, battery,
                and system specs, one document.
              </p>
            </AnimateIn>
          </div>

          {/* Right column — accordion list */}
          <div className="divide-y divide-black/10 border-y border-black/10">
            {SPECS.map((group, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={group.group}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-black/70"
                  >
                    <span className={`text-lg md:text-xl ${isOpen ? "font-semibold text-black" : "font-medium text-black"}`}>
                      {group.group}
                    </span>
                    <span className="flex items-center gap-6">
                      <span className="hidden text-xs uppercase tracking-widest text-black/50 md:inline">
                        {summaries[group.group] ?? ""}
                      </span>
                      <span
                        className={`grid h-8 w-8 place-items-center rounded-full border transition ${
                          isOpen ? "border-black bg-black text-white" : "border-black/20 text-black"
                        }`}
                        aria-hidden
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                          <path d="M12 5v14" style={{ transition: "transform 0.3s", transform: isOpen ? "scaleY(0)" : "scaleY(1)", transformOrigin: "center" }} />
                          <path d="M5 12h14" />
                        </svg>
                      </span>
                    </span>
                  </button>

                  {/* Details */}
                  <div
                    className="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="min-h-0">
                      <dl className="divide-y divide-black/10 pb-6">
                        {group.rows.map(([k, v]) => (
                          <div key={k} className="grid grid-cols-1 gap-2 py-3 md:grid-cols-[1fr_1fr] md:gap-8">
                            <dt className="text-sm text-black/60">{k}</dt>
                            <dd className="text-sm text-black">{v}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Shell>
    </section>
  );
}

function ModelDimensionsAndResources() {
  return (
    <section className="bg-white pb-20 pt-16 text-black md:pb-28 md:pt-24">
      <Shell>
        {/* Model Dimensions — two-column layout matching Technical Details */}
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div className="md:sticky md:top-28 md:self-start">
            <h2 className="heading-lg text-black">Model dimensions.</h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-black/60 md:text-base">
              Compact enough for any wall, engineered to fit in tight installations. Front and side profiles with
              exact dimensions.
            </p>
          </div>

          <div className="flex items-center justify-center border-y border-black/10 py-10 md:py-16">
            <img
              src="/images/Model-dimensions.png"
              alt="SOURCE model dimensions — front and side views"
              className="max-h-[560px] w-auto object-contain"
            />
          </div>
        </div>

        {/* Resources — same two-column layout */}
        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div className="md:sticky md:top-28 md:self-start">
            <h2 className="heading-lg text-black">Resources.</h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-black/60 md:text-base">
              Learning material, warranty policy, and datasheets — everything you need to plan, install, and support a
              SOURCE deployment.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-black/85"
            >
              Request a Quote
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="divide-y divide-black/10 border-y border-black/10">
            {[
              { label: "Learning Center", href: "/learning-center" },
              { label: "Warranty", href: "/warranty" },
              { label: "Download Manuals", href: "/manuals" },
            ].map((r) => (
              <Link
                key={r.label}
                href={r.href}
                className="group flex items-center justify-between gap-6 py-6 transition-colors hover:text-black/60"
              >
                <span className="text-lg font-medium text-black md:text-xl">{r.label}</span>
                <span className="grid h-8 w-8 place-items-center rounded-full border border-black/20 text-black transition group-hover:border-black group-hover:bg-black group-hover:text-white">
                  <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}

const REMOTE_TABS: Array<{
  id: string;
  label: string;
  image: string;
  body: string;
}> = [
  {
    id: "remote-control",
    label: "Remote Control",
    image: "/images/Source-remotecontrol.png",
    body:
      "The SOURCE app allows users to remotely monitor and control system performance from anywhere. Users can manage modes, review system status, and respond quickly to alerts through an intuitive interface.",
  },
  {
    id: "inverter-modes",
    label: "Inverter Modes",
    image: "/images/Source-Invertermodes.png",
    body:
      "Users can select operating modes based on their needs — Eco Mode for maximum energy savings, Backup Mode for uninterrupted power to critical loads, and Performance Mode for high-demand applications.",
  },
  {
    id: "alerts-diagnostics",
    label: "Alerts & Diagnostics",
    image: "/images/Source-Aletrs&Diagnostic.png",
    body:
      "Real-time alerts and diagnostic insights keep users informed about system health, faults, and performance issues — enabling quick action and preventive maintenance.",
  },
  {
    id: "grid-insights",
    label: "Grid Insights",
    image: "/images/Source-GridInsights.png",
    body:
      "SOURCE provides visibility into grid behavior, including availability, outages, and dependency trends — helping users understand and manage their energy usage more effectively.",
  },
  {
    id: "savings-rewards",
    label: "Savings & Rewards",
    image: "/images/Source-Savings.png",
    body:
      "The platform tracks energy savings achieved through solar utilization and optimized energy management. Users gain clear insights into cost reductions, efficiency improvements, carbon footprint reduced, and long-term benefits.",
  },
];

function RemoteControl() {
  const [active, setActive] = useState(REMOTE_TABS[0].id);
  const current = REMOTE_TABS.find((t) => t.id === active) ?? REMOTE_TABS[0];
  const sectionRef = useRef<HTMLElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const descWords = current.body.split(" ");

  // Pin the section — created once, independent of the active tab so tab
  // clicks don't tear down and rebuild the pin (which would jump the scroll).
  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=120%",
        pin: section,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Word reveal — scrubbed across the pinned range. Re-runs on tab change so
  // the new description's spans are wired up. Pin releases only after this
  // timeline finishes (both share the same +=120% end).
  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const desc = descRef.current;
    if (!section || !desc) return;

    const ctx = gsap.context(() => {
      const words = desc.querySelectorAll("[data-rc-word]");
      gsap.set(words, { autoAlpha: 0.15 });
      gsap.to(words, {
        autoAlpha: 1,
        ease: "none",
        stagger: { each: 0.05 },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%",
          scrub: 0.5,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [current.id]);

  return (
    <section
      ref={sectionRef}
      className="flex h-screen w-full flex-col overflow-hidden pb-6 pt-24 md:pb-10 md:pt-28"
    >
      <Shell className="flex flex-1 min-h-0 flex-col">
        {/* Image — takes remaining vertical space, cross-fades on tab change.
            Active <img> drives the visible width (h-full w-auto → width follows
            the image's intrinsic aspect). Inactive images are centered on top
            with absolute positioning so they don't affect layout. */}
        <div className="relative mx-auto flex flex-1 min-h-0 w-full items-center justify-center">
          {REMOTE_TABS.map((tab) => {
            const isActive = tab.id === active;
            return (
              <img
                key={tab.id}
                src={tab.image}
                alt={tab.label}
                aria-hidden={!isActive}
                className={`h-full max-h-full w-auto max-w-full rounded-card object-contain transition-opacity duration-500 ${
                  isActive
                    ? "relative opacity-100"
                    : "pointer-events-none absolute inset-0 mx-auto my-auto opacity-0"
                }`}
              />
            );
          })}
        </div>

        {/* Tabs — click to switch */}
        <div
          role="tablist"
          aria-label="SOURCE app features"
          className="mx-auto mt-4 flex w-full max-w-4xl flex-wrap items-end justify-center gap-x-8 gap-y-3 border-b border-white/[0.06] pb-3 md:mt-6 md:gap-x-12"
        >
          {REMOTE_TABS.map((tab) => {
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab.id)}
                className={`relative pb-3 text-sm font-medium transition-colors md:text-base ${
                  isActive ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                {tab.label}
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-[13px] mx-auto h-px w-full bg-white"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Description — swaps to match the active tab, words reveal on scroll */}
        <p
          key={current.id}
          ref={descRef}
          className="mx-auto mt-4 max-w-3xl text-center text-xs leading-relaxed text-white/70 md:mt-6 md:text-sm lg:text-base"
        >
          {descWords.map((word, i) => (
            <Fragment key={i}>
              <span data-rc-word className="inline-block">{word}</span>
              {i < descWords.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </p>
      </Shell>
    </section>
  );
}

function WhereSourceWorks() {
  const pinRef = useRef<HTMLElement | null>(null);

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
        invalidateOnRefresh: true,
      });
    }, pinTarget);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={pinRef}
      className="flex min-h-screen w-full flex-col justify-center overflow-hidden py-16 md:py-24"
    >
      <Shell>
        <AnimateIn className="text-center">
          <h2 className="heading-lg">Where SOURCE works.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
            From homes and businesses to industrial facilities and remote locations, SOURCE delivers intelligent
            power management wherever it's needed.
          </p>
        </AnimateIn>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {APPLICATIONS.map((a) => (
            <div
              key={a.title}
              className="group flex flex-col overflow-hidden rounded-[22px] border border-white/15 bg-[#0a0a0a] p-4"
            >
              {/* Image — inset within the card, contain-fit so the whole
                  illustration is visible without cropping. */}
              <div
                aria-hidden
                className="aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-[#111]"
                style={{
                  backgroundImage: `url('${a.image}')`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />

              {/* Title + short description below the image */}
              <div className="px-2 pb-2 pt-5">
                <h3 className="text-lg font-semibold text-white md:text-xl">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60 md:text-[15px]">
                  {a.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Shell>
    </section>
  );
}

const MONITORING_P1 =
  "Monitor, control, and optimize your energy ecosystem from anywhere with the SOURCE app. Gain real-time visibility into system performance, switch between Eco, Backup, and Performance modes, receive instant alerts and diagnostics, track grid behavior, and measure energy savings, cost reductions, and sustainability impact.";
const MONITORING_P2 =
  "Designed for homes, commercial facilities, small industries, and remote sites, SOURCE delivers intelligent energy management, reliable backup power, and operational efficiency across a wide range of applications.";
const MONITORING_P1_WORDS = MONITORING_P1.split(" ");
const MONITORING_P2_WORDS = MONITORING_P2.split(" ");

function MonitoringSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Initial hidden state — everything reveals during the pin.
      gsap.set("[data-mon-heading]", { autoAlpha: 0, y: 30 });
      gsap.set("[data-mon-p1-word], [data-mon-p2-word]", { autoAlpha: 0.15 });
      gsap.set("[data-mon-apps]", { autoAlpha: 0, y: 20 });

      const p1Words = gsap.utils.toArray<HTMLElement>("[data-mon-p1-word]");
      const p2Words = gsap.utils.toArray<HTMLElement>("[data-mon-p2-word]");

      // One master timeline scrubbed to the pin range — pin releases only
      // after every stage (heading, both paragraph words, app store) is done.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%",
          pin: section,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      tl.to("[data-mon-heading]", { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0);
      tl.to(p1Words, { autoAlpha: 1, ease: "none", duration: 0.4, stagger: { each: 0.06 } }, 0.4);
      tl.to(p2Words, { autoAlpha: 1, ease: "none", duration: 0.4, stagger: { each: 0.06 } }, "+=0.2");
      tl.to("[data-mon-apps]", { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" }, "+=0.15");
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="flex min-h-screen flex-col justify-center pb-12 pt-28 md:pb-20 md:pt-32">
      <Shell>
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-16">
          {/* Left — phone mockup image */}
          <div className="flex items-center justify-center">
            <img
              src="/images/platsore-appstore.png"
              alt="SOURCE monitoring app on iPhone with QR code"
              className="max-h-[560px] w-auto object-contain"
            />
          </div>

          {/* Right — heading, description, app store */}
          <div>
            <h2 data-mon-heading className="heading-lg">
              Monitoring, Control &amp; Applications
            </h2>

            <p
              data-mon-p1
              className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 md:text-base"
            >
              {MONITORING_P1_WORDS.map((word, i) => (
                <Fragment key={i}>
                  <span data-mon-p1-word className="inline-block">{word}</span>
                  {i < MONITORING_P1_WORDS.length - 1 ? " " : ""}
                </Fragment>
              ))}
            </p>

            <p
              data-mon-p2
              className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 md:text-base"
            >
              {MONITORING_P2_WORDS.map((word, i) => (
                <Fragment key={i}>
                  <span data-mon-p2-word className="inline-block">{word}</span>
                  {i < MONITORING_P2_WORDS.length - 1 ? " " : ""}
                </Fragment>
              ))}
            </p>

            {/* App store block: QR code + badges */}
            <div data-mon-apps className="mt-10 flex items-center gap-5">
              <div className="rounded-lg bg-white p-3">
                <img
                  src="/images/QRcode.png"
                  alt="Scan QR code to download the SOURCE app"
                  className="h-24 w-24 object-contain"
                />
                <p className="mt-1 text-center text-[9px] text-black/80">Scan QR to download</p>
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-black px-4 py-2.5 text-xs text-white transition hover:border-white/30"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <span className="flex flex-col leading-tight">
                    <span className="text-[9px] text-white/70">Download on the</span>
                    <span className="text-sm font-semibold">App Store</span>
                  </span>
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-black px-4 py-2.5 text-xs text-white transition hover:border-white/30"
                >
                  <img src="/icon/playstore.png" alt="" className="h-5 w-5 object-contain" aria-hidden />
                  <span className="flex flex-col leading-tight">
                    <span className="text-[9px] text-white/70">GET IT ON</span>
                    <span className="text-sm font-semibold">Google Play</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24">
      <Shell>
        <div className="grid gap-12 md:grid-cols-[1fr_1.6fr_0.8fr] md:gap-14">
          {/* Left column — big F.A.Q heading + description */}
          <div className="md:sticky md:top-28 md:self-start">
            <h2 className="heading-lg">F.A.Q</h2>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/70 md:text-base">
              Straightforward answers, so you can move forward with confidence.
            </p>
          </div>

          {/* Middle column — accordion list */}
          <div className="divide-y divide-white/10 border-y border-white/10">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openIndex === i;
              const num = String(i + 1).padStart(2, "0");
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-6 py-6 text-left transition-colors"
                  >
                    <span className={`text-[10px] tracking-[0.2em] transition-colors md:text-xs ${isOpen ? "text-white" : "text-white/40"}`}>
                      {num}
                    </span>
                    <span className={`text-sm font-medium transition-colors md:text-base ${isOpen ? "text-white" : "text-white/85"}`}>
                      {item.q}
                    </span>
                    <span
                      className={`grid h-6 w-6 place-items-center rounded-full border transition ${
                        isOpen ? "border-white bg-white text-black" : "border-white/25 text-transparent"
                      }`}
                      aria-hidden
                    >
                      <span className="h-2 w-2 rounded-full bg-current" />
                    </span>
                  </button>

                  <div
                    className="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="min-h-0">
                      <div className="grid grid-cols-[auto_1fr_auto] gap-6 pb-6">
                        <span aria-hidden />
                        <p className="text-xs leading-relaxed text-white/70 md:text-sm">{item.a}</p>
                        <span aria-hidden />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right column — help block */}
          <div className="md:sticky md:top-28 md:self-start">
            <p className="text-sm leading-relaxed text-white/70 md:text-base">
              Still have questions? Our team is here to help.
            </p>
            <Link
              href="/contact"
              className="mt-3 inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-white underline underline-offset-8 transition hover:text-white/70 md:text-xs"
            >
              Email us
            </Link>
          </div>
        </div>
      </Shell>
    </section>
  );
}

function ClosingCTA() {
  const pinRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const pinTarget = pinRef.current;
    if (!pinTarget) return;

    const ctx = gsap.context(() => {
      // Set initial hidden state for everything that reveals during the pin.
      gsap.set("[data-closing-card]", { autoAlpha: 0, y: 80 });
      gsap.set(
        [
          "[data-closing-eyebrow]",
          "[data-closing-heading]",
          "[data-closing-sub]",
          "[data-closing-cta]",
        ],
        { autoAlpha: 0, y: 30 }
      );
      gsap.set("[data-closing-bg]", { scale: 1.02 });

      // One scrubbed timeline tied to the pin range — as user scrolls through
      // the pinned section, the reveal progresses stage by stage.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinTarget,
          start: "top top",
          end: "+=150%",
          pin: pinTarget,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      tl.to("[data-closing-bg]", { scale: 1.1, ease: "none" }, 0);
      tl.to(
        "[data-closing-card]",
        { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" },
        0.05
      );
      tl.to(
        "[data-closing-eyebrow]",
        { autoAlpha: 1, y: 0, duration: 0.3, ease: "power3.out" },
        0.2
      );
      tl.to(
        "[data-closing-heading]",
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power3.out" },
        0.3
      );
      tl.to(
        "[data-closing-sub]",
        { autoAlpha: 1, y: 0, duration: 0.3, ease: "power3.out" },
        0.45
      );
      tl.to(
        "[data-closing-cta]",
        { autoAlpha: 1, y: 0, duration: 0.3, ease: "power3.out" },
        0.55
      );
    }, pinTarget);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={pinRef}
      className="relative flex h-screen w-full items-end overflow-hidden bg-black"
    >
      {/* Full-bleed background image with subtle zoom */}
      <div
        data-closing-bg
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%), url('/images/Card.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#0f0f0f",
        }}
      />

      {/* Glass card overlay near the bottom */}
      <div className="relative w-full px-6 pb-14 md:px-14 md:pb-20">
        <div
          data-closing-card
          className="mx-auto max-w-[1400px] rounded-2xl border border-white/15 bg-white/10 p-8 backdrop-blur-2xl md:p-12"
        >
          <div className="grid gap-8 md:grid-cols-[1.4fr_auto] md:items-center md:gap-12">
            <div>
              <p data-closing-eyebrow className="eyebrow">Source</p>
              <h2 data-closing-heading className="mt-3 heading-lg">
                Smart Solar Hybrid Inverter System
              </h2>
              <p data-closing-sub className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
                Seamlessly manage solar, grid, and battery power for maximum efficiency and uninterrupted energy.
              </p>
            </div>
            <div data-closing-cta className="flex flex-col gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Request a Quote
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const SOURCE_FOOTER_NAV = [
  { label: "Home", href: "/" },
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Applications", href: "#applications" },
  { label: "Resources", href: "#resources" },
];

function SourceFooter() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/[0.06] bg-bg pt-20 md:pt-28">
      {/* Giant translucent SOURCE wordmark behind the content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-6 flex select-none justify-center md:top-8"
      >
        <span className="font-display text-[26vw] font-bold leading-none tracking-[-0.04em] text-white/[0.04] md:text-[22vw]">
          SOURCE
        </span>
      </div>

      <div className="relative flex flex-col items-center px-6 pb-10 md:px-14">
        <Logo className="justify-center" />

        <nav
          aria-label="SOURCE footer"
          className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 md:mt-10 md:gap-x-14"
        >
          {SOURCE_FOOTER_NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-white/80 transition-colors hover:text-white md:text-base"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="relative border-t border-white/[0.08]">
        <div className="flex w-full flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-white/50 md:flex-row md:px-14">
          <p>© 2026 AMEC Technology. All Rights Reserved.</p>

          <div className="flex items-center gap-5 text-white/60">
            <a href="#" aria-label="Facebook" className="transition-colors hover:text-white">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Instagram" className="transition-colors hover:text-white">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="X (Twitter)" className="transition-colors hover:text-white">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="transition-colors hover:text-white">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="#" aria-label="YouTube" className="transition-colors hover:text-white">
              <YouTube className="h-4 w-4" />
            </a>
          </div>

          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <span aria-hidden className="text-white/25">|</span>
            <Link href="/terms" className="hover:text-white">Terms of Use</Link>
            <span aria-hidden className="text-white/25">|</span>
            <Link href="/cookies" className="hover:text-white">Cookies Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

