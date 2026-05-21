# Oriyn Skills

Agent skills for using Oriyn from coding agents.

## Quick Start

Install with the open skills CLI:

```bash
npx skills add oriyn-ai/skills
```

Useful scoped installs:

```bash
npx skills add oriyn-ai/skills --skill oriyn
npx skills add oriyn-ai/skills --skill oriyn -a codex -y
npx skills add oriyn-ai/skills --skill oriyn -a claude-code -y
```

## Boundary

The Oriyn CLI is how humans and agents interact with Oriyn:

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

This repository is how agents learn when and how to use those commands. Keep product workflow instructions, common agent operating patterns, and skill-specific documentation here.

## Structure

```text
skills/
  oriyn/
    SKILL.md
    AGENTS.md
    agents/openai.yaml
    rules/
      setup-and-auth.md
      run-research.md
      personas-and-patterns.md
      present-results.md
      troubleshooting.md
scripts/
  build-agents.cjs
  validate-skills.cjs
```

`SKILL.md` is the entry point for agent runtimes. Rule files hold detailed workflows. `AGENTS.md` is generated for agents that prefer one consolidated file.

## Development

```bash
npm run build
```

Run this after editing `SKILL.md` or any file in `skills/oriyn/rules/`.
