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
exports.updatePassword = exports.checkAuth = exports.login = void 0;
const Response_1 = require("../class/Response");
const helpers_1 = require("../helpers");
const Payload_1 = require("../class/Payload");
const models_1 = require("../models");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get data from body
        const { email, password } = req.body;
        // get one user
        const user = yield models_1.User.findOne({ where: { email }, include: models_1.Role });
        // verify if exist user
        if (!user) {
            return res.status(401).json(new Response_1.ResponseServer('Usuario y/o email inválido', false, null));
        }
        // verify if user is active
        if (!user.dataValues.status) {
            return res.status(401).json(new Response_1.ResponseServer('El usuario se encuentra inabilitato comuniquese con el administrador', false, null));
        }
        // compare the send password with password db
        const check = yield (0, helpers_1.comparePassword)(password, user.dataValues.password);
        // verify if the password is match
        if (!check) {
            return res.status(401).json(new Response_1.ResponseServer('Usuario y/o email inválido', false, null));
        }
        // generate data for payload
        const data = new Payload_1.Data(user.dataValues.id_user, user.dataValues.names, user.dataValues.email);
        // generate user token 
        const token = (0, helpers_1.generateToken)(data);
        // return response message
        return res.status(200).json(new Response_1.ResponseServer(`Hola ${user.dataValues.names} bienvenid@ al sistema SIREA`, true, Object.assign({ token }, data)));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error en login', false, null));
    }
});
exports.login = login;
const checkAuth = (req, res) => {
    try {
        // get authorization from headers
        const { authorization } = req.headers;
        // get data from token
        const data = (0, helpers_1.getPayloadToken)(authorization);
        // return response message
        return res.status(200).json(new Response_1.ResponseServer(`Usuario autentificado`, true, data));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error en verificar usuario autentificado', false, null));
    }
};
exports.checkAuth = checkAuth;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get authorization from headers
        const { currentPassword, newPassword } = req.body;
        const { id_user } = req.params;
        // find user by id
        const user = yield models_1.User.findOne({
            where: { id_user }
        });
        const passDB = user === null || user === void 0 ? void 0 : user.dataValues.password;
        const resCompare = yield (0, helpers_1.comparePassword)(currentPassword, passDB);
        if (!resCompare) {
            return res.status(404).json(new Response_1.ResponseServer('La contraseña actual es incorrecta, verifique nuevamente su contraseña', false, null));
        }
        const newHashPassword = (0, helpers_1.hasPassword)(newPassword);
        yield (user === null || user === void 0 ? void 0 : user.set({ password: newHashPassword }).save());
        return res.status(200).json(new Response_1.ResponseServer(`Contraseña actualizada correctamente`, true, null));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al actualizar el password', false, null));
    }
});
exports.updatePassword = updatePassword;
//# sourceMappingURL=auth.js.map