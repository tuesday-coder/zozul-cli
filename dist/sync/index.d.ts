import type { SessionRepo } from "../storage/repo.js";
import type { ZozulApiClient } from "./client.js";
export interface SyncCounts {
    synced: number;
    failed: number;
}
export interface SyncResult {
    sessions: SyncCounts;
    otel_metrics: SyncCounts;
    otel_events: SyncCounts;
}
interface SyncOptions {
    verbose?: boolean;
    dryRun?: boolean;
}
export declare function runSync(repo: SessionRepo, client: ZozulApiClient, opts?: SyncOptions): Promise<SyncResult>;
export {};
//# sourceMappingURL=index.d.ts.map