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
  task_tags?: Array<{ turn_index: number; tag: string; run_id: string }>;
}

export class ZozulApiClient {
  private baseUrl: string;
  private apiKey: string;
  private timeout: number;

  constructor(config: SyncClientConfig) {
    this.baseUrl = config.apiUrl.replace(/\/+$/, "");
    this.apiKey = config.apiKey;
    this.timeout = config.timeout ?? 30_000;
  }

  async syncSession(sessionId: string, payload: SessionSyncPayload): Promise<SessionSyncResponse> {
    return this.post(`/api/v1/sessions/${sessionId}/sync`, payload);
  }

  async postOtelMetricsBulk(metrics: ApiOtelMetric[]): Promise<void> {
    await this.post("/api/v1/otel/metrics/bulk", metrics);
  }

  async postOtelEventsBulk(events: ApiOtelEvent[]): Promise<void> {
    await this.post("/api/v1/otel/events/bulk", events);
  }

  async triggerRetag(body: { project_path?: string; session_id?: string; custom_tags?: string[]; deleted_tags?: string[]; free_retag?: boolean }): Promise<{ run_id: string }> {
    return this.post<{ run_id: string }>("/api/v1/task-tags/retag", body);
  }

  async getRetagStatus(): Promise<{ running: boolean; progress: number; message: string; started_at?: string; finished_at?: string; error?: string }> {
    return this.get("/api/v1/task-tags/retag/status");
  }

  async deleteTagRun(runId: string): Promise<void> {
    await this.delete(`/api/v1/task-tags/tag-runs/${runId}`);
  }

  async listTagRuns(): Promise<Array<{ run_id: string; tags: string[]; turn_count: number; created_at: string }>> {
    return this.get("/api/v1/task-tags/tag-runs");
  }

  private async get<T = void>(path: string): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "X-API-Key": this.apiKey,
      },
      signal: AbortSignal.timeout(this.timeout),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`GET ${path} failed: ${res.status} ${res.statusText} — ${text}`);
    }

    const contentType = res.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      return (await res.json()) as T;
    }
    return undefined as T;
  }

  private async delete<T = void>(path: string): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "X-API-Key": this.apiKey,
      },
      signal: AbortSignal.timeout(this.timeout),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`DELETE ${path} failed: ${res.status} ${res.statusText} — ${text}`);
    }

    const contentType = res.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      return (await res.json()) as T;
    }
    return undefined as T;
  }

  private async post<T = void>(path: string, body: unknown): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": this.apiKey,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(this.timeout),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`POST ${path} failed: ${res.status} ${res.statusText} — ${text}`);
    }

    const contentType = res.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      return (await res.json()) as T;
    }
    return undefined as T;
  }
}
