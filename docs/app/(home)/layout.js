"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Layout;
const home_1 = require("fumadocs-ui/layouts/home");
const layout_config_1 = require("@/app/layout.config");
function Layout({ children }) {
    return <home_1.HomeLayout {...layout_config_1.baseOptions}>{children}</home_1.HomeLayout>;
}
