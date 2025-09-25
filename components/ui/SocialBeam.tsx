"use client";

import { FaFacebook, FaLinkedin, FaGithub, FaDiscord, FaReddit } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socials = [
  { href: "https://facebook.com/yourpage", label: "Facebook", Icon: FaFacebook },
  { href: "https://x.com/yourhandle",      label: "X (Twitter)", Icon: FaXTwitter },
  { href: "https://linkedin.com/in/you",   label: "LinkedIn", Icon: FaLinkedin },
  { href: "https://github.com/you",        label: "GitHub", Icon: FaGithub },
  { href: "https://discord.gg/yourinvite", label: "Discord", Icon: FaDiscord },
  { href: "https://reddit.com/u/you",      label: "Reddit", Icon: FaReddit },
];

export default function SocialBeam() {
  return (
    <div className="flex flex-wrap gap-3">
      {socials.map(({ href, label, Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.04] px-3 py-2 text-sm hover:bg-white/[.08] transition"
        >
          <Icon aria-hidden className="w-4 h-4" />
          <span className="hidden sm:inline">{label}</span>
        </a>
      ))}
    </div>
  );
}