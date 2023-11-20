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
exports.existEmailUser = exports.existUser = exports.existIdCardUser = exports.idValidator = exports.userValidator = void 0;
const User_1 = require("../models/User");
const express_validator_1 = require("express-validator");
const role_validation_1 = require("./role-validation");
const userValidator = () => {
    return [
        (0, express_validator_1.body)('type_id_card').not()
            .isEmpty()
            .withMessage('El tipo de documento es requerido')
            .bail()
            .isLength({ min: 3, max: 10 })
            .withMessage('El tipo de personal debe ser al menos de 3 dígitos')
            .bail(),
        (0, express_validator_1.body)('id_card').not()
            .isEmpty()
            .withMessage('El documento de identidad es requerido')
            .bail()
            .isLength({ min: 8, max: 20 })
            .withMessage('El documento de identidad debe ser almenos de 8 dígitos')
            .bail()
            .custom(exports.existIdCardUser)
            .bail(),
        (0, express_validator_1.body)('names').not()
            .isEmpty()
            .withMessage('Los nombres del usuario son requeridos'),
        (0, express_validator_1.body)('full_name').not()
            .isEmpty()
            .withMessage('Los apedllidos del usuario son requeridos')
            .bail()
            .isLength({ min: 4, max: 100 }),
        (0, express_validator_1.body)('email').not()
            .isEmpty()
            .withMessage('El email del usuario es requerido')
            .bail()
            .isEmail()
            .withMessage("Email inválido del usuario")
            .bail()
            .isLength({ min: 4, max: 100 })
            .withMessage("El password deber tener mínimo 4 carácteres y máximo 100 carácteres")
            .bail()
            .custom(exports.existEmailUser)
            .bail(),
        (0, express_validator_1.body)('RoleIdRole').not()
            .isEmpty()
            .withMessage('Es necesario el id Rol (clave foranea)')
            .bail()
            .isNumeric()
            .withMessage('El RoleIdRole tiene que ser númerico')
            .bail()
            .custom(role_validation_1.existRole)
            .bail()
    ];
};
exports.userValidator = userValidator;
const idValidator = () => {
    return [
        (0, express_validator_1.check)('id_user').not()
            .isEmpty()
            .withMessage("Es necesario un id_usuario del usuario")
            .bail()
            .custom(exports.existUser)
    ];
};
exports.idValidator = idValidator;
const existIdCardUser = (id_card) => __awaiter(void 0, void 0, void 0, function* () {
    // verify if exist id card
    if (!id_card) {
        throw new Error(`El DNI del usuario es requerido`);
    }
    // find one user by id_card
    const existsUser = yield User_1.User.findOne({
        where: { id_card }
    });
    // verify if exist user 
    if (existsUser) {
        throw new Error(`El usuario con el documento de identidad ${id_card} ya se encuentra registrado`);
    }
    return true;
});
exports.existIdCardUser = existIdCardUser;
const existUser = (id_user) => __awaiter(void 0, void 0, void 0, function* () {
    // verify if exist id_user
    if (!id_user) {
        throw new Error(`El id_usuario del usuario es requerido`);
    }
    // verify if id_user is not number
    if (isNaN(id_user)) {
        throw new Error(`El id ${id_user} tiene que ser un dato numérico`);
    }
    // find one user 
    const existsUser = yield User_1.User.findByPk(id_user);
    // verify if exsit user
    if (!existsUser) {
        throw new Error(`El usuario con el id_user ${id_user} no se encuentra registrado`);
    }
    return true;
});
exports.existUser = existUser;
const existEmailUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // find one user by email
    const existsEmail = yield User_1.User.findOne({
        where: { email }
    });
    // verify if exist one user
    if (existsEmail) {
        throw new Error(`El email ${email} del usuario ya registrado`);
    }
    return true;
});
exports.existEmailUser = existEmailUser;
//# sourceMappingURL=user-validation.js.map