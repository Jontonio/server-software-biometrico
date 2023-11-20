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
exports.existInstitution = exports.codModularExistListJSON = exports.modularCodeValidator = exports.InstitutionValidator = void 0;
const Institution_1 = require("../models/Institution");
const express_validator_1 = require("express-validator");
const shift_validation_1 = require("./shift-validation");
const InstitutionValidator = () => {
    return [
        (0, express_validator_1.body)('modular_code').not()
            .isEmpty()
            .withMessage('El código modular es requerido')
            .bail()
            .isLength({ min: 7, max: 7 })
            .withMessage('El código modular de la institución tiene que ser de 7 dígitos')
            .bail()
            .isNumeric()
            .withMessage('El código modular debe ser númerico')
            .bail(),
        (0, express_validator_1.body)('name_IE').not()
            .isEmpty()
            .withMessage('El nombre de la institución es requerido')
            .bail()
            .isLength({ min: 3, max: 45 })
            .withMessage("El nombre de la institución debe tener mínimo 4 carácteres y máximo 45 carácteres"),
        (0, express_validator_1.body)('level_modality').not()
            .isEmpty()
            .withMessage('El nivel-modalidad de la institución es requerido')
            .bail()
            .isLength({ min: 4, max: 45 })
            .withMessage("El nivel-modalidad de la institución debe tener mínimo 4 carácteres y máximo 45 carácteres"),
        (0, express_validator_1.body)('dependency_management').not()
            .isEmpty()
            .withMessage('La dependency_management de la institución es requerido')
            .bail()
            .isLength({ min: 4, max: 45 })
            .withMessage("El nivel-modalidad de la institución debe tener mínimo 4 carácteres y máximo 45 carácteres"),
        (0, express_validator_1.body)('address_IE').not()
            .isEmpty()
            .withMessage('La dirección de de la institución es requerido')
            .bail()
            .isLength({ min: 4, max: 45 })
            .withMessage("El nivel-modalidad de la institución debe tener mínimo 4 carácteres y máximo 45 carácteres")
            .bail(),
        (0, express_validator_1.body)('shift').not()
            .isEmpty()
            .withMessage('El turno al que pertenece la institución es requerido')
            .bail()
            .isLength({ max: 45 })
            .withMessage("El tunro de la institución debe tener como máximo 45 carácteres")
            .bail()
            .custom((shift) => (0, shift_validation_1.existIdShift)(shift))
    ];
};
exports.InstitutionValidator = InstitutionValidator;
const modularCodeValidator = () => {
    return [
        (0, express_validator_1.check)('modular_code').not()
            .isEmpty()
            .withMessage("Es necesario el código modular de la institución")
            .bail()
            .custom((modular_code) => (0, exports.existInstitution)(modular_code, false))
    ];
};
exports.modularCodeValidator = modularCodeValidator;
const codModularExistListJSON = () => {
    return [
        (0, express_validator_1.check)('modular_code').not()
            .isEmpty()
            .withMessage('El código modular es requerido')
            .bail()
            .isLength({ min: 7, max: 7 })
            .withMessage('El código modular de la institución tiene que ser de 7 dígitos')
            .bail()
            .isNumeric()
            .withMessage('El código modular debe ser númerico')
    ];
};
exports.codModularExistListJSON = codModularExistListJSON;
const existInstitution = (modular_code, isCreated = true) => __awaiter(void 0, void 0, void 0, function* () {
    if (!modular_code) {
        throw new Error(`El código modular de la institución es requerido`);
    }
    const existsInstitution = yield Institution_1.Institution.findOne({
        where: { modular_code }
    });
    if (existsInstitution && isCreated) {
        throw new Error(`El código modular de la institucion ${modular_code} ya se encuentra registrado`);
    }
    if (!existsInstitution && !isCreated) {
        throw new Error(`La institución con código modular ${modular_code} no se encuentra registrado `);
    }
});
exports.existInstitution = existInstitution;
//# sourceMappingURL=institution-validation.js.map