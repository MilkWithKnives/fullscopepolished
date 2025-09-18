// components/SocialBeam.tsx
"use client";

import { FaFacebook, FaLinkedin, FaGithub, FaDiscord, FaReddit } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socials = [
  { name: "Facebook", icon: FaFacebook, href: "https://facebook.com", color: "#1877F2" },
  { name: "Twitter", icon: FaXTwitter, href: "https://twitter.com", color: "#1DA1F2" },
  { name: "LinkedIn", icon: FaLinkedin, href: "https://linkedin.com", color: "#0A66C2" },
  { name: "GitHub", icon: FaGithub, href: "https://github.com", color: "#ffffff" },
  { name: "Discord", icon: FaDiscord, href: "https://discord.com", color: "#5865F2" },
  { name: "Reddit", icon: FaReddit, href: "https://reddit.com", color: "#FF4500" },
];

export default function SocialBeam() {
  return (
    <footer className="w-full py-10 bg-coffee-900">
      <div className="container flex flex-col items-center justify-center gap-6 mx-auto sm:flex-row sm:gap-8">
        {socials.map(({ name, icon: Icon, href, color }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center transition-transform transform rounded-full group w-14 h-14 hover:scale-110"
            style={{ backgroundColor: "#111", color }}
          >
            <Icon size={26} />
            <span
              className="absolute inset-0 transition duration-300 rounded-full opacity-0 group-hover:opacity-100"
              style={{
                boxShadow: `0 0 15px ${color}, 0 0 30px ${color}`,
              }}
            ></span>
          </a>
        ))}
      </div>
    </footer>
  );
}
