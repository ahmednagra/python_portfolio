import AxeBuilder from "@axe-core/playwright";
import type { Page, TestInfo } from "@playwright/test";
import { expect } from "@playwright/test";

/**
 * Runs an axe-core scan against the current page and asserts zero serious
 * or critical violations, per the build spec's accessibility CI gate.
 * Moderate/minor findings are still surfaced (attached to the test report)
 * so they're visible without failing the build over them.
 */
export async function expectNoSeriousA11yViolations(page: Page, testInfo: TestInfo) {
  const results = await new AxeBuilder({ page })
    // WCAG 2.2 AA is the target level; axe's own "best-practice" rules are
    // excluded so this gate tracks the binding standard, not house style.
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  const serious = results.violations.filter(
    (violation) => violation.impact === "serious" || violation.impact === "critical"
  );

  if (results.violations.length > 0) {
    await testInfo.attach("axe-violations.json", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json",
    });
  }

  expect(
    serious,
    serious
      .map((v) => `${v.id} (${v.impact}): ${v.help} — ${v.nodes.length} node(s)`)
      .join("\n")
  ).toEqual([]);
}
