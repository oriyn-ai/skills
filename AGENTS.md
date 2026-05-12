# Oriyn Skills Repo Guide

This repository owns installable agent skill instructions for Oriyn.

## Rules

- Keep skill content in `skills/oriyn/`.
- Keep `skills/oriyn/SKILL.md` concise. Move detailed workflows into `skills/oriyn/rules/`.
- Regenerate `skills/oriyn/AGENTS.md` after changing `SKILL.md` or any rule file:

```bash
npm run build
```

- Installation should use the open skills CLI:

```bash
npx skills add oriyn-ai/skills
```

- Do not add Oriyn skill installation logic back into the Oriyn CLI. The CLI is for interacting with Oriyn; this repo is for agent instructions.
