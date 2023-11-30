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
exports.existInstitutionStaff = exports.checkIdInstitutionStaff = exports.institutionStaffUpdateValidator = exports.institutionStaffValidator = void 0;
const express_validator_1 = require("express-validator");
const staff_validation_1 = require("./staff-validation");
const InstitutionStaff_1 = require("../models/InstitutionStaff");
const institution_shift_validation_copy_1 = require("./institution-shift-validation copy");
const type_staff_validation_1 = require("./type-staff-validation");
const institutionStaffValidator = () => {
    return [
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
        (0, express_validator_1.body)('InstitutionShiftIdInstitutionShift').not()
            .isEmpty()
            .withMessage('El id de la institución en turno es requerido')
            .bail()
            .custom((InstitutionShiftIdInstitutionShift) => (0, institution_shift_validation_copy_1.existInstitutionIdShift)(InstitutionShiftIdInstitutionShift))
            .bail(),
        (0, express_validator_1.body)('StaffIdCard').not()
            .isEmpty()
            .withMessage('El documento de identidad es requerido')
            .bail()
            .isLength({ min: 8, max: 20 })
            .withMessage('El documento de identidad debe ser almenos de 8 dígitos')
            .custom((StaffIdCard) => (0, staff_validation_1.existStaff)(StaffIdCard, false)),
        (0, express_validator_1.body)('TypeStaffIdTypeStaff').not()
            .isEmpty()
            .withMessage('El id del tipo de personal es requerido')
            .bail()
            .custom((TypeStaff) => (0, type_staff_validation_1.existIdTypeStaff)(TypeStaff))
            .bail(),
    ];
};
exports.institutionStaffValidator = institutionStaffValidator;
const institutionStaffUpdateValidator = () => {
    return [
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
        (0, express_validator_1.body)('TypeStaffIdTypeStaff').not()
            .isEmpty()
            .withMessage('El id del tipo de personal es requerido')
            .bail()
            .custom((TypeStaff) => (0, type_staff_validation_1.existIdTypeStaff)(TypeStaff))
            .bail(),
    ];
};
exports.institutionStaffUpdateValidator = institutionStaffUpdateValidator;
const checkIdInstitutionStaff = () => {
    return [
        (0, express_validator_1.check)('id_institution_staff').not()
            .isEmpty()
            .withMessage('El id del personal en la institución es requerido.')
            .bail()
            .custom(exports.existInstitutionStaff)
    ];
};
exports.checkIdInstitutionStaff = checkIdInstitutionStaff;
const existInstitutionStaff = (id_institution_staff) => __awaiter(void 0, void 0, void 0, function* () {
    //verify if id institution staff
    if (!id_institution_staff) {
        throw new Error('Es necesario el id del personal en la institución asignada');
    }
    // get one staff at the institution
    const institutionStaff = yield InstitutionStaff_1.InstitutionStaff.findByPk(id_institution_staff);
    //verify if exist one staff at the institution
    if (!institutionStaff) {
        throw new Error('El id del personal en la institución no se encuentra registrado');
    }
    return true;
});
exports.existInstitutionStaff = existInstitutionStaff;
//# sourceMappingURL=institution-staff-validation.js.map