# Oriyn Skills Repo Guide

This repository owns installable agent skill instructions for Oriyn.

## Dev Workflow

Always run this loop end-to-end — don't stop after pushing.

1. `git switch main && git pull --ff-only` to start from the latest `main`.
2. Create a feature branch (`git switch -c <topic>/<short-slug>`).
3. Make scoped changes.
4. Run relevant local checks (`bun run check`, `bun run build`, plus any task-specific tests).
5. Commit changes (stage explicit files, never `git add -A`).
6. Push the branch (`git push -u origin <branch>`).
7. Open a non-draft PR with `gh pr create` and return the URL.
8. **Wait** for Codex review and CI to finish. Don't proceed while either is pending.
9. **Resolve every outstanding comment** from Codex or reviewers — push fixup commits as needed — then mark each conversation thread as resolved.
10. Re-run CI if any commits were pushed; confirm green.
11. Once Codex is happy and CI is green, **merge the PR** (`gh pr merge --squash --delete-branch`) and **delete the remote branch**.
12. Locally: `git switch main && git pull --ff-only && git branch -d <branch>` to sync `main` and clean up the local branch.

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
