import { describe, it, expect } from 'vitest';
import en from '../../messages/en.json';
import { checkPublicClaim } from '@/features/governance/publication';
import { PRIMARY_DESTINATIONS, FOOTER_NAV } from '@/constants/navigation';
import { NAV_INVENTORY, FAMILY_TREE_REDIRECT_DECISION } from './navInventory';

/**
 * Module 24 integration governance + navigation tests (§13/§42/§81).
 * Every new public string passes the Module 20 public-claim checker, and no
 * public navigation targets the retired Family Tree.
 */

/** Collect every leaf string under a message subtree. */
function leaves(node: unknown): string[] {
  if (typeof node === 'string') return [node];
  if (node && typeof node === 'object') return Object.values(node).flatMap(leaves);
  return [];
}

const messages = en as Record<string, Record<string, unknown>>;
const publicStrings = [
  ...leaves(messages.Genetics.connections),
  ...leaves(messages.DiseasePage.explore),
  ...leaves(messages.About),
  ...leaves(messages.Contact),
  ...leaves(messages.ComingSoon),
];

describe('Module 24 public-string governance (§42/§81)', () => {
  it('every new cross-navigation / placeholder string passes Module 20 review', () => {
    for (const text of publicStrings) {
      expect(checkPublicClaim(text).status, text.slice(0, 48)).toBe('ALLOWED');
    }
  });

  it('makes no assertive compatibility / marriage-safety / eugenics claim (§26/§81)', () => {
    // Module 20 checkPublicClaim above is the authority; this guards against the
    // few phrasings that must never appear even in negated form.
    const bannedAssertive = /\b(marriage safety|compatibility score|genetically inferior|your genetic risk)\b/i;
    for (const text of publicStrings) expect(text).not.toMatch(bannedAssertive);
  });
});

describe('Module 24 navigation reconciliation (§6/§32/§63)', () => {
  it('no primary or footer nav entry targets Family Tree (§32/§121)', () => {
    for (const item of [...PRIMARY_DESTINATIONS, ...FOOTER_NAV]) {
      expect(item.href).not.toMatch(/family-tree/);
    }
  });

  it('removed Hospitals from primary and footer navigation (§63)', () => {
    expect(PRIMARY_DESTINATIONS.some((i) => i.id === 'hospitals')).toBe(false);
    expect(FOOTER_NAV.some((i) => i.id === 'hospitals')).toBe(false);
  });

  it('keeps About (primary) and Contact (footer), now real pages', () => {
    expect(PRIMARY_DESTINATIONS.some((i) => i.id === 'about')).toBe(true);
    expect(FOOTER_NAV.some((i) => i.id === 'contact')).toBe(true);
  });

  it('records the Family Tree redirect decision as NO_REDIRECT_REQUIRED (§11/§71)', () => {
    expect(FAMILY_TREE_REDIRECT_DECISION).toBe('NO_REDIRECT_REQUIRED');
    const ft = NAV_INVENTORY.find((e) => e.status === 'RETIRED');
    expect(ft?.action).toBe('REMOVE');
  });
});
