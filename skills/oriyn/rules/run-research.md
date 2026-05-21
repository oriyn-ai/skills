---
title: Run Research Modes
impact: HIGH
description: Run persona-backed A/B, Delphi, experiment, and playtest research from the CLI.
tags: [research, ab-test, delphi, experiment, playtest]
---

# Run Research Modes

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
