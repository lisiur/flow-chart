import DataNode from './DataNode'
import Vec2 from './Vec2';
import { bfs } from './utils'

export default class Layout {
    private positionMap!: Map<string, Vec2>
    private minRange: number
    private start: Vec2
    constructor(public root: DataNode, public config: Config) {
        this.start = new Vec2(this.config.offsetX ?? 0, this.config.offsetY ?? 0)
        const { positionMap, minRange } = this.calcPosition(this.root)
        this.positionMap = positionMap
        this.minRange = minRange
    }

    getPosition(id: string) {
        const gap = this.config.gap
        return (this.positionMap.get(id) ?? new Vec2(0, 0))
            .multiply(
                gap
                .multiply(new Vec2(1 / this.minRange, 1)
                .add(new Vec2(1, 0))))
            .add(this.start)
    }

    private calcPosition(node: DataNode, rangeMap: Map<string, Vec2> = new Map(), positionMap: Map<string, Vec2> = new Map()) {
        rangeMap.set(node.id, new Vec2(-1, 1))
        positionMap.set(node.id, new Vec2(0, 0))
        let scaleList: number[] = []
        const visitedMap: Map<string, boolean> = new Map()
        scaleList.push(1)
        let minRange = 2
        bfs<DataNode>(node, (item, level) => {
            if (Array.from(item.children).length === 0) return
            const itemRange = rangeMap.get(item.id) as Vec2
            if (!itemRange) return
            minRange = Math.min(itemRange[1] - itemRange[0], minRange)
            const childLength = Array.from(item.children).length
            const childRangeLength = (itemRange[1] - itemRange[0]) / childLength
            visitedMap.set(item.id, true)
            Array.from(item.children).forEach((child, index) => {
                const parents = Array.from(child.parents)
                const parentsAllViewed = parents.every(parent => !!visitedMap.get(parent.id))
                if (parentsAllViewed) {
                    if (parents.length > 1) {
                        let min = Infinity
                        let max = -Infinity
                        const sum = parents.reduce((sum, node) => {
                            const pos = positionMap.get(node.id) as Vec2
                            min = Math.min(min, pos.x)
                            max = Math.max(max, pos.x)
                            return sum.add(pos)
                        }, new Vec2(0, 0))
                        const pos = sum.multiply(1 / parents.length)
                        positionMap.set(
                            child.id,
                            new Vec2(
                                pos.x,
                                level
                            )
                        )
                        rangeMap.set(
                            child.id,
                            new Vec2(
                                min,
                                max
                            )
                        )
                    } else {
                        rangeMap.set(
                            child.id,
                            new Vec2(
                                itemRange[0] + index * childRangeLength,
                                itemRange[0] + (index + 1) * childRangeLength,
                            )
                        )
                        positionMap.set(
                            child.id,
                            new Vec2(
                                itemRange[0] + (index + 0.5) * childRangeLength,
                                level
                            )
                        )
                    }
                }
            })
        })
        return { positionMap, minRange }
    }
}

interface Config {
    gap: Vec2
    offsetX?: number
    offsetY?: number
}