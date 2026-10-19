'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SlideshowSlide {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export interface SlideshowLabels {
  region: string;
  previous: string;
  next: string;
  /** Template with `{n}`: the 1-based slide number. */
  goTo: string;
  /** Template with `{current}` and `{total}`. */
  position: string;
}

const fillTemplate = (template: string, values: Record<string, number>) =>
  template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));

/**
 * Accessible photo slideshow. No autoplay (nothing moves unless the viewer
 * asks), Previous/Next buttons, dot navigation, Left/Right arrow keys and
 * swipe on touch screens. In RTL the arrows and keys follow reading order.
 */
export function PhotoSlideshow({
  slides,
  labels,
  rtl,
}: {
  slides: readonly SlideshowSlide[];
  labels: SlideshowLabels;
  rtl: boolean;
}) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const total = slides.length;
  const go = (next: number) => setIndex((next + total) % total);
  const forward = () => go(index + 1);
  const back = () => go(index - 1);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    // In RTL the "next" slide sits to the left.
    const towardsNext = (event.key === 'ArrowRight') !== rtl;
    if (towardsNext) forward();
    else back();
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null) return;
    const dx = event.changedTouches[0].clientX - start;
    if (Math.abs(dx) < 40) return;
    // Swiping left reveals the next slide in LTR, the previous one in RTL.
    if ((dx < 0) !== rtl) forward();
    else back();
  };

  const PrevIcon = rtl ? ChevronRight : ChevronLeft;
  const NextIcon = rtl ? ChevronLeft : ChevronRight;
  const buttonClass =
    'absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground shadow-soft transition-colors hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary';

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="space-y-3 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      <div
        className="relative overflow-hidden rounded-2xl border border-border bg-foreground/5"
        onTouchStart={(event) => (touchStartX.current = event.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, i) => (
          <figure
            key={slide.src}
            role="group"
            aria-roledescription="slide"
            aria-label={fillTemplate(labels.position, { current: i + 1, total })}
            hidden={i !== index}
            className="m-0"
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(min-width: 896px) 896px, 100vw"
                priority={i === 0}
                className="object-contain"
              />
            </div>
            <figcaption className="border-t border-border bg-surface px-4 py-3 text-sm leading-relaxed text-foreground/85">
              {slide.caption}
            </figcaption>
          </figure>
        ))}

        {total > 1 && (
          <>
            <button type="button" onClick={back} aria-label={labels.previous} className={cn(buttonClass, 'start-3')}>
              <PrevIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={forward} aria-label={labels.next} className={cn(buttonClass, 'end-3')}>
              <NextIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-1">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => go(i)}
                aria-label={fillTemplate(labels.goTo, { n: i + 1 })}
                aria-current={i === index ? 'true' : undefined}
                className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <span
                  className={cn(
                    'block h-2.5 rounded-full transition-all',
                    i === index ? 'w-6 bg-primary' : 'w-2.5 bg-foreground/25',
                  )}
                />
              </button>
            ))}
          </div>
          <p className="text-sm tabular-nums text-muted-foreground" aria-live="polite">
            {fillTemplate(labels.position, { current: index + 1, total })}
          </p>
        </div>
      )}
    </div>
  );
}
