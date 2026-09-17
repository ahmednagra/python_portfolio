import { test, expect } from "@playwright/test";
import { expectNoSeriousA11yViolations } from "./utils/axe";
import { collectConsoleErrors } from "./utils/console-errors";
import { PROBLEM_KEYS, CASE_STUDY_SLUGS, ARTICLE_SLUGS } from "./utils/routes";

for (const key of PROBLEM_KEYS) {
  test.describe(`/problems/${key}`, () => {
    test("renders with one h1, a link back to the problems index, and no console errors", async ({
      page,
    }) => {
      const consoleErrors = collectConsoleErrors(page);
      const response = await page.goto(`/problems/${key}`);
      expect(response?.ok()).toBe(true);

      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.getByRole("link", { name: "Problems I fix" })).toBeVisible();

      expect(consoleErrors, consoleErrors.join("\n")).toEqual([]);
    });

    test("always shows the canonical email as a mailto fallback", async ({ page }) => {
      await page.goto(`/problems/${key}`);
      const mailLink = page.locator('a[href^="mailto:"]').first();
      await expect(mailLink).toBeVisible();
    });

    test("has zero serious or critical accessibility violations", async ({ page }, testInfo) => {
      await page.goto(`/problems/${key}`);
      await expectNoSeriousA11yViolations(page, testInfo);
    });
  });
}

test("an unknown /problems/[key] returns a 404, not a broken render", async ({ page }) => {
  const response = await page.goto("/problems/not-a-real-problem");
  expect(response?.status()).toBe(404);
});

for (const slug of CASE_STUDY_SLUGS) {
  test.describe(`/work/${slug}`, () => {
    test("renders with one h1, a build-state tag, and no console errors", async ({ page }) => {
      const consoleErrors = collectConsoleErrors(page);
      const response = await page.goto(`/work/${slug}`);
      expect(response?.ok()).toBe(true);

      await expect(page.locator("h1")).toHaveCount(1);
      // BuildStateTag renders exactly one of these three labels.
      const stateBadge = page.getByText(/^(RUNNING|BUILT|DESIGNED)$/);
      await expect(stateBadge).toBeVisible();

      expect(consoleErrors, consoleErrors.join("\n")).toEqual([]);
    });

    test("never links to a GitHub repository anywhere on the page", async ({ page }) => {
      await page.goto(`/work/${slug}`);
      const githubLinks = page.locator('a[href*="github.com"], a[href*="github.io"]');
      await expect(githubLinks).toHaveCount(0);
    });

    test("renders the diagram island with Play/Step/Reset controls and an always-present text alternative", async ({
      page,
    }) => {
      await page.goto(`/work/${slug}`);
      await expect(page.getByRole("button", { name: /^(Play|Replay)$/ })).toBeVisible();
      await expect(page.getByRole("button", { name: "Step" })).toBeVisible();
      await expect(page.getByRole("button", { name: "Reset" })).toBeVisible();

      const details = page.locator("details");
      await expect(details).toBeAttached();
      // The <details> content is always in the DOM even while collapsed.
      await expect(details.locator("summary")).toHaveText("Text alternative");
    });

    test("Step advances the diagram and Reset returns it to step 1, without a console error", async ({
      page,
    }) => {
      const consoleErrors = collectConsoleErrors(page);
      await page.goto(`/work/${slug}`);

      await expect(page.getByText(/^Step 1 \/ \d+$/)).toBeVisible();
      await page.getByRole("button", { name: "Step" }).click();
      await expect(page.getByText(/^Step 2 \/ \d+$/)).toBeVisible();
      await page.getByRole("button", { name: "Reset" }).click();
      await expect(page.getByText(/^Step 1 \/ \d+$/)).toBeVisible();

      expect(consoleErrors, consoleErrors.join("\n")).toEqual([]);
    });

    test("diagram controls remain fully operable under prefers-reduced-motion", async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      const consoleErrors = collectConsoleErrors(page);
      await page.goto(`/work/${slug}`);

      const stepButton = page.getByRole("button", { name: "Step" });
      await expect(stepButton).toBeEnabled();
      await stepButton.click();
      await expect(page.getByText(/^Step 2 \/ \d+$/)).toBeVisible();

      expect(consoleErrors, consoleErrors.join("\n")).toEqual([]);
    });

    test("has zero serious or critical accessibility violations", async ({ page }, testInfo) => {
      await page.goto(`/work/${slug}`);
      await expectNoSeriousA11yViolations(page, testInfo);
    });
  });
}

test("an unknown /work/[slug] returns a 404", async ({ page }) => {
  const response = await page.goto("/work/not-a-real-case-study");
  expect(response?.status()).toBe(404);
});

for (const slug of ARTICLE_SLUGS) {
  test.describe(`/writing/${slug}`, () => {
    test("renders with one h1 and a visible published date, and no console errors", async ({
      page,
    }) => {
      const consoleErrors = collectConsoleErrors(page);
      const response = await page.goto(`/writing/${slug}`);
      expect(response?.ok()).toBe(true);

      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("time")).toBeVisible();

      expect(consoleErrors, consoleErrors.join("\n")).toEqual([]);
    });

    test("has zero serious or critical accessibility violations", async ({ page }, testInfo) => {
      await page.goto(`/writing/${slug}`);
      await expectNoSeriousA11yViolations(page, testInfo);
    });
  });
}

test("an unknown /writing/[slug] returns a 404", async ({ page }) => {
  const response = await page.goto("/writing/not-a-real-article");
  expect(response?.status()).toBe(404);
});
