export default class DataNode {
    public children: Set<DataNode>
    public parents: Set<DataNode>
    constructor(public id: string, public label: string, public originData: any) {
        this.children = new Set()
        this.parents = new Set()
    }
}
