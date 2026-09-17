import { describe, expect, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(cleanup);
import { CaseStudyCard } from "@/components/work/case-study-card";

describe("CaseStudyCard", () => {
  it("links to the case study's own route and shows its attribution and build state", () => {
    render(
      <CaseStudyCard
        slug="tenant-isolation-by-default"
        title="Tenant Isolation You Cannot Forget to Apply"
        oneLine="Moving isolation into the database."
        attributionToken="Sole author"
        buildState="BUILT"
        diagramKey="tenant-isolation"
      />
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/work/tenant-isolation-by-default");
    expect(link).toHaveTextContent("Sole author");
    expect(link).toHaveTextContent("Tenant Isolation You Cannot Forget to Apply");
    expect(screen.getByText("BUILT")).toBeInTheDocument();
  });

  it("never renders a DESIGNED build state as BUILT or RUNNING", () => {
    render(
      <CaseStudyCard
        slug="designing-for-a-hostile-target"
        title="Designing for a Hostile Target"
        oneLine="A capture pipeline prototype."
        attributionToken="Sole author"
        buildState="DESIGNED"
        diagramKey="capture-pipeline"
      />
    );
    expect(screen.getByText("DESIGNED")).toBeInTheDocument();
    expect(screen.queryByText("BUILT")).not.toBeInTheDocument();
    expect(screen.queryByText("RUNNING")).not.toBeInTheDocument();
  });
});
