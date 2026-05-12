---
title: Troubleshooting
impact: MEDIUM
description: Recover common Oriyn CLI failures without bypassing the CLI.
tags: [troubleshooting, errors, cli]
---

# Troubleshooting

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
