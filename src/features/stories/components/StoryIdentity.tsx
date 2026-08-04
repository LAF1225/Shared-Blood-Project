'use client';

import { useLocale, useTranslations } from 'next-intl';
import { UserRound } from 'lucide-react';
import type { PublicStoryIdentity } from '../types';

type Locale = 'en' | 'ur';

/**
 * Speaker identity (Module 12 §8/§10). Shows the perspective type and only the
 * identity the publication mode permits (spec §8/§9). Anonymous and role-only
 * speakers never show a name. Internal enum values are never displayed (§6).
 */
export function StoryIdentity({
  identity,
  memorialContext,
}: {
  identity: PublicStoryIdentity;
  memorialContext?: boolean;
}) {
  const t = useTranslations('Stories');
  const locale = useLocale();
  const l: Locale = locale === 'ur' ? 'ur' : 'en';

  const typeLabel = t(`types.${identity.storyType}`);

  let primary: string;
  if (identity.identityMode === 'ANONYMOUS') {
    primary = t('identity.anonymous');
  } else if (identity.identityMode === 'ROLE_ONLY') {
    primary = identity.roleLabel ? identity.roleLabel[l] : typeLabel;
  } else {
    primary = identity.displayName ?? typeLabel;
  }

  const initial = /^[A-Za-z]/.test(primary) ? primary.charAt(0) : null;

  return (
    <header className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary/15 font-heading font-semibold text-secondary"
      >
        {initial ?? <UserRound className="h-5 w-5" />}
      </span>
      <div>
        <p className="font-medium text-foreground">
          {primary}
          {identity.isPseudonym && (
            <span className="ms-2 text-xs font-normal text-muted-foreground">
              ({t('identity.pseudonym')})
            </span>
          )}
        </p>
        <p className="text-sm text-muted-foreground">
          {typeLabel}
          {identity.identityMode !== 'ROLE_ONLY' && identity.roleLabel && (
            <span> · {identity.roleLabel[l]}</span>
          )}
          {memorialContext && <span> · {t('identity.memorial')}</span>}
        </p>
      </div>
    </header>
  );
}
