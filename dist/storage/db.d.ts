import Database from "better-sqlite3";
export declare function getDb(dbPath?: string): Database.Database;
export type SessionRow = {
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
export type TurnRow = {
    id: number;
    session_id: string;
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
    tool_calls: string | null;
    is_real_user: number;
};
export type ToolUseRow = {
    id: number;
    session_id: string;
    turn_id: number | null;
    tool_name: string;
    tool_input: string | null;
    tool_result: string | null;
    success: number | null;
    duration_ms: number;
    timestamp: string;
};
export type HookEventRow = {
    id: number;
    session_id: string | null;
    event_name: string;
    timestamp: string;
    payload: string;
};
export type OtelMetricRow = {
    id: number;
    name: string;
    value: number;
    attributes: string | null;
    session_id: string | null;
    model: string | null;
    timestamp: string;
};
export type OtelEventRow = {
    id: number;
    event_name: string;
    attributes: string | null;
    session_id: string | null;
    prompt_id: string | null;
    timestamp: string;
};
export type TaskTagRow = {
    id: number;
    turn_id: number;
    task: string;
    tagged_at: string;
};
//# sourceMappingURL=db.d.ts.map