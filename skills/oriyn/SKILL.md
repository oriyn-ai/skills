---
name: oriyn
description: Use Oriyn to validate product decisions against grounded personas, real behavior patterns, and persona-backed research modes. Use when a user is deciding whether to build, change, price, launch, or redesign a user-facing product experience; when a PR changes product behavior and needs user signal; when the user asks about their actual users, personas, research runs, or behavior patterns; or when an agent needs common Oriyn CLI workflows.
---

# Oriyn

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
11. Once Codex is happy and CI is green, **merge the PR** (`gh pr merge --squash --delete-branch`) so the remote branch is deleted.
12. Locally: `git switch main && git pull --ff-only origin main`; if the local branch still exists, delete it with `git branch -D <branch>`.

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
