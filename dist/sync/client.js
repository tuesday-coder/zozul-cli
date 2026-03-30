export class ZozulApiClient {
    baseUrl;
    apiKey;
    timeout;
    constructor(config) {
        this.baseUrl = config.apiUrl.replace(/\/+$/, "");
        this.apiKey = config.apiKey;
        this.timeout = config.timeout ?? 30_000;
    }
    async syncSession(sessionId, payload) {
        return this.post(`/api/v1/sessions/${sessionId}/sync`, payload);
    }
    async postOtelMetricsBulk(metrics) {
        await this.post("/api/v1/otel/metrics/bulk", metrics);
    }
    async postOtelEventsBulk(events) {
        await this.post("/api/v1/otel/events/bulk", events);
    }
    async post(path, body) {
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
            return (await res.json());
        }
        return undefined;
    }
}
//# sourceMappingURL=client.js.map