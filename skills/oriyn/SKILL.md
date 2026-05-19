---
name: oriyn
description: Use Oriyn to inspect grounded personas and real behavior patterns for product decisions. Use when a user is deciding whether to build, change, price, launch, or redesign a user-facing product experience; when a PR changes product behavior and needs user signal; when the user asks about their actual users, personas, or behavior patterns; or when an agent needs common Oriyn CLI workflows.
---

# Oriyn

Oriyn helps product teams understand behavior, generate grounded personas, and inspect product patterns before shipping product changes.

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
oriyn patterns
oriyn personas
```

Use the output to identify affected personas, behavior patterns, segment size, and the strongest grounded signal. Summarize what the data suggests and where judgment or more product discovery is still needed.

## Workflow References

- [Setup and auth](rules/setup-and-auth.md): Install the CLI, install this skill, authenticate, link a repo, and verify readiness.
- [Read personas and patterns](rules/personas-and-patterns.md): Inspect user groups, size estimates, behavioral traits, and mined product signals.
- [Present results](rules/present-results.md): Report grounded product signal without overstating confidence.
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

The skill is how agents know when and how to use those commands.
