import Vec2 from './Vec2';
export declare function fixPoint(n: number): number;
export declare function fixVec2(v: Vec2): Vec2;
export declare function dfs<T extends hasChildren<T>>(node: T, callback: (node: T, level: number) => any, level?: number): void;
export declare function bfs<T extends hasChildren<T>>(node: T, callback: (node: T, level: number) => any, level?: number): void;
declare type hasChildren<T> = {
    children: Array<T> | Set<T>;
};
export {};
