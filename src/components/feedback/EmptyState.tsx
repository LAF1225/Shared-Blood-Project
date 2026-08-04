import { Inbox } from 'lucide-react';

/** Reusable empty-state presentation (helpful message + optional action). */
export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Inbox className="h-7 w-7" aria-hidden="true" />
      </span>
      <h2 className="font-heading text-xl font-semibold text-foreground">
        {title}
      </h2>
      {description && <p className="text-muted-foreground">{description}</p>}
      {action}
    </div>
  );
}
