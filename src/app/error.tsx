"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-(--container-max) px-4 py-24 text-center sm:px-6">
      <p className="mono-label text-(--color-ink-muted)">Error</p>
      <h1 className="mt-2 text-3xl font-semibold">Something went wrong</h1>
      <p className="mt-3 text-(--color-ink-muted)">
        {error.digest ? `Reference: ${error.digest}` : "Please try again."}
      </p>
      <Button onClick={reset} className="mt-6">
        Try again
      </Button>
    </div>
  );
}
