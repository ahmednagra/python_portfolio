/**
 * Site-wide identity, contact and navigation content.
 * Source: CONTENT.site + CONTENT.positioning_statement + IA.navigation (gated content).
 * Foundation-owned — do not fork or duplicate this data in route-level files.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteContent {
  name: string;
  title: string;
  headline: string;
  description: string;
  location: string;
  timezone: string;
  email: string;
  linkedinUrl: string;
  upworkUrl: string;
  availabilityNote: string;
  positioningStatement: string;
}

export const site: SiteContent = {
  name: "Muhammad Ahmed",
  title: "Full Stack Engineer",
  headline:
    "Full Stack Engineer — multi-tenant SaaS from PostgreSQL schema to React interface | Billing, quota and tenant isolation | Upwork Top Rated (as of September 2026), 100% JSS",
  description:
    "Full-stack engineer shipping complete product verticals in multi-tenant SaaS, specialising in billing, quota, payments and tenant isolation. Upwork Top Rated (as of September 2026) with a 100% Job Success Score across 12 completed projects.",
  location: "Lahore, Punjab, Pakistan",
  timezone: "Pakistan Standard Time (UTC+5)",
  email: "ahmednagra9@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/muhammad-ahmed-126466233",
  upworkUrl: "",
  availabilityNote:
    "Selectively taking scoped fix engagements alongside full-time work; open to a full-time role conversation for the right team.",
  positioningStatement:
    "Full-stack engineer who ships complete product verticals in multi-tenant SaaS — from the PostgreSQL schema through the API to the React interface — specialising in the parts where correctness is non-negotiable: billing, quota, payments and tenant isolation. Upwork Top Rated (as of September 2026), 100% Job Success Score, 12 completed projects at 5.0. Separately, his own stated freelance history includes resilient data-extraction and AI-integrated pipeline work.",
};

export const primaryNav: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Problems I Fix", href: "/problems" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavItem[] = [
  { label: "Contact", href: "/contact" },
  { label: "Proof", href: "/proof" },
  { label: "Writing RSS", href: "/writing/feed.xml" },
  { label: "Privacy note", href: "/about#what-i-dont-claim" },
];
