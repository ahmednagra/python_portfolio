import { describe, expect, it, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

afterEach(cleanup);
import { TenantIsolationDiagram } from "@/components/diagrams/tenant-isolation";

describe("TenantIsolationDiagram", () => {
  it("opens paused at step 1 of N with the bug toggle off", () => {
    render(<TenantIsolationDiagram />);
    expect(screen.getByText("Step 1 / 5")).toBeInTheDocument();
    const toggle = screen.getByRole("button", { name: "Introduce application bug" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");
  });

  it("toggling 'Introduce application bug' persists (a toggle, not a one-shot trigger) and relabels itself", () => {
    render(<TenantIsolationDiagram />);
    const toggle = screen.getByRole("button", { name: "Introduce application bug" });
    fireEvent.click(toggle);
    expect(screen.getByRole("button", { name: "Bug introduced", pressed: true })).toHaveAttribute(
      "aria-pressed",
      "true"
    );

    // Reaching the final step doesn't reset it — it's independent of the timeline.
    const stepButton = screen.getByRole("button", { name: "Step" });
    fireEvent.click(stepButton);
    fireEvent.click(stepButton);
    fireEvent.click(stepButton);
    fireEvent.click(stepButton);
    expect(screen.getByRole("button", { name: "Bug introduced" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  it("Reset clears the introduced-bug toggle back to off", () => {
    render(<TenantIsolationDiagram />);
    fireEvent.click(screen.getByRole("button", { name: "Introduce application bug" }));
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByRole("button", { name: "Introduce application bug" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
    expect(screen.getByText("Step 1 / 5")).toBeInTheDocument();
  });

  it("blocks the same cross-tenant rows whether or not the application bug is introduced (RLS is the actual enforcement point)", () => {
    render(<TenantIsolationDiagram />);
    const stepButton = screen.getByRole("button", { name: "Step" });
    // Advance to the step where row-level security has applied.
    fireEvent.click(stepButton);
    fireEvent.click(stepButton);
    fireEvent.click(stepButton);
    const summaryPattern = /Row-level security: (\d+) row\(s\) allowed, (\d+) row\(s\) blocked/;
    const withoutBug = screen.getByText(summaryPattern).textContent;
    expect(withoutBug).toMatch(summaryPattern);

    fireEvent.click(screen.getByRole("button", { name: "Introduce application bug" }));
    const withBug = screen.getByText(summaryPattern).textContent;

    // The allowed/blocked counts must be identical with the bug on or off —
    // the toggle removes the app-level WHERE clause but never changes what
    // the database itself lets through.
    expect(withBug).toBe(withoutBug);
  });

  it("always renders an in-DOM text-alternative <details> matching the diagram's story", () => {
    render(<TenantIsolationDiagram />);
    const details = document.querySelector("details");
    expect(details).toBeInTheDocument();
    expect(details).toHaveTextContent(/Row-level security enforces the boundary at the data layer/);
  });
});
