import { ArrowLeft, ArrowRight, Library, Dna, BookOpen } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';

export interface DiseaseNavLink {
  slug: string;
  name: string;
}

export interface DiseaseNavLabels {
  sectionLabel: string;
  previous: string;
  next: string;
  backToLibrary: string;
  genetics: string;
  resources: string;
}

/**
 * Educational Navigation (spec §17). Prev/next disease plus quick links to the
 * Library, Genetics Explorer, and Resources — so a disease page is never a dead
 * end (§18). Arrows flip automatically under RTL.
 */
export function DiseaseNavigation({
  prev,
  next,
  labels,
}: {
  prev?: DiseaseNavLink;
  next?: DiseaseNavLink;
  labels: DiseaseNavLabels;
}) {
  return (
    <nav aria-label={labels.sectionLabel} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link
            href={ROUTES.disease(prev.slug)}
            className="group flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            <ArrowLeft
              className="h-5 w-5 shrink-0 text-primary rtl:rotate-180"
              aria-hidden="true"
            />
            <span className="min-w-0">
              <span className="block text-xs uppercase tracking-wide text-muted-foreground">
                {labels.previous}
              </span>
              <span className="block truncate font-medium text-foreground">
                {prev.name}
              </span>
            </span>
          </Link>
        ) : (
          <span aria-hidden="true" />
        )}
        {next ? (
          <Link
            href={ROUTES.disease(next.slug)}
            className="group flex items-center justify-end gap-3 rounded-2xl border border-border bg-surface p-4 text-end transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            <span className="min-w-0">
              <span className="block text-xs uppercase tracking-wide text-muted-foreground">
                {labels.next}
              </span>
              <span className="block truncate font-medium text-foreground">
                {next.name}
              </span>
            </span>
            <ArrowRight
              className="h-5 w-5 shrink-0 text-primary rtl:rotate-180"
              aria-hidden="true"
            />
          </Link>
        ) : (
          <span aria-hidden="true" />
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <QuickLink href={ROUTES.diseases} icon={Library} label={labels.backToLibrary} />
        <QuickLink href={ROUTES.genetics} icon={Dna} label={labels.genetics} />
        <QuickLink href={ROUTES.resources} icon={BookOpen} label={labels.resources} />
      </div>
    </nav>
  );
}

function QuickLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: typeof Library;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-surface px-4 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
    >
      <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
      {label}
    </Link>
  );
}
