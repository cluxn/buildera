import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/lib/env";
import "./globals.css";
import { SiteNav } from "@/components/layout/SiteNav";

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
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-[var(--brand-primary)] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
