export default class EventBus {
    private store: Map<any, Array<(...args: any[]) => any>>
    constructor() {
        this.store = new Map()
    }

    on(event: string, callback: (arg: any) => any) {
        const callbacks = this.store.get(event) ?? []
        callbacks.push(callback)
        this.store.set(event, callbacks)
    }

    protected emit<T, U>(event: T, arg: U) {
        const callbacks = this.store.get(event) ?? []
        callbacks.forEach(callback => {
            callback(arg)
        })
    }
}