export default class Canvas2D {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas = canvas;
        const context = this.canvas.getContext('2d');
        if (!context) {
            throw new Error('can not get context from canvas');
        }
        this.context = context;
        this.scaleRatio = 1;
        // || window.devicePixelRatio
    }
    render(config, style) {
        this.context.save();
        this.setStyle(style);
        this.draw(config);
        this.context.restore();
    }
    getStyle(style) {
        return Object.assign({ fillStyle: '#000', strokeStyle: '#000', lineWidth: 1, textAlign: 'start', direction: 'inherit', textBaseline: 'alphabetic', font: '13px Microsoft YaHei', lineJoin: 'bevel' }, style);
    }
    setStyle(style) {
        const contextStyle = this.getStyle(style);
        this.context.fillStyle = contextStyle.fillStyle;
        this.context.strokeStyle = contextStyle.strokeStyle;
        this.context.lineWidth = contextStyle.lineWidth;
        this.context.font = contextStyle.font;
        this.context.textBaseline = contextStyle.textBaseline;
        this.context.textAlign = contextStyle.textAlign;
    }
}
