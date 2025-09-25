'use client';

import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  /** seconds; e.g. 0.1, 0.2 */
  delay?: number;
  /** initial Y offset in px */
  y?: number;
  /** seconds */
  duration?: number;
  className?: string;
};

export default function Reveal({
  children,
  delay = 0,
  y = 12,
  duration = 0.5,
  className,
}: Props) {
  return (
    <motion.div
      initial={{ y, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}