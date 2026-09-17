import Link from "next/link";
import { primaryNav, site } from "@/content/site";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export type HeaderProps = Record<string, never>;

/**
 * Fixed nav header. Wraps to two rows on narrow phones rather than
 * collapsing into a hamburger drawer with hidden state — every nav item
 * stays reachable and visible.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-(--color-border) bg-(--color-canvas)/95 backdrop-blur">
      <div className="mx-auto flex max-w-(--container-max) flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 sm:px-6">
        <Link href="/" className="mono-label font-semibold text-(--color-ink)">
          {site.name}
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mono-label text-(--color-ink-muted) hover:text-(--color-ink)"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
