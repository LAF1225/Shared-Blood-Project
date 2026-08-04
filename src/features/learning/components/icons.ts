import {
  Dna,
  Stethoscope,
  HeartHandshake,
  Baby,
  CalendarCheck,
  GraduationCap,
  Heart,
  BookOpen,
  FileText,
  ClipboardList,
  Image,
  Presentation,
  type LucideIcon,
} from 'lucide-react';
import type { DownloadFormat } from '../types';

/** lucide icons referenced by category `icon` names (see data/categories). */
export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Dna,
  Stethoscope,
  HeartHandshake,
  Baby,
  CalendarCheck,
  GraduationCap,
  Heart,
};

/** Icon per downloadable format (spec §14). */
export const FORMAT_ICON: Record<DownloadFormat, LucideIcon> = {
  pdf: FileText,
  infographic: Image,
  checklist: ClipboardList,
  poster: Presentation,
};

export const RESOURCE_FALLBACK_ICON = BookOpen;
