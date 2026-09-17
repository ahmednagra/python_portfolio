import { describe, expect, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(cleanup);
import { ProblemCard } from "@/components/audience/problem-card";

describe("ProblemCard", () => {
  it("links to the problem's own detail route and shows title and symptom", () => {
    render(
      <ProblemCard
        problemKey="billing-quota-correctness"
        title="Billing and quota that drift under concurrency"
        symptom="Two requests hit the same usage counter at once."
        relatedCaseStudy="billing-correctness-under-concurrency"
      />
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/problems/billing-quota-correctness");
    expect(link).toHaveTextContent("Billing and quota that drift under concurrency");
    expect(link).toHaveTextContent("Two requests hit the same usage counter at once.");
  });
});
