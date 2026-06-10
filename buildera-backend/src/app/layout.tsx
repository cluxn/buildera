import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Buildera Admin",
  description: "Buildera admin panel",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
