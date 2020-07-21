import Vec2 from "./Vec2"

export default class DataNode {
    public children: Set<DataNode>
    public parents: Set<DataNode>
    constructor(public id: string, public label: string, public originData: any, public position: Vec2) {
        this.children = new Set()
        this.parents = new Set()
    }
}
