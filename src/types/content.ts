import type { LocalizedText } from './common';

/** Editorial article (Educational Articles — finalized in a later module). */
export interface Article {
  id: string;
  slug: string;
  title: LocalizedText;
  excerpt?: LocalizedText;
  publishedAt?: string;
}

/** Downloadable asset (Download Centre — Module 18). */
export interface Download {
  id: string;
  title: LocalizedText;
  fileUrl: string;
  format?: 'pdf' | 'image' | 'doc';
}

/** Generic educational/support resource (Parent Learning Centre, NGO — 16/17). */
export interface Resource {
  id: string;
  title: LocalizedText;
  description?: LocalizedText;
  url?: string;
  category?: string;
}
