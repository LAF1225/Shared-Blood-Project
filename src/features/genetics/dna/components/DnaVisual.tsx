import { cn } from '@/lib/utils';
import type { DnaVisualType } from '../types';

/**
 * Lightweight schematic visual layer for the DNA Explorer (Module 22 §16–§21).
 *
 * Plain inline SVG + CSS only — no WebGL, Three.js, particle systems, or
 * animation libraries (§16). Schematic by design: it never draws a random DNA
 * sequence and never implies a specific variant (§16). The visual is decorative
 * (`aria-hidden`) — the step's text explanation carries the meaning, so nothing
 * here is required for understanding (§46).
 */
export function DnaVisual({
  type,
  label,
  className,
}: {
  type: DnaVisualType;
  /** Optional gene symbol label (preserved verbatim, §43). */
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex aspect-[16/9] w-full items-center justify-center rounded-2xl border border-border bg-muted/30',
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 160 90" className="h-full w-full max-h-48 text-primary" role="presentation">
        <Scene type={type} label={label} />
      </svg>
    </div>
  );
}

function Helix({ highlightRung }: { highlightRung?: number }) {
  // Two schematic strands with a fixed, small number of rungs — not a sequence.
  const rungs = [30, 50, 70, 90, 110, 130];
  return (
    <g fill="none" stroke="currentColor">
      <path d="M20 20 C 60 5, 100 45, 140 30" strokeWidth="2.5" opacity="0.9" />
      <path d="M20 70 C 60 55, 100 15, 140 60" strokeWidth="2.5" opacity="0.9" />
      {rungs.map((x, i) => {
        const active = highlightRung === i;
        return (
          <line
            key={x}
            x1={x}
            y1="22"
            x2={x}
            y2="68"
            strokeWidth={active ? 4 : 1.5}
            className={active ? 'text-accent-strong' : 'text-primary/40'}
            stroke="currentColor"
          />
        );
      })}
    </g>
  );
}

function Scene({ type, label }: { type: DnaVisualType; label?: string }) {
  const caption = (text: string) => (
    <text x="80" y="84" textAnchor="middle" className="fill-muted-foreground" fontSize="8">
      {text}
    </text>
  );

  switch (type) {
    case 'GENE_CONTEXT':
      return (
        <>
          <Helix />
          {label && (
            <text x="80" y="14" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="700">
              {label}
            </text>
          )}
        </>
      );
    case 'GENETIC_CHANGE':
      return (
        <>
          <Helix highlightRung={3} />
          <circle cx="90" cy="45" r="7" className="fill-accent-strong/20 stroke-accent-strong" strokeWidth="2" />
          {caption('△')}
        </>
      );
    case 'FUNCTION':
      // A schematic protein/enzyme shape with a reduced/altered marker.
      return (
        <>
          <rect x="45" y="30" width="70" height="30" rx="15" className="fill-primary/10 stroke-primary" strokeWidth="2" />
          <circle cx="70" cy="45" r="4" className="fill-primary" />
          <circle cx="90" cy="45" r="4" className="fill-primary/30" />
        </>
      );
    case 'CELLULAR_CONSEQUENCE':
      // A cell with accumulation / imbalance dots.
      return (
        <>
          <circle cx="80" cy="45" r="30" className="fill-secondary/10 stroke-secondary" strokeWidth="2" />
          {[
            [70, 40],
            [88, 38],
            [78, 52],
            [92, 50],
            [66, 50],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3.5" className="fill-accent-strong/70" />
          ))}
        </>
      );
    case 'DISEASE_CONNECTION':
      return (
        <>
          <circle cx="55" cy="45" r="16" className="fill-primary/10 stroke-primary" strokeWidth="2" />
          <path d="M78 45 h20" className="stroke-muted-foreground rtl:hidden" strokeWidth="2" markerEnd="url(#arrow)" />
          <path d="M98 45 h-20" className="hidden stroke-muted-foreground rtl:block" strokeWidth="2" />
          <circle cx="112" cy="45" r="16" className="fill-danger/10 stroke-danger" strokeWidth="2" />
          <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" className="fill-muted-foreground" />
            </marker>
          </defs>
        </>
      );
    case 'LIMITATION':
      return (
        <>
          <circle cx="80" cy="42" r="24" fill="none" className="stroke-muted-foreground" strokeWidth="2" strokeDasharray="5 5" />
          <text x="80" y="50" textAnchor="middle" className="fill-muted-foreground" fontSize="26" fontWeight="700">
            ?
          </text>
        </>
      );
  }
}
