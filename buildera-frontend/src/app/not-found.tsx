import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="text-xs font-medium uppercase tracking-widest text-[var(--brand-primary)]">
        404
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        Page not found
      </h1>
      <p className="text-muted-foreground max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
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
        <span className="text-muted-foreground hidden sm:inline" aria-hidden="true">
          •
        </span>
        <Link
          href="/contact"
          className="text-[var(--brand-primary)] hover:underline font-medium"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
