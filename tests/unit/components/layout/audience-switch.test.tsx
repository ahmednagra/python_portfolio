import { Suspense } from "react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

// AudienceSwitchLens (the lens-aware wrapper, tested separately below)
// reads the resolved audience lens via useAudienceLens, a Client Component
// hook wrapping next/navigation's useSearchParams. That hook throws
// outside a mounted App Router context, which plain RTL + jsdom does not
// provide, so it is mocked here exactly as the app itself would supply it:
// a real URLSearchParams built from the URL under test.
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(mockSearch),
}));

let mockSearch = "";

afterEach(cleanup);
import { AudienceSwitch, AudienceSwitchLens } from "@/components/layout/audience-switch";

describe("AudienceSwitch", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("links each chip to the audience-lens route with the ?for= param", () => {
    render(<AudienceSwitch />);
    expect(screen.getByRole("link", { name: "Hiring for a role" })).toHaveAttribute(
      "href",
      "/work?for=hire"
    );
    expect(screen.getByRole("link", { name: "Fixing a production issue" })).toHaveAttribute(
      "href",
      "/problems?for=fix"
    );
  });

  it("marks neither chip active when current is null", () => {
    render(<AudienceSwitch current={null} />);
    expect(screen.getByRole("link", { name: "Hiring for a role" }).className).not.toContain(
      "--color-tone-signal"
    );
  });

  it("marks the matching chip active for the current audience lens", () => {
    render(<AudienceSwitch current="hire" />);
    expect(screen.getByRole("link", { name: "Hiring for a role" }).className).toContain(
      "--color-tone-signal"
    );
    expect(screen.getByRole("link", { name: "Fixing a production issue" }).className).not.toContain(
      "--color-tone-signal"
    );
  });

  it("writes the chosen lens to localStorage as a convenience, not a requirement", () => {
    render(<AudienceSwitch />);
    fireEvent.click(screen.getByRole("link", { name: "Fixing a production issue" }));
    expect(window.localStorage.getItem("audience-lens")).toBe("fix");
  });

  it("still renders and is clickable when localStorage throws (private browsing)", () => {
    const spy = vi.spyOn(window.localStorage.__proto__, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    render(<AudienceSwitch />);
    expect(() =>
      fireEvent.click(screen.getByRole("link", { name: "Hiring for a role" }))
    ).not.toThrow();
    spy.mockRestore();
  });

  it("exposes the switch as a labeled group for assistive technology", () => {
    render(<AudienceSwitch />);
    expect(
      screen.getByRole("group", { name: "Choose how you'd like to read this site" })
    ).toBeInTheDocument();
  });
});

describe("AudienceSwitchLens", () => {
  beforeEach(() => {
    window.localStorage.clear();
    mockSearch = "";
  });

  it("reflects the resolved ?for= lens as the active chip, with aria-current", () => {
    mockSearch = "for=fix";
    render(
      <Suspense fallback={null}>
        <AudienceSwitchLens />
      </Suspense>
    );
    const fixChip = screen.getByRole("link", { name: "Fixing a production issue" });
    expect(fixChip.className).toContain("--color-tone-signal");
    expect(fixChip).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("link", { name: "Hiring for a role" })).not.toHaveAttribute("aria-current");
  });

  it("marks neither chip active when no lens has been resolved", () => {
    mockSearch = "";
    render(
      <Suspense fallback={null}>
        <AudienceSwitchLens />
      </Suspense>
    );
    expect(screen.getByRole("link", { name: "Hiring for a role" })).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("link", { name: "Fixing a production issue" })).not.toHaveAttribute(
      "aria-current"
    );
  });
});
