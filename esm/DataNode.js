export default class DataNode {
    constructor(id, label, originData) {
        this.id = id;
        this.label = label;
        this.originData = originData;
        this.children = new Set();
        this.parents = new Set();
    }
}
