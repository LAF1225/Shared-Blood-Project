import { Search as SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from './Input';

/** Foundation search field (icon + labelled input). Wiring added later. */
export function Search({
  className,
  label = 'Search',
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <div className={cn('relative', className)}>
      <SearchIcon
        className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        type="search"
        aria-label={label}
        placeholder={`${label}…`}
        className="pl-10"
        {...props}
      />
    </div>
  );
}
