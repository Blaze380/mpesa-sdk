"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.meta = exports.docs = void 0;
const config_1 = require("fumadocs-mdx/config");
_a = (0, config_1.defineDocs)({
    dir: 'content/docs',
}), exports.docs = _a.docs, exports.meta = _a.meta;
exports.default = (0, config_1.defineConfig)();
