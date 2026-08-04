import { ExternalLink, Stethoscope, BookMarked } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ReferenceVM {
  id: string;
  title: string;
  authors?: string;
  publication?: string;
  date?: string;
  url?: string;
}

/** Reference List (spec §8, §15). A numbered, citable list. */
export function ReferenceList({
  items,
  sourceLabel,
}: {
  items: ReferenceVM[];
  /** Accessible label for the external-link, e.g. "Open source". */
  sourceLabel: string;
}) {
  return (
    <ol className="space-y-4">
      {items.map((reference, index) => (
        <li key={reference.id} className="flex gap-3 text-sm">
          <span className="tnum shrink-0 font-medium text-muted-foreground">
            {index + 1}.
          </span>
          <div>
            <p className="font-medium text-foreground">{reference.title}</p>
            <p className="text-muted-foreground">
              {[reference.authors, reference.publication, reference.date]
                .filter(Boolean)
                .join(' · ')}
            </p>
            {reference.url && (
              <a
                href={reference.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-primary hover:underline"
              >
                <span>{sourceLabel}</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export interface SpecialistVM {
  id: string;
  role: string;
  description?: string;
}

/** Specialist Cards (spec §8). Roles relevant to the condition. */
export function SpecialistCards({ items }: { items: SpecialistVM[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((specialist) => (
        <li
          key={specialist.id}
          className="flex gap-3 rounded-2xl border border-border bg-surface p-4"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
            <Stethoscope className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-medium text-foreground">{specialist.role}</p>
            {specialist.description && (
              <p className="mt-0.5 text-sm text-muted-foreground">
                {specialist.description}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export interface ResourceVM {
  id: string;
  label: string;
  description?: string;
  href: string;
  external?: boolean;
}

/** Resource Cards (spec §8). Links to organisations / Pakistan resources. */
export function ResourceCards({ items }: { items: ResourceVM[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((resource) => (
        <li key={resource.id}>
          <a
            href={resource.href}
            target={resource.external ? '_blank' : undefined}
            rel={resource.external ? 'noopener noreferrer' : undefined}
            className={cn(
              'flex h-full items-start justify-between gap-3 rounded-2xl border border-border bg-surface p-4',
              'transition-colors hover:border-primary/40 hover:bg-primary/5',
            )}
          >
            <div>
              <p className="font-medium text-foreground">{resource.label}</p>
              {resource.description && (
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {resource.description}
                </p>
              )}
            </div>
            {resource.external && (
              <ExternalLink
                className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}

export interface ResearchUpdateVM {
  id: string;
  title: string;
  summary?: string;
  date?: string;
  url?: string;
}

/** Research Updates (spec §7). Dated, optionally-linked highlights. */
export function ResearchUpdates({
  items,
  readMoreLabel,
}: {
  items: ResearchUpdateVM[];
  readMoreLabel: string;
}) {
  return (
    <ul className="space-y-4">
      {items.map((update) => (
        <li
          key={update.id}
          className="rounded-2xl border border-border bg-surface p-5"
        >
          <div className="flex items-start gap-3">
            <BookMarked
              className="mt-0.5 h-5 w-5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <div>
              {update.date && (
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {update.date}
                </p>
              )}
              <p className="font-medium text-foreground">{update.title}</p>
              {update.summary && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {update.summary}
                </p>
              )}
              {update.url && (
                <a
                  href={update.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  <span>{readMoreLabel}</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
