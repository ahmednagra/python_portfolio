import { describe, expect, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(cleanup);
import { Badge } from "@/components/ui/badge";

describe("Badge", () => {
  it("defaults to the neutral tone", () => {
    render(<Badge>Neutral</Badge>);
    expect(screen.getByText("Neutral").className).toContain("--color-tone-neutral");
  });

  it.each([
    ["signal", "--color-tone-signal"],
    ["success", "--color-tone-success"],
    ["warning", "--color-tone-warning"],
    ["danger", "--color-tone-danger"],
  ] as const)("applies the %s tone's color token", (tone, expectedToken) => {
    render(<Badge tone={tone}>{tone}</Badge>);
    expect(screen.getByText(tone).className).toContain(expectedToken);
  });
});
