import { Wrench } from 'lucide-react';

/**
 * Interactive Tool Container (spec §8, §11). This module builds the framework
 * only — the interactive calculation itself is delivered by a later module
 * (spec §18). Until then the container shows a clear "coming soon" state so the
 * page structure is complete and the interactive slot is visibly reserved.
 *
 * Presentational: all copy is resolved by the caller.
 */
export function InteractiveToolPlaceholder({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-primary/30 bg-primary/5 px-6 py-12 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Wrench className="h-7 w-7" aria-hidden="true" />
      </span>
      <div className="max-w-md space-y-1.5">
        <p className="font-heading text-lg font-semibold text-foreground">{title}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}
