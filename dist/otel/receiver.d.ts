import type { SessionRepo } from "../storage/repo.js";
export declare function handleOtlpMetrics(body: string, repo: SessionRepo, verbose?: boolean): number;
/**
 * Parse OTLP JSON logs/events export and store in SQLite.
 *
 * Claude Code sends events in the standard OTLP JSON logs format:
 * { resourceLogs: [{ scopeLogs: [{ logRecords: [...] }] }] }
 */
export declare function handleOtlpLogs(body: string, repo: SessionRepo, verbose?: boolean): number;
//# sourceMappingURL=receiver.d.ts.map