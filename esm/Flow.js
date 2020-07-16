import Vec2 from './Vec2';
import DataNode from './DataNode';
import Interaction from './Interaction';
import Rect from './Rect';
import Layout from './Layout';
import FlowNode from './FlowNode';
import FlowArrow from './FlowArrow';
export default class Flow {
    constructor(canvas, dataList, config) {
        this.canvas = canvas;
        this.config = config;
        const context = canvas.getContext('2d');
        if (!context)
            throw new Error('can not get canvas context');
        this.context = context;
        this.interaction = new Interaction(canvas, {
            scale: this.scale.bind(this),
            translate: this.translate.bind(this)
        });
        this.flowNodes = [];
        this.flowArrows = [];
        this.interaction.on('tap', event => {
            this.flowNodes.forEach(flowNode => {
                if (event.name === 'tap') {
                    if (flowNode.contains(event.center)) {
                        alert(flowNode.data.label);
                    }
                }
            });
        });
        const { width, height } = this.canvas;
        this.rect = new Rect(0, 0, width, height);
        const { root: dataTree, list } = this.buildDataTree(dataList);
        const layout = new Layout(width, height, dataTree);
        dataList.forEach(dataItem => {
            const node = list.get(dataItem.id);
            const center = layout.getPosition(dataItem.id);
            this.flowNodes.push(new FlowNode(canvas, {
                background: this.config.nodeBackground(dataItem.originData),
                color: this.config.nodeColor(dataItem.originData),
                center,
                text: dataItem.label,
            }, dataItem));
            const parents = Array.from(node.parents);
            parents.forEach(parent => {
                const position = layout.getPosition(parent.id);
                this.flowArrows.push(new FlowArrow(canvas, {
                    color: this.config.arrowColor(parent.originData, dataItem.originData),
                    start: position.add(new Vec2(0, 30)),
                    end: center.add(new Vec2(0, -30))
                }));
            });
        });
    }
    render() {
        this.context.save();
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        const { x, y, w, h } = this.rect;
        this.context.clearRect(x, y, w, h);
        this.context.restore();
        this.flowArrows.forEach(flowArrow => flowArrow.render());
        this.flowNodes.forEach(flowNode => flowNode.render());
    }
    translate(vec) {
        const { a, d } = this.context.getTransform();
        vec = vec.multiply(new Vec2(1 / a, 1 / d));
        this.context.translate(vec.x, vec.y);
        this.render();
    }
    scale(center, delta) {
        const { a, d } = this.context.getTransform();
        center = center.multiply(new Vec2(1 / a, 1 / d));
        this.context.translate(center.x, center.y);
        this.context.scale(delta, delta);
        this.context.translate(-center.x, -center.y);
        this.render();
    }
    buildDataTree(dataList) {
        const map = new Map();
        const isChildren = new Map();
        const dataLinkList = [];
        dataList.forEach(dataItem => {
            const dataNode = new DataNode(dataItem.id, dataItem.label, dataItem.originData);
            map.set(dataItem.id, dataNode);
            dataItem.children.forEach(id => {
                isChildren.set(id, true);
            });
        });
        dataList.forEach(dataItem => {
            const dataNode = map.get(dataItem.id);
            if (!isChildren.has(dataItem.id)) {
                dataLinkList.push(dataNode);
            }
            dataItem.children.forEach(id => {
                const node = map.get(id);
                dataNode.children.add(node);
                node.parents.add(dataNode);
            });
        });
        const root = new DataNode('', '', null);
        dataLinkList.forEach(dataNode => {
            root.children.add(dataNode);
        });
        return {
            root,
            list: map,
        };
    }
}
