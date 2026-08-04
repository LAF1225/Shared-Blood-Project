'use client';

import { useTranslations } from 'next-intl';
import { getTestingReference } from '../data/references';

/**
 * Reference list for a topic or result concept (spec §71). Every genetic/medical
 * claim is backed by a curated Module 07 reference; unknown ids are dropped (the
 * validator already removes unreferenced records before render).
 */
export function TestingReferences({ ids }: { ids: string[] }) {
  const t = useTranslations('GeneticTesting');
  const refs = ids.map((id) => getTestingReference(id)).filter((r): r is NonNullable<typeof r> => r != null);
  if (refs.length === 0) return null;

  return (
    <div className="text-xs text-muted-foreground">
      <span className="font-medium text-foreground/80">{t('references')}:</span>
      <ul className="mt-1 space-y-0.5">
        {refs.map((ref) => (
          <li key={ref.id}>
            {ref.url ? (
              <a href={ref.url} target="_blank" rel="noreferrer noopener" className="text-primary hover:underline">
                {ref.title}
              </a>
            ) : (
              <span>{ref.title}</span>
            )}
            <span>, {ref.publication}{ref.year ? `, ${ref.year}` : ''}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
