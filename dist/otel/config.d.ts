export interface OtelConfig {
    /** OTLP endpoint, e.g. http://localhost:4317 */
    endpoint: string;
    /** Protocol: grpc, http/json, or http/protobuf */
    protocol: "grpc" | "http/json" | "http/protobuf";
    /** Whether to log user prompt content */
    logUserPrompts: boolean;
    /** Whether to log MCP/tool detail names */
    logToolDetails: boolean;
    /** Metrics export interval in ms */
    metricsInterval: number;
    /** Logs export interval in ms */
    logsInterval: number;
    /** Optional auth header */
    authHeader?: string;
}
/**
 * Generate the set of environment variables needed to enable
 * Claude Code's built-in OpenTelemetry export.
 */
export declare function generateOtelEnvVars(config?: Partial<OtelConfig>): Record<string, string>;
/**
 * Generate a shell script that exports all required OTEL env vars.
 */
export declare function generateOtelShellExports(config?: Partial<OtelConfig>): string;
/**
 * Write the OTEL env vars into Claude Code's settings.json under the "env" key.
 */
export declare function installOtelToSettings(config?: Partial<OtelConfig>): {
    path: string;
};
/**
 * Remove zozul OTEL env vars from Claude Code's settings.json.
 */
export declare function uninstallOtelFromSettings(): boolean;
//# sourceMappingURL=config.d.ts.map