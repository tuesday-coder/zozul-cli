export interface TaskContext {
    active: string[];
    set_at: string;
}
export declare function getActiveContext(): TaskContext | null;
export declare function setActiveContext(tasks: string[]): TaskContext;
export declare function clearActiveContext(): void;
//# sourceMappingURL=index.d.ts.map