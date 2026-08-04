import { Skeleton } from '@/components/ui/Skeleton';
import { PageContainer } from '@/components/layout/PageContainer';

/**
 * Reusable loading infrastructure (spec §17).
 * Skeleton placeholders per surface type; feature modules refine as needed.
 */
export function PageLoading() {
  return (
    <PageContainer className="space-y-4 py-16">
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-5/6" />
    </PageContainer>
  );
}

export function CardLoading() {
  return (
    <div className="space-y-3 rounded-2xl border border-border p-6">
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

export function MapLoading() {
  return <Skeleton className="aspect-[4/3] w-full" />;
}

export function CalculatorLoading() {
  return (
    <div className="space-y-4 rounded-2xl border border-border p-6">
      <Skeleton className="h-11 w-full" />
      <Skeleton className="h-11 w-full" />
      <Skeleton className="h-11 w-1/3" />
    </div>
  );
}

export function SurveyLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-11 w-full" />
      <Skeleton className="h-11 w-full" />
    </div>
  );
}
