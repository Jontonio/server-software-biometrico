"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPayloadToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload, secretKeyToken, expiresIn) => {
    return jsonwebtoken_1.default.sign({ data: payload }, secretKeyToken, { expiresIn: expiresIn });
};
exports.generateToken = generateToken;
const getPayloadToken = (token, secretKeyToken) => {
    return jsonwebtoken_1.default.verify(token, secretKeyToken);
};
exports.getPayloadToken = getPayloadToken;
//# sourceMappingURL=token.js.map