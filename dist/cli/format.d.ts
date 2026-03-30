import type { SessionRow, TurnRow } from "../storage/db.js";
export declare function formatSessionList(sessions: SessionRow[]): string;
export declare function formatSessionDetail(session: SessionRow, turns: TurnRow[]): string;
export declare function formatStats(stats: Record<string, unknown>): string;
//# sourceMappingURL=format.d.ts.map