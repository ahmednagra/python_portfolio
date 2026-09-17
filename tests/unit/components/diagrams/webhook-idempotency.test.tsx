import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen, fireEvent, within, cleanup } from "@testing-library/react";

afterEach(cleanup);
import { WebhookIdempotencyDiagram } from "@/components/diagrams/webhook-idempotency";

describe("WebhookIdempotencyDiagram", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("opens paused at step 1 of N — never autoplays", () => {
    render(<WebhookIdempotencyDiagram />);
    expect(screen.getByText("Step 1 / 5")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Play" })).toBeInTheDocument();
  });

  it("Step advances exactly one step and stays paused", () => {
    render(<WebhookIdempotencyDiagram />);
    fireEvent.click(screen.getByRole("button", { name: "Step" }));
    expect(screen.getByText("Step 2 / 5")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Play" })).toBeInTheDocument();
  });

  it("Reset returns to step 1 and clears the duplicate what-if", () => {
    render(<WebhookIdempotencyDiagram />);
    fireEvent.click(screen.getByRole("button", { name: "Step" }));
    fireEvent.click(screen.getByRole("button", { name: "Send duplicate now" }));
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByText("Step 1 / 5")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send duplicate now" })).not.toBeDisabled();
  });

  it("the reader-triggered 'Send duplicate now' what-if is available immediately, not gated behind reaching the final step", () => {
    render(<WebhookIdempotencyDiagram />);
    const button = screen.getByRole("button", { name: "Send duplicate now" });
    expect(button).toBeEnabled();
    fireEvent.click(button);
    expect(button).toBeDisabled();
  });

  it("Step's own label reaches 'Step 5 / 5' and disables Step at the final frame", () => {
    render(<WebhookIdempotencyDiagram />);
    const stepButton = screen.getByRole("button", { name: "Step" });
    fireEvent.click(stepButton);
    fireEvent.click(stepButton);
    fireEvent.click(stepButton);
    fireEvent.click(stepButton);
    expect(screen.getByText("Step 5 / 5")).toBeInTheDocument();
    expect(stepButton).toBeDisabled();
  });

  it("Play becomes Replay once the timeline reaches its final step", () => {
    render(<WebhookIdempotencyDiagram />);
    const stepButton = screen.getByRole("button", { name: "Step" });
    fireEvent.click(stepButton);
    fireEvent.click(stepButton);
    fireEvent.click(stepButton);
    fireEvent.click(stepButton);
    expect(screen.getByRole("button", { name: "Replay" })).toBeInTheDocument();
  });

  it("always renders an in-DOM text-alternative <details>, matching the diagram's story", () => {
    render(<WebhookIdempotencyDiagram />);
    const details = document.querySelector("details");
    expect(details).toBeInTheDocument();
    // Never display:none / hidden — it's a real, always-present <details>,
    // collapsed by default but present for assistive tech and text search.
    expect(details).not.toHaveAttribute("hidden");
    expect(
      within(details as HTMLElement).getByText(/whichever arrives first claims the key/)
    ).toBeInTheDocument();
    // All five steps are listed in the text alternative too.
    expect(within(details as HTMLElement).getAllByRole("listitem")).toHaveLength(5);
  });

  it("announces the current step via an aria-live region for screen readers", () => {
    render(<WebhookIdempotencyDiagram />);
    const live = document.querySelector('[aria-live="polite"]');
    expect(live).toBeInTheDocument();
    expect(live).toHaveTextContent(/Step 1 of 5/);
  });
});
