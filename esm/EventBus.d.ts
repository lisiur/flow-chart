export default class EventBus {
    private store;
    constructor();
    on(event: string, callback: (arg: any) => any): void;
    protected emit<T, U>(event: T, arg: U): void;
}
