import type { SessionSyncPayload, ApiOtelMetric, ApiOtelEvent } from "./transform.js";
export interface SyncClientConfig {
    apiUrl: string;
    apiKey: string;
    timeout?: number;
}
export interface SessionSyncResponse {
    session_id: string;
    turns_synced: number;
    tool_uses_synced: number;
    task_tags_synced: number;
    hook_events_synced: number;
}
export declare class ZozulApiClient {
    private baseUrl;
    private apiKey;
    private timeout;
    constructor(config: SyncClientConfig);
    syncSession(sessionId: string, payload: SessionSyncPayload): Promise<SessionSyncResponse>;
    postOtelMetricsBulk(metrics: ApiOtelMetric[]): Promise<void>;
    postOtelEventsBulk(events: ApiOtelEvent[]): Promise<void>;
    private post;
}
//# sourceMappingURL=client.d.ts.map