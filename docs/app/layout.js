'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = Layout;
require('./global.css');
const provider_1 = require('fumadocs-ui/provider');
const google_1 = require('next/font/google');
const inter = (0, google_1.Inter)({
	subsets: ['latin'],
});
function Layout({ children }) {
	return (
		<html lang="en" className={inter.className} suppressHydrationWarning>
			<body className="flex flex-col min-h-screen">
				<provider_1.RootProvider>{children}</provider_1.RootProvider>
			</body>
		</html>
	);
}
