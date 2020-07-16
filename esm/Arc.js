import Canvas2D from './Canvas2D';
import { fixVec2 } from './utils';
export default class Arc extends Canvas2D {
    draw(config) {
        const { center, radius, angle: { x: angleStart, y: angleEnd } } = config;
        const { x, y } = fixVec2(center);
        this.context.beginPath();
        this.context.arc(x, y, radius, angleStart, angleEnd);
        this.context.fill();
    }
    render(config, style) {
        super.render(config, style);
    }
}
