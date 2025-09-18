// components/layout/Footer.tsx
'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * Spotlight/Beam social button (uses styles from app/globals.css @layer components .sb ...).
 * Hover state glows in brand color; rest is dim/neutral.
 */
function SocialBeam({
  href,
  label,
  variant,
  icon,
  className = '',
}: {
  href: string;
  label: string;
  variant:
    | 'instagram'
    | 'facebook'
    | 'linkedin'
    | 'youtube'
    | 'x'
    | 'github'
    | 'discord'
    | 'reddit';
  icon: ReactNode;
  className?: string;
}) {
  return (
    <div className={`sb ${className}`}>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={`bt sb--${variant}`}
      >
        {/* Spotlight cone */}
        <div className="light-holder" aria-hidden="true">
          <div className="dot" />
          <div className="light" />
        </div>

        {/* Icon chip + label */}
        <div className="button-holder">
          <div className="sb-icon" aria-hidden="true">
            {icon}
          </div>
          <p className="sb-text">{label}</p>
        </div>
      </Link>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-coffee-900/90 backdrop-blur-md">
      {/* Lock the footer bar height so the logo can't resize it */}
      <div className="container h-20 md:h-24">
        <div className="flex items-center justify-between h-full gap-6">
          {/* LEFT: footer logo, constrained by wrapper height */}
          <Link href="/" aria-label="Full Scope Media — Home" className="flex-none">
            <div className="h-full">
              <img
                src="/Logonobckgrndblack.svg"
                alt="Full Scope Media"
                className="block w-auto h-full select-none"
                loading="eager"
                decoding="async"
              />
            </div>
          </Link>

          {/* RIGHT: socials — dim at rest, brand glow on hover */}
          <nav className="flex items-end gap-6 md:gap-7">
            <SocialBeam
              href="https://instagram.com/full.scope.media"
              label="instagram"
              variant="instagram"
              icon={
                <svg viewBox="0 0 448 512" aria-hidden="true">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9S160.5 370.8 224.1 370.8 339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.2 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.5 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zM398.8 80c-10.5-27.6-31.6-48.7-59.2-59.2C313.1 10 256 10 224 10s-89.1 0-115.6 10.8C80.8 31.3 59.7 52.4 49.2 80 38.4 106.5 38.4 144 38.4 176s0 69.5 10.8 96c10.5 27.6 31.6 48.7 59.2 59.2C134.9 342 192 342 224 342s89.1 0 115.6-10.8c27.6-10.5 48.7-31.6 59.2-59.2C409.6 245.5 409.6 208 409.6 176s0-69.5-10.8-96z" />
                </svg>
              }
            />
            <SocialBeam
              href="https://www.facebook.com/profile.php?id=61580303270870"
              label="facebook"
              variant="facebook"
              icon={
                <svg viewBox="0 0 320 512" aria-hidden="true">
                  <path d="M279.14 288l14.22-92.66h-88.91V133.33c0-25.35 12.42-50.06 52.24-50.06H296V6.26S259.5 0 225.36 0C149.1 0 100.28 44.38 100.28 124.72V195.3H12v92.7h88.28V512h107.17V288z" />
                </svg>
              }
            />
            <SocialBeam
              href="https://www.linkedin.com/in/ryan-champion-35b501347/"
              label="linkedin"
              variant="linkedin"
              icon={
                <svg viewBox="0 0 448 512" aria-hidden="true">
                  <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                </svg>
              }
            />
            <SocialBeam
              href="https://youtube.com/@your-handle"
              label="youtube"
              variant="youtube"
              icon={
                <svg viewBox="0 0 576 512" aria-hidden="true">
                  <path d="M549.7 124.1c-6.3-23.8-24.9-42.4-48.7-48.7C458.8 64 288 64 288 64S117.2 64 75 75.4c-23.8 6.3-42.4 24.9-48.7 48.7C14.9 166.3 14.9 256 14.9 256s0 89.7 11.4 131.9c6.3 23.8 24.9 42.4 48.7 48.7C117.2 448 288 448 288 448s170.8 0 212.9-11.4c23.8-6.3 42.4-24.9 48.7-48.7C561.1 345.7 561.1 256 561.1 256s0-89.7-11.4-131.9zM231 338V174l142 82-142 82z" />
                </svg>
              }
            />
            <SocialBeam
              href="https://x.com/your-handle"
              label="x"
              variant="x"
              icon={
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2H21.5l-7.5 8.58L22.5 22h-6.234l-4.873-5.8-5.566 5.8H2.071l8.028-8.38L1.5 2h6.398l4.403 5.147L18.244 2zm-1.094 18h1.871L7.01 4H5.04l12.11 16z" />
                </svg>
              }
            />
            <SocialBeam
              href="https://github.com/MilkWithKnives"
              label="github"
              variant="github"
              icon={
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.726-4.033-1.61-4.033-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.205.084 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.76-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.47-2.382 1.236-3.223-.124-.304-.536-1.53.117-3.187 0 0 1.008-.322 3.3 1.23a11.48 11.48 0 0 1 3.003-.404c1.018.005 2.044.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.654 1.657.242 2.883.119 3.187.77.841 1.235 1.913 1.235 3.223 0 4.61-2.805 5.624-5.479 5.921.43.37.823 1.102.823 2.222v3.293c0 .32.192.694.8.576C20.565 21.797 24 17.297 24 12c0-6.63-5.373-12-12-12z" />
                </svg>
              }
            />
            <SocialBeam
              href="https://discord.gg/your-server"
              label="discord"
              variant="discord"
              icon={
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.249.077.077 0 0 0-.079-.037c-1.69.322-3.34.844-4.885 1.515a.07.07 0 0 0-.032.027C2.02 9.045 1.213 13.58 1.5 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.027c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.105c-.652-.247-1.27-.547-1.852-.892a.077.077 0 0 1-.008-.127c.124-.093.248-.19.366-.288a.074.074 0 0 1 .077-.01c3.9 1.785 8.182 1.785 12.041 0a.074.074 0 0 1 .078.01c.118.098.242.195.366.288a.077.077 0 0 1-.007.127 12.298 12.298 0 0 1-1.853.892.076.076 0 0 0-.04.106c.36.699.772 1.364 1.225 1.993a.076.076 0 0 0 .084.028 19.876 19.876 0 0 0 6.002-3.03.076.076 0 0 0 .031-.055c.5-6.848-1.049-11.341-4.548-13.661a.061.061 0 0 0-.031-.028zM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.212 0 2.177 1.096 2.157 2.419 0 1.334-.955 2.419-2.157 2.419zm7.975 0c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.212 0 2.177 1.096 2.157 2.419 0 1.334-.955 2.419-2.157 2.419z" />
                </svg>
              }
            />
            <SocialBeam
              href="https://reddit.com/u/your-handle"
              label="reddit"
              variant="reddit"
              icon={
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M6.167 8a.831.831 0 0 0-.83.83c0 .459.372.84.83.831a.831.831 0 0 0 0-1.661zm1.843 3.647c.315 0 1.403-.038 1.976-.611a.232.232 0 0 0 0-.306.213.213 0 0 0-.306 0c-.353.363-1.126.487-1.67.487-.545 0-1.308-.124-1.671-.487a.213.213 0 0 0-.306 0 .213.213 0 0 0 0 .306c.564.563 1.652.61 1.977.61zm.992-2.807c0 .458.373.83.831.83.458 0 .83-.381.83-.83a.831.831 0 0 0-1.66 0z" />
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.828-1.165c-.315 0-.602.124-.812.325-.801-.573-1.9-.945-3.121-.993l.534-2.501 1.738.372a.83.83 0 1 0 .83-.869.83.83 0 0 0-.744.468l-1.938-.41a.186.186 0 0 0-.24.162l-.592 2.788c-1.24.038-2.358.41-3.17.992-.21-.2-.496-.324-.81-.324a1.163 1.163 0 0 0-.478 2.224c-.02.115-.029.23-.029.353 0 1.795 2.091 3.256 4.669 3.256 2.577 0 4.668-1.451 4.668-3.256 0-.114-.01-.238-.029-.353.401-.181.688-.592.688-1.069 0-.65-.525-1.165-1.165-1.165z" />
                </svg>
              }
            />
          </nav>
        </div>
      </div>
    </footer>
  );
}
