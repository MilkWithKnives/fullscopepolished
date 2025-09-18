'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

type RippleButtonProps = {
  href?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg'; // optional: controls button dimensions
  className?: string; // extra Tailwind classes if needed
};

export default function RippleButton({
  href,
  children,
  size = 'md',
  className = '',
}: RippleButtonProps) {
  // map sizes to Tailwind dimensions
  const sizeClasses =
    size === 'sm'
      ? 'h-6 w-20 text-[10px]'
      : size === 'lg'
      ? 'h-8 w-28 text-[11px]'
      : 'h-7 w-24 text-[10px]';

  const baseClasses = `
    relative border border-mascarpone/20 hover:border-wine duration-500
    group cursor-pointer overflow-hidden
    rounded-md bg-coffee-800 flex justify-center items-center
    font-extrabold uppercase tracking-wide text-mascarpone
  `;

  const buttonContent = (
    <>
      {/* ripple layers */}
      <div className="absolute z-0 w-20 h-20 transition-all duration-500 ease-in-out delay-150 rounded-full group-hover:scale-150 bg-coffee-900 group-hover:delay-75"></div>
      <div className="absolute z-0 w-16 h-16 transition-all duration-500 ease-in-out delay-150 rounded-full group-hover:scale-150 bg-coffee-800 group-hover:delay-100"></div>
      <div className="absolute z-0 w-12 h-12 transition-all duration-500 ease-in-out delay-150 rounded-full group-hover:scale-150 bg-coffee-700 group-hover:delay-150"></div>
      <div className="absolute z-0 w-10 h-10 transition-all duration-500 ease-in-out delay-150 rounded-full group-hover:scale-150 bg-wine group-hover:delay-200"></div>
      <div className="absolute z-0 w-8 h-8 transition-all duration-500 ease-in-out delay-150 rounded-full group-hover:scale-150 bg-mascarpone/30 group-hover:delay-300"></div>

      {/* label */}
      <span className="relative z-10">{children}</span>
    </>
  );

  return href ? (
    <Link
      href={href}
      className={`${baseClasses} ${sizeClasses} ${className}`}
    >
      {buttonContent}
    </Link>
  ) : (
    <button
      type="button"
      className={`${baseClasses} ${sizeClasses} ${className}`}
    >
      {buttonContent}
    </button>
  );
}