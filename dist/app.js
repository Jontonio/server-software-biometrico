"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const ServerAPI_1 = require("./server/ServerAPI");
dotenv_1.default.config();
const server = ServerAPI_1.ServerAPI.getInstance;
server.listen();
//# sourceMappingURL=app.js.map