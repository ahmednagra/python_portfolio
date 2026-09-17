import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

afterEach(cleanup);
import { ThemeToggle } from "@/components/layout/theme-toggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("starts on System when nothing is stored", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: /Theme: System/ })).toBeInTheDocument();
  });

  it("cycles System -> Light -> Dark -> System on repeated activation, updating <html data-theme>", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(screen.getByRole("button", { name: /Theme: Light/ })).toBeInTheDocument();
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(window.localStorage.getItem("theme")).toBe("light");

    fireEvent.click(button);
    expect(screen.getByRole("button", { name: /Theme: Dark/ })).toBeInTheDocument();
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(window.localStorage.getItem("theme")).toBe("dark");

    fireEvent.click(button);
    expect(screen.getByRole("button", { name: /Theme: System/ })).toBeInTheDocument();
    expect(document.documentElement.hasAttribute("data-theme")).toBe(false);
    expect(window.localStorage.getItem("theme")).toBeNull();
  });

  it("is a real <button>, keyboard-operable without a hover-only affordance", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button").tagName).toBe("BUTTON");
  });

  it("reads a previously stored preference on mount", () => {
    window.localStorage.setItem("theme", "dark");
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: /Theme: Dark/ })).toBeInTheDocument();
  });
});
