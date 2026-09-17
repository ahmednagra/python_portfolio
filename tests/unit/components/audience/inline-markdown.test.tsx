import { describe, expect, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(cleanup);
import { InlineMarkdown } from "@/components/audience/inline-markdown";

describe("InlineMarkdown (audience)", () => {
  it("renders **bold** as <strong> and [label](href) as a link", () => {
    render(<InlineMarkdown text="A **specific** problem — see [the catalog](/problems)." />);
    expect(screen.getByText("specific").tagName).toBe("STRONG");
    expect(screen.getByRole("link", { name: "the catalog" })).toHaveAttribute("href", "/problems");
  });

  it("applies a caller-provided className to every paragraph", () => {
    render(<InlineMarkdown text="One paragraph." className="prose-test-class" />);
    expect(screen.getByText("One paragraph.")).toHaveClass("prose-test-class");
  });

  it("splits on blank lines into separate paragraph elements", () => {
    render(<InlineMarkdown text={"First.\n\nSecond."} />);
    expect(screen.getByText("First.").tagName).toBe("P");
    expect(screen.getByText("Second.").tagName).toBe("P");
  });
});
