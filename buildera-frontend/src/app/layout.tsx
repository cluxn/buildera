import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/lib/env";
import "./globals.css";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { NudgeBanner } from "@/components/ui/NudgeBanner";
import { PopupManager } from "@/components/ui/PopupManager";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Buildera",
  description: "We build what your business needs to grow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-[var(--brand-primary)] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to content
        </a>
        <NudgeBanner />
        <SiteNav />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <WhatsAppWidget />
        <FloatingCTA />
        <PopupManager />
      </body>
    </html>
  );
}
