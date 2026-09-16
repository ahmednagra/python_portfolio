import Link from "next/link";
import { profile } from "@/lib/data";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/10 bg-white/80 backdrop-blur dark:border-zinc-100/10 dark:bg-black/80">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="#" className="font-semibold tracking-tight text-lg">
          {profile.name}
        </Link>
        <ul className="flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-zinc-950 dark:hover:text-zinc-50">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
