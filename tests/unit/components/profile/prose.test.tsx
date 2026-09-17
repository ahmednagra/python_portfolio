import { describe, expect, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(cleanup);
import { Prose } from "@/components/profile/prose";

describe("Prose (profile inline-markdown renderer)", () => {
  it("renders **bold** as a real <strong>, not literal asterisks", () => {
    render(<Prose markdown="This is **bold** text." />);
    expect(screen.getByText("bold").tagName).toBe("STRONG");
    expect(screen.queryByText(/\*\*/)).not.toBeInTheDocument();
  });

  it("renders [label](href) as a real navigable link, not literal brackets", () => {
    render(<Prose markdown="Read the [proof index](/proof) first." />);
    const link = screen.getByRole("link", { name: "proof index" });
    expect(link).toHaveAttribute("href", "/proof");
  });

  it("marks an external link (http…) for opening in a new tab safely", () => {
    render(<Prose markdown="See [LinkedIn](https://www.linkedin.com/in/example)." />);
    const link = screen.getByRole("link", { name: "LinkedIn" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not mark an internal link for a new tab", () => {
    render(<Prose markdown="See [Work](/work)." />);
    const link = screen.getByRole("link", { name: "Work" });
    expect(link).not.toHaveAttribute("target");
  });

  it("splits blank-line-separated text into separate paragraphs", () => {
    render(<Prose markdown={"First paragraph.\n\nSecond paragraph."} />);
    expect(screen.getByText("First paragraph.").tagName).toBe("P");
    expect(screen.getByText("Second paragraph.").tagName).toBe("P");
  });

  it("never uses dangerouslySetInnerHTML — output is built from real elements", () => {
    const { container } = render(<Prose markdown="Some **bold** and a [link](/x)." />);
    expect(container.querySelector("strong")).toBeInTheDocument();
    expect(container.querySelector("a")).toBeInTheDocument();
  });
});
