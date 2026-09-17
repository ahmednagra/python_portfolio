import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { ContactPath } from "@/components/profile/contact-path";
import { site } from "@/content/site";

// ContactPath is a Client Component that calls next/navigation's
// useSearchParams internally (see its own comment on why /contact stays
// statically rendered). That hook throws outside a mounted App Router
// context, which plain RTL + jsdom does not provide, so it is mocked here
// exactly as the app itself would supply it: a real URLSearchParams built
// from the URL under test.
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(mockSearch),
}));

let mockSearch = "";

afterEach(cleanup);

function decodeMailto(href: string) {
  const [, query = ""] = href.split("?");
  const params = new URLSearchParams(query);
  return { subject: params.get("subject"), body: params.get("body") };
}

describe("ContactPath", () => {
  it("shows the hire greeting and hint, and always keeps the plain-email fallback visible", () => {
    mockSearch = "";
    render(<ContactPath intent="hire" />);
    expect(screen.getByText("Evaluating a full-stack hire?")).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`or email ${site.email} directly`))).toBeInTheDocument();
  });

  it("shows the fix greeting and mentions the referring problem/case-study key in the mailto subject", () => {
    mockSearch = "";
    render(<ContactPath intent="fix" refKey="billing-quota-correctness" />);
    expect(screen.getByText("Have a production problem to describe?")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /Open email to/ });
    const { subject } = decodeMailto(link.getAttribute("href")!);
    expect(subject).toBe("Production problem (billing-quota-correctness)");
  });

  it("defaults to the 'other' greeting when no intent is given anywhere", () => {
    mockSearch = "";
    render(<ContactPath />);
    expect(screen.getByText("Want to get in touch?")).toBeInTheDocument();
  });

  it("falls back to reading ?intent and ?ref from the URL when no props are passed", () => {
    mockSearch = "intent=fix&ref=tenant-isolation";
    render(<ContactPath />);
    expect(screen.getByText("Have a production problem to describe?")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /Open email to/ });
    expect(decodeMailto(link.getAttribute("href")!).subject).toBe(
      "Production problem (tenant-isolation)"
    );
  });

  it("ignores an invalid ?intent value from the URL and falls back to 'other'", () => {
    mockSearch = "intent=not-a-real-intent";
    render(<ContactPath />);
    expect(screen.getByText("Want to get in touch?")).toBeInTheDocument();
  });

  it("switching the intent chip updates the greeting and the mailto subject prefix", () => {
    mockSearch = "";
    render(<ContactPath intent="other" />);
    fireEvent.click(screen.getByRole("button", { name: "Hiring for a role" }));
    expect(screen.getByText("Evaluating a full-stack hire?")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /Open email to/ });
    expect(decodeMailto(link.getAttribute("href")!).subject).toBe("Role");
  });

  it("folds a typed name and message into the mailto body, never sending them anywhere else", () => {
    mockSearch = "";
    render(<ContactPath intent="hire" />);
    fireEvent.change(screen.getByLabelText("Name (optional)"), {
      target: { value: "Jordan" },
    });
    fireEvent.change(screen.getByLabelText(/What you'd like to say/), {
      target: { value: "We are hiring a full-stack engineer." },
    });
    const link = screen.getByRole("link", { name: /Open email to/ });
    const { body } = decodeMailto(link.getAttribute("href")!);
    expect(body).toContain("From: Jordan");
    expect(body).toContain("We are hiring a full-stack engineer.");
    expect(screen.getByText(/Nothing above is sent anywhere by this page/)).toBeInTheDocument();
  });

  it("the mailto link always targets the canonical email, regardless of intent or typed content", () => {
    mockSearch = "";
    render(<ContactPath intent="fix" />);
    const link = screen.getByRole("link", { name: /Open email to/ });
    expect(link.getAttribute("href")).toMatch(new RegExp(`^mailto:${site.email}\\?`));
  });

  it("never collects credentials — no password or payment input present", () => {
    mockSearch = "";
    render(<ContactPath intent="hire" />);
    expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/card number/i)).not.toBeInTheDocument();
  });

  it("exposes the intent choice as an accessible, keyboard-operable group of toggle buttons", () => {
    // Plain <button aria-pressed> toggles, not role="radio", so every
    // button is natively Tab/Enter/Space-operable with no extra
    // roving-tabindex/arrow-key wiring required (see contact-path.tsx).
    mockSearch = "";
    render(<ContactPath />);
    const fieldset = screen.getByRole("group", { name: "What's this about?" });
    expect(fieldset).toBeInTheDocument();
    const options = [
      screen.getByRole("button", { name: "Hiring for a role" }),
      screen.getByRole("button", { name: "Have a production problem" }),
      screen.getByRole("button", { name: "Something else" }),
    ];
    expect(options.filter((o) => o.getAttribute("aria-pressed") === "true")).toHaveLength(1);
  });
});
