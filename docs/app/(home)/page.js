'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = HomePage;
const link_1 = __importDefault(require('next/link'));
function HomePage() {
	return (
		<main className="flex flex-1 flex-col justify-center text-center">
			<h1 className="mb-4 text-2xl font-bold">Hello World</h1>
			<p className="text-fd-muted-foreground">
				You can open{' '}
				<link_1.default
					href="/docs"
					className="text-fd-foreground font-semibold underline"
				>
					/docs
				</link_1.default>{' '}
				and see the documentation.
			</p>
		</main>
	);
}
