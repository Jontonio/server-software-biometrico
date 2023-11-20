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
exports.haveRole = exports.isAdminRole = void 0;
const Response_1 = require("../class/Response");
const Rol_1 = require("../models/Rol");
const isAdminRole = (req, res, next) => {
    try {
        // verify is exist user on request 
        if (!req.user) {
            return res.status(401).json(new Response_1.ResponseServer(`Error en el servidor al verificar usuario`, false, null));
        }
        // get data from user 
        const { Role, names } = req.user;
        const { role } = Role;
        // verify if user is ADMIN ROLE
        if (role != 'ADMIN_ROLE') {
            // return response message
            return res.status(401).json(new Response_1.ResponseServer(`Operación no autorizada el usuario ${names} no tiene el rol ADMIN_ROLE`, false, null));
        }
        next();
    }
    catch (e) {
        console.log(e);
        return res.status(500).json(new Response_1.ResponseServer(`Error en el servidor: ${e.message}`, false, null));
    }
};
exports.isAdminRole = isAdminRole;
const haveRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // verif if exist user authenticated on request
        if (!req.user) {
            return res.status(401).json(new Response_1.ResponseServer(`Error en el servidor al verificar usuario`, false, null));
        }
        // get all roles from db
        const dataRoles = yield Rol_1.Role.findAll({
            where: { status: true }
        });
        // get new array of the roles
        const roles = dataRoles.map((value) => value.dataValues.role);
        // verify if include role rquest on roles from db
        if (!roles.includes(req.user.Role.role)) {
            return res.status(401).json(new Response_1.ResponseServer(`Error en el servidor es necesario estos roles ${roles}`, false, null));
        }
        // continue if all is correct
        next();
    }
    catch (e) {
        console.log(e);
        return res.status(500).json(new Response_1.ResponseServer(`Error en el servidor: ${e.message}`, false, null));
    }
});
exports.haveRole = haveRole;
//# sourceMappingURL=role.middleware.js.map