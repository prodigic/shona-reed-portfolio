---
name: view-markdown
description: Render a local markdown (.md) file as styled, dark GitHub-themed HTML and open it in a browser tab so the user can read it comfortably. Use this whenever the user asks to view, preview, open, "show me", or read a markdown file — a README, a plan doc, notes, or any .md file in this repo — in the browser, rather than just printing its raw contents in the terminal. Trigger on phrases like "open TRANSFORMATION_PLAN.md", "can I see that markdown file rendered", "preview this doc", or "show me the README in a tab", even if they don't say "markdown" explicitly.
---

## What this does

Serves a markdown file over a local HTTP server as a self-contained HTML page (dark theme, GitHub-style formatting for headings, code blocks, tables, blockquotes, checkboxes) and opens it in a browser tab — a much better reading experience than raw markdown text in the terminal.

An HTTP server is used rather than opening the file directly, because the project's Browser pane does not reliably render `file://` URLs as live, interactive pages.

## How to invoke it

1. Free up the port in case a previous invocation's server is still running, then start the server in the background:
   ```bash
   lsof -ti:9090 | xargs kill -9 2>/dev/null; node .claude/skills/view-markdown/scripts/serve-markdown.js <path-to-markdown-file>
   ```
   Run this with Bash's `run_in_background: true` — it's a long-lived server, not a one-shot command. The path can be relative to the repo root or absolute.

2. Open `http://localhost:9090/` in a browser tab. This project's default is the built-in Browser pane (`mcp__Claude_Browser__preview_start` with that URL, or `navigate` if a pane is already open) — only use Chrome DevTools if the user has explicitly asked for Chrome.

To view a different markdown file later, just repeat step 1 with the new path — it kills the old server and starts a fresh one on the same port — then reload the tab.

## Notes

- Depends on the `marked` npm package, already a dependency of this repo (see `package.json`). If it's missing, run `npm install` in the repo root first.
- The server re-reads the markdown file on every request, so reloading the browser tab always reflects the latest saved content — no restart needed for edits to the same file.
- The server keeps running after this task ends; that's expected (same pattern as this repo's own `npm start`/`npm stop` dev server). No cleanup step is required — the next invocation reclaims the port automatically.
