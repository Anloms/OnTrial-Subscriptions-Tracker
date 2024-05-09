"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const path_1 = __importDefault(require("path"));
require("./scheduledTasks/subscriptionChecker");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/dist')));
app.use('/', router_1.default);
let port = process.env.PORT;
if (port === null || port === '') {
    port = 3000;
}
else {
    port = Number(port);
    if (isNaN(port) || port < 0 || port > 65535) {
        console.error('Invalid port number, defaulting to 8000');
        port = 3000;
    }
}
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
