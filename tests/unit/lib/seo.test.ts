import { afterEach, describe, expect, it, vi } from "vitest";
import { getSiteUrl } from "@/lib/seo";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("getSiteUrl", () => {
  it("prefers an explicitly configured NEXT_PUBLIC_SITE_URL over everything else", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.com");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "should-be-ignored.vercel.app");
    expect(getSiteUrl()).toBe("https://example.com");
  });

  it("falls back to VERCEL_PROJECT_PRODUCTION_URL when no explicit URL is set", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "my-portfolio.vercel.app");
    vi.stubEnv("VERCEL_URL", "my-portfolio-abc123.vercel.app");
    expect(getSiteUrl()).toBe("https://my-portfolio.vercel.app");
  });

  it("falls back to VERCEL_URL when VERCEL_PROJECT_PRODUCTION_URL is absent", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "");
    vi.stubEnv("VERCEL_URL", "my-portfolio-abc123.vercel.app");
    expect(getSiteUrl()).toBe("https://my-portfolio-abc123.vercel.app");
  });

  it("throws in a production build with no configured URL and no Vercel environment", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "");
    vi.stubEnv("VERCEL_URL", "");
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("SITE_URL_FALLBACK_OK", "");
    expect(() => getSiteUrl()).toThrow(/NEXT_PUBLIC_SITE_URL is not set/);
  });

  it("allows an explicit escape hatch for CI/local verification builds", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "");
    vi.stubEnv("VERCEL_URL", "");
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("SITE_URL_FALLBACK_OK", "true");
    expect(getSiteUrl()).toBe("http://localhost:3000");
  });

  it("defaults to localhost outside production with nothing configured", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "");
    vi.stubEnv("VERCEL_URL", "");
    vi.stubEnv("NODE_ENV", "development");
    expect(getSiteUrl()).toBe("http://localhost:3000");
  });
});
