export default class Vec2 {
    constructor(x, y) {
        x = x !== null && x !== void 0 ? x : 0;
        y = y !== null && y !== void 0 ? y : x;
        this.arr = [x, y];
    }
    get 0() {
        return this.arr[0];
    }
    set 0(v) {
        this.arr[0] = v;
    }
    get 1() {
        return this.arr[1];
    }
    set 1(v) {
        this.arr[1] = v;
    }
    get x() {
        return this.arr[0];
    }
    set x(v) {
        this.arr[0] = v;
    }
    get y() {
        return this.arr[1];
    }
    set y(v) {
        this.arr[1] = v;
    }
    eachSelf(p) {
        this.x = p(this.x);
        this.y = p(this.y);
    }
    each(p) {
        return new Vec2(p(this.x), p(this.y));
    }
    add(arg) {
        if (typeof arg === 'number') {
            arg = new Vec2(arg, arg);
            return arg.addSelf(this);
        }
        else {
            const arr = this.arr.slice();
            arr.forEach((v, i, s) => {
                s[i] = v + arg.arr[i];
            });
            return new Vec2(arr[0], arr[1]);
        }
    }
    addSelf(arg) {
        if (typeof arg === 'number') {
            arg = new Vec2(arg);
        }
        this.arr.forEach((v, i, s) => {
            s[i] = v + arg.arr[i];
        });
        return this;
    }
    multiply(arg) {
        if (typeof arg === 'number') {
            arg = new Vec2(arg);
        }
        const arr = this.arr.slice();
        arr[0] *= arg[0];
        arr[1] *= arg[1];
        return new Vec2(...arr);
    }
    multiplySelf(arg) {
        if (typeof arg === 'number') {
            arg = new Vec2(arg);
        }
        this.arr[0] *= arg[0];
        this.arr[1] *= arg[1];
        return this;
    }
    clone() {
        return new Vec2(this.x, this.y);
    }
}
