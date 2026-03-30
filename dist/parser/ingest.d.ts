import type { SessionRepo } from "../storage/repo.js";
import type { ParsedSession } from "./types.js";
/**
 * Ingest all discovered session JSONL files into the database.
 * Skips sessions that already exist unless force=true.
 */
export declare function ingestAllSessions(repo: SessionRepo, opts?: {
    force?: boolean;
    noTag?: boolean;
}): Promise<{
    ingested: number;
    skipped: number;
}>;
/**
 * Ingest a single session file by path.
 */
export declare function ingestSessionFile(repo: SessionRepo, filePath: string, projectPath?: string, opts?: {
    noTag?: boolean;
}): Promise<ParsedSession>;
//# sourceMappingURL=ingest.d.ts.map