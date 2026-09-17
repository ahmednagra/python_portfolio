import { test, expect } from "@playwright/test";
import { expectNoSeriousA11yViolations } from "./utils/axe";
import { collectConsoleErrors } from "./utils/console-errors";
import { STATIC_ROUTES } from "./utils/routes";

for (const route of STATIC_ROUTES) {
  test.describe(`${route.path} (${route.name})`, () => {
    test("renders successfully with exactly one h1 and no console errors", async ({ page }) => {
      const consoleErrors = collectConsoleErrors(page);

      const response = await page.goto(route.path);
      expect(response?.ok()).toBe(true);

      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).not.toBeEmpty();

      expect(consoleErrors, consoleErrors.join("\n")).toEqual([]);
    });

    test("exposes the required landmarks: skip link, header nav, main, footer nav", async ({
      page,
    }) => {
      await page.goto(route.path);

      const skipLink = page.getByRole("link", { name: "Skip to content" });
      await expect(skipLink).toBeAttached();

      await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
      await expect(page.locator("main#main-content")).toBeVisible();
      await expect(page.getByRole("navigation", { name: "Footer" })).toBeVisible();
    });

    test("the skip link is the first focusable element and moves focus to <main>", async ({
      page,
    }) => {
      await page.goto(route.path);
      await page.keyboard.press("Tab");
      const skipLink = page.getByRole("link", { name: "Skip to content" });
      await expect(skipLink).toBeFocused();
      await expect(skipLink).toHaveAttribute("href", "#main-content");
    });

    test("has zero serious or critical accessibility violations (light theme)", async ({
      page,
    }, testInfo) => {
      await page.goto(route.path);
      await expectNoSeriousA11yViolations(page, testInfo);
    });

    test("has zero serious or critical accessibility violations (dark theme)", async ({
      page,
    }, testInfo) => {
      await page.emulateMedia({ colorScheme: "dark" });
      await page.goto(route.path);
      await expectNoSeriousA11yViolations(page, testInfo);
    });

    test("has zero serious or critical accessibility violations (reduced motion)", async ({
      page,
    }, testInfo) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route.path);
      await expectNoSeriousA11yViolations(page, testInfo);
    });

    test("does not introduce horizontal scroll at 320px width", async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 800 });
      await page.goto(route.path);
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    });
  });
}
