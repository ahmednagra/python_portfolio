import { describe, expect, it } from "vitest";
import { proofIndex } from "@/content/proof-index";

describe("proof-index content shape", () => {
  it("gives every entry a non-empty id, label, whatItProves and howToVerify", () => {
    for (const entry of proofIndex) {
      expect(entry.id.trim().length).toBeGreaterThan(0);
      expect(entry.label.trim().length).toBeGreaterThan(0);
      expect(entry.whatItProves.trim().length).toBeGreaterThan(0);
      expect(entry.howToVerify.trim().length).toBeGreaterThan(0);
    }
  });

  it("has no duplicate anchor ids (each one is a unique #id target on /proof)", () => {
    const ids = proofIndex.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("uses locally-generated anchor slugs, never an internal PROOF.md row identifier", () => {
    // Content rule #9: PROOF.md row ids never appear in the repository.
    // Internal row ids look like "1.1", "10", "12c", "12d.2" — bare/short
    // numeric-ish tokens. This project's ids are always descriptive kebab
    // case slugs instead.
    const rowIdLike = /^\d+[a-z]?(\.\d+)?$/i;
    for (const entry of proofIndex) {
      expect(rowIdLike.test(entry.id)).toBe(false);
      expect(entry.id).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("links every case-study-backed row to an in-site /work path, never an external repo", () => {
    for (const entry of proofIndex) {
      if (entry.url) {
        expect(entry.url.startsWith("/") || entry.url.startsWith("https://www.linkedin.com")).toBe(
          true
        );
      }
    }
  });
});
