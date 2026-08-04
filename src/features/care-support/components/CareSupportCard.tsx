'use client';

import { useLocale, useTranslations } from 'next-intl';
import { HelpCircle, ListChecks, Stethoscope, HeartHandshake, AlertTriangle, Package } from 'lucide-react';
import { getProfessionalTypeRecord } from '@/features/early-signs/data/professionalTypes';
import type { CareSupportRecord } from '../types';
import { resolveSupportItems } from '../filter';
import { CareReferences } from './CareReferences';
import { SupportItemCard } from './SupportItemCard';

type Locale = 'en' | 'ur';

/**
 * A single care-support card (spec §60). Presents practical, qualified care
 * education — why an area may matter, everyday considerations, what caregivers
 * may prepare for, questions to ask, relevant professional types, related
 * generic support items, and references. It is NEVER an individualized care plan
 * (spec §60) and never states that a child needs a specific device or
 * professional (spec §11/§16).
 */
export function CareSupportCard({ record }: { record: CareSupportRecord }) {
  const t = useTranslations('CareSupport');
  const locale = useLocale();
  const l: Locale = locale === 'ur' ? 'ur' : 'en';

  const supportItems = resolveSupportItems(record.supportItemIds);
  const professionals = record.suggestedProfessionalTypes
    .map((type) => getProfessionalTypeRecord(type))
    .filter((r): r is NonNullable<typeof r> => r != null);

  return (
    <article className="space-y-5 rounded-2xl border border-border bg-surface p-6 shadow-card">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
            {t(`domains.${record.careDomain}`)}
          </span>
          <span className="inline-flex rounded-full bg-muted/50 px-2.5 py-0.5 font-medium text-muted-foreground">
            {t(`contexts.${record.careContext}`)}
          </span>
          {record.ageContexts.map((age) => (
            <span key={age} className="inline-flex rounded-full bg-muted/50 px-2 py-0.5 font-medium text-muted-foreground">
              {t(`ages.${age}`)}
            </span>
          ))}
        </div>
        <h3 className="font-heading text-lg font-semibold text-foreground">{record.title[l]}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{record.shortDescription[l]}</p>
      </header>

      {record.contentNotice && (
        <p className="flex items-start gap-1.5 rounded-xl border border-accent-strong/25 bg-accent/5 p-3 text-sm text-foreground/90">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" aria-hidden="true" />
          {record.contentNotice[l]}
        </p>
      )}

      <div>
        <p className="font-medium text-foreground">{t('card.whyItMayMatter')}</p>
        <p className="mt-1 text-sm leading-relaxed text-foreground/90">{record.whyItMayMatter[l]}</p>
      </div>

      <CareList
        icon={<ListChecks className="h-4 w-4 text-primary" aria-hidden="true" />}
        title={t('card.practicalConsiderations')}
        items={record.practicalConsiderations.map((p) => p[l])}
      />

      <CareList
        icon={<HeartHandshake className="h-4 w-4 text-primary" aria-hidden="true" />}
        title={t('card.caregiverExpectations')}
        items={record.caregiverExpectations.map((p) => p[l])}
      />

      <CareList
        icon={<HelpCircle className="h-4 w-4 text-primary" aria-hidden="true" />}
        title={t('card.questionsToAsk')}
        items={record.questionsToAsk.map((p) => p[l])}
      />

      {professionals.length > 0 && (
        <div>
          <p className="flex items-center gap-1.5 font-medium text-foreground">
            <Stethoscope className="h-4 w-4 text-primary" aria-hidden="true" />
            {t('card.relevantProfessionals')}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {professionals.map((p) => p.label[l]).join('، ')}
          </p>
        </div>
      )}

      {supportItems.length > 0 && (
        <details className="group rounded-xl border border-border bg-background/60">
          <summary className="flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-3 font-medium text-foreground marker:content-none">
            <Package className="h-4 w-4 text-primary" aria-hidden="true" />
            {t('card.relatedSupportItems', { count: supportItems.length })}
          </summary>
          <div className="space-y-3 px-4 pb-4">
            {supportItems.map((item) => (
              <SupportItemCard key={item.id} item={item} />
            ))}
          </div>
        </details>
      )}

      <CareReferences ids={record.referenceIds} />
    </article>
  );
}

function CareList({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <p className="flex items-center gap-1.5 font-medium text-foreground">
        {icon}
        {title}
      </p>
      <ul className="mt-1.5 space-y-1.5">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm leading-relaxed text-foreground/90">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
