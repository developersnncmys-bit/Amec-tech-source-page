import type { Metadata } from "next";
import { Poppins, Chakra_Petch } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Preloader } from "@/components/Preloader";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

// Free geometric fallback for TT Supermolot Neue (paid). If the licensed
// TT Supermolot Neue files are placed in /public/fonts and declared via
// @font-face in globals.css, they will override this fallback automatically.
const displayFallback = Chakra_Petch({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-fallback",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AMEC Technology — Engineering Powertrain, Energy & Scalable Technologies",
  description:
    "AMEC Technology develops production-ready systems across electric mobility, renewable energy, and OEM engineering — bridging concepts and deployment through strong engineering fundamentals, validation, and scalable design.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${displayFallback.variable}`}>
      <body className="bg-bg text-white antialiased">
        <Preloader />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
