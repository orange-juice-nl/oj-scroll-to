var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import "oj-event";
import Component from "oj-component";
var timings = {
    easeInOutQuad: function (t, b, c, d) {
        t /= d / 2;
        if (t < 1)
            return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
};
var ScrollTo = /** @class */ (function (_super) {
    __extends(ScrollTo, _super);
    function ScrollTo(root, options) {
        var _this = _super.call(this, "scroll-to", root, options) || this;
        _this._body = document.body;
        _this._html = document.documentElement;
        return _this;
    }
    ScrollTo.mount = function (options) {
        return Component.getRoots("[data-scroll-to]:not([data-scroll-to=\"loaded\"])").map(function (x) { return new ScrollTo(x, options); });
    };
    ScrollTo.scrollTo = function (selector, options) {
        var st = new ScrollTo(document.querySelector(selector), options);
        st.scrollTo();
        return st;
    };
    ScrollTo.prototype.initialize = function (selector) {
        var _this = this;
        this.selector = selector;
        if (!this.timing)
            this.timing = timings.easeInOutQuad;
        if (!this.duration)
            this.duration = 250;
        this.root.on(["click.scrollTo." + this.id, "touchend.scrollTo." + this.id], function (e) { return _this.scrollTo(); });
        window.on("wheel.scrollTo." + this.id, function (e) {
            if (_this.timer !== null) {
                clearTimeout(_this.timer);
                _this.timer = null;
            }
        });
    };
    ScrollTo.prototype.scrollTo = function () {
        var _this = this;
        var target = document.querySelector(this.selector);
        if (!target)
            return;
        var container = this.container ? document.querySelector(this.container) : this.getScrollContainer(target);
        if (!container)
            return;
        this.from = container.scrollTop;
        this.to = target.offsetTop + (this.offset || 0);
        if (this.from === this.to)
            return;
        this.emit("change", { done: false, target: target, container: container });
        this.smoothScroll(container, function () { return _this.emit("change", { done: true, target: target, container: container }); });
    };
    ScrollTo.prototype.getScrollContainer = function (target) {
        var container = target;
        while (container && container.clientHeight === container.scrollHeight) {
            container = container.parentNode;
        }
        ;
        return container;
    };
    ScrollTo.prototype.smoothScroll = function (container, cb, t, i) {
        var _this = this;
        if (t === void 0) { t = 0; }
        if (i === void 0) { i = 20; }
        if (container === this._body || container === this._html) {
            this._body.scrollTop = this.timing(t, this.from, this.to - this.from, this.duration);
            this._html.scrollTop = this.timing(t, this.from, this.to - this.from, this.duration);
        }
        else {
            container.scrollTop = this.timing(t, this.from, this.to - this.from, this.duration);
        }
        if (t < this.duration) {
            t += i;
            if (this.timer !== null)
                clearTimeout(this.timer);
            this.timer = setTimeout(function () { return _this.smoothScroll(container, cb, t, i); }, i);
        }
        else {
            cb();
        }
    };
    ScrollTo.prototype.unmount = function () {
    };
    return ScrollTo;
}(Component));
export default ScrollTo;
