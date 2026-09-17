import { describe, expect, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(cleanup);
import { SpecRow } from "@/components/ui/spec-row";

describe("SpecRow", () => {
  it("renders both the label and the value", () => {
    render(<SpecRow label="Location" value="Lahore, Pakistan" />);
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Lahore, Pakistan")).toBeInTheDocument();
  });

  it("accepts a React node as the value, not just a string", () => {
    render(<SpecRow label="Status" value={<span data-testid="status-node">Built</span>} />);
    expect(screen.getByTestId("status-node")).toHaveTextContent("Built");
  });
});
