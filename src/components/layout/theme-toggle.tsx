"use client";

import { useState } from "react";

export type ThemeToggleProps = Record<string, never>;

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "theme";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "system") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", theme);
  }
}

function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* localStorage unavailable */
  }
  return "system";
}

const ORDER: Theme[] = ["system", "light", "dark"];
const LABEL: Record<Theme, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

/**
 * Explicit light/dark/system toggle. Persists to localStorage and sets
 * data-theme on <html>; public/theme-init.js applies the stored value
 * before first paint to avoid a flash of the wrong theme.
 *
 * The lazy useState initializer reads the same source (localStorage) as
 * the blocking script, so on a hard load the two agree; on the client-only
 * render during hydration this can legitimately differ from the server's
 * generic "System" default, so the label is marked suppressHydrationWarning
 * rather than corrected via an effect (see Next.js's guide on preventing
 * flash before hydration / syncing with React state).
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => readStoredTheme());

  function cycle() {
    const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length] ?? "system";
    setTheme(next);
    applyTheme(next);
    try {
      if (next === "system") {
        window.localStorage.removeItem(STORAGE_KEY);
      } else {
        window.localStorage.setItem(STORAGE_KEY, next);
      }
    } catch {
      /* localStorage unavailable — the in-memory attribute change still applies */
    }
  }

  return (
    <button
      type="button"
      onClick={cycle}
      suppressHydrationWarning
      className="mono-label min-h-[36px] min-w-[36px] rounded-full border border-(--color-border-strong) px-3 text-(--color-ink) transition-[background-color,transform] motion-safe:duration-(--duration-ui) motion-safe:ease-(--ease-standard) hover:-translate-y-px hover:bg-(--color-canvas-raised)"
      aria-label={`Theme: ${LABEL[theme]}. Activate to switch.`}
    >
      {LABEL[theme]}
    </button>
  );
}
