import { ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export interface Crumb {
  label: string;
  href?: string;
}

/** Foundation breadcrumb trail (aids orientation on deep pages). */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-foreground hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className="text-foreground">
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
