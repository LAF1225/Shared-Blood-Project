'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ExternalLink, ArrowRight, MapPin } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { EducationalCallout } from '@/features/diseases/content/components/Section';
import { getDiseaseBySlug } from '@/features/diseases/data/diseases';
import { getMapReference } from '../data/references';
import { PROVINCE_OPTIONS } from '../data/evidence';
import type { MapEvidenceRecord } from '../types';

type Locale = 'en' | 'ur';

/**
 * Evidence detail panel (spec §22). Shows the record's structured fields, always
 * pairing "what this evidence CAN tell us" with "what it CANNOT" (spec §23/§24)
 * — the interpretation is stored per-record, never auto-generated from a number.
 * Missing optional fields are omitted rather than shown as N/A (spec §22).
 */
export function EvidenceDetailPanel({ record }: { record: MapEvidenceRecord }) {
  const t = useTranslations('PakistanMap');
  const locale = useLocale();
  const l: Locale = locale === 'ur' ? 'ur' : 'en';

  const disease = getDiseaseBySlug(record.diseaseId);
  const reference = getMapReference(record.referenceId);
  const province = PROVINCE_OPTIONS.find((p) => p.id === record.provinceOrTerritory);
  const evidenceTypeLabel = t(`evidenceTypes.${record.evidenceType}`);

  const locationParts = [record.locationName[l], record.district?.[l], province?.name[l]]
    .filter((part, index, arr) => part && arr.indexOf(part) === index)
    .join(' · ');

  return (
    <article
      aria-live="polite"
      className="space-y-5 rounded-2xl border border-border bg-surface p-5 shadow-card"
    >
      <header className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-kicker text-accent-strong">
          {evidenceTypeLabel}
        </p>
        <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
          {record.title[l]}
        </h3>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          {locationParts}
        </p>
      </header>

      <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
        <Field label={t('detail.disease')}>
          {disease ? (
            <Link href={ROUTES.disease(disease.slug)} className="text-primary hover:underline">
              {disease.name[l]}
            </Link>
          ) : (
            record.diseaseId
          )}
        </Field>
        <Field label={t('detail.evidenceType')}>{evidenceTypeLabel}</Field>
        <Field label={t('detail.studyPopulation')}>{record.studyPopulation[l]}</Field>
        {record.sampleSize != null && (
          <Field label={t('detail.sampleSize')}>
            <span className="tnum">{record.sampleSize}</span>
          </Field>
        )}
        {record.studyPeriod && <Field label={t('detail.studyPeriod')}>{record.studyPeriod[l]}</Field>}
        {record.institution && <Field label={t('detail.institution')}>{record.institution[l]}</Field>}
      </dl>

      <Block heading={t('detail.measured')}>{record.evidenceSummary[l]}</Block>
      <Block heading={t('detail.whatMeasured')}>{record.measuredOutcome[l]}</Block>
      {record.reportedEstimate && (
        <Block heading={t('detail.whatReported')}>
          {record.reportedEstimate[l]}
          {record.estimateType && (
            <span className="mt-1 block text-xs text-muted-foreground">
              {t('detail.estimateType')}: {record.estimateType[l]}
            </span>
          )}
        </Block>
      )}

      {/* Can / cannot tell us, the core teaching pairing (spec §23/§24). */}
      <div className="space-y-3">
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
          <p className="text-sm font-semibold text-foreground">{t('detail.canTell')}</p>
          <p className="mt-1 text-sm text-foreground/85">{record.canTellUs[l]}</p>
        </div>
        <div className="rounded-xl border border-accent-strong/25 bg-accent/5 p-4">
          <p className="text-sm font-semibold text-foreground">{t('detail.cannotTell')}</p>
          <p className="mt-1 text-sm text-foreground/85">{record.cannotTellUs[l]}</p>
        </div>
      </div>

      {record.dataLimitations && (
        <EducationalCallout title={t('detail.limitations')}>
          {record.dataLimitations[l]}
        </EducationalCallout>
      )}

      {/* Source, required for published records (spec §38). */}
      {reference && (
        <div className="border-t border-border pt-4 text-sm">
          <p className="font-semibold text-foreground">{t('detail.source')}</p>
          <p className="mt-1 text-muted-foreground">
            {reference.title} · {reference.publication} · {reference.year}
          </p>
          {reference.url && (
            <a
              href={reference.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-primary hover:underline"
            >
              {t('detail.viewSource')}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      )}

      {disease && (
        <Link
          href={ROUTES.disease(disease.slug)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          {t('detail.viewDisease', { disease: disease.name[l] })}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
        </Link>
      )}
    </article>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-semibold text-foreground">{label}</dt>
      <dd className="text-muted-foreground">{children}</dd>
    </div>
  );
}

function Block({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-semibold text-foreground">{heading}</p>
      <p className="mt-1 text-sm leading-relaxed text-foreground/85">{children}</p>
    </div>
  );
}
