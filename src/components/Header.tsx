"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

type NavItem = { href: string; label: string; disabled?: boolean };

const NAV: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/source", label: "Source" },
  { href: "/oem-engineering", label: "OEM Engineering" },
  { href: "/powertrain-battery", label: "Powertrain & Battery" },
];

// On the Source product page the navbar switches to a page-local nav that
// jumps to sections within the page instead of the top-level site routes.
const SOURCE_NAV: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "#product", label: "Product" },
  { href: "#features", label: "Features" },
  { href: "#applications", label: "Applications" },
  { href: "#resources", label: "Resources" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const nav = pathname === "/source" ? SOURCE_NAV : NAV;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-bg/95 text-white backdrop-blur-md">
      <div className="grid h-16 w-full grid-cols-[auto_1fr_auto] items-center px-6 md:h-20 md:px-10 lg:px-14">
        <div className="justify-self-start">
          <Logo variant="light" />
        </div>

        <nav className="hidden items-center justify-center gap-10 justify-self-center md:flex" aria-label="Primary">
          {nav.map((item) => {
            if (item.disabled) {
              return (
                <span
                  key={item.href}
                  aria-disabled="true"
                  className="cursor-default text-base font-medium text-white/40"
                >
                  {item.label}
                </span>
              );
            }
            const active = pathname === item.href;
            const cls = active ? "text-white" : "text-white/70 hover:text-white";
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base font-medium transition-colors ${cls}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 justify-self-end">
          <Link
            href="/contact"
            className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90 md:inline-flex"
          >
            Contact
          </Link>

          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5">
              <span className={`h-px w-5 bg-white transition ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`h-px w-5 bg-white transition ${open ? "opacity-0" : ""}`} />
              <span className={`h-px w-5 bg-white transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className={`md:hidden ${open ? "block" : "hidden"} border-t border-white/10 bg-black/95 backdrop-blur`}>
        <nav className="shell flex flex-col gap-1 py-4" aria-label="Mobile">
          {nav.map((item) =>
            item.disabled ? (
              <span
                key={item.href}
                aria-disabled="true"
                className="cursor-default rounded-lg px-2 py-2 text-sm text-white/40"
              >
                {item.label}
              </span>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-2 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            )
          )}
          <Link
            href="/contact"
            className="mt-2 rounded-full bg-white px-4 py-2 text-center text-sm font-medium text-black"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
