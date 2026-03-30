import http from "node:http";
import type { SessionRepo } from "../storage/repo.js";
export interface HookServerOptions {
    port: number;
    repo: SessionRepo;
    verbose?: boolean;
}
/**
 * Unified HTTP server that handles:
 *  - Hook events from Claude Code (POST /hook/*)
 *  - OTLP metrics and logs (POST /v1/metrics, POST /v1/logs)
 *  - Dashboard API (GET /api/*)
 *  - Web dashboard (GET /dashboard)
 */
export declare function createHookServer(opts: HookServerOptions): http.Server;
//# sourceMappingURL=server.d.ts.map