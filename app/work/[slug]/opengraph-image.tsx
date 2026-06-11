import { ImageResponse } from "next/og";
import { getCaseStudyBySlug } from "@/lib/mdx";
import { BIO } from "@/lib/constants";

export const alt = `Case Study — ${BIO.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  const title = caseStudy?.frontmatter.title ?? "Case Study";
  const type = caseStudy?.frontmatter.type ?? "Project";
  const accentColor = caseStudy?.frontmatter.accentColor ?? "#274C77";

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
        {/* Accent bar top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: accentColor,
          }}
        />

        {/* Radial decoration */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "500px",
            height: "500px",
            background: `radial-gradient(circle, ${accentColor}20 0%, transparent 70%)`,
            borderRadius: "50%",
          }}
        />

        {/* Logo */}
        <div
          style={{
            position: "absolute",
            top: "56px",
            left: "80px",
            fontSize: "18px",
            fontWeight: 700,
            color: "#161616",
            letterSpacing: "-0.04em",
          }}
        >
          {BIO.initials}
        </div>

        {/* Type badge */}
        <div
          style={{
            display: "flex",
            marginBottom: "24px",
            padding: "6px 12px",
            background: `${accentColor}15`,
            borderRadius: "4px",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: accentColor,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {type}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#161616",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            maxWidth: "800px",
            marginBottom: "24px",
          }}
        >
          {title}
        </div>

        {/* Author */}
        <div
          style={{
            fontSize: "18px",
            color: "#5C5C5C",
            fontWeight: 400,
          }}
        >
          Case Study by {BIO.name}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
