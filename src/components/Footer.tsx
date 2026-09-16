import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/10 py-8 text-center text-xs text-zinc-500 dark:border-zinc-100/10">
      <p>
        Built by {profile.name} · {new Date().getFullYear()}
      </p>
    </footer>
  );
}
