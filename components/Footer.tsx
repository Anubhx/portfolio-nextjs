"use client";

import { FOOTER, SOCIALS, BIO } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer">
      <div className="container grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-6 flex flex-col gap-4">
          <p className="font-display text-2xl">{BIO.name}</p>
          <p className="editorial-body text-sm max-w-xs">{FOOTER.tagline}</p>
        </div>
        
        <div className="md:col-span-3 flex flex-col gap-4">
          <span className="editorial-meta">Connect</span>
          <div className="flex flex-col gap-2">
            <a href={`mailto:${BIO.email}`} className="nav-link normal-case">Email</a>
            {Object.entries(SOCIALS).map(([platform, url]) => {
              if (!url) return null;
              return (
                <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="nav-link normal-case capitalize">
                  {platform}
                </a>
              );
            })}
          </div>
        </div>

        <div className="md:col-span-3 flex flex-col gap-4">
          <span className="editorial-meta">Location</span>
          <p className="editorial-body text-sm">{FOOTER.location}</p>
          <p className="editorial-body text-sm mt-8">&copy; {currentYear}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
