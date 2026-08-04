'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ShieldAlert, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MedicalDeviceStatus, SupportItemRecord } from '../types';
import { CareReferences } from './CareReferences';

type Locale = 'en' | 'ur';

const DEVICE_TONE: Record<MedicalDeviceStatus, string> = {
  NON_MEDICAL_SUPPORT_ITEM: 'bg-secondary/10 text-secondary-foreground border-secondary/30',
  PROFESSIONAL_GUIDANCE_RECOMMENDED: 'bg-primary/10 text-foreground border-primary/30',
  PROFESSIONAL_ASSESSMENT_REQUIRED: 'bg-accent/10 text-foreground border-accent-strong/30',
};

/**
 * A generic support-item card (spec §61). Shows the generic item name, category,
 * potential use, disease/age context, professional-guidance status, and a
 * required safety notice — NEVER price, buy button, retailer, rating, or brand
 * (spec §61/§63). The medical-device status is text-based, not colour-only
 * (spec §70).
 */
export function SupportItemCard({ item }: { item: SupportItemRecord }) {
  const t = useTranslations('CareSupport');
  const locale = useLocale();
  const l: Locale = locale === 'ur' ? 'ur' : 'en';

  return (
    <article className="space-y-3 rounded-xl border border-border bg-background p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h4 className="font-heading font-semibold text-foreground">{item.name[l]}</h4>
          <p className="text-xs text-muted-foreground">{item.genericName[l]}</p>
        </div>
        <span
          className={cn(
            'inline-flex rounded-full border px-2 py-0.5 text-xs font-medium',
            DEVICE_TONE[item.medicalDeviceStatus],
          )}
        >
          {t(`deviceStatus.${item.medicalDeviceStatus}`)}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 text-xs">
        <span className="inline-flex rounded-full bg-muted/50 px-2 py-0.5 font-medium text-muted-foreground">
          {t(`supportCategories.${item.supportCategory}`)}
        </span>
        {item.ageContexts.map((age) => (
          <span key={age} className="inline-flex rounded-full bg-muted/50 px-2 py-0.5 font-medium text-muted-foreground">
            {t(`ages.${age}`)}
          </span>
        ))}
      </div>

      <p className="text-sm leading-relaxed text-foreground/90">
        <span className="font-medium">{t('supportItem.potentialUse')}:</span> {item.potentialUse[l]}
      </p>

      {item.professionalGuidanceRequired && (
        <p className="flex items-start gap-1.5 rounded-lg border border-primary/20 bg-primary/5 p-2.5 text-xs text-foreground/90">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
          {t('supportItem.professionalGuidanceNotice')}
        </p>
      )}

      {/* Required, text-based safety notice (spec §70/§76). */}
      <p className="flex items-start gap-1.5 rounded-lg border border-accent-strong/25 bg-accent/5 p-2.5 text-xs text-foreground/90">
        <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-strong" aria-hidden="true" />
        <span>
          <span className="font-medium">{t('supportItem.safety')}:</span> {item.safetyNotice[l]}
        </span>
      </p>

      {item.purchaseGuidance && (
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground/80">{t('supportItem.purchaseGuidance')}:</span>{' '}
          {item.purchaseGuidance[l]}
        </p>
      )}

      <CareReferences ids={item.referenceIds} />
    </article>
  );
}
