import Canvas2D from './Canvas2D';
import { fixVec2 } from './utils';
export default class Rectangle extends Canvas2D {
    draw(config) {
        const rect = config.rect;
        const start = fixVec2(rect.start);
        const end = fixVec2(rect.end);
        this.context.beginPath();
        this.context.moveTo(start.x, start.y);
        this.context.lineTo(end.x, start.y);
        this.context.lineTo(end.x, end.y);
        this.context.lineTo(start.x, end.y);
        this.context.fill();
    }
    render(config, style) {
        super.render(config, style);
    }
}
