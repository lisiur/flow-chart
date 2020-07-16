import Canvas2D from './Canvas2D';
import { fixVec2 } from './utils';
export default class Line extends Canvas2D {
    draw(config) {
        const start = fixVec2(config.start);
        const end = fixVec2(config.end);
        this.context.beginPath();
        this.context.moveTo(start.x, start.y);
        this.context.lineTo(end.x, end.y);
        this.context.stroke();
    }
    render(config, style) {
        super.render(config, style);
    }
}
