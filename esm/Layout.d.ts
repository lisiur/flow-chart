import DataNode from './DataNode';
import Vec2 from './Vec2';
export default class Layout {
    width: number;
    height: number;
    root: DataNode;
    static Gap: number;
    private positionMap;
    private center;
    constructor(width: number, height: number, root: DataNode);
    getPosition(id: string): Vec2;
    private calcPosition;
}
