import { ArrowRight, HeartHandshake } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';

/**
 * Disease-page Care & Support summary (spec §4/§5). A synchronous, presentational
 * server component: the Disease route resolves the summary data + localized
 * strings and passes them in, so this renders inside the page's single streaming
 * unit (matching the DiseasePage engine pattern). It links to the full Module 14
 * view, deep-linked to this disease. Module 14 owns the structured care content
 * — this is a summary, never a duplicate care system (spec §5).
 */
export function CareSummary({
  intro,
  domains,
  ctaLabel,
  diseaseSlug,
}: {
  intro: string;
  domains: string[];
  ctaLabel: string;
  diseaseSlug: string;
}) {
  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
      <div className="flex items-start gap-3">
        <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div className="space-y-3">
          <p className="text-foreground/90">{intro}</p>
          {domains.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {domains.map((domain) => (
                <li
                  key={domain}
                  className="inline-flex rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {domain}
                </li>
              ))}
            </ul>
          )}
          <Link
            href={`${ROUTES.careSupport}?disease=${diseaseSlug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
