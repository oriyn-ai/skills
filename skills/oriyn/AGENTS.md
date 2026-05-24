---
name: oriyn
description: Use Oriyn to validate product decisions against grounded personas, real behavior patterns, and persona-backed research modes. Use when a user is deciding whether to build, change, price, launch, or redesign a user-facing product experience; when a PR changes product behavior and needs user signal; when the user asks about their actual users, personas, research runs, or behavior patterns; or when an agent needs common Oriyn CLI workflows.
---

# Oriyn

Use Oriyn to validate product decisions against grounded personas, real behavior patterns, and persona-backed research modes. Use when a user is deciding whether to build, change, price, launch, or redesign a user-facing product experience; when a PR changes product behavior and needs user signal; when the user asks about their actual users, personas, research runs, or behavior patterns; or when an agent needs common Oriyn CLI workflows.

## Table of Contents

- [Core Instructions](#core-instructions)
- [Setup and Auth](#setup-and-auth)
- [Run Research Modes](#run-research-modes)
- [Personas and Patterns](#personas-and-patterns)
- [Present Results](#present-results)
- [Troubleshooting](#troubleshooting)

## Core Instructions

Oriyn helps product teams understand behavior, generate grounded personas, and run persona-backed research before shipping product changes.

## Dev Workflow

Always run this loop end-to-end — don't stop after pushing.

1. `git switch main && git pull --ff-only origin main` to start from the latest `main`.
2. Create a feature branch (`git switch -c <topic>/<short-slug>`).
3. Make scoped changes.
4. Run relevant local checks for the touched repo (use its package manager's check/build commands plus any task-specific tests).
5. Commit changes (stage explicit files, never `git add -A`).
6. Push the branch (`git push -u origin <branch>`).
7. Open a non-draft PR with `gh pr create` and return the URL.
8. **Wait** for Codex review and CI to finish. Don't proceed while either is pending.
9. **Resolve every outstanding comment** from Codex or reviewers — push fixup commits as needed — then mark each conversation thread as resolved.
10. Re-run CI if any commits were pushed; confirm green.
11. Once Codex is happy and CI is green, **merge the PR** (`gh pr merge --squash --delete-branch`) and **delete the remote branch**.
12. Locally: `git switch main && git pull --ff-only origin main && git branch -d <branch>` to sync `main` and clean up the local branch.

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
oriyn research modes
oriyn research ab-test --question "Which onboarding offer is clearer?" --a "Free trial" --b "Freemium tier"
```

For broader positioning convergence, use:

```bash
oriyn research experiment --question "Which positioning should we lead with?" --a "Save setup time" --b "Find revenue leaks" --agents 500
```

Use the output to identify the actual choice, rationale, convergence, affected personas, behavior patterns, segment size, and caveats.

## Workflow References

- [Setup and auth](rules/setup-and-auth.md): Install the CLI, install this skill, authenticate, link a repo, and verify readiness.
- [Run research modes](rules/run-research.md): Run A/B, Delphi, experiment, and playtest research from the CLI.
- [Read personas and patterns](rules/personas-and-patterns.md): Inspect user groups, size estimates, behavioral traits, and mined product signals.
- [Present results](rules/present-results.md): Report grounded product signal without overstating confidence.
- [Troubleshooting](rules/troubleshooting.md): Handle auth, missing links, no data, API, and network failures.

Read only the rule files needed for the user's task. Prefer the narrowest workflow that answers the question.

## Trigger Guidance

Use Oriyn when the question has a product/user decision surface:

- "Should we ship this onboarding change?"
- "Would users pay for this plan?"
- "Which positioning should we lead with?"
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
- `oriyn research modes`
- `oriyn research ab-test`
- `oriyn research delphi`
- `oriyn research experiment`
- `oriyn research playtest`

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

Use the status output to confirm auth, project link, API reachability, telemetry settings, and local paths before relying on personas, patterns, or research runs.

If integrations or enrichment are not ready, run:

```bash
oriyn sync
```

If no behavioral integrations are connected, direct the user to `https://app.oriyn.ai` -> Integrations before claiming results are grounded.

## Run Research Modes

Impact: HIGH

Run persona-backed A/B, Delphi, experiment, and playtest research from the CLI.

## Choose the Right Mode

Use `oriyn research modes` when you need to confirm the backend-supported modes for the linked product.

Use `oriyn research ab-test` for a concrete two-option decision. The output should include a real choice, persona-grounded reasoning, and caveats.

```bash
oriyn research ab-test --question "Which onboarding offer is clearer?" --a "Free trial" --b "Freemium tier"
```

Use `oriyn research delphi` when the user needs multi-round reasoning across personas before converging on a recommendation.

```bash
oriyn research delphi --question "What launch risk should we address first?" --rounds 3
```

Use `oriyn research experiment` for positioning convergence across 100, 500, or 1000 simulated agents. The experiment mode uses the backend's configured lightweight model for the agent fanout and returns bucketed convergence.

```bash
oriyn research experiment --question "Which positioning should we lead with?" --a "Save setup time" --b "Find revenue leaks" --agents 500
```

Use `oriyn research playtest` for task-based evaluation of a URL. Keep the allowed domains tight.

```bash
oriyn research playtest --url "https://staging.example.com" --task "Create your first report" --allow-domain staging.example.com
```

## Output Handling

The CLI polls until the research run reaches a terminal state. In a TTY, summarize the final printed result. When stdout is piped, read JSONL and use the final `{"type":"result"}` event as the source of truth.

For `ab-test`, report the selected option and the reasoning. For `experiment`, report the winning bucket, convergence percentage, agent count, and notable objections. For `delphi`, report the final recommendation and where rounds converged or disagreed. For `playtest`, report task completion, friction points, and persona-specific findings.

## Interview Boundary

Interactive persona interviews are a chat surface in the Oriyn app, not a CLI research command. If the user wants to chat with a persona, open the linked product in the app with `oriyn open` and use the Interviews tab.

## Personas and Patterns

Impact: HIGH

Inspect grounded user segments, behavior traits, and product opportunities.

## Personas

Use personas when the user asks who their actual users are, which segment a decision affects, or how different groups may react to a product change.

```bash
oriyn personas
oriyn personas <persona-id>
```

Look for:

- `size_estimate`: approximate share of the user base represented by the persona.
- `behavioral_traits`: traits backed by real sessions or events.
- Dynamic facts that show current behavior, not only static demographics.
- Stated goals, constraints, and adoption signals that clarify what the persona is trying to accomplish.

When presenting persona data, make the difference between large and small segments explicit. A persona representing a large share of users should carry more product weight than a small edge segment.

## Patterns

Use patterns when the user asks what to build next, where users are struggling, or what hypotheses Oriyn has mined from behavior.

```bash
oriyn patterns
oriyn patterns --only hypothesis
oriyn patterns --only bottleneck
```

Patterns help identify likely opportunities, bottlenecks, and product hypotheses. Do not treat mined patterns as shipping decisions by themselves; use them to frame a clear decision or follow-up research question.

## Useful Sequence

For a vague product question:

1. Run `oriyn status` to confirm the product is linked and enriched.
2. Run `oriyn patterns` to find likely opportunities or bottlenecks.
3. Run `oriyn personas` to understand the affected user groups.
4. Convert the decision into one clear product hypothesis or research question.
5. Present the grounded signal, affected segments, and practical next step.

## Do Not Synthesize Unsupported Personas

If the user asks for imagined personas or users outside their product data, say Oriyn is not the right grounding layer. Offer to run a grounded Oriyn workflow only after the product is linked and data exists.

## Present Results

Impact: HIGH

Summarize Oriyn output in a way that is useful, grounded, and not overstated.

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

If personas, patterns, or research participants are not grounded because enrichment is not ready:

```bash
oriyn sync
```

If integrations are missing, tell the user to connect sources in the Oriyn app before relying on grounded product signal.

## Network or API Failures

Retry only after checking whether the failure is transient. If the CLI reports API reachability issues, run:

```bash
oriyn status
```

Do not switch to direct HTTP calls unless the user explicitly asks for API-level debugging. The CLI handles token refresh, polling, retries, redaction, and output mode for normal workflows.

---

_Generated from SKILL.md and rules/*.md. To update, run `npm run build:agents`._
