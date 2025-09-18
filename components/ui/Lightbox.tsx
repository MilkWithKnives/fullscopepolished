'use client';

import { useEffect } from 'react';

type LightboxProps = {
  open: boolean;
  src: string | null;
  alt?: string;
  onClose: () => void;
};

export default function Lightbox({ open, src, alt, onClose }: LightboxProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || !src) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <img
        src={src}
        alt={alt || 'lightbox'}
        className="max-h-[90vh] max-w-[92vw] rounded-lg shadow-2xl transition-transform duration-200 ease-out"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        aria-label="Close"
        className="absolute text-2xl leading-none text-white top-4 right-5"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
}
