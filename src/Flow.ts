import Vec2 from './Vec2'
import DataNode from './DataNode'
import Interaction from './Interaction'
import Rect from './Rect'
import Layout from './Layout'
import FlowNode from './FlowNode'
import FlowArrow from './FlowArrow'
// import * as math from 'mathjs'
import math from 'mathjs'
export default class Flow {
    private flowArrows: FlowArrow[]
    private flowNodes: FlowNode<Data>[]
    private context: CanvasRenderingContext2D
    private interaction: Interaction
    private rect!: Rect
    private transformMatrix: math.Matrix
    constructor(private canvas: HTMLCanvasElement, dataList: Data[], public config: FlowConfig) {
        const context = canvas.getContext('2d')
        if (!context) throw new Error('can not get canvas context')
        this.context = context
        this.flowNodes = []
        this.flowArrows = []
        this.transformMatrix = math.matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]])

        this.interaction = new Interaction(canvas, {
            scale: this.scale.bind(this),
            translate: this.translate.bind(this)
        })
        this.interaction.on('tap', event => {
            this.flowNodes.forEach(flowNode => {
                if (event.name === 'tap') {
                    const point = math.transpose(math.matrix([event.center.x, event.center.y, 1]))
                    const rTransformMatrix = math.inv(this.transformMatrix)
                    const originPoint = math.multiply(rTransformMatrix, point)
                    if (flowNode.contains(new Vec2(originPoint.get([0]), originPoint.get([1])))) {
                        if (config.onTapNode) {
                            config.onTapNode(flowNode.data.originData)
                        }
                    }
                }
            })
        })
        const { width, height } = this.canvas
        this.rect = new Rect(0, 0, width, height)

        const { root: dataTree, list } = this.buildDataTree(dataList)
        const layout = new Layout(dataTree, {
            gap: this.config.gap,
            offsetX: this.config.offsetX ?? width / 2,
            offsetY: this.config.offsetY ?? 0,
        })
        dataList.forEach(dataItem => {
            const node = list.get(dataItem.id) as DataNode
            const center = layout.getPosition(dataItem.id) as Vec2
            this.flowNodes.push(new FlowNode<Data>(canvas, {
                background: this.config.nodeBackground(dataItem.originData),
                color: this.config.nodeColor(dataItem.originData),
                center,
                text: dataItem.label,
                fontSize: this.config.fontSize,
                radius: this.config.radius,
            }, dataItem))
            const parents = Array.from(node.parents)
            parents.forEach(parent => {
                const position = layout.getPosition(parent.id)
                this.flowArrows.push(new FlowArrow(canvas, {
                    color: this.config.arrowColor(parent.originData, dataItem.originData),
                    start: position.add(new Vec2(0, this.config.radius)),
                    end: center.add(new Vec2(0, -this.config.radius)),
                    endAngle: this.config.endAngle,
                    endBorder: this.config.endBorder,
                    endHeight: this.config.endHeight,
                    startRadius: this.config.startRadius,
                    wrapLength: this.config.wrapLength
                }))
            })
        })
    }

    render() {
        this.context.save()
        this.context.setTransform(1, 0, 0, 1, 0, 0)
        const { x, y, w, h } = this.rect
        this.context.clearRect(x, y, w, h)
        this.context.restore()
        this.flowArrows.forEach(flowArrow => flowArrow.render())
        this.flowNodes.forEach(flowNode => flowNode.render())
        // @ts-ignore for uni-app
        if (this.context.draw) this.context.draw()
    }

    transform(matrix: math.Matrix) {
        this.transformMatrix = matrix
        this.context.setTransform(
            this.transformMatrix.get([0, 0]),
            this.transformMatrix.get([0, 1]),
            this.transformMatrix.get([1, 0]),
            this.transformMatrix.get([1, 1]),
            this.transformMatrix.get([0, 2]),
            this.transformMatrix.get([1, 2]),
        )
        this.render()
    }

    translate(vec: Vec2) {
        const translateMatrix = math.matrix([
            [1, 0, vec.x],
            [0, 1, vec.y],
            [0, 0, 1]
        ])
        const transformMatrix = math.multiply(translateMatrix, this.transformMatrix)
        this.transform(transformMatrix)
    }

    scale(center: Vec2, delta: number) {
        const translateMatrix = math.matrix([
            [1, 0, -center.x],
            [0, 1, -center.y],
            [0, 0, 1]
        ])
        const scaleMatrix = math.matrix([
            [delta, 0, center.x],
            [0, delta, center.y],
            [0, 0, 1]
        ])
        let transformMatrix = math.multiply(math.multiply(scaleMatrix, translateMatrix), this.transformMatrix)
        this.transform(transformMatrix)
        this.render()
    }

    private buildDataTree(dataList: Data[]) {
        const map: Map<string, DataNode> = new Map()
        const isChildren: Map<string, Boolean> = new Map()
        const dataLinkList: DataNode[] = []
        dataList.forEach(dataItem => {
            const dataNode = new DataNode(dataItem.id, dataItem.label, dataItem.originData)
            map.set(dataItem.id, dataNode)
            dataItem.children.forEach(id => {
                isChildren.set(id, true)
            })
        })
        dataList.forEach(dataItem => {
            const dataNode = map.get(dataItem.id) as DataNode
            if (!isChildren.has(dataItem.id)) {
                dataLinkList.push(dataNode)
            }
            dataItem.children.forEach(id => {
                const node = map.get(id) as DataNode
                dataNode.children.add(node)
                node.parents.add(dataNode)
            })
        })
        const root = new DataNode('', '', null)
        dataLinkList.forEach(dataNode => {
            root.children.add(dataNode)
        })
        return {
            root,
            list: map,
        }
    }
}

interface Data {
    id: string
    label: string
    children: string[]
    originData?: any
}

interface FlowConfig {
    nodeBackground: (data: any) => string
    nodeColor: (data: any) => string
    arrowColor: (start: any, end: any) => string
    onTapNode?: (data: any) => any
    gap?: number
    radius: number
    offsetX?: number
    offsetY?: number
    fontSize?: number
    endAngle?: number
    endBorder?: number
    endHeight?: number
    startRadius?: number
    wrapLength?: number
}