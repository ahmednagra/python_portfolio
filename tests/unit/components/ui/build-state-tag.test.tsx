import { describe, expect, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(cleanup);
import { BuildStateTag } from "@/components/ui/build-state-tag";

// The solely-authored services in the site's content always carry an
// honest build-state caveat (RUNNING / BUILT / DESIGNED); this component is
// the one place that label renders, so its text and tone mapping must be
// exact — a DESIGNED component must never visually read as RUNNING.
describe("BuildStateTag", () => {
  it("renders the RUNNING state with the success tone", () => {
    render(<BuildStateTag state="RUNNING" />);
    const el = screen.getByText("RUNNING");
    expect(el.className).toContain("--color-tone-success");
  });

  it("renders the BUILT state with the signal tone", () => {
    render(<BuildStateTag state="BUILT" />);
    const el = screen.getByText("BUILT");
    expect(el.className).toContain("--color-tone-signal");
  });

  it("renders the DESIGNED state with the neutral tone, never success", () => {
    render(<BuildStateTag state="DESIGNED" />);
    const el = screen.getByText("DESIGNED");
    expect(el.className).toContain("--color-tone-neutral");
    expect(el.className).not.toContain("--color-tone-success");
  });
});
