import { test, expect } from "@playwright/test";
import { expectNoSeriousA11yViolations } from "./utils/axe";
import { collectConsoleErrors } from "./utils/console-errors";

test.describe("404 (not-found)", () => {
  test("an unknown route returns a 404 status with a helpful, on-brand page", async ({ page }) => {
    const consoleErrors = collectConsoleErrors(page);
    const response = await page.goto("/this-route-does-not-exist");
    expect(response?.status()).toBe(404);

    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/");

    expect(consoleErrors, consoleErrors.join("\n")).toEqual([]);
  });

  test("has zero serious or critical accessibility violations", async ({ page }, testInfo) => {
    await page.goto("/this-route-does-not-exist");
    await expectNoSeriousA11yViolations(page, testInfo);
  });
});
