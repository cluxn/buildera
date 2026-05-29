import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/lib/env";
import "./globals.css";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";
import { NudgeBanner } from "@/components/ui/NudgeBanner";
import { PopupManager } from "@/components/ui/PopupManager";
import { ScriptInjector } from "@/components/ui/ScriptInjector";
import { CookieConsentBanner } from "@/components/ui/CookieConsentBanner";
import { fetchSettings, SETTINGS_FALLBACK } from "@/lib/api";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Buildera", template: "%s | Buildera" },
  description: "We build what your business needs to grow.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await fetchSettings().catch(() => SETTINGS_FALLBACK)

  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-[var(--brand-primary)] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to content
        </a>
        <NudgeBanner
          enabled={settings.nudge_banner_enabled}
          text={settings.nudge_banner_text}
          link={settings.nudge_banner_link}
          expiresAt={settings.nudge_banner_expires_at}
        />
        <SiteNav />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <WhatsAppWidget
          number={settings.whatsapp_number}
          enabled={Boolean(settings.whatsapp_number)}
        />
        <PopupManager />
        <ScriptInjector
          ga4Id={settings.ga4_measurement_id || undefined}
          clarityId={settings.clarity_project_id || undefined}
          fbPixelId={settings.facebook_pixel_id || undefined}
          linkedinId={settings.linkedin_insight_id || undefined}
          gadsId={settings.google_ads_conversion_id || undefined}
          gscTag={settings.gsc_verification_tag || undefined}
        />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
