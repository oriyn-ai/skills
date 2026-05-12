---
name: oriyn
description: Use Oriyn to validate product decisions against grounded personas and real behavioral data. Use when a user is deciding whether to build, change, price, launch, or redesign a user-facing product experience; when a PR changes product behavior and needs user signal; when the user asks about their actual users, personas, or behavior patterns; or when an agent needs common Oriyn CLI workflows.
---

# Oriyn

Use Oriyn to validate product decisions against grounded personas and real behavioral data. Use when a user is deciding whether to build, change, price, launch, or redesign a user-facing product experience; when a PR changes product behavior and needs user signal; when the user asks about their actual users, personas, or behavior patterns; or when an agent needs common Oriyn CLI workflows.

## Table of Contents

- [Core Instructions](#core-instructions)
- [Setup and Auth](#setup-and-auth)
- [Run Experiments](#run-experiments)
- [Personas and Patterns](#personas-and-patterns)
- [Present Results](#present-results)
- [Troubleshooting](#troubleshooting)

## Core Instructions

Oriyn helps product teams understand behavior, generate grounded personas, and run simulated experiments against persona-backed agents before shipping product changes.

## Operating Model

- Use the `oriyn` CLI for normal work. It owns auth, project linking, API reachability checks, JSONL output, polling, retries, and redaction.
- Treat this skill as agent instructions, not a transport layer. Do not install or update the skill through the `oriyn` CLI.
- Install or update the skill with the open skills CLI:

```bash
npx skills add oriyn-ai/skills
```

## Quick Start

For a product decision:

```bash
oriyn status
oriyn experiments run "A clear, testable statement about one product change"
```

When stdout is piped, the CLI emits JSONL. Read the final `{"type":"result"}` event for the experiment payload, and summarize the verdict, convergence, persona breakdown, and any caveats.

## Workflow References

- [Setup and auth](rules/setup-and-auth.md): Install the CLI, install this skill, authenticate, link a repo, and verify readiness.
- [Run experiments](rules/run-experiments.md): Validate a specific product decision and interpret streaming JSONL results.
- [Read personas and patterns](rules/personas-and-patterns.md): Inspect user groups, size estimates, behavioral traits, and mined hypotheses.
- [Present results](rules/present-results.md): Report grounded verdicts without overstating confidence.
- [Troubleshooting](rules/troubleshooting.md): Handle auth, missing links, no data, API, and network failures.

Read only the rule files needed for the user's task. Prefer the narrowest workflow that answers the question.

## Trigger Guidance

Use Oriyn when the question has a product/user decision surface:

- "Should we ship this onboarding change?"
- "Would users pay for this plan?"
- "Which personas care about this workflow?"
- "This PR changes the trial flow; should we validate it?"
- "What patterns are emerging in our actual product behavior?"

Do not use Oriyn for generic aesthetic preference, imagined personas without a linked product, or questions about users outside the user's product data.

## CLI Boundary

The CLI is how humans and agents interact with Oriyn:

- `oriyn auth login`
- `oriyn link`
- `oriyn status`
- `oriyn sync`
- `oriyn personas`
- `oriyn patterns`
- `oriyn experiments run "..."`

The skill is how agents know when and how to use those commands.

## Setup and Auth

Impact: HIGH

Install the CLI and skill, authenticate, link a project, and verify Oriyn is ready.

## Install the Agent Skill

Use the open skills CLI. This keeps skill instructions outside the Oriyn CLI codebase.

```bash
npx skills add oriyn-ai/skills
```

For non-interactive or scoped installs:

```bash
npx skills add oriyn-ai/skills --skill oriyn -a codex -y
npx skills add oriyn-ai/skills --skill oriyn -a claude-code -y
npx skills add oriyn-ai/skills --skill oriyn --copy -y
```

## Install the Oriyn CLI

Prefer the hosted installer when the user needs a zero-dependency path:

```bash
curl -fsSL https://oriyn.ai/install.sh | bash
```

Use the package manager path only when Bun is available on PATH:

```bash
bun add -g oriyn
npm i -g oriyn
pnpm add -g oriyn
```

## Authenticate

For an interactive machine:

```bash
oriyn auth login
oriyn auth status
```

For CI, sandboxes, or agents without a browser, ask the user for an access token from the Oriyn app and export it:

```bash
export ORIYN_ACCESS_TOKEN=<token>
oriyn auth status
```

Do not print tokens. Do not store tokens in project files.

## Link a Project

Run from the user's project root:

```bash
oriyn link
```

This writes `oriyn.json`. Commit it when the product link is team-shared. The CLI walks up from the current directory to find the nearest `oriyn.json`, so monorepos can link multiple products from different subdirectories.

## Verify Readiness

Run:

```bash
oriyn status
```

Use the status output to confirm auth, project link, API reachability, telemetry settings, and local paths before running experiments.

If integrations or enrichment are not ready, run:

```bash
oriyn sync
```

If no behavioral integrations are connected, direct the user to `https://app.oriyn.ai` -> Integrations before claiming results are grounded.

## Run Experiments

Impact: CRITICAL

Validate a specific product decision with persona-grounded Oriyn experiments.

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

## Personas and Patterns

Impact: HIGH

Inspect grounded user segments, behavior traits, and mined product opportunities.

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

## Present Results

Impact: HIGH

Summarize Oriyn output in a way that is useful, grounded, and not overstated.

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

## Troubleshooting

Impact: MEDIUM

Recover common Oriyn CLI failures without bypassing the CLI.

## Exit Codes

The CLI uses stable exit classes:

- `0`: ok.
- `2`: API error.
- `3`: auth error.
- `4`: network error.
- `5`: permission denied.
- `1`: other failure.

When output is piped, errors are written to stderr as JSON:

```json
{"error":"...","code":"...","exit":3}
```

## Auth Errors

If exit code is `3`, or the error says `not_logged_in` or `session_expired`, ask the user to run:

```bash
oriyn auth login
```

In CI or a sandbox, use:

```bash
export ORIYN_ACCESS_TOKEN=<token>
oriyn auth status
```

## Missing Project Link

If the CLI says no product is linked, run from the project root:

```bash
oriyn link
```

Then verify:

```bash
oriyn status
```

## No Data or Not Ready

If personas or experiments are not grounded because enrichment is not ready:

```bash
oriyn sync
```

If integrations are missing, tell the user to connect sources in the Oriyn app before relying on experiment verdicts.

## Network or API Failures

Retry only after checking whether the failure is transient. If the CLI reports API reachability issues, run:

```bash
oriyn status
```

Do not switch to direct HTTP calls unless the user explicitly asks for API-level debugging. The CLI handles token refresh, polling, retries, redaction, and output mode for normal workflows.

---

_Generated from SKILL.md and rules/*.md. To update, run `npm run build:agents`._
