import Vec2 from './Vec2';
import { bfs } from './utils';
export default class Layout {
    constructor(width, height, root) {
        this.width = width;
        this.height = height;
        this.root = root;
        this.center = new Vec2(width / 2, 16);
        this.positionMap = this.calcPosition(this.root);
    }
    getPosition(id) {
        var _a;
        return ((_a = this.positionMap.get(id)) !== null && _a !== void 0 ? _a : new Vec2(0, 0)).multiply(Layout.Gap).add(this.center);
    }
    calcPosition(node, rangeMap = new Map(), positionMap = new Map()) {
        rangeMap.set(node.id, new Vec2(-1, 1));
        positionMap.set(node.id, new Vec2(0, 0));
        let scaleList = [];
        const visitedMap = new Map();
        scaleList.push(1);
        bfs(node, (item, level) => {
            if (Array.from(item.children).length === 0)
                return;
            const itemRange = rangeMap.get(item.id);
            const childLength = Array.from(item.children).length;
            const childRangeLength = (itemRange[1] - itemRange[0]) / childLength;
            visitedMap.set(item.id, true);
            Array.from(item.children).forEach((child, index) => {
                const parents = Array.from(child.parents);
                const parentsAllViewed = parents.every(parent => !!visitedMap.get(parent.id));
                if (parentsAllViewed) {
                    if (parents.length > 1) {
                        let firstParent = positionMap.get(parents[0].id);
                        let lastParent = positionMap.get(parents[1].id);
                        positionMap.set(child.id, new Vec2((firstParent.x + lastParent.x) / 2, level));
                        rangeMap.set(child.id, new Vec2(firstParent.x, lastParent.x));
                    }
                    else {
                        rangeMap.set(child.id, new Vec2(itemRange[0] + index * childRangeLength, itemRange[0] + (index + 1) * childRangeLength));
                        positionMap.set(child.id, new Vec2(itemRange[0] + (index + 0.5) * childRangeLength, level));
                    }
                }
            });
        });
        return positionMap;
    }
}
Layout.Gap = 130;
