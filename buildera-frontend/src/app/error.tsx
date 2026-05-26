"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <h2 className="text-3xl font-bold text-destructive">
        Something went wrong
      </h2>
      <p className="text-muted-foreground text-center max-w-md">
        {error.message || "An unexpected error occurred"}
      </p>
      <button
        onClick={() => reset()}
        className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
      >
        Try again
      </button>
      <Link
        href="/"
        className="text-primary underline underline-offset-4 hover:opacity-80"
      >
        Go Home
      </Link>
    </div>
  );
}
