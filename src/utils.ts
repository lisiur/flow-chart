import Vec2 from './Vec2'

export function fixPoint(n: number) {
    return Math.floor(n) + 0.5
}
export function fixVec2(v: Vec2) {
    return v.each(fixPoint)
}

export function dfs<T extends hasChildren<T>>(node: T, callback: (node: T, level: number) => any, level = 0) {
    if (node) {
        callback(node, level)
    }
    Array.from(node.children).forEach(childNode => {
        dfs(childNode, callback, level + 1)
    })
}

export function bfs<T extends hasChildren<T>>(node: T, callback: (node: T, level: number) => any, level = 0) {
    const queue: [number, T][] = []
    let queueIndex = 0
    queue.push([0, node])
    while (queueIndex < queue.length) {
        const [curLevel, item] = queue[queueIndex++]
        callback(item, curLevel)
        Array.from(item.children).forEach(childNode => {
            queue.push([curLevel + 1, childNode])
        })
    }
}

type hasChildren<T> = {
    children: Array<T> | Set<T>
}
