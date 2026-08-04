import { Info, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tone = 'info' | 'success' | 'warning' | 'danger';

const config: Record<Tone, { icon: typeof Info; classes: string }> = {
  info: { icon: Info, classes: 'border-info/30 bg-info/10 text-info' },
  success: {
    icon: CheckCircle2,
    classes: 'border-success/30 bg-success/10 text-success',
  },
  warning: {
    icon: AlertTriangle,
    classes: 'border-warning/30 bg-warning/10 text-warning',
  },
  danger: { icon: XCircle, classes: 'border-danger/30 bg-danger/10 text-danger' },
};

/**
 * Inline alert. Pairs a semantic color with an icon (never color alone),
 * and uses role="alert" for assistive tech.
 */
export function Alert({
  tone = 'info',
  title,
  children,
  className,
}: {
  tone?: Tone;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const { icon: Icon, classes } = config[tone];
  return (
    <div
      role="alert"
      className={cn('flex gap-3 rounded-xl border p-4', classes, className)}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div className="space-y-1 text-sm text-foreground">
        {title && <p className="font-semibold">{title}</p>}
        {children}
      </div>
    </div>
  );
}
