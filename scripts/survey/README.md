# Module 16 — Offline survey cleaning & aggregation

This directory holds the **offline** pipeline that turns an authorized raw survey
export into an approved, privacy-reviewed **aggregate** dataset for the website.

It is deliberately **not** part of the web application build. The website only
ever consumes an already-approved aggregate JSON (spec §6/§7/§8/§35).

## Why this is offline only

- **Raw responses must never reach the client** (spec §8). Raw CSVs stay outside
  `src/`, `public/`, and any bundled asset directory.
- **No live Google Forms/Sheets sync, polling, or webhooks** (spec §7).
- **Findings are never computed from raw responses in the browser** (spec §35).

## Pipeline

```
Raw Survey CSV
  → clean_and_aggregate.py   (normalize, map codes, validate values,
                              classify missing data, apply documented
                              exclusions, count, percentage, suppress small cells)
  → cleaning_log.json        (SurveyCleaningLog — spec §36)
  → aggregate.json           (counts + percentages, small cells suppressed §42)
  → MANUAL research review    (verify, interpret, approve — spec §35/§44)
  → hand-authored approved dataset + findings in src/features/survey/data/
  → website
```

## Usage

```bash
python clean_and_aggregate.py responses.csv --out aggregate.json --log cleaning_log.json --dataset-version v1
```

## Guarantees encoded in the script

- **Never silently deletes a response** (spec §36) — every excluded row is logged
  with a documented reason.
- **Only documented exclusion rules** (spec §37): duplicate test response, empty
  submission, known internal test submission, invalid survey version, corrupted
  export row. A response is **never** excluded for being unpopular, opposing
  Shared Blood, supporting cousin marriage, rejecting testing, or showing low
  awareness.
- **`PREFER_NOT_TO_SAY` is its own category** (spec §29) — never folded into
  NO/NONE/NEGATIVE/DISAGREE.
- **Percentages** use `count / validResponseCount × 100`, one decimal (spec §39).
- **Small-cell suppression** at `MIN_PUBLIC_CELL_SIZE = 5` (spec §42) is applied
  **before** the aggregate is written, so suppressed counts never exist in any
  client-accessible file. Suppressed cells carry the sentinel `"SUPPRESSED"` in
  both counts and percentages, so no value is recoverable.

## After the script

Aggregate review, interpretation, and approval (spec §35/§44) are **manual**.
Only findings marked `APPROVED_FOR_PUBLICATION` are shown publicly. Until a real
survey has been collected and approved, the production dataset in
`src/features/survey/data/dataset.ts` stays empty and the public page shows the
"findings are being prepared" state (spec §69).
