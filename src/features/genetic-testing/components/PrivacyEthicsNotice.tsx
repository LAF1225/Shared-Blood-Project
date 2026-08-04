'use client';

import { useTranslations } from 'next-intl';
import { ShieldCheck, HeartHandshake, Scale, Users } from 'lucide-react';

/**
 * Privacy, stigma, gender-blame, and ethical-context notices (spec §33/§52/§59/
 * §61/§62). Neutral, non-judgemental framing:
 *  - genetic privacy: information can be sensitive and relevant to relatives (§52)
 *  - stigma: prefer "family with a known history" over blame language (§61)
 *  - gender blame: children inherit from BOTH biological parents (§62)
 *  - ethical/religious context acknowledged neutrally; no rulings (§59/§60)
 *  - no eugenic or purity framing (§33)
 */
export function PrivacyEthicsNotice() {
  const t = useTranslations('GeneticTesting');

  const items = [
    { key: 'privacy', Icon: ShieldCheck },
    { key: 'stigma', Icon: HeartHandshake },
    { key: 'bothParents', Icon: Users },
    { key: 'ethics', Icon: Scale },
  ] as const;

  return (
    <section aria-label={t('ethics.title')} className="rounded-2xl border border-secondary/25 bg-secondary/5 p-6">
      <h2 className="font-heading text-xl font-semibold text-foreground">{t('ethics.title')}</h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {items.map(({ key, Icon }) => (
          <li key={key} className="flex items-start gap-3">
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-foreground">{t(`ethics.${key}Title`)}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-foreground/90">{t(`ethics.${key}Body`)}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
