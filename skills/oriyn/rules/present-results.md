---
title: Present Results
impact: HIGH
description: Summarize Oriyn output in a way that is useful, grounded, and not overstated.
tags: [reporting, verdicts, personas]
---

# Present Results

## Default Response Shape

Keep the result short but grounded:

```markdown
Verdict: revise (convergence 0.71)

The strongest support came from Habitual Automators, who already rely on shortcuts. Reluctant Evaluators pushed back because the change adds setup friction.

Persona breakdown:
- Habitual Automator (22%): supports. Reason...
- Reluctant Evaluator (34%): concerned. Reason...
- Occasional Explorer (18%): neutral. Reason...

Recommendation: ship only to the Automator segment first, or simplify the setup step and re-run the experiment.
```

## Required Elements

Include:

- The verdict and convergence.
- Persona names and size estimates when available.
- The main reason each important persona supported or opposed the change.
- Caveats about missing data, low convergence, incomplete experiments, or unready enrichment.
- A concrete next step.

## Weighting

Do not flatten all personas into equal votes when `size_estimate` is available. Say when a majority of represented users are aligned or when a small segment is driving the result.

## Confidence Boundaries

Avoid saying Oriyn "proves" a product decision. Prefer "signal", "suggests", "the grounded personas converged on", or "the best supported next step is".

If the user needs a high-risk decision, recommend a narrower follow-up experiment, a feature flag, or a real-world rollout plan after the Oriyn result.
