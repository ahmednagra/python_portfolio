import { describe, expect, it } from "vitest";
import { site, primaryNav, footerNav } from "@/content/site";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

describe("site contact data shape", () => {
  it("exposes exactly one canonical, well-formed email address", () => {
    expect(site.email).toMatch(EMAIL_PATTERN);
  });

  it("never carries a phone number field on the site content (contact rule #8: no phone)", () => {
    expect(site as unknown as Record<string, unknown>).not.toHaveProperty("phone");
    expect(site as unknown as Record<string, unknown>).not.toHaveProperty("phoneNumber");
  });

  it("titles the owner 'Full Stack Engineer', never a bare 'developer'", () => {
    expect(site.title).toBe("Full Stack Engineer");
    expect(site.title.toLowerCase()).not.toContain("developer");
  });

  it("only links to the canonical public profiles (LinkedIn/Upwork), never GitHub", () => {
    expect(site.linkedinUrl).toContain("linkedin.com");
    expect(site.linkedinUrl.toLowerCase()).not.toContain("github");
    expect(site.upworkUrl.toLowerCase()).not.toContain("github");
  });

  it("never links to /work or /problems from the footer's canonical no-GitHub link set without a GitHub URL slipping in", () => {
    for (const item of [...primaryNav, ...footerNav]) {
      expect(item.href.toLowerCase()).not.toContain("github");
    }
  });
});
