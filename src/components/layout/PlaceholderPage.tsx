import { SectionContainer } from './SectionContainer';

/**
 * Empty route placeholder (Module 01 only).
 * Renders a labelled landmark so routes compile and remain accessible.
 * Real content is delivered by each feature's dedicated module.
 */
export function PlaceholderPage({ title }: { title: string }) {
  return (
    <SectionContainer>
      <h1 className="font-heading text-3xl font-bold text-foreground">{title}</h1>
      <p className="mt-3 text-muted-foreground">
        This section is part of the Shared Blood platform foundation. Content
        arrives in a later module.
      </p>
    </SectionContainer>
  );
}
