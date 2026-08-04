'use client';

import type { Disease } from '@/types';
import { DiseaseCard } from '../../components/DiseaseCard';

/**
 * Related Diseases (spec §7 #16, §14). Reuses the Module 04 DiseaseCard so
 * related disorders look and route exactly like the library. Rendered in a
 * client boundary because DiseaseCard relies on next-intl client hooks.
 */
export function RelatedDiseases({ diseases }: { diseases: Disease[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {diseases.map((disease) => (
        <li key={disease.id}>
          <DiseaseCard disease={disease} />
        </li>
      ))}
    </ul>
  );
}
