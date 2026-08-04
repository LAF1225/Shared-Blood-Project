/**
 * Lightweight educational pedigree (spec §13/§14). Pure SVG — no graph library
 * (spec §34). It schematically shows shared ancestor(s), two family branches, the
 * two partners, and a clearly-labelled *hypothetical* example variant path. It
 * never implies the ancestor definitely carried a pathogenic variant (spec §13).
 *
 * Accessibility (spec §35): the SVG has a title/description, and the variant path
 * is conveyed by text + shape + the allele label "a" (not colour alone). A full
 * text equivalent is rendered alongside for screen readers.
 */
export function Pedigree({
  shared,
  labels,
  textEquivalent,
}: {
  /** True for consanguineous relationships (a recent shared ancestor exists). */
  shared: boolean;
  labels: {
    title: string;
    sharedAncestor: string;
    ancestorLine: string;
    parentOne: string;
    parentTwo: string;
    child: string;
    variantPath: string;
    hypotheticalNote: string;
    alleleLegend: string;
  };
  textEquivalent: string;
}) {
  return (
    <figure className="space-y-3">
      <svg
        viewBox="0 0 340 300"
        role="img"
        aria-labelledby="pedigree-title pedigree-desc"
        className="w-full max-w-md"
      >
        <title id="pedigree-title">{labels.title}</title>
        <desc id="pedigree-desc">{textEquivalent}</desc>

        {/* Lineage connectors (neutral) */}
        <g className="stroke-border" strokeWidth={1.5} fill="none">
          {shared ? (
            <>
              <path d="M170 56 V90 H85 V116" />
              <path d="M170 56 V90 H255 V116" />
            </>
          ) : (
            <>
              <path d="M85 56 V116" />
              <path d="M255 56 V116" />
            </>
          )}
          <path d="M85 158 V190 H170 V216" />
          <path d="M255 158 V190 H170 V216" />
        </g>

        {/* Example variant path, only when a recent ancestor is shared */}
        {shared && (
          <g
            className="stroke-accent-strong"
            strokeWidth={2.5}
            strokeDasharray="5 4"
            fill="none"
          >
            <path d="M170 56 V90 H85 V116" />
            <path d="M170 56 V90 H255 V116" />
            <path d="M85 158 V190 H170 V216" />
            <path d="M255 158 V190 H170 V216" />
          </g>
        )}

        {/* Ancestor node(s) */}
        {shared ? (
          <Node x={95} y={22} w={150} label={labels.sharedAncestor} tone="ancestor" allele={shared ? 'Aa' : undefined} />
        ) : (
          <>
            <Node x={25} y={22} w={120} label={labels.ancestorLine} tone="plain" />
            <Node x={195} y={22} w={120} label={labels.ancestorLine} tone="plain" />
          </>
        )}

        {/* Partners */}
        <Node x={30} y={116} w={110} label={labels.parentOne} tone="parent" allele={shared ? 'Aa' : undefined} />
        <Node x={200} y={116} w={110} label={labels.parentTwo} tone="parent" allele={shared ? 'Aa' : undefined} />

        {/* Child */}
        <Node x={115} y={216} w={110} label={labels.child} tone="child" allele={shared ? 'aa' : undefined} />
      </svg>

      {shared && (
        <p className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-0.5 w-5 border-t-2 border-dashed border-accent-strong" aria-hidden="true" />
            {labels.variantPath}
          </span>
          <span>·</span>
          <span>{labels.alleleLegend}</span>
        </p>
      )}
      <p className="text-xs italic text-muted-foreground">{labels.hypotheticalNote}</p>

      {/* Full text equivalent for screen readers (spec §35). */}
      <p className="sr-only">{textEquivalent}</p>
    </figure>
  );
}

const TONE_CLASS = {
  ancestor: 'fill-primary/10 stroke-primary',
  parent: 'fill-secondary/10 stroke-secondary',
  child: 'fill-accent/10 stroke-accent-strong',
  plain: 'fill-surface stroke-border',
} as const;

function Node({
  x,
  y,
  w,
  label,
  tone,
  allele,
}: {
  x: number;
  y: number;
  w: number;
  label: string;
  tone: keyof typeof TONE_CLASS;
  allele?: string;
}) {
  const cx = x + w / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={34}
        rx={8}
        className={TONE_CLASS[tone]}
        strokeWidth={1.5}
      />
      <text
        x={cx}
        y={y + 21}
        textAnchor="middle"
        className="fill-foreground"
        fontSize={11}
        fontWeight={600}
      >
        {label}
      </text>
      {allele && (
        <g>
          <rect
            x={x + w - 26}
            y={y - 10}
            width={24}
            height={18}
            rx={5}
            className="fill-accent-strong"
          />
          <text
            x={x + w - 14}
            y={y + 3}
            textAnchor="middle"
            className="fill-white"
            fontSize={10}
            fontWeight={700}
          >
            {allele}
          </text>
        </g>
      )}
    </g>
  );
}
