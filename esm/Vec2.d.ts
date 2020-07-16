export default class Vec2 {
    private arr;
    constructor(x?: number, y?: number);
    get 0(): number;
    set 0(v: number);
    get 1(): number;
    set 1(v: number);
    get x(): number;
    set x(v: number);
    get y(): number;
    set y(v: number);
    eachSelf(p: (n: number) => number): void;
    each(p: (n: number) => number): Vec2;
    add(arg: Vec2 | number): Vec2;
    addSelf(arg: Vec2 | number): this;
    multiply(arg: Vec2 | number): Vec2;
    multiplySelf(arg: Vec2 | number): this;
    clone(): Vec2;
}
