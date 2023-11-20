"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPayloadToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign({ data: payload }, config_1.globalConfig.SECRET_KET_TOKEN, { expiresIn: '12h' });
};
exports.generateToken = generateToken;
const getPayloadToken = (token) => {
    return jsonwebtoken_1.default.verify(token, config_1.globalConfig.SECRET_KET_TOKEN);
};
exports.getPayloadToken = getPayloadToken;
//# sourceMappingURL=token.js.map