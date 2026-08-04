import { Check, CircleDot, Lightbulb } from 'lucide-react';
import { Alert } from '@/components/ui/Alert';
import { cn } from '@/lib/utils';

/**
 * Section shell (spec §8 "Information Section"). Gives every disease section a
 * stable anchor id (for in-page navigation), an accessible heading, and a
 * consistent rhythm. Presentational only — all text is pre-localized upstream.
 */
export function SectionShell({
  id,
  title,
  description,
  children,
  className,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn('scroll-mt-28', className)}
    >
      <h2
        id={`${id}-heading`}
        className="font-heading text-2xl font-semibold tracking-tight text-foreground"
      >
        {title}
      </h2>
      {description && <p className="mt-1 text-muted-foreground">{description}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

/** Generic prose block: paragraphs + an optional bullet list. */
export function InfoBlock({
  paragraphs,
  points,
}: {
  paragraphs?: string[];
  points?: string[];
}) {
  return (
    <div className="space-y-3">
      {paragraphs?.map((paragraph, index) => (
        <p key={index} className="leading-relaxed text-foreground/90">
          {paragraph}
        </p>
      ))}
      {points && points.length > 0 && (
        <ul className="mt-2 space-y-2">
          {points.map((point, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check
                className="mt-1 h-4 w-4 shrink-0 text-secondary"
                aria-hidden="true"
              />
              <span className="text-foreground/90">{point}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** A list of symptoms / signs. */
export function SymptomsList({
  items,
}: {
  items: { text: string; note?: string }[];
}) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2.5">
          <CircleDot
            className="mt-1 h-4 w-4 shrink-0 text-primary"
            aria-hidden="true"
          />
          <div>
            <p className="text-foreground/90">{item.text}</p>
            {item.note && (
              <p className="text-sm text-muted-foreground">{item.note}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Emergency Alert Box (spec §8) — high-visibility danger styling. */
export function EmergencyAlert({
  title,
  items,
}: {
  title: string;
  items: { text: string; note?: string }[];
}) {
  return (
    <Alert tone="danger" title={title}>
      <ul className="mt-1 space-y-1.5">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span aria-hidden="true" className="mt-1.5 text-danger">
              •
            </span>
            <span>
              {item.text}
              {item.note && (
                <span className="text-muted-foreground">, {item.note}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </Alert>
  );
}

/** Educational Callout (spec §8) — a soft, highlighted aside. */
export function EducationalCallout({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-5">
      <Lightbulb
        className="mt-0.5 h-5 w-5 shrink-0 text-primary"
        aria-hidden="true"
      />
      <div className="space-y-1 text-sm">
        {title && <p className="font-semibold text-foreground">{title}</p>}
        <div className="text-foreground/80">{children}</div>
      </div>
    </div>
  );
}
