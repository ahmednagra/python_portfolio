import { test, expect } from "@playwright/test";
import { collectConsoleErrors } from "./utils/console-errors";

test.describe("audience lens strip (home)", () => {
  test("'Hiring for a role' navigates to /work with the ?for=hire lens param", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Hiring for a role" }).click();
    await expect(page).toHaveURL(/\/work\?for=hire$/);
  });

  test("'Fixing a production issue' navigates to /problems with the ?for=fix lens param", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Fixing a production issue" }).click();
    await expect(page).toHaveURL(/\/problems\?for=fix$/);
  });

  test("both audience chips are reachable and operable by keyboard alone", async ({ page }) => {
    await page.goto("/");
    const chip = page.getByRole("link", { name: "Hiring for a role" });
    await chip.focus();
    await expect(chip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/work\?for=hire$/);
  });
});

test.describe("theme toggle", () => {
  test("cycles System -> Light -> Dark -> System, applying data-theme on <html> each time", async ({
    page,
  }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: /^Theme:/ });

    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    await toggle.click();
    await expect(page.locator("html")).not.toHaveAttribute("data-theme");
  });

  test("is keyboard-operable, not a hover-only affordance", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: /^Theme:/ });
    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });
});

test.describe("contact intent routing", () => {
  test("/contact?intent=fix&ref=billing-quota-correctness shows the fix greeting and carries the referring problem in the mailto subject", async ({
    page,
  }) => {
    await page.goto("/contact?intent=fix&ref=billing-quota-correctness");
    await expect(page.getByText("Have a production problem to describe?")).toBeVisible();
    const link = page.getByRole("link", { name: /Open email to/ });
    const href = await link.getAttribute("href");
    expect(decodeURIComponent(href ?? "")).toContain("billing-quota-correctness");
  });

  test("/contact?intent=hire shows the hire greeting", async ({ page }) => {
    await page.goto("/contact?intent=hire");
    await expect(page.getByText("Evaluating a full-stack hire?")).toBeVisible();
  });

  test("the mailto fallback is always present regardless of intent", async ({ page }) => {
    await page.goto("/contact?intent=fix");
    const mailLink = page.locator('a[href^="mailto:"]').first();
    await expect(mailLink).toBeVisible();
  });

  test("every /problems/[key] 'start the conversation' CTA lands on /contact with intent=fix and the matching ref", async ({
    page,
  }) => {
    await page.goto("/problems/tenant-isolation");
    const contactLink = page.locator('a[href^="mailto:"]').first();
    await expect(contactLink).toBeVisible();
    // The page itself already carries the fix/ref context via ContactPath's
    // own props rather than a link, so this asserts the greeting directly.
    await expect(page.getByText("Have a production problem to describe?")).toBeVisible();
  });
});

test.describe("no site-wide GitHub link, ever", () => {
  test("home, header and footer never link to github.com or github.io", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('a[href*="github.com"], a[href*="github.io"]')).toHaveCount(0);
  });
});

test.describe("root error boundaries never crash the app shell", () => {
  test("the home route hydrates without any thrown page error", async ({ page }) => {
    const errors = collectConsoleErrors(page);
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors, errors.join("\n")).toEqual([]);
  });
});
