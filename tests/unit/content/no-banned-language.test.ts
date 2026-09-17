import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.resolve(process.cwd(), "src/content");

// Language banned outright by the content rules (rule #7), regardless of
// context. "leverage" is deliberately excluded from this literal list: the
// rule bans it only as a verb, and the tenant-isolation case study's
// verbatim body legitimately uses "highest-leverage" as a compound
// adjective — that usage is checked separately, below, with a pattern that
// tells the two apart.
const BANNED_PHRASES = [
  "passionate",
  "proven track record",
  "results-driven",
  "utilize",
  "seamless",
  "cutting-edge",
  "game-changer",
  "10x",
  "rockstar",
  "ninja",
  "guru",
  "in today's fast-paced world",
  "in today’s fast-paced world",
];

// "robust" is banned, but "Content-Security-Policy"/"robots.ts" style false
// positives aren't a concern in prose content files, so a plain substring
// check is sufficient here.
const BANNED_WORDS = ["robust"];

// Content rule #5: no GitHub links anywhere in content.
const GITHUB_PATTERN = /github\.(com|io)/i;

// A verb use of "leverage" ("leverage the platform", "leveraging their
// data", "to leverage X") is banned; "highest-leverage" and similar
// hyphenated compound-adjective uses are not what the rule targets.
const LEVERAGE_AS_VERB_PATTERN = /(?<!-)\bleverag(e|ed|ing|es)\b(?!-)/i;

// Content rule (excluded_claims): neither the excluded German-client detail
// nor a dangling, content-free "one additional project" reference may
// appear anywhere on the site.
const EXCLUDED_CLAIM_PATTERNS = [/german\b.*(client|project|transport|courier)/i, /one additional project/i];

function listContentFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listContentFiles(full);
    if (entry.name.endsWith(".ts") || entry.name.endsWith(".mdx")) return [full];
    return [];
  });
}

const contentFiles = listContentFiles(CONTENT_DIR);

describe("no banned language or disallowed references anywhere in content", () => {
  it("found at least the expected content files (sanity check the scan itself isn't vacuous)", () => {
    expect(contentFiles.length).toBeGreaterThan(0);
  });

  it.each(contentFiles.map((f) => [path.relative(CONTENT_DIR, f), f] as const))(
    "%s: contains no banned marketing phrase",
    (_label, file) => {
      const text = fs.readFileSync(file, "utf-8").toLowerCase();
      for (const phrase of BANNED_PHRASES) {
        expect(text, `found banned phrase "${phrase}"`).not.toContain(phrase.toLowerCase());
      }
      for (const word of BANNED_WORDS) {
        expect(text, `found banned word "${word}"`).not.toContain(word);
      }
    }
  );

  it.each(contentFiles.map((f) => [path.relative(CONTENT_DIR, f), f] as const))(
    "%s: never uses \"leverage\" as a verb",
    (_label, file) => {
      const text = fs.readFileSync(file, "utf-8");
      expect(LEVERAGE_AS_VERB_PATTERN.test(text)).toBe(false);
    }
  );

  it.each(contentFiles.map((f) => [path.relative(CONTENT_DIR, f), f] as const))(
    "%s: contains no GitHub link (binding removal — no repo link anywhere)",
    (_label, file) => {
      const text = fs.readFileSync(file, "utf-8");
      expect(GITHUB_PATTERN.test(text)).toBe(false);
    }
  );

  it.each(contentFiles.map((f) => [path.relative(CONTENT_DIR, f), f] as const))(
    "%s: contains none of the explicitly excluded claims",
    (_label, file) => {
      const text = fs.readFileSync(file, "utf-8");
      for (const pattern of EXCLUDED_CLAIM_PATTERNS) {
        expect(pattern.test(text), `matched excluded-claim pattern ${pattern}`).toBe(false);
      }
    }
  );
});
