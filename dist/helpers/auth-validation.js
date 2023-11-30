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
exports.verifyExistIdUser = exports.validateChangePassword = exports.authValidatorChangePassword = exports.htmlValidator = exports.emailValidator = exports.authValidator = void 0;
const express_validator_1 = require("express-validator");
const models_1 = require("../models");
const patterPassword = /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9#$%@!]*$/;
const authValidator = () => {
    return [
        (0, express_validator_1.body)('email').not()
            .isEmpty()
            .withMessage('El email es un campo requerido')
            .bail()
            .isEmail()
            .withMessage("Email inválido"),
        (0, express_validator_1.body)('password').not()
            .isEmpty()
            .withMessage('El password es un campo requerido')
    ];
};
exports.authValidator = authValidator;
const emailValidator = () => {
    return [
        (0, express_validator_1.body)('email').not()
            .isEmpty()
            .withMessage('El email es un campo requerido')
            .bail()
            .isEmail()
            .withMessage("El email digitado es inválido")
    ];
};
exports.emailValidator = emailValidator;
const htmlValidator = () => {
    return [
        (0, express_validator_1.body)('html').not()
            .isEmpty()
            .withMessage('El campo texto a enviar es un campo requerido')
            .bail()
    ];
};
exports.htmlValidator = htmlValidator;
const authValidatorChangePassword = () => {
    return [
        (0, express_validator_1.body)('currentPassword').not()
            .isEmpty()
            .withMessage('La contraseña actual es requerida')
            .bail(),
        (0, express_validator_1.body)('confirmPassword').not()
            .isEmpty()
            .withMessage('La contraseña de confirmación es requerida')
            .bail()
            .custom((confirmPassword) => validatePassword(confirmPassword)),
        (0, express_validator_1.body)('newPassword').not()
            .isEmpty()
            .withMessage('La contraseña nueva es requerida')
            .custom((newPassword) => validatePassword(newPassword)),
    ];
};
exports.authValidatorChangePassword = authValidatorChangePassword;
const validateChangePassword = () => {
    return [
        (0, express_validator_1.body)('confirmPassword').not()
            .isEmpty()
            .withMessage('La contraseña de confirmación es requerida')
            .bail()
            .custom((confirmPassword) => validatePassword(confirmPassword)),
        (0, express_validator_1.body)('newPassword').not()
            .isEmpty()
            .withMessage('La contraseña nueva es requerida')
            .bail()
            .custom((newPassword) => validatePassword(newPassword)),
        (0, express_validator_1.body)('credentials').not()
            .isEmpty()
            .withMessage('Las credenciales de verificación es requerida')
    ];
};
exports.validateChangePassword = validateChangePassword;
const verifyExistIdUser = () => {
    return [
        (0, express_validator_1.check)('id_user').not()
            .isEmpty()
            .withMessage('El id del usuario es requerido')
            .bail()
            .custom(existIdUser)
    ];
};
exports.verifyExistIdUser = verifyExistIdUser;
const validatePassword = (pass) => {
    if (!pass.match(patterPassword)) {
        throw new Error('Las contraseñas no cumples los requisitos de contraseña segura');
    }
    return true;
};
const existIdUser = (id_user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id_user) {
        throw new Error('El id del usuario es requerido');
    }
    const existUser = yield models_1.User.findOne({
        where: { id_user, status: true }
    });
    if (!existUser) {
        throw new Error(`El usuario con id ${id_user} no se encuentra registrado en el sistema`);
    }
    return true;
});
//# sourceMappingURL=auth-validation.js.map