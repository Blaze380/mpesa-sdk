"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.source = void 0;
const _source_1 = require("@/.source");
const fumadocs_mdx_1 = require("fumadocs-mdx");
const source_1 = require("fumadocs-core/source");
exports.source = (0, source_1.loader)({
    baseUrl: '/docs',
    source: (0, fumadocs_mdx_1.createMDXSource)(_source_1.docs, _source_1.meta),
});
