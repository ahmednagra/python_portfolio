import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-(--container-max) px-4 py-24 text-center sm:px-6">
      <p className="mono-label text-(--color-ink-muted)">404</p>
      <h1 className="mt-2 text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-(--color-ink-muted)">
        The page you&apos;re looking for doesn&apos;t exist, or has moved.
      </p>
      <Button href="/" className="mt-6">
        Back to home
      </Button>
    </div>
  );
}
