"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="text-xs font-medium uppercase tracking-widest text-[var(--brand-primary)]">
        Error
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        Something went wrong
      </h1>
      <p className="text-muted-foreground max-w-md">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
        <Button onClick={() => reset()}>Try again</Button>
        <Link
          href="/"
          className="text-[var(--brand-primary)] hover:underline font-medium"
        >
          Go back home
        </Link>
        <span className="text-muted-foreground hidden sm:inline" aria-hidden="true">
          •
        </span>
        <Link
          href="/services"
          className="text-[var(--brand-primary)] hover:underline font-medium"
        >
          View our services
        </Link>
      </div>
    </div>
  );
}
