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
exports.existEmail = exports.existStaff = exports.attendanceOnePersonalValidator = exports.idCardValidator = exports.idCardValidatorAPI = exports.staffValidator = void 0;
const Staff_1 = require("../models/Staff");
const express_validator_1 = require("express-validator");
const institution_staff_validation_1 = require("./institution-staff-validation");
const institution_shift_validation_copy_1 = require("./institution-shift-validation copy");
const type_staff_validation_1 = require("./type-staff-validation");
const staffValidator = () => {
    return [
        (0, express_validator_1.body)('type_id_card').not()
            .isEmpty()
            .withMessage('El tipo de documento es requerido')
            .bail()
            .isLength({ min: 3, max: 10 })
            .withMessage('El tipo de personal debe ser almenos de 3 dígitos'),
        (0, express_validator_1.body)('id_card').not()
            .isEmpty()
            .withMessage('El documento de identidad es requerido')
            .bail()
            .isLength({ min: 8, max: 20 })
            .withMessage('El documento de identidad debe ser almenos de 8 dígitos'),
        (0, express_validator_1.body)('names').not()
            .isEmpty()
            .withMessage('Los nombres del personal es requerido')
            .bail()
            .isLength({ max: 45 })
            .withMessage('Los nombres del personal debe ser como máximo de 45 carácteres'),
        (0, express_validator_1.body)('first_name').not()
            .isEmpty()
            .withMessage('El apellido paterno del personal es requerido')
            .bail()
            .isLength({ max: 45 })
            .withMessage('El apellido paterno del personal debe ser como máximo de 45 carácteres'),
        (0, express_validator_1.body)('last_name').not()
            .isEmpty()
            .withMessage('El apellido materno del personal es requerido')
            .bail()
            .isLength({ max: 45 })
            .withMessage('El apellido materno del personal debe ser como máximo de 45 carácteres'),
        (0, express_validator_1.body)('email').not()
            .isEmpty()
            .withMessage('El email del personal es requerido')
            .bail()
            .isLength({ max: 100 })
            .withMessage('El email del personal debe ser como máximo de 100 carácteres')
            .bail()
            .isEmail()
            .withMessage('El email del personal debe ser válido')
            .bail(),
        (0, express_validator_1.body)('phone_numer').optional()
            .isLength({ max: 9 })
            .withMessage('El celular del personal debe ser 9 dígitos númericos'),
        (0, express_validator_1.body)('staff_condition').not()
            .isEmpty()
            .withMessage('La condición del personal es requerido')
            .bail(),
        (0, express_validator_1.body)('working_hours').not()
            .isEmpty()
            .withMessage('La jornada laboral del personal es requerido')
            .bail()
            .isNumeric()
            .withMessage('La joranda laboral del personal deber ser númerico')
            .bail(),
        (0, express_validator_1.body)('TypeStaff').not()
            .isEmpty()
            .withMessage('El id del tipo de personal es requerido')
            .bail()
            .custom((TypeStaff) => (0, type_staff_validation_1.existIdTypeStaff)(TypeStaff))
            .bail(),
        (0, express_validator_1.body)('InstitutionShift').not()
            .isEmpty()
            .withMessage('El id de la institución en turno es requerido')
            .bail()
            .custom((InstitutionShift) => (0, institution_shift_validation_copy_1.existInstitutionIdShift)(InstitutionShift))
            .bail()
    ];
};
exports.staffValidator = staffValidator;
const idCardValidatorAPI = () => {
    return [
        (0, express_validator_1.body)('id_card').not()
            .isEmpty()
            .withMessage('El DNI es requerido')
            .bail()
            .isLength({ min: 8, max: 8 })
            .withMessage('El DNI debe ser de 8 dígitos')
    ];
};
exports.idCardValidatorAPI = idCardValidatorAPI;
const idCardValidator = () => {
    return [
        (0, express_validator_1.check)('id_card').not()
            .isEmpty()
            .withMessage("Es necesario el documento del personal")
            .bail()
            .isLength({ min: 8, max: 20 })
            .withMessage('El documento de identidad debe ser almenos de 8 dígitos y máximo de 20 dígitos')
            .bail()
        // .custom((id_card) => existStaff(id_card, false))
    ];
};
exports.idCardValidator = idCardValidator;
const attendanceOnePersonalValidator = () => {
    return [
        (0, express_validator_1.body)('id_institution_staff').not()
            .isEmpty()
            .withMessage('El id del personal en la institución es requerido')
            .bail()
            .custom(institution_staff_validation_1.existInstitutionStaff),
        (0, express_validator_1.body)('id_institution_shift').not()
            .isEmpty()
            .withMessage('El id de la institución con turno es requerido')
            .bail()
            .custom(institution_shift_validation_copy_1.existInstitutionIdShift),
        (0, express_validator_1.body)('year').not()
            .isEmpty()
            .withMessage('El parámetro año es requerido')
            .bail()
            .isNumeric()
            .withMessage('El parámetro año tiene que ser númerico'),
        (0, express_validator_1.body)('month').not()
            .isEmpty()
            .withMessage('El parámetro mes es requerido')
            .bail()
            .isNumeric()
            .withMessage('El parámetro mes tiene que ser númerico')
    ];
};
exports.attendanceOnePersonalValidator = attendanceOnePersonalValidator;
const checkBody = (req) => {
    if (Object.keys(req.body).length === 0) {
        throw new Error('El cuerpo de la solicitud está vacío');
    }
};
const existStaff = (id_card, isRegister) => __awaiter(void 0, void 0, void 0, function* () {
    const existStaff = yield Staff_1.Staff.findByPk(id_card);
    if (existStaff && isRegister) {
        throw new Error(`El personal con documento ${id_card} ya se encuentra registrado`);
    }
    if (!existStaff && !isRegister) {
        throw new Error(`El personal con documento ${id_card} no se encuentra registrado`);
    }
    return true;
});
exports.existStaff = existStaff;
const existEmail = (email, isRegister) => __awaiter(void 0, void 0, void 0, function* () {
    const existStaff = yield Staff_1.Staff.findOne({
        where: { email }
    });
    if (existStaff && isRegister) {
        throw new Error(`El personal con el email ${email} ya se encuentra registrado`);
    }
    return true;
});
exports.existEmail = existEmail;
//# sourceMappingURL=staff-validation.js.map