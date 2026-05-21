---
title: Present Results
impact: HIGH
description: Summarize Oriyn output in a way that is useful, grounded, and not overstated.
tags: [reporting, personas, patterns, research]
---

# Present Results

## Default Response Shape

Keep the result short but grounded:

```markdown
Signal: simplify setup before broad launch.

Habitual Automators already rely on shortcuts and are the clearest fit for this workflow. Reluctant Evaluators are a larger group and show friction around setup-heavy changes.

Persona read:
- Habitual Automator (22%): likely fit. Reason...
- Reluctant Evaluator (34%): friction risk. Reason...
- Occasional Explorer (18%): weak signal. Reason...

Recommendation: start with the Automator segment or remove one setup step before broad rollout.
```

## Required Elements

Include:

- Persona names and size estimates when available.
- Relevant behavior patterns or bottlenecks.
- The selected option, recommendation, winning bucket, or task outcome for research runs.
- Convergence, disagreement, objections, or sample rationales when a research run provides them.
- The main reason each important persona is a likely fit, friction risk, or weak signal.
- Caveats about missing data, sparse signal, stale sync, or unready enrichment.
- A concrete next step.

## Weighting

Do not flatten all personas into equal votes when `size_estimate` is available. Say when a majority of represented users are aligned or when a small segment is driving the result.

## Confidence Boundaries

Avoid saying Oriyn "proves" a product decision. Prefer "signal", "suggests", "the grounded personas converged on", or "the best supported next step is".

If the user needs a high-risk decision, recommend narrowing the audience, adding a feature flag, or pairing the Oriyn read with a real-world rollout plan.
