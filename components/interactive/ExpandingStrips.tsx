'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './expanding-strips.module.css';

type Strip = {
  title: string;
  text: string;
  /** URL under /public (e.g. /images/portfolio/strip1.jpg) */
  bg: string;
  index?: number; // optional explicit index label
};

export default function ExpandingStrips({
  strips,
  className = '',
  startInactive = true, // play the intro slide-in
}: {
  strips: Strip[];
  className?: string;
  startInactive?: boolean;
}) {
  const [active, setActive] = useState<number | null>(null);
  const contRef = useRef<HTMLDivElement>(null);

  // intro animation: add/remove s--inactive like the original demo
  useEffect(() => {
    const el = contRef.current;
    if (!el) return;
    if (!startInactive) return;
    el.classList.add(styles['s--inactive']);
    const t = setTimeout(() => {
      el.classList.remove(styles['s--inactive']);
    }, 30); // allow layout before animation
    return () => clearTimeout(t);
  }, [startInactive]);

  // whenever active changes, toggle container "s--el-active"
  useEffect(() => {
    const cont = contRef.current;
    if (!cont) return;
    if (active === null) {
      cont.classList.remove(styles['s--el-active']);
    } else {
      cont.classList.add(styles['s--el-active']);
    }
  }, [active]);

  const onStripClick = (i: number) => {
    if (active === i) return; // already open
    setActive(i);
  };

  const close = () => setActive(null);

  return (
    <div ref={contRef} className={`${styles.cont} ${className}`}>
      <div className={styles['cont__inner']}>
        {strips.map((s, i) => {
          const isActive = active === i;
          const headerId = `exp-strip-header-${i}`;
          const panelId = `exp-strip-panel-${i}`;
          return (
            <div
              key={i}
              className={`${styles.el} ${isActive ? styles['s--active'] : ''}`}
            >
              <div className={styles['el__overflow']}>
                <div className={styles['el__inner']}>
                  {/* BG layer */}
                  <div
                    className={styles['el__bg']}
                    aria-hidden={true}
                    style={
                      {
                        // custom property for each background
                        '--x-bg': `url("${s.bg}")`,
                      } as React.CSSProperties
                    }
                  />
                  {/* Preview (title) */}
                  <button
                    type="button"
                    className={styles['el__preview-cont']}
                    aria-expanded={isActive}
                    aria-controls={panelId}
                    disabled={active !== null && !isActive}
                    onClick={() => onStripClick(i)}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') close();
                    }}
                  >
                    <h2 id={headerId} className={styles['el__heading']}>
                      {s.title}
                    </h2>
                  </button>
                  {/* Expanded content */}
                  <div
                    id={panelId}
                    className={styles['el__content']}
                    role="region"
                    aria-labelledby={headerId}
                    hidden={!isActive}
                  >
                    <div className={styles['el__text']}>{s.text}</div>
                    {isActive && (
                      <button
                        type="button"
                        className={styles['el__close-btn']}
                        aria-label={`Close ${s.title}`}
                        aria-controls={panelId}
                        onClick={(e) => {
                          e.stopPropagation();
                          close();
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Giant index overlay (decorative) */}
              <div className={styles['el__index']} aria-hidden={true}>
                <div className={styles['el__index-back']}>{(s.index ?? i + 1)}</div>
                <div className={styles['el__index-front']}>
                  <div
                    className={styles['el__index-overlay']}
                    data-index={(s.index ?? i + 1)}
                  >
                    {(s.index ?? i + 1)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
