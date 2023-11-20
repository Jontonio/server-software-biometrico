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
exports.existUsuarioByID = void 0;
const Response_1 = require("../class/Response");
const User_1 = require("../models/User");
const existUsuarioByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(500).json(new Response_1.ResponseServer('El id del usuario es necesario', false, null));
        }
        const user = yield User_1.User.findByPk(id);
        if (!user) {
            return res.status(400).json(new Response_1.ResponseServer(`Usuario con id ${id} no encontrado`, false, null));
        }
        next();
    }
    catch (e) {
        console.error(e);
        return res.status(400).json(new Response_1.ResponseServer(`Usuario no encontrado`, false, null));
    }
});
exports.existUsuarioByID = existUsuarioByID;
//# sourceMappingURL=usuario.middleware.js.map