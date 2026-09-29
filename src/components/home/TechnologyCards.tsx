"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { ArrowRight } from "@/components/Icons";

const CARDS = [
  {
    title: "Powertrain and Battery",
    body:
      "Integrated battery, motor, controller, and charging platforms for next-generation electric two-wheelers.",
    href: "/powertrain-battery",
    image: "/images/Poertrain-battery.png",
  },
  {
    title: "Source",
    body:
      "Smart solar hybrid inverters and energy management solutions for residential, commercial, and industrial applications.",
    href: "/source",
    image: "/images/Source.png",
  },
  {
    title: "OEM Engineering",
    body:
      "End-to-end product engineering—from concept and prototyping to validation and production-ready solutions.",
    href: "/oem-engineering",
    image: "/images/OEM-engineering.png",
  },
];

export function TechnologyCards() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-tech-card]");
      if (!cards.length) return;

      gsap.from("[data-tech-heading]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%" },
      });
      gsap.from("[data-tech-sub]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%" },
      });
      gsap.from(cards, {
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 75%" },
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=100%",
        pin: section,
        pinSpacing: true,
        anticipatePin: 1,
      });
    }, section);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="flex min-h-screen flex-col justify-center py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-6 pt-4 md:px-14 md:pt-8">
        {/* Header: heading spans cols 1-2, description sits in col 3.
            Uses the same 3-col grid as the cards below so text edges align
            perfectly with card 1 (left) and card 3 (right). */}
        <div className="grid gap-6 md:grid-cols-3 md:items-end md:gap-6">
          <h2 data-tech-heading className="heading-lg md:col-span-2">
            TECHNOLOGY THAT<br />POWERS THE FUTURE
          </h2>
          <p
            data-tech-sub
            className="text-sm leading-relaxed text-white/70 md:pb-2 md:text-right md:text-base"
          >
            Integrated EV platforms, smart energy systems, and OEM engineering built for innovation.
          </p>
        </div>

        {/* Cards — revealed during pin */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {CARDS.map((card) => (
            <div
              key={card.title}
              data-tech-card
              className="card overflow-hidden"
            >
              <div
                className="h-[320px] w-full"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.6) 100%), url('${card.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                aria-hidden
              />
              <div className="p-5">
                <h3 className="text-sm font-semibold text-white md:text-base">{card.title}</h3>
                <p className="mt-2 body text-xs md:text-[13px]">{card.body}</p>
                <Link
                  href={card.href}
                  className="cta-link mt-3 inline-flex items-center gap-2 text-xs font-medium text-white md:text-sm"
                >
                  <span className="btn-arrow bg-white/10 text-white">
                    <ArrowRight className="h-3 w-3" />
                  </span>
                  Explore More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
