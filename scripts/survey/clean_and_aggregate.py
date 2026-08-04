#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Shared Blood — Module 16 OFFLINE survey cleaning & aggregation pipeline.

Spec §6/§7/§8/§35/§36/§42: this runs OFFLINE only. It converts an authorized
raw survey export (CSV) into an approved, privacy-reviewed AGGREGATE JSON that
the website consumes. It is NEVER imported by the web application, and raw
responses NEVER enter any client-accessible directory (§8).

Pipeline: Raw Survey CSV -> Cleaning -> Validation -> Aggregate Generation ->
(manual) Research Review -> Approved JSON -> Website.

The script:
  - normalizes labels and maps question codes,
  - validates allowed response values,
  - identifies missing responses (NO_RESPONSE / PREFER_NOT_TO_SAY / INVALID /
    EXCLUDED_DURING_CLEANING) and NEVER silently deletes a response (§36),
  - applies documented exclusion rules only (§37 — never excludes a response for
    being unpopular, opposing Shared Blood, supporting cousin marriage, etc.),
  - computes counts and percentages (count / valid * 100, 1 dp) (§39),
  - applies small-cell suppression at MIN_PUBLIC_CELL_SIZE before writing (§42),
  - writes a SurveyCleaningLog (§36) and an aggregate JSON.

Aggregate research review + approval (§35/§44) is a MANUAL step performed after
this script; only findings marked APPROVED_FOR_PUBLICATION are shown publicly.

Usage:
    python clean_and_aggregate.py responses.csv --out aggregate.json --log cleaning_log.json
"""
import argparse
import csv
import datetime
import json
import sys
from collections import defaultdict

MIN_PUBLIC_CELL_SIZE = 5  # spec §42 (subject to Module 20 review)

MISSING_TOKENS = {"": "NO_RESPONSE", "na": "NO_RESPONSE", "n/a": "NO_RESPONSE"}
PREFER_NOT = {"prefer_not_to_say", "prefer not to say", "pnts"}

# Documented exclusion reasons only (spec §37). Populate from the survey's own
# code map; never add "unpopular opinion" style reasons.
EXCLUSION_RULES = {
    "duplicate_test_response",
    "empty_submission",
    "known_internal_test_submission",
    "invalid_survey_version",
    "corrupted_export_row",
}


def normalize(value):
    return (value or "").strip()


def classify_missing(value):
    v = normalize(value).lower()
    if v in MISSING_TOKENS:
        return MISSING_TOKENS[v]
    if v in PREFER_NOT:
        return "PREFER_NOT_TO_SAY"
    return None


def percentage(count, valid, dp=1):
    if valid <= 0:
        return 0.0
    return round(count / valid * 100, dp)


def apply_suppression(counts, min_cell=MIN_PUBLIC_CELL_SIZE):
    """Replace non-zero counts below the threshold with 'SUPPRESSED' (§42)."""
    out = {}
    for k, c in counts.items():
        out[k] = "SUPPRESSED" if 0 < c < min_cell else c
    return out


def load_rows(path):
    with open(path, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def clean(rows, exclude_flag_column="exclude_reason"):
    """Return (kept_rows, cleaning_log). Never silently drops a row (§36)."""
    kept, excluded = [], []
    exclusion_counts = defaultdict(int)
    for row in rows:
        reason = normalize(row.get(exclude_flag_column, "")).lower()
        if reason and reason in EXCLUSION_RULES:
            excluded.append((row, reason))
            exclusion_counts[reason] += 1
        else:
            kept.append(row)
    log = {
        "originalResponseCount": len(rows),
        "finalResponseCount": len(kept),
        "excludedResponseCount": len(excluded),
        "exclusionReasons": [{"reason": r, "count": c} for r, c in sorted(exclusion_counts.items())],
    }
    return kept, log


def aggregate_question(rows, question_id, allowed_values):
    counts = defaultdict(int)
    missing = defaultdict(int)
    valid = 0
    warnings = []
    for row in rows:
        raw = row.get(question_id)
        miss = classify_missing(raw)
        if miss is not None:
            missing[miss] += 1
            continue
        value = normalize(raw)
        if allowed_values and value not in allowed_values:
            missing["INVALID_RESPONSE"] += 1
            warnings.append(f"{question_id}: invalid value '{value}'")
            continue
        counts[value] += 1
        valid += 1
    percentages = {k: percentage(c, valid) for k, c in counts.items()}
    return {
        "questionId": question_id,
        "validResponseCount": valid,
        "missingResponseCount": sum(missing.values()),
        "missingBreakdown": dict(missing),
        "responseCounts": apply_suppression(dict(counts)),
        "responsePercentages": {k: (percentages[k] if v != "SUPPRESSED" else "SUPPRESSED")
                                for k, v in apply_suppression(dict(counts)).items()},
    }, warnings


def main():
    ap = argparse.ArgumentParser(description="Offline survey cleaning & aggregation (Module 16).")
    ap.add_argument("csv", help="Authorized raw survey export (CSV).")
    ap.add_argument("--out", default="aggregate.json", help="Output aggregate JSON path.")
    ap.add_argument("--log", default="cleaning_log.json", help="Output cleaning log path.")
    ap.add_argument("--dataset-version", default="v1")
    args = ap.parse_args()

    rows = load_rows(args.csv)
    kept, clean_log = clean(rows)

    # Question ids/allowed values would come from the instrument definition.
    # Here we aggregate every column present, treating each as categorical.
    question_ids = [c for c in (rows[0].keys() if rows else []) if c not in {"exclude_reason"}]
    aggregates, all_warnings = [], []
    for qid in question_ids:
        agg, warnings = aggregate_question(kept, qid, allowed_values=[])
        aggregates.append(agg)
        all_warnings.extend(warnings)

    cleaning_log = {
        "datasetVersion": args.dataset_version,
        **clean_log,
        "questionMappingWarnings": [],
        "invalidValueWarnings": all_warnings,
        "generatedAt": datetime.datetime.utcnow().isoformat() + "Z",
    }
    aggregate = {
        "datasetVersion": args.dataset_version,
        "generatedAt": cleaning_log["generatedAt"],
        "questionAggregates": aggregates,
        "note": "Aggregate output requires manual research review and approval before publication (spec §35/§44).",
    }

    with open(args.log, "w", encoding="utf-8") as f:
        json.dump(cleaning_log, f, ensure_ascii=False, indent=2)
    with open(args.out, "w", encoding="utf-8") as f:
        json.dump(aggregate, f, ensure_ascii=False, indent=2)

    print(f"Cleaned {clean_log['originalResponseCount']} -> {clean_log['finalResponseCount']} "
          f"({clean_log['excludedResponseCount']} excluded). Wrote {args.out} and {args.log}.",
          file=sys.stderr)


if __name__ == "__main__":
    main()
