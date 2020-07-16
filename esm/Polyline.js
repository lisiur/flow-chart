import Canvas2D from './Canvas2D';
import { fixVec2 } from './utils';
export default class Polyline extends Canvas2D {
    draw(config) {
        if (config.points.length < 3)
            return;
        const points = config.points.map(point => fixVec2(point));
        this.context.beginPath();
        this.context.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; ++i) {
            this.context.lineTo(points[i].x, points[i].y);
        }
        this.context.stroke();
    }
    render(config, style) {
        super.render(config, style);
    }
}
