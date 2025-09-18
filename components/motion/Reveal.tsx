'use client';

import { useEffect, useRef } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
};

export default function Reveal({ children, className = '', once = true }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('reveal-enter');
            if (once) obs.unobserve(el);
          } else if (!once) {
            el.classList.remove('reveal-enter');
          }
        });
      },
      { threshold: 0.12 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  return (
    <div ref={ref} className={`reveal-init ${className}`}>
      {children}
    </div>
  );
}

/* Add to globals.css (once):
.reveal-init { opacity: 0; transform: translateY(6px); transition: opacity .45s ease, transform .45s ease; }
.reveal-enter { opacity: 1; transform: translateY(0); }
*/
