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
exports.existInstitutionStaff = exports.checkIdInstitutionStaff = exports.institutionStaffValidator = void 0;
const express_validator_1 = require("express-validator");
const institution_validation_1 = require("./institution-validation");
const staff_validation_1 = require("./staff-validation");
const InstitutionStaff_1 = require("../models/InstitutionStaff");
const institutionStaffValidator = () => {
    return [
        (0, express_validator_1.body)('InstitutionModularCode').not()
            .isEmpty()
            .withMessage('El código modular de la institución es requerido')
            .bail()
            .custom((InstitutionModularCode) => (0, institution_validation_1.existInstitution)(InstitutionModularCode, false)),
        (0, express_validator_1.body)('StaffIdCard').not()
            .isEmpty()
            .withMessage('El documento de identidad del personal es requerido')
            .bail()
            .custom((StaffIdCard) => (0, staff_validation_1.existStaff)(StaffIdCard, false))
    ];
};
exports.institutionStaffValidator = institutionStaffValidator;
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