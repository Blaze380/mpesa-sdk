'use strict';
var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
					});
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = Page;
exports.generateStaticParams = generateStaticParams;
exports.generateMetadata = generateMetadata;
const source_1 = require('@/lib/source');
const page_1 = require('fumadocs-ui/page');
const navigation_1 = require('next/navigation');
const mdx_1 = __importDefault(require('fumadocs-ui/mdx'));
function Page(props) {
	return __awaiter(this, void 0, void 0, function* () {
		const params = yield props.params;
		const page = source_1.source.getPage(params.slug);
		if (!page) (0, navigation_1.notFound)();
		const MDX = page.data.body;
		return (
			<page_1.DocsPage toc={page.data.toc} full={page.data.full}>
				<page_1.DocsTitle>{page.data.title}</page_1.DocsTitle>
				<page_1.DocsDescription>{page.data.description}</page_1.DocsDescription>
				<page_1.DocsBody>
					<MDX components={Object.assign({}, mdx_1.default)} />
				</page_1.DocsBody>
			</page_1.DocsPage>
		);
	});
}
function generateStaticParams() {
	return __awaiter(this, void 0, void 0, function* () {
		return source_1.source.generateParams();
	});
}
function generateMetadata(props) {
	return __awaiter(this, void 0, void 0, function* () {
		const params = yield props.params;
		const page = source_1.source.getPage(params.slug);
		if (!page) (0, navigation_1.notFound)();
		return {
			title: page.data.title,
			description: page.data.description,
		};
	});
}
