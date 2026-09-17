import { describe, expect, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(cleanup);
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders as a native button when no href is given", () => {
    render(<Button>Send</Button>);
    const el = screen.getByRole("button", { name: "Send" });
    expect(el.tagName).toBe("BUTTON");
  });

  it("renders as an anchor when href is given, so navigation is a real link", () => {
    render(<Button href="/contact">Contact</Button>);
    const el = screen.getByRole("link", { name: "Contact" });
    expect(el.tagName).toBe("A");
    expect(el).toHaveAttribute("href", "/contact");
  });

  it("renders a mailto href unchanged", () => {
    render(<Button href="mailto:someone@example.com">Email me</Button>);
    expect(screen.getByRole("link", { name: "Email me" })).toHaveAttribute(
      "href",
      "mailto:someone@example.com"
    );
  });

  it("merges a caller className without dropping variant classes", () => {
    render(
      <Button href="/work" className="custom-class">
        Work
      </Button>
    );
    const el = screen.getByRole("link", { name: "Work" });
    expect(el).toHaveClass("custom-class");
    expect(el.className).toContain("inline-flex");
  });
});
