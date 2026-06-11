import { ImageResponse } from "next/og";
import { BIO } from "@/lib/constants";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          backgroundColor: "#F8F7F4",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial gradient decoration */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(39,76,119,0.12) 0%, rgba(39,76,119,0) 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Logo */}
        <div
          style={{
            position: "absolute",
            top: "56px",
            left: "80px",
            fontSize: "20px",
            fontWeight: 700,
            color: "#161616",
            letterSpacing: "-0.04em",
          }}
        >
          {BIO.initials}
        </div>

        {/* Availability badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            background: "#FFFFFF",
            border: "1px solid #E7E4DF",
            borderRadius: "999px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "7px",
              height: "7px",
              background: "#2d9b5e",
              borderRadius: "50%",
            }}
          />
          <span
            style={{ fontSize: "14px", fontWeight: 500, color: "#5C5C5C" }}
          >
            {BIO.availability}
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#161616",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            maxWidth: "800px",
            marginBottom: "24px",
          }}
        >
          {BIO.name}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "24px",
            color: "#274C77",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            marginBottom: "40px",
          }}
        >
          {BIO.title}
        </div>

        {/* Sub */}
        <div
          style={{
            fontSize: "18px",
            color: "#5C5C5C",
            maxWidth: "600px",
            lineHeight: 1.6,
          }}
        >
          UX Research · Product Thinking · Frontend Engineering · Agentic AI
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
