import { describe, expect, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(cleanup);
import { InlineMarkdown } from "@/components/home/inline-markdown";

describe("InlineMarkdown (home)", () => {
  it("renders **bold** as <strong> and [label](href) as a link", () => {
    render(<InlineMarkdown text="Ship the **whole feature**, see [the proof](/proof)." />);
    expect(screen.getByText("whole feature").tagName).toBe("STRONG");
    expect(screen.getByRole("link", { name: "the proof" })).toHaveAttribute("href", "/proof");
  });

  it("renders one paragraph per blank-line-separated block", () => {
    render(<InlineMarkdown text={"Para one.\n\nPara two."} />);
    const paragraphs = screen.getAllByText(/Para (one|two)\./);
    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0]!.tagName).toBe("P");
    expect(paragraphs[1]!.tagName).toBe("P");
  });

  it("leaves plain text with no markdown syntax untouched", () => {
    render(<InlineMarkdown text="No special formatting here." />);
    expect(screen.getByText("No special formatting here.")).toBeInTheDocument();
  });
});
