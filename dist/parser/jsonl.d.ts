import type { ParsedSession } from "./types.js";
/**
 * Discover all session JSONL files across all projects.
 * Files are stored directly in each project directory (not in a sessions/ subdir).
 */
export declare function discoverSessionFiles(): {
    filePath: string;
    projectPath: string;
}[];
/**
 * Parse a single session JSONL file into a structured ParsedSession.
 */
export declare function parseSessionFile(filePath: string, projectPath?: string): Promise<ParsedSession>;
//# sourceMappingURL=jsonl.d.ts.map