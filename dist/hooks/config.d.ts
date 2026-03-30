export interface HooksConfig {
    port: number;
}
/**
 * Generate the hooks configuration object for Claude Code settings.json.
 */
export declare function generateHooksConfig(opts: HooksConfig): Record<string, unknown>;
/**
 * Read the current Claude settings.json, merge hooks, and write back.
 */
export declare function installHooksToSettings(opts: HooksConfig): {
    path: string;
    merged: boolean;
};
/**
 * Remove zozul hooks from Claude settings.json.
 */
export declare function uninstallHooksFromSettings(opts: HooksConfig): boolean;
//# sourceMappingURL=config.d.ts.map