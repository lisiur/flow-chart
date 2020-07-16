export function fixPoint(n) {
    return Math.floor(n) + 0.5;
}
export function fixVec2(v) {
    return v.each(fixPoint);
}
export function dfs(node, callback, level = 0) {
    if (node) {
        callback(node, level);
    }
    Array.from(node.children).forEach(childNode => {
        dfs(childNode, callback, level + 1);
    });
}
export function bfs(node, callback, level = 0) {
    const queue = [];
    let queueIndex = 0;
    queue.push([0, node]);
    while (queueIndex < queue.length) {
        const [curLevel, item] = queue[queueIndex++];
        callback(item, curLevel);
        Array.from(item.children).forEach(childNode => {
            queue.push([curLevel + 1, childNode]);
        });
    }
}
