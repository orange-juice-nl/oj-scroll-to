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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("oj-event");
var oj_eventaggregator_1 = require("oj-eventaggregator");
exports.getRootElements = function (selector, loaded) {
    if (loaded === void 0) { loaded = false; }
    var elements = Array.from(document.querySelectorAll(selector));
    if (loaded) {
        elements = elements.filter(function (x) { return x.getAttribute("data-loaded") !== null; });
        elements.forEach(function (x) { return x.setAttribute("data-loaded", "loaded"); });
    }
    return elements;
};
var ScrollTo = /** @class */ (function (_super) {
    __extends(ScrollTo, _super);
    function ScrollTo(root, options) {
        var _this = _super.call(this) || this;
        _this.root = root;
        _this.options = options;
        _this.root.on([
            "click.scroll-to",
            "touchend.scroll-to"
        ], function (e) { return _this.scroll(); });
        return _this;
    }
    ScrollTo.prototype.scroll = function () {
        var t = document.querySelector(this.options.selector);
        if (!t)
            console.error("No element found for selector " + this.options.selector);
        t.scrollIntoView(this.options);
        this.emit("change");
    };
    ScrollTo.prototype.unmount = function () {
        this.root.off([
            "click.scroll-to",
            "touchend.scroll-to"
        ]);
    };
    return ScrollTo;
}(oj_eventaggregator_1.EventAggregator));
exports.default = ScrollTo;
exports.mount = function (options) {
    return exports.getRootElements("[data-scroll-to]", true)
        .map(function (x) { return new ScrollTo(x, __assign(__assign({}, options), { selector: x.getAttribute("data-scroll-to") })); });
};
