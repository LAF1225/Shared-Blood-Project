import { Eye, CircleCheck, CircleAlert } from 'lucide-react';

/**
 * Educational Callout (spec §9, §11). Every tool must explain three things: what
 * it demonstrates, what its results mean, and — deliberately emphasised — what
 * they do NOT mean. This reinforces that educational tools never replace medical
 * advice. Presentational: all copy + labels are resolved by the caller.
 */
export function ResultInterpretation({
  demonstratesLabel,
  demonstrates,
  resultsMeanLabel,
  resultsMean,
  resultsDoNotMeanLabel,
  resultsDoNotMean,
}: {
  demonstratesLabel: string;
  demonstrates: string;
  resultsMeanLabel: string;
  resultsMean: string;
  resultsDoNotMeanLabel: string;
  resultsDoNotMean: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Panel
        tone="neutral"
        icon={<Eye className="h-5 w-5" aria-hidden="true" />}
        label={demonstratesLabel}
        body={demonstrates}
      />
      <Panel
        tone="positive"
        icon={<CircleCheck className="h-5 w-5" aria-hidden="true" />}
        label={resultsMeanLabel}
        body={resultsMean}
      />
      <Panel
        tone="caution"
        icon={<CircleAlert className="h-5 w-5" aria-hidden="true" />}
        label={resultsDoNotMeanLabel}
        body={resultsDoNotMean}
      />
    </div>
  );
}

const TONES = {
  neutral: 'border-border bg-surface text-muted-foreground',
  positive: 'border-secondary/25 bg-secondary/5 text-secondary',
  caution: 'border-danger/25 bg-danger/5 text-danger',
} as const;

function Panel({
  tone,
  icon,
  label,
  body,
}: {
  tone: keyof typeof TONES;
  icon: React.ReactNode;
  label: string;
  body: string;
}) {
  return (
    <div className={`rounded-2xl border p-5 ${TONES[tone]}`}>
      <div className="flex items-center gap-2">
        {icon}
        <p className="font-heading text-sm font-semibold uppercase tracking-wide">
          {label}
        </p>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-foreground/90">{body}</p>
    </div>
  );
}
