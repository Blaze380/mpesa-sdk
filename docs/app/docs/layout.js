'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = Layout;
const docs_1 = require('fumadocs-ui/layouts/docs');
const layout_config_1 = require('@/app/layout.config');
const source_1 = require('@/lib/source');
function Layout({ children }) {
	return (
		<docs_1.DocsLayout
			tree={source_1.source.pageTree}
			{...layout_config_1.baseOptions}
		>
			{children}
		</docs_1.DocsLayout>
	);
}
