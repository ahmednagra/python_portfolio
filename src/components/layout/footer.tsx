import Link from "next/link";
import { footerNav, site } from "@/content/site";

export type FooterProps = Record<string, never>;

/** Mono colophon footer with nav links and the canonical email. */
export function Footer() {
  return (
    <footer className="border-t border-(--color-border)">
      <div className="mx-auto flex max-w-(--container-max) flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="mono-label text-(--color-ink-muted)">
          {site.name} — {site.title} — {site.location} ({site.timezone})
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
          {footerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mono-label text-(--color-ink-muted) hover:text-(--color-ink)"
            >
              {item.label}
            </Link>
          ))}
          <a href={`mailto:${site.email}`} className="mono-label text-(--color-ink-muted) hover:text-(--color-ink)">
            {site.email}
          </a>
        </nav>
      </div>
    </footer>
  );
}
