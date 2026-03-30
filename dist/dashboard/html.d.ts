/** Local-only dashboard (no remote toggle). */
export declare function dashboardHtml(): string;
/**
 * Dashboard with a Local / Remote toggle.
 * When remote config is provided, the user can switch between local SQLite
 * and the remote backend API via a toggle in the header.
 * `mode` sets the initial active source.
 */
export declare function dashboardHtmlWithToggle(remote: {
    apiUrl: string;
    apiKey: string;
}, mode?: "local" | "remote"): string;
/**
 * Remote-only dashboard (no local API available).
 */
export declare function remoteDashboardHtml(apiUrl: string, apiKey: string): string;
//# sourceMappingURL=html.d.ts.map