import { describe, expect, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(cleanup);
import { Callout } from "@/components/mdx/callout";
import { DecisionRecordBlock } from "@/components/mdx/decision-record-block";

describe("Callout", () => {
  it("renders its children inside an aside landmark", () => {
    render(<Callout>Read the case study on a call.</Callout>);
    expect(screen.getByText("Read the case study on a call.").closest("aside")).toBeInTheDocument();
  });

  it.each(["info", "warning", "danger"] as const)("accepts the %s tone without throwing", (tone) => {
    render(<Callout tone={tone}>{tone} callout</Callout>);
    expect(screen.getByText(`${tone} callout`)).toBeInTheDocument();
  });
});

describe("DecisionRecordBlock", () => {
  it("renders considered, chosen and why as a bordered aside for MDX", () => {
    render(
      <DecisionRecordBlock
        considered="Application-level lock"
        chosen="Database row lock"
        why="Survives multiple instances; application locks do not."
      />
    );
    expect(screen.getByText("Considered")).toBeInTheDocument();
    expect(screen.getByText("Application-level lock")).toBeInTheDocument();
    expect(screen.getByText("Chosen")).toBeInTheDocument();
    expect(screen.getByText("Database row lock")).toBeInTheDocument();
    expect(
      screen.getByText("Survives multiple instances; application locks do not.")
    ).toBeInTheDocument();
  });
});
