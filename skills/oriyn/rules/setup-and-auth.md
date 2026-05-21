---
title: Setup and Auth
impact: HIGH
description: Install the CLI and skill, authenticate, link a project, and verify Oriyn is ready.
tags: [setup, auth, cli, skills]
---

# Setup and Auth

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
