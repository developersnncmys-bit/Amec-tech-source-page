import Image from "next/image";
import Link from "next/link";

type Variant = "light" | "dark";

export function Logo({ className = "", variant = "light" }: { className?: string; variant?: Variant }) {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`} aria-label="AMEC Technology home">
      <Image
        src="/images/amec logo.png"
        alt="AMEC Technology"
        width={160}
        height={40}
        priority
        className={`h-5 w-auto transition duration-500 md:h-7 ${variant === "dark" ? "brightness-0" : ""}`}
      />
    </Link>
  );
}
