import {
  Dna,
  Blocks,
  Layers,
  GitBranch,
  Crown,
  Moon,
  Users,
  Calculator,
  ChartColumn,
  Network,
  Grid3x3,
  Microscope,
  MapPin,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

/**
 * lucide icons referenced by `icon` names in the concepts and tools data.
 * Keeping the mapping in one place means data files stay plain (string names)
 * and new icons are registered here without touching components.
 */
export const GENETICS_ICONS: Record<string, LucideIcon> = {
  // concepts (§5)
  Dna,
  Blocks,
  Layers,
  GitBranch,
  Crown,
  Moon,
  Users,
  // tools (§6)
  Calculator,
  ChartColumn,
  Network,
  Grid3x3,
  Microscope,
  MapPin,
};

/** Fallback when a data entry names an icon that isn't registered yet. */
export const GENETICS_FALLBACK_ICON: LucideIcon = Sparkles;

export function resolveGeneticsIcon(name: string): LucideIcon {
  return GENETICS_ICONS[name] ?? GENETICS_FALLBACK_ICON;
}
