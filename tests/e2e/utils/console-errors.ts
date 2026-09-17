import type { Page } from "@playwright/test";

/**
 * Collects browser console errors and uncaught page errors for the
 * duration of a test. Call at the top of a test, before navigating, and
 * assert the returned array is empty once the page has settled.
 */
export function collectConsoleErrors(page: Page): string[] {
  const errors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });

  page.on("pageerror", (error) => {
    errors.push(error.message);
  });

  return errors;
}
