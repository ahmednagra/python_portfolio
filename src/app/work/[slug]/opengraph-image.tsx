import { ImageResponse } from "next/og";
import { getCaseStudyBySlug, getClearedCaseStudies } from "@/components/work/case-studies";

export const alt = "Case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getClearedCaseStudies().map((entry) => ({ slug: entry.slug }));
}

/**
 * Per-case-study OG card: title + one-line proof claim, text-only —
 * never a screenshot of confidential UI, per the seo_plan constraint.
 */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getCaseStudyBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#faf9f6",
          color: "#241f18",
          fontSize: 52,
          fontWeight: 600,
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 400, color: "#b8461f", marginBottom: 24 }}>
          {`Case Study — ${entry?.attributionToken ?? ""}`}
        </div>
        <div>{entry?.title ?? "Case study"}</div>
        <div style={{ fontSize: 26, fontWeight: 400, color: "#6b5f4d", marginTop: 24 }}>
          {entry?.oneLine ?? ""}
        </div>
      </div>
    ),
    { ...size }
  );
}
