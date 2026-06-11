import type { Metadata } from "next";
import { Instrument_Sans, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import JsonLd from "@/components/JsonLd";
import { personSchema, websiteSchema } from "@/lib/structured-data";
import { BIO } from "@/lib/constants";

const displayFont = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://anubhavraj.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BIO.name} — ${BIO.title}`,
    template: `%s | ${BIO.name}`,
  },
  description:
    `${BIO.currentRole} at ${BIO.currentCompany}. I combine UX Research, Product Thinking, Interface Design, Design Systems, Frontend Engineering, and Agentic AI to bridge Research → Design → Code → Intelligence.`,
  keywords: [
    BIO.name,
    "Product Designer",
    "AI Engineer",
    "UX Research",
    "Frontend Engineer",
    "LangGraph",
    "Agentic AI",
    "Next.js",
    "Portfolio",
    "Bengaluru",
  ],
  authors: [{ name: BIO.name, url: SITE_URL }],
  creator: BIO.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: BIO.name,
    title: `${BIO.name} — ${BIO.title}`,
    description:
      "I combine UX Research, Product Thinking, Interface Design, and Agentic AI Engineering. From blank canvas to deployed, agentic system — I own the entire lifecycle.",
    images: [
      {
        url: `${SITE_URL}/og`,
        width: 1200,
        height: 630,
        alt: `${BIO.name} — ${BIO.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BIO.name} — ${BIO.title}`,
    description:
      "UX Research · Product Thinking · Frontend Engineering · Agentic AI",
    images: [`${SITE_URL}/og`],
    creator: "@anubhavraj",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${inter.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ScrollProgress />
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
        <JsonLd data={personSchema()} />
        <JsonLd data={websiteSchema()} />
      </body>
    </html>
  );
}
