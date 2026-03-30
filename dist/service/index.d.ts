export interface ServiceInstallOptions {
    port: number;
    dbPath?: string;
}
export interface ServiceResult {
    platform: "macos" | "linux" | "unsupported";
    servicePath: string;
    alreadyRunning: boolean;
}
/**
 * Install and immediately start zozul as a background service.
 * Uses launchd on macOS, systemd --user on Linux.
 */
export declare function installService(opts: ServiceInstallOptions): ServiceResult;
/**
 * Stop and remove the zozul background service.
 */
export declare function uninstallService(): {
    removed: boolean;
    platform: "macos" | "linux" | "unsupported";
};
/**
 * Restart the running service in-place (kills and relaunches the current process).
 * Throws if the service is not installed.
 */
export declare function restartService(): void;
/**
 * Returns a human-readable status string for the running service.
 */
export declare function serviceStatus(): string;
//# sourceMappingURL=index.d.ts.map