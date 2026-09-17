import { describe, expect, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(cleanup);
import { Card } from "@/components/ui/card";

describe("Card", () => {
  it("renders as a plain container with no link when href is omitted", () => {
    render(<Card>Body</Card>);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it("renders the whole card as a single link target when href is given (WCAG 2.5.8)", () => {
    render(
      <Card href="/work/example" eyebrow="Sole author">
        <h3>Title</h3>
        <p>Summary</p>
      </Card>
    );
    // Exactly one link, and it wraps every piece of content — not a link
    // buried inside the card competing with an outer non-link wrapper.
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute("href", "/work/example");
    expect(links[0]).toHaveTextContent("Sole author");
    expect(links[0]).toHaveTextContent("Title");
    expect(links[0]).toHaveTextContent("Summary");
  });

  it("renders the eyebrow only when provided", () => {
    render(<Card>No eyebrow</Card>);
    expect(screen.queryByText("Sole author")).not.toBeInTheDocument();
  });
});
