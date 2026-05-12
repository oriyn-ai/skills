---
title: Run Experiments
impact: CRITICAL
description: Validate a specific product decision with persona-grounded Oriyn experiments.
tags: [experiments, cli, jsonl, product-decisions]
---

# Run Experiments

## When to Run

Run an experiment when the user is about to make a user-facing product decision and wants signal from real behavioral personas.

Good hypotheses are:

- Specific: "Show pricing before signup."
- Testable: "Reduce checkout from three steps to one."
- Scoped: One change at a time.

Avoid broad prompts like "Improve onboarding" or bundled changes that make the verdict hard to interpret.

## Command

Run from a linked project directory:

```bash
oriyn experiments run "A clear, testable statement about one change"
```

For higher-stakes calls:

```bash
oriyn experiments run "A clear, testable statement about one change" --agents 100
```

## JSONL Behavior

When stdout is piped, Oriyn emits JSONL by default. Do not add `--json` or `--wait` unless the CLI help in the installed version explicitly requires it.

Typical events:

```json
{"type":"step","name":"create-experiment","ts":"..."}
{"type":"progress","message":"status: running","ts":"..."}
{"type":"result","data":{"summary":{"verdict":"ship","convergence":0.86}}}
```

Read the final `type=result` event. It contains the experiment payload, including status, summary, verdict, convergence, persona breakdown, and agent count.

## Result Handling

Always report:

- Verdict: `ship`, `revise`, or `reject`.
- Convergence: how consistent the persona-agent responses were.
- Persona breakdown: named personas, adoption/support where available, reasoning, and objections.
- Grounding: persona size estimates and behavioral traits when available.
- Next action: ship, revise, segment, flag, or run a narrower follow-up.

If an experiment is incomplete, failed, or timed out, say that directly and inspect it with:

```bash
oriyn experiments <experiment-id>
```

## Product Data Boundary

Oriyn is grounded only when the linked product has behavioral data and persona enrichment. If `oriyn status` says data is missing or enrichment is not ready, run `oriyn sync` or ask the user to connect integrations before treating the verdict as grounded.
