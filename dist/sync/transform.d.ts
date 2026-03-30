import type { SessionRow, TurnRow, ToolUseRow, HookEventRow, TaskTagRow } from "../storage/db.js";
export type ApiSession = {
    id: string;
    project_path: string | null;
    started_at: string;
    ended_at: string | null;
    total_input_tokens: number;
    total_output_tokens: number;
    total_cache_read_tokens: number;
    total_cache_creation_tokens: number;
    total_cost_usd: number;
    total_turns: number;
    total_duration_ms: number;
    model: string | null;
};
export type ApiTurn = {
    turn_index: number;
    role: string;
    timestamp: string;
    input_tokens: number;
    output_tokens: number;
    cache_read_tokens: number;
    cache_creation_tokens: number;
    cost_usd: number;
    duration_ms: number;
    model: string | null;
    content_text: string | null;
    tool_calls: unknown[] | null;
    is_real_user: boolean;
};
export type ApiToolUse = {
    turn_index: number | null;
    tool_name: string;
    tool_input: unknown | null;
    tool_result: string | null;
    success: boolean | null;
    duration_ms: number;
    timestamp: string;
};
export type ApiHookEvent = {
    event_name: string;
    timestamp: string;
    payload: unknown;
};
export type ApiTaskTag = {
    turn_index: number | null;
    task: string;
    tagged_at: string;
};
export type ApiOtelMetric = {
    name: string;
    value: number;
    attributes: unknown | null;
    session_id: string | null;
    model: string | null;
    timestamp: string;
};
export type ApiOtelEvent = {
    event_name: string;
    attributes: unknown | null;
    session_id: string | null;
    prompt_id: string | null;
    timestamp: string;
};
export type SessionSyncPayload = {
    session: ApiSession;
    turns: ApiTurn[];
    tool_uses: ApiToolUse[];
    task_tags: ApiTaskTag[];
    hook_events: ApiHookEvent[];
};
export type TurnLookup = Map<number, number>;
export declare function transformSession(row: SessionRow): ApiSession;
export declare function transformTurn(row: TurnRow): ApiTurn;
export declare function transformToolUse(row: ToolUseRow, turnLookup: TurnLookup): ApiToolUse;
export declare function transformHookEvent(row: HookEventRow): ApiHookEvent;
export declare function transformTaskTag(row: TaskTagRow, turnLookup: TurnLookup): ApiTaskTag;
export declare function transformOtelMetric(row: import("../storage/db.js").OtelMetricRow): ApiOtelMetric;
export declare function transformOtelEvent(row: import("../storage/db.js").OtelEventRow): ApiOtelEvent;
//# sourceMappingURL=transform.d.ts.map