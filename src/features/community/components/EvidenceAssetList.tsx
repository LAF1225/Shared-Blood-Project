import { FileImage } from 'lucide-react';
import type { FieldEvidenceAsset } from '../types';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * Approved evidence assets for an activity (spec §29/§30). The caller passes ONLY
 * assets already cleared by `getPublicEvidenceAssets` — approved, publicly
 * displayable, and free of minors / identifiable people. Every asset carries alt
 * text (spec §46). Images are lazy-loaded (spec §47). This component never renders
 * a withheld asset; if the cleared list is empty it renders nothing.
 */
export function EvidenceAssetList({
  assets,
  locale,
  t,
}: {
  assets: readonly FieldEvidenceAsset[];
  locale: string;
  t: Translator;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';
  if (assets.length === 0) return null;

  const isImage = (type: string) => type.endsWith('_PHOTO') || type === 'SESSION_MATERIAL';

  return (
    <section aria-labelledby="evidence-heading" className="space-y-3">
      <h3 id="evidence-heading" className="flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
        <FileImage className="h-5 w-5 text-primary" aria-hidden="true" />
        {t('evidence.title')}
      </h3>
      <ul className="grid gap-4 sm:grid-cols-2">
        {assets.map((asset) => (
          <li key={asset.id} className="overflow-hidden rounded-2xl border border-border bg-surface">
            {isImage(asset.assetType) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={asset.assetReference}
                alt={asset.altText[l]}
                loading="lazy"
                className="h-40 w-full object-cover"
              />
            ) : (
              <div className="flex h-40 w-full items-center justify-center bg-muted/30 p-4 text-center text-sm text-muted-foreground">
                {asset.altText[l]}
              </div>
            )}
            <div className="p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t(`evidenceTypes.${asset.assetType}`)}
              </p>
              <p className="mt-1 text-sm text-foreground/90">{asset.caption[l]}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
