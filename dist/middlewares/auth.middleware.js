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
exports.comparePassword = exports.passwordPatternValidation = exports.existIdUser = void 0;
const models_1 = require("../models");
const Response_1 = require("../class/Response");
const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9#$%@!]*$/;
const existIdUser = (id_user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id_user) {
        throw new Error('Es necesario el Id del usuario');
    }
    const user = yield models_1.User.findOne({
        where: { id_user, status: true }
    });
    if (!user) {
        throw new Error(`El usuario con Id ${id_user} no se encuentra registrado en el sistema`);
    }
    return true;
});
exports.existIdUser = existIdUser;
const passwordPatternValidation = (password) => {
    // match with ex with pattern password
    if (!password.match(passwordPattern)) {
        throw new Error('La contraseñas nuevas no cumplen con los requisitos de contraseña segura');
    }
    return true;
};
exports.passwordPatternValidation = passwordPatternValidation;
const comparePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
        return res.status(400).json(new Response_1.ResponseServer(`Las contraseñas nuevas no coinciden, verifique nuevamente`, false, null));
    }
    next();
});
exports.comparePassword = comparePassword;
//# sourceMappingURL=auth.middleware.js.map