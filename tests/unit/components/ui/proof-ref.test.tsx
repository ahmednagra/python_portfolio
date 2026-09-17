import { describe, expect, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(cleanup);
import { ProofRef } from "@/components/ui/proof-ref";
import { proofIndex } from "@/content/proof-index";

describe("ProofRef", () => {
  it("links to the matching anchor on /proof for a known id", () => {
    const known = proofIndex[0];
    expect(known).toBeDefined();
    render(<ProofRef id={known!.id} />);
    const link = screen.getByRole("link", { name: "proof" });
    expect(link).toHaveAttribute("href", `/proof#${known!.id}`);
    expect(link).toHaveAttribute("title", known!.whatItProves);
  });

  it("still renders a working link for an id with no matching proof-index row", () => {
    render(<ProofRef id="not-a-real-row" />);
    const link = screen.getByRole("link", { name: "proof" });
    expect(link).toHaveAttribute("href", "/proof#not-a-real-row");
    expect(link).toHaveAttribute("title", "See proof index");
  });
});
