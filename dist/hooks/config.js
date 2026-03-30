import fs from "node:fs";
import path from "node:path";
import os from "node:os";
const CLAUDE_SETTINGS_PATH = path.join(os.homedir(), ".claude", "settings.json");
/**
 * Generate the hooks configuration object for Claude Code settings.json.
 */
export function generateHooksConfig(opts) {
    const base = `http://localhost:${opts.port}/hook`;
    return {
        hooks: {
            SessionStart: [
                {
                    matcher: "",
                    hooks: [{ type: "http", url: `${base}/session-start` }],
                },
            ],
            SessionEnd: [
                {
                    matcher: "",
                    hooks: [{ type: "http", url: `${base}/session-end` }],
                },
            ],
            UserPromptSubmit: [
                {
                    hooks: [{ type: "http", url: `${base}/user-prompt` }],
                },
            ],
            PostToolUse: [
                {
                    matcher: "",
                    hooks: [{ type: "http", url: `${base}/post-tool-use` }],
                },
            ],
            Stop: [
                {
                    hooks: [{ type: "http", url: `${base}/stop` }],
                },
            ],
        },
    };
}
/**
 * Read the current Claude settings.json, merge hooks, and write back.
 */
export function installHooksToSettings(opts) {
    let existing = {};
    if (fs.existsSync(CLAUDE_SETTINGS_PATH)) {
        try {
            existing = JSON.parse(fs.readFileSync(CLAUDE_SETTINGS_PATH, "utf-8"));
        }
        catch {
            existing = {};
        }
    }
    const hooksConfig = generateHooksConfig(opts);
    const existingHooks = (existing.hooks ?? {});
    const newHooks = hooksConfig.hooks;
    const merged = { ...existingHooks, ...newHooks };
    existing.hooks = merged;
    fs.mkdirSync(path.dirname(CLAUDE_SETTINGS_PATH), { recursive: true });
    fs.writeFileSync(CLAUDE_SETTINGS_PATH, JSON.stringify(existing, null, 2) + "\n");
    return { path: CLAUDE_SETTINGS_PATH, merged: Object.keys(existingHooks).length > 0 };
}
/**
 * Remove zozul hooks from Claude settings.json.
 */
export function uninstallHooksFromSettings(opts) {
    if (!fs.existsSync(CLAUDE_SETTINGS_PATH))
        return false;
    let existing;
    try {
        existing = JSON.parse(fs.readFileSync(CLAUDE_SETTINGS_PATH, "utf-8"));
    }
    catch {
        return false;
    }
    const hooks = existing.hooks;
    if (!hooks)
        return false;
    const base = `http://localhost:${opts.port}/hook`;
    let removed = false;
    for (const [event, matchers] of Object.entries(hooks)) {
        if (!Array.isArray(matchers))
            continue;
        const filtered = matchers.filter((m) => {
            const matcher = m;
            return !matcher.hooks?.some((h) => h.url?.startsWith(base));
        });
        if (filtered.length !== matchers.length) {
            removed = true;
            if (filtered.length === 0) {
                delete hooks[event];
            }
            else {
                hooks[event] = filtered;
            }
        }
    }
    if (Object.keys(hooks).length === 0) {
        delete existing.hooks;
    }
    fs.writeFileSync(CLAUDE_SETTINGS_PATH, JSON.stringify(existing, null, 2) + "\n");
    return removed;
}
//# sourceMappingURL=config.js.map