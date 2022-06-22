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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
// https://icons.getbootstrap.com/icons/sort-alpha-down/
var Icon = function (_a) {
    var color = _a.color, size = _a.size;
    return ((0, jsx_runtime_1.jsxs)("svg", __assign({ xmlns: 'http://www.w3.org/2000/svg', width: size, height: size, viewBox: '0 0 16 16', fill: color, className: 'bi bi-sort-alpha-down' }, { children: [(0, jsx_runtime_1.jsx)("path", { fillRule: 'evenodd', d: 'M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z' }), (0, jsx_runtime_1.jsx)("path", { d: 'M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z' })] })));
};
exports.default = Icon;
