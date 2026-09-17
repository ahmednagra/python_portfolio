import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.headline;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          fontSize: 56,
          fontWeight: 600,
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 400, color: "#6b5f4d", marginBottom: 24 }}>
          {site.title}
        </div>
        <div>{site.name}</div>
        <div style={{ fontSize: 28, fontWeight: 400, color: "#6b5f4d", marginTop: 24 }}>
          Billing, quota and tenant isolation in multi-tenant SaaS
        </div>
      </div>
    ),
    { ...size }
  );
}
