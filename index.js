"use strict";
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
var TextRotater = (function () {
    function TextRotater(element, options) {
        if (options === void 0) { options = {}; }
        var defaultOptions = {
            background: "initial",
            color: "initial",
            duration: 3000,
            direction: "top",
        };
        this.keyframeName = "textRotater";
        this.keyframeStyleId = "text-rotater-style";
        this.element = document.getElementById(element);
        this.options = __assign(__assign({}, defaultOptions), options);
        if (typeof this.options.duration !== "number") {
            throw TypeError("duration should be of type number");
        }
        if (this.options.direction !== "top" &&
            this.options.direction !== "bottom") {
        }
        this.currentWord = 0;
        this.wordsLength = 0;
        this.trStyles = "";
    }
    TextRotater.prototype.getWords = function () {
        var _a, _b;
        var words = (_b = (_a = this.element.getAttribute("data-rotate")) === null || _a === void 0 ? void 0 : _a.split(",")) !== null && _b !== void 0 ? _b : [];
        return words;
    };
    TextRotater.prototype.textRotaterKeyframes = function (name, styles) {
        var styleTag = document.getElementById(this.trStyles);
        if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.setAttribute("id", this.keyframeStyleId);
            document.body.appendChild(styleTag);
        }
        styleTag.sheet.insertRule("@keyframes " + name + " {" + styles + "}", styleTag.length);
    };
    TextRotater.prototype.init = function () {
        var _this = this;
        console.log(this.options);
        var words = this.getWords();
        this.wordsLength = words.length;
        this.element.style = "background:" + this.options.background + ";color:" + this.options.color + ";overflow-y:hidden;display:inline-block;animation: textRotater " + this.options.duration + "ms linear 100ms infinite " + (this.options.direction === "top" ? "normal" : "reverse") + " forwards;\n    ";
        var keyframes = "0%{transform: translateY(45px);opacity: 0;}30%, 90%{opacity: 0;}40%, 50%, 60%, 70%, 75%{transform: inherit;opacity: 1;}100%{transform: translateY(-45px);opacity: 0;}";
        this.textRotaterKeyframes(this.keyframeName, keyframes);
        setInterval(function () {
            var fontMargin = Math.floor(parseInt(window.getComputedStyle(_this.element).fontSize) / 3);
            _this.element.style.marginBottom = "-" + (fontMargin - 0.5) + "px";
            _this.element.innerText = words[_this.currentWord];
            _this.currentWord > _this.wordsLength - 2
                ? (_this.currentWord = 0)
                : _this.currentWord++;
        }, this.options.duration);
    };
    return TextRotater;
}());
