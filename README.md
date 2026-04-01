# zozul

Observability for [Claude Code](https://code.claude.com/). Track costs, sessions, and conversations across projects.

Works locally out of the box. Optionally syncs to a remote backend for persistent storage and team visibility.

## Quick start

```bash
npm install -g zozul-cli

# Configure Claude Code and run as a background service
zozul install --service

# Open the dashboard
open http://localhost:7890/dashboard
```

That's it. Use Claude Code normally — data appears automatically.

## What you get

A single local process that captures everything Claude Code does via three sources:

- **OTEL** — cost, tokens, active time. Streamed every ~60s. The authoritative source for spend.
- **Hooks** — session lifecycle, tool calls, user prompts. Real-time.
- **JSONL** — full conversation text, assistant responses. Read from Claude Code's transcript files.

All data lands in SQLite at `~/.zozul/zozul.db`. A web dashboard and JSON API sit on top.

## Dashboard

`http://localhost:7890/dashboard`

| View | What it answers |
|---|---|
| **Summary** | How much have I spent? Cost chart, project breakdown, totals. |
| **Tasks** | What did I work on? Groups turns by tag combination, shows cost and time per task. |
| **Tags** | How much per category? Per-tag stats with drill-down into individual prompts. |
| **Sessions** | Raw session list. Sortable, filterable, click to see full conversation. |
| **Team** | (Managers only) Team cost breakdown by member, team task groups. |

All views support time filtering (7d / 30d / All). Auto-refreshes every 10s.

When a remote backend is configured, the dashboard auto-detects it via health check and uses it as the data source. Falls back to local if unavailable.

## Task tagging

Tag your work so costs are attributed to what you're building:

```bash
zozul context "auth" "backend"    # Set active tags
# ... use Claude Code ...
git commit                         # Tags auto-clear on commit
```

Tags appear in the Tasks and Tags views. Turns are grouped by their tag combination.

## Remote sync

Optionally push data to a remote backend:

```bash
# Set in .env or environment
ZOZUL_API_URL=https://your-backend.example.com
ZOZUL_API_KEY=your-key

zozul sync
```

Sync is incremental (watermark-based) and also runs automatically on session end when the service is running. The dashboard switches to the remote API when available.

## Commands

| Command | Description |
|---|---|
| `zozul serve` | Start the server on port 7890 |
| `zozul install` | Configure Claude Code hooks and OTEL |
| `zozul install --service` | Also install as a background service (auto-starts on login) |
| `zozul install --status` | Check if the service is running |
| `zozul install --restart` | Restart the service after code changes |
| `zozul uninstall` | Remove all hooks, config, and service |
| `zozul context <tags...>` | Set active task tags |
| `zozul context --clear` | Clear tags |
| `zozul sync` | Push local data to remote backend |

## How it works

```
Claude Code
    |
    +--- OTEL export (every ~60s) ---> /v1/metrics, /v1/logs
    +--- Hook POSTs (real-time) -----> /hook/*
    +--- JSONL transcripts ----------> fs.watch
    |
    v
SQLite (~/.zozul/zozul.db)
    |
    +--- /dashboard (browser)
    +--- /api/* (JSON)
    +--- zozul sync --> remote backend (optional)
```

Single process on port 7890. macOS uses launchd, Linux uses systemd.

### Data ownership

| What | Source | Notes |
|---|---|---|
| Cost | OTEL | JSONL doesn't include cost |
| Duration | OTEL | Accumulated from active time metrics |
| Tokens | OTEL (preferred) | JSONL provides initial values, OTEL accumulates |
| Conversation text | JSONL | Full turns, tool calls, assistant responses |
| Session events | Hooks | Start, end, stop, tool use |

## Configuration

Via `.env` or environment variables:

```bash
ZOZUL_PORT=7890                  # Default: 7890
ZOZUL_DB_PATH=~/.zozul/zozul.db # Default: ~/.zozul/zozul.db
ZOZUL_VERBOSE=1                  # Log all events
ZOZUL_API_URL=https://...        # Remote backend URL (optional)
ZOZUL_API_KEY=...                # Remote backend API key (optional)
```

## Requirements

- Node.js 18+
- Claude Code (`claude --version`)
- Claude Pro, Max, Teams, Enterprise, or API key
