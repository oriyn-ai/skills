---
title: Personas and Patterns
impact: HIGH
description: Inspect grounded user segments, behavior traits, and mined product opportunities.
tags: [personas, patterns, behavioral-data]
---

# Personas and Patterns

## Personas

Use personas when the user asks who their actual users are, which segment a decision affects, or why a verdict differs across groups.

```bash
oriyn personas
oriyn personas <persona-id>
```

Look for:

- `size_estimate`: approximate share of the user base represented by the persona.
- `behavioral_traits`: traits backed by real sessions or events.
- Evidence or citations that explain why the trait is credible.
- Dynamic facts that show current behavior, not only static demographics.

When presenting persona data, make the difference between large and small segments explicit. A persona representing a large share of users should carry more product weight than a small edge segment.

## Patterns

Use patterns when the user asks what to build next, where users are struggling, or what hypotheses Oriyn has mined from behavior.

```bash
oriyn patterns
oriyn patterns --only hypothesis
oriyn patterns --only bottleneck
```

Patterns can help choose hypotheses for experiments. Do not treat mined patterns as shipping decisions by themselves; use them to form testable experiment prompts.

## Useful Sequence

For a vague product question:

1. Run `oriyn status` to confirm the product is linked and enriched.
2. Run `oriyn patterns` to find likely opportunities or bottlenecks.
3. Run `oriyn personas` to understand the affected user groups.
4. Convert the decision into one clear hypothesis.
5. Run `oriyn experiments run "..."`.

## Do Not Synthesize Unsupported Personas

If the user asks for imagined personas or users outside their product data, say Oriyn is not the right grounding layer. Offer to run a grounded Oriyn workflow only after the product is linked and data exists.
