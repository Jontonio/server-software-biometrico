"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const Response_1 = require("../class/Response");
const User_1 = require("../models/User");
const Rol_1 = require("../models/Rol");
const helpers_1 = require("../helpers");
const validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get authorization from header
        const { authorization } = req.headers;
        // verify if exist one authorization
        if (!authorization) {
            return res.status(401).json(new Response_1.ResponseServer('Acceso no autorizado, necesario la autorización para realizar acciones en el sistema', false, null));
        }
        // get data from payload
        const result = (0, helpers_1.getPayloadToken)(String(authorization));
        const { data } = result;
        // verify if exist one use with id
        const user = yield User_1.User.findOne({
            where: { 'id_user': data.id_user },
            include: [Rol_1.Role],
            attributes: { exclude: ['password'] }
        });
        // verify if not exist user
        if (!user) {
            return res.status(401).json(new Response_1.ResponseServer('Acceso no autorizado, necesario la autorización para realizar acciones en el sistema', false, null));
        }
        req.user = user;
        next();
    }
    catch (e) {
        console.error(e.status);
        return res.status(500).json(new Response_1.ResponseServer(`Error de autorización: ${e.message}`, false, null));
    }
});
exports.validateJWT = validateJWT;
//# sourceMappingURL=jwt.middleware.js.map