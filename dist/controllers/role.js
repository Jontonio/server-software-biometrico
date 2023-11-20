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
exports.getRoles = void 0;
const models_1 = require("../models");
const Response_1 = require("../class/Response");
const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // find all roles 
        const roles = yield models_1.Role.findAll({
            where: { status: true }
        });
        // return response message
        return res.status(200).json(new Response_1.ResponseServer('Lista de roles', true, roles, roles.length));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener roles', false, null));
    }
});
exports.getRoles = getRoles;
//# sourceMappingURL=role.js.map