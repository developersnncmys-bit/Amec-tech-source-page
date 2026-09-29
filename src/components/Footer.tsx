import Link from "next/link";
import { Logo } from "./Logo";
import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter, YouTube } from "./Icons";
import { NewsletterForm } from "./NewsletterForm";

const COMPANY = [
  { label: "About", href: "/about" },
  { label: "Leadership", href: "/leadership" },
  { label: "Timeline", href: "/timeline" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const VERTICALS = [
  { label: "Mobility", href: "/mobility" },
  { label: "Technology", href: "/" },
  { label: "Codex", href: "/codex" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-bg pt-16">
      <div className="grid w-full gap-12 px-6 pb-10 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:px-14">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-sm text-white/60">
            We Build, Design & Engineer Industry Defining Technology For The Inevitable Future.
          </p>
          <div className="mt-6 flex items-center gap-3 text-white/60">
            <a href="#" aria-label="Facebook" className="grid h-8 w-8 place-items-center rounded-full border border-white/10 transition hover:border-white/30 hover:bg-white/5 hover:text-white">
              <Facebook className="h-3.5 w-3.5" />
            </a>
            <a href="#" aria-label="Twitter" className="grid h-8 w-8 place-items-center rounded-full border border-white/10 transition hover:border-white/30 hover:bg-white/5 hover:text-white">
              <Twitter className="h-3.5 w-3.5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="grid h-8 w-8 place-items-center rounded-full border border-white/10 transition hover:border-white/30 hover:bg-white/5 hover:text-white">
              <Linkedin className="h-3.5 w-3.5" />
            </a>
            <a href="#" aria-label="YouTube" className="grid h-8 w-8 place-items-center rounded-full border border-white/10 transition hover:border-white/30 hover:bg-white/5 hover:text-white">
              <YouTube className="h-4 w-4" />
            </a>
          </div>

          <NewsletterForm />
        </div>

        <FooterColumn title="Company" items={COMPANY} />
        <FooterColumn title="Verticals" items={VERTICALS} />

        <div>
          <h3 className="text-sm font-semibold text-white">Contact us</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" />
              <a href="mailto:contact@company.com" className="transition-colors hover:text-white">contact@company.com</a>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" />
              <a href="tel:+14156875892" className="transition-colors hover:text-white">(415) 687 – 5892</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>794 McAllister St<br />San Francisco, 94102</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06] py-6">
        <div className="flex w-full flex-col items-start justify-between gap-3 px-6 text-xs text-white/40 md:flex-row md:items-center md:px-14">
          <p>© 2026 AMEC Group. All Rights Reserved.</p>
          <p className="flex items-center gap-4">
            <Link href="/terms" className="transition-colors hover:text-white/70">Terms and Conditions</Link>
            <Link href="/privacy" className="transition-colors hover:text-white/70">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm text-white/60">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="transition-colors hover:text-white">{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
