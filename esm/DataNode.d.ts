export default class DataNode {
    id: string;
    label: string;
    originData: any;
    children: Set<DataNode>;
    parents: Set<DataNode>;
    constructor(id: string, label: string, originData: any);
}
