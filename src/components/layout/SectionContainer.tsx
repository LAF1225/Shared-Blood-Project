import { cn } from '@/lib/utils';
import { PageContainer } from './PageContainer';

/** Vertical section wrapper with generous, consistent spacing rhythm. */
export function SectionContainer({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn('py-16 sm:py-20 lg:py-28', className)} {...props}>
      <PageContainer>{children}</PageContainer>
    </section>
  );
}
