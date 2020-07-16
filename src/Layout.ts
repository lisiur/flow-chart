import DataNode from './DataNode'
import Vec2 from './Vec2';
import { bfs } from './utils'

export default class Layout {
    static Gap = 130
    private positionMap!: Map<string, Vec2>
    private start: Vec2
    constructor(public root: DataNode, public config: Config) {
        this.start = new Vec2(this.config.offsetX ?? 0, this.config.offsetY ?? 0)
        this.positionMap = this.calcPosition(this.root)
    }

    getPosition(id: string) {
        const gap = this.config.gap || Layout.Gap
        return (this.positionMap.get(id) ?? new Vec2(0, 0)).multiply(gap).add(this.start)
    }

    private calcPosition(node: DataNode, rangeMap: Map<string, Vec2> = new Map(), positionMap: Map<string, Vec2> = new Map()) {
        rangeMap.set(node.id, new Vec2(-1, 1))
        positionMap.set(node.id, new Vec2(0, 0))
        let scaleList: number[] = []
        const visitedMap: Map<string, boolean> = new Map()
        scaleList.push(1)
        bfs<DataNode>(node, (item, level) => {
            if (Array.from(item.children).length === 0) return
            const itemRange = rangeMap.get(item.id) as Vec2
            const childLength = Array.from(item.children).length
            const childRangeLength = (itemRange[1] - itemRange[0]) / childLength
            visitedMap.set(item.id, true)
            Array.from(item.children).forEach((child, index) => {
                const parents = Array.from(child.parents)
                const parentsAllViewed = parents.every(parent => !!visitedMap.get(parent.id))
                if (parentsAllViewed) {
                    if (parents.length > 1) {
                        let firstParent = positionMap.get(parents[0].id) as Vec2
                        let lastParent = positionMap.get(parents[1].id) as Vec2
                        positionMap.set(
                            child.id,
                            new Vec2(
                                (firstParent.x + lastParent.x) / 2,
                                level
                            )
                        )
                        rangeMap.set(
                            child.id,
                            new Vec2(
                                firstParent.x,
                                lastParent.x
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
        return positionMap
    }
}

interface Config {
    gap?: number
    offsetX?: number
    offsetY?: number
}