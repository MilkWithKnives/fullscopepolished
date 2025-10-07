'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/journal', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
];

export default function HeaderPreview() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-coffee-900/70 backdrop-blur-md">
      <div className="container relative flex items-center justify-between px-3 py-4 sm:px-4 lg:px-6">
        {/* LEFT: Logo + Mobile Burger */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Logo - PROMINENTLY LARGE */}
          <Link href="/" className="block">
            <Logo stretch className="w-[500px] h-[120px] sm:w-[600px] sm:h-[150px] md:w-[700px] md:h-[180px] lg:w-[800px] lg:h-[200px] text-mascarpone" />
          </Link>

          {/* Mobile burger - Enhanced touch target */}
          <button
            type="button"
            className="inline-flex items-center justify-center transition-colors duration-200 border rounded-md lg:hidden h-11 w-11 sm:h-12 sm:w-12 border-white/15 text-mascarpone hover:bg-white/10 active:bg-white/20"
            aria-label="Open menu"
            aria-controls="site-menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <span aria-hidden="true" className="text-lg">
              ☰
            </span>
          </button>
        </div>

        {/* RIGHT: Mobile CTA + Desktop Nav */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile CTA - Better touch target */}
          <Link
            href="/contact"
            className="lg:hidden inline-block rounded-full bg-wine px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base font-black text-mascarpone shadow-[0_6px_18px_rgba(143,36,50,.25)] hover:shadow-[0_8px_24px_rgba(143,36,50,.35)] active:scale-95 transition-all duration-200"
          >
            Book Us
          </Link>

          {/* Desktop navigation - Starts at lg breakpoint */}
          <nav className="items-center hidden gap-2 lg:flex xl:gap-3 2xl:gap-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex items-center justify-center w-20 h-8 lg:w-24 lg:h-8 xl:w-28 xl:h-9 overflow-hidden duration-500 border rounded-md cursor-pointer group border-mascarpone/20 hover:border-wine bg-coffee-800 font-extrabold uppercase text-[9px] lg:text-[10px] xl:text-[11px] tracking-wide text-mascarpone"
              >
                {/* Ripple layers - your existing effect */}
                <span className="absolute z-0 w-12 h-12 transition-transform duration-500 rounded-full lg:w-16 lg:h-16 bg-coffee-900 group-hover:scale-150" />
                <span className="absolute z-0 w-10 h-10 transition-transform duration-500 delay-75 rounded-full lg:w-14 lg:h-14 bg-coffee-800 group-hover:scale-150" />
                <span className="absolute z-0 w-8 h-8 transition-transform duration-500 delay-100 rounded-full lg:w-12 lg:h-12 bg-coffee-700 group-hover:scale-150" />
                <span className="absolute z-0 w-6 h-6 transition-transform duration-500 delay-150 rounded-full lg:w-10 lg:h-10 bg-wine group-hover:scale-150" />
                <span className="absolute z-0 w-4 h-4 transition-transform duration-500 delay-200 rounded-full lg:w-8 lg:h-8 bg-mascarpone/30 group-hover:scale-150" />
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* MOBILE OVERLAY MENU - Enhanced */}
      <div
        id="site-menu"
        className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Menu Panel */}
        <div
          className={`absolute left-0 right-0 top-0 rounded-b-3xl border-b border-white/15 bg-coffee-900/95 backdrop-blur-xl p-4 sm:p-6 transition-transform duration-300 ease-out ${
            open ? 'translate-y-0' : '-translate-y-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Site Menu"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Logo className="w-auto h-12 sm:h-16 text-mascarpone" />
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center transition-colors duration-200 border rounded-lg h-11 w-11 sm:h-12 sm:w-12 border-white/15 text-mascarpone hover:bg-white/10 active:bg-white/20"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <span className="text-lg">×</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-4 text-base sm:text-lg font-black uppercase rounded-xl text-mascarpone hover:bg-white/10 active:bg-white/15 transition-colors duration-200 min-h-[48px] flex items-center"
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile CTA in menu */}
            <div className="pt-4 mt-4 border-t border-white/15">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block text-center rounded-full bg-wine px-6 py-4 text-lg font-black text-mascarpone shadow-[0_6px_18px_rgba(143,36,50,.25)] hover:shadow-[0_8px_24px_rgba(143,36,50,.35)] active:scale-95 transition-all duration-200 min-h-[48px] flex items-center justify-center"
              >
                Book Us
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
