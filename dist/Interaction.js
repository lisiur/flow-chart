System.register(["./Vec2", "./EventBus"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var Vec2_1, EventBus_1, Interaction;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Vec2_1_1) {
                Vec2_1 = Vec2_1_1;
            },
            function (EventBus_1_1) {
                EventBus_1 = EventBus_1_1;
            }
        ],
        execute: function () {
            Interaction = /** @class */ (function (_super) {
                __extends(Interaction, _super);
                function Interaction(canvas, callbacks) {
                    var _this = _super.call(this) || this;
                    _this.canvas = canvas;
                    _this.callbacks = callbacks;
                    _this.canvas.addEventListener('mousewheel', function (e) { return _this.handleScroll(e); });
                    _this.canvas.addEventListener('DOMMouseScroll', function (e) { return _this.handleScroll(e); });
                    _this.canvas.addEventListener('mousemove', function (e) { return _this.handleMouseMove(e); });
                    _this.canvas.addEventListener('mousedown', function (e) { return _this.handleMouseDown(e); });
                    return _this;
                }
                Interaction.prototype.on = function (event, callback) {
                    _super.prototype.on.call(this, event, callback);
                };
                // private translatePoint(vec: Vec2) {
                //     const context = this.canvas.getContext('2d') as CanvasRenderingContext2D
                //     const {x, y} = context.getTransform().invertSelf().transformPoint({x: vec.x, y: vec.y})
                //     return new Vec2(x, y)
                // }
                Interaction.prototype.handleMouseDown = function (e) {
                    if (e.buttons === 1) {
                        var x = e.offsetX, y = e.offsetY;
                        this.dispatch({
                            name: 'tap',
                            center: new Vec2_1.default(x, y)
                        });
                    }
                };
                Interaction.prototype.handleScroll = function (e) {
                    // e.preventDefault()
                    var x = e.offsetX, y = e.offsetY;
                    var delta = 1 + (e.wheelDelta ? e.wheelDelta / 40 : (-e.detail)) * 0.1;
                    var center = new Vec2_1.default(x, y);
                    this.callbacks.scale(center, delta);
                    this.dispatch({
                        name: 'scale',
                        center: center,
                        delta: delta
                    });
                };
                Interaction.prototype.handleMouseMove = function (e) {
                    if (e.buttons === 1) {
                        var delta = new Vec2_1.default(e.movementX, e.movementY);
                        this.callbacks.translate(delta);
                        this.dispatch({
                            name: 'move',
                            delta: delta
                        });
                    }
                };
                Interaction.prototype.dispatch = function (event) {
                    this.emit(event.name, event);
                };
                return Interaction;
            }(EventBus_1.default));
            exports_1("default", Interaction);
        }
    };
});
//# sourceMappingURL=Interaction.js.map