import type Database from "better-sqlite3";
import type { SessionRow, TurnRow, ToolUseRow, HookEventRow, OtelMetricRow, OtelEventRow, TaskTagRow } from "./db.js";
export declare class SessionRepo {
    private db;
    constructor(db: Database.Database);
    upsertSession(session: Omit<SessionRow, "ended_at"> & {
        ended_at?: string | null;
    }): void;
    /**
     * Accumulate metric deltas from a single OTEL export batch into the sessions row.
     * Creates a stub session row if none exists yet (OTEL may arrive before JSONL ingest).
     * All numeric fields are additive deltas — never a full replacement.
     */
    updateSessionFromOtel(sessionId: string, deltas: {
        costDelta: number;
        inputDelta: number;
        outputDelta: number;
        cacheReadDelta: number;
        cacheCreationDelta: number;
        durationMsDelta: number;
        latestTimestamp: string;
        model: string | null;
    }): void;
    insertTurn(turn: Omit<TurnRow, "id">): number;
    insertToolUse(toolUse: {
        session_id: string;
        turn_id: number | null;
        tool_name: string;
        tool_input: string | null;
        tool_result: string | null;
        success: number | null;
        duration_ms: number;
        timestamp: string;
    }): void;
    /**
     * Replace all tool uses for a given turn in a single transaction.
     * Deletes existing rows first to prevent duplication on re-ingest.
     */
    replaceToolUsesForTurn(turnId: number, toolUses: {
        session_id: string;
        turn_id: number | null;
        tool_name: string;
        tool_input: string | null;
        tool_result: string | null;
        success: number | null;
        duration_ms: number;
        timestamp: string;
    }[]): void;
    insertHookEvent(event: {
        session_id: string | null;
        event_name: string;
        timestamp: string;
        payload: string;
    }): void;
    listSessions(limit?: number, offset?: number): SessionRow[];
    countSessions(): number;
    getSession(id: string): SessionRow | undefined;
    getSessionTurns(sessionId: string): TurnRow[];
    getSessionToolUses(sessionId: string): unknown[];
    getSessionHookEvents(sessionId: string): unknown[];
    getAggregateStats(): unknown;
    insertOtelMetric(metric: {
        name: string;
        value: number;
        attributes: string | null;
        session_id: string | null;
        model: string | null;
        timestamp: string;
    }): void;
    insertOtelMetricBatch(metrics: {
        name: string;
        value: number;
        attributes: string | null;
        session_id: string | null;
        model: string | null;
        timestamp: string;
    }[]): void;
    insertOtelEvent(event: {
        event_name: string;
        attributes: string | null;
        session_id: string | null;
        prompt_id: string | null;
        timestamp: string;
    }): void;
    insertOtelEventBatch(events: {
        event_name: string;
        attributes: string | null;
        session_id: string | null;
        prompt_id: string | null;
        timestamp: string;
    }[]): void;
    getTokenTimeSeries(from: string, to: string, stepSeconds: number): {
        timestamp: string;
        input: number;
        output: number;
        cache_read: number;
    }[];
    getCostTimeSeries(from: string, to: string, stepSeconds: number): {
        timestamp: string;
        cost: number;
    }[];
    getToolUsageBreakdown(): {
        tool_name: string;
        count: number;
    }[];
    getModelBreakdown(): {
        model: string;
        cost: number;
        tokens: number;
    }[];
    getRecentOtelEvents(limit?: number): {
        event_name: string;
        attributes: string | null;
        session_id: string | null;
        prompt_id: string | null;
        timestamp: string;
    }[];
    tagTurn(turnId: number, task: string): void;
    tagTurnsBatch(turnIds: number[], task: string): void;
    getTasksForTurn(turnId: number): string[];
    getTaskTagsForTurn(turnId: number): TaskTagRow[];
    getTurnsByTask(task: string, limit?: number, offset?: number): TurnRow[];
    getTaggedTurns(opts?: {
        tags?: string[];
        mode?: "all" | "any";
        from?: string;
        to?: string;
        limit?: number;
        offset?: number;
    }): (TurnRow & {
        tags: string;
        block_input_tokens: number;
        block_output_tokens: number;
        block_cost_usd: number;
    })[];
    getTurnBlock(turnId: number): TurnRow[];
    getStatsByTask(task: string, from?: string, to?: string): unknown;
    getStatsByTasks(tasks: string[], mode?: "all" | "any", from?: string, to?: string): unknown;
    listTasks(): {
        task: string;
        turn_count: number;
        first_tagged: string;
        last_tagged: string;
    }[];
    getSyncWatermark(tableName: string): number;
    setSyncWatermark(tableName: string, lastSyncedId: number): void;
    getUnsyncedSessions(minRowid: number): (SessionRow & {
        _rowid: number;
    })[];
    getSessionsByIds(ids: string[]): SessionRow[];
    getTurnsAfter(minId: number, limit: number): TurnRow[];
    getToolUsesAfter(minId: number, limit: number): ToolUseRow[];
    getHookEventsAfter(minId: number, limit: number): HookEventRow[];
    getOtelMetricsAfter(minId: number, limit: number): OtelMetricRow[];
    getOtelEventsAfter(minId: number, limit: number): OtelEventRow[];
    getTaskTagsAfter(minId: number, limit: number): TaskTagRow[];
    getTurnLookup(): Map<number, {
        session_id: string;
        turn_index: number;
    }>;
}
//# sourceMappingURL=repo.d.ts.map