// ── Safe JSON parse ──
function safeJsonParse(value) {
    if (value == null)
        return null;
    try {
        return JSON.parse(value);
    }
    catch {
        return value;
    }
}
// ── Transform functions ──
export function transformSession(row) {
    return {
        id: row.id,
        project_path: row.project_path,
        started_at: row.started_at,
        ended_at: row.ended_at,
        total_input_tokens: row.total_input_tokens,
        total_output_tokens: row.total_output_tokens,
        total_cache_read_tokens: row.total_cache_read_tokens,
        total_cache_creation_tokens: row.total_cache_creation_tokens,
        total_cost_usd: row.total_cost_usd,
        total_turns: row.total_turns,
        total_duration_ms: row.total_duration_ms,
        model: row.model,
    };
}
export function transformTurn(row) {
    return {
        turn_index: row.turn_index,
        role: row.role,
        timestamp: row.timestamp,
        input_tokens: row.input_tokens,
        output_tokens: row.output_tokens,
        cache_read_tokens: row.cache_read_tokens,
        cache_creation_tokens: row.cache_creation_tokens,
        cost_usd: row.cost_usd,
        duration_ms: row.duration_ms,
        model: row.model,
        content_text: row.content_text,
        tool_calls: safeJsonParse(row.tool_calls),
        is_real_user: row.is_real_user === 1,
    };
}
export function transformToolUse(row, turnLookup) {
    return {
        turn_index: row.turn_id != null ? (turnLookup.get(row.turn_id) ?? null) : null,
        tool_name: row.tool_name,
        tool_input: safeJsonParse(row.tool_input),
        tool_result: row.tool_result,
        success: row.success == null ? null : row.success === 1,
        duration_ms: row.duration_ms,
        timestamp: row.timestamp,
    };
}
export function transformHookEvent(row) {
    return {
        event_name: row.event_name,
        timestamp: row.timestamp,
        payload: safeJsonParse(row.payload) ?? row.payload,
    };
}
export function transformTaskTag(row, turnLookup) {
    return {
        turn_index: turnLookup.get(row.turn_id) ?? null,
        task: row.task,
        tagged_at: row.tagged_at,
    };
}
export function transformOtelMetric(row) {
    return {
        name: row.name,
        value: row.value,
        attributes: safeJsonParse(row.attributes),
        session_id: row.session_id,
        model: row.model,
        timestamp: row.timestamp,
    };
}
export function transformOtelEvent(row) {
    return {
        event_name: row.event_name,
        attributes: safeJsonParse(row.attributes),
        session_id: row.session_id,
        prompt_id: row.prompt_id,
        timestamp: row.timestamp,
    };
}
//# sourceMappingURL=transform.js.map