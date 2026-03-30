import type { SessionRepo } from "../storage/repo.js";
export interface WatcherOptions {
    repo: SessionRepo;
    verbose?: boolean;
    /** Re-ingest all existing JSONL files on startup to catch up on missed sessions. Default true. */
    catchUp?: boolean;
}
/**
 * Watch ~/.claude/projects for JSONL session file changes and ingest them
 * into the database as they are written. Returns a stop function.
 *
 * On startup, performs an initial catch-up pass so that sessions written
 * while zozul was not running are immediately available.
 */
export declare function watchSessionFiles(opts: WatcherOptions): Promise<() => void>;
//# sourceMappingURL=watcher.d.ts.map