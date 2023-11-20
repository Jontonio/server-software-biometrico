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
exports.checkIdBiometric = exports.biometricValidator = void 0;
const express_validator_1 = require("express-validator");
const institution_validation_1 = require("./institution-validation");
const Biometric_1 = require("../models/Biometric");
const ipv4Pattern = /^\b(?:\d{1,3}\.){3}\d{1,3}\b$/;
const biometricValidator = () => {
    return [
        (0, express_validator_1.body)('ip_address').not()
            .isEmpty()
            .withMessage('El ip del dispositivo es requerido')
            .bail()
            .isLength({ max: 18 })
            .withMessage('El ip del disposito debe tener como máximo 18 caracteres')
            .bail()
            .custom(ipv4Validation)
            .bail(),
        (0, express_validator_1.body)('subnet_mask').not()
            .isEmpty()
            .withMessage('La máscara de subered del dispositivo es requerido')
            .bail()
            .isLength({ max: 18 })
            .withMessage('La máscara de subered del disposito debe tener como máximo 18 caracteres')
            .bail()
            .custom(ipv4Validation)
            .bail(),
        (0, express_validator_1.body)('port').not()
            .isEmpty()
            .withMessage('El puerto del dispostivo es requerido')
            .bail()
            .isNumeric()
            .withMessage('El puerto del dispositivo tiene que ser númerico')
            .bail(),
        (0, express_validator_1.body)('password').not()
            .isEmpty()
            .withMessage('El password del dispositivo es requerido')
            .bail()
            .isNumeric()
            .withMessage('El password del dispositivoes requerido')
            .bail(),
        (0, express_validator_1.body)('InstitutionModularCode').not()
            .isEmpty()
            .withMessage('El Id InstitutionModularCode de la institución es requerida (foreign key)')
            .bail()
            .custom((InstitutionModularCode) => (0, institution_validation_1.existInstitution)(InstitutionModularCode, false))
    ];
};
exports.biometricValidator = biometricValidator;
const checkIdBiometric = () => {
    return [
        (0, express_validator_1.check)('id_biometric').not()
            .isEmpty()
            .withMessage('El id del biométrico es requerido')
            .bail()
            .custom(existBiometric)
            .bail()
    ];
};
exports.checkIdBiometric = checkIdBiometric;
const existBiometric = (id_biometric) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id_biometric) {
        throw new Error('Es necesario el id del biométrico');
    }
    const biometric = yield Biometric_1.Biometric.findOne({
        where: { id_biometric }
    });
    if (!biometric) {
        throw new Error(`El biométrico con id ${id_biometric} no se encuentra registrado`);
    }
    return true;
});
const ipv4Validation = (ip_address) => {
    // match with ex with ip
    if (!ip_address.match(ipv4Pattern)) {
        throw new Error('La ip del dispositivo digita no es válida');
    }
    return true;
};
//# sourceMappingURL=biometric-validation.js.map