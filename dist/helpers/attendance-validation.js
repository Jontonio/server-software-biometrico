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
exports.existTypeAttendance = exports.attendanceValidator = void 0;
const express_validator_1 = require("express-validator");
const TypeAttendance_1 = require("../models/TypeAttendance");
const institution_staff_validation_1 = require("./institution-staff-validation");
const attendanceValidator = () => {
    return [
        (0, express_validator_1.body)('date_time').not()
            .isEmpty()
            .withMessage('La fechaHora es requerido')
            .bail()
            .isISO8601()
            .withMessage('La fechaHora debe estar en formato ISO8601 (YYYY-MM-DDTHH:mm:ss)'),
        (0, express_validator_1.body)('status').not()
            .isEmpty()
            .withMessage('El status es requerido'),
        (0, express_validator_1.body)('punch').not()
            .isEmpty()
            .withMessage('El punch es requerido'),
        (0, express_validator_1.body)('InstitutionStaffIdInstitutionStaff').not()
            .isEmpty()
            .withMessage('El id del personal en la institución es requerido (llave foranea)')
            .bail()
            .isNumeric()
            .withMessage('El id del personal en la institución debe ser númerico (llave foranea)')
            .bail()
            .custom((InstitutionStaffIdInstitutionStaff) => (0, institution_staff_validation_1.existInstitutionStaff)(InstitutionStaffIdInstitutionStaff)),
        (0, express_validator_1.body)('TypeAttendanceIdTypeAttendance').not()
            .isEmpty()
            .withMessage('El TypeAttendanceIdTypeAttendance es requerido')
            .bail()
            .isNumeric()
            .withMessage('El id TypeAttendanceIdTypeAttendance debe ser númerico (llave foranea)')
            .bail()
            .custom(exports.existTypeAttendance)
    ];
};
exports.attendanceValidator = attendanceValidator;
const existTypeAttendance = (id_type_attendance) => __awaiter(void 0, void 0, void 0, function* () {
    const existTypeAttendance = yield TypeAttendance_1.TypeAttendance.findByPk(id_type_attendance);
    if (!existTypeAttendance) {
        throw new Error(`No se encuentra el type Attendance ${id_type_attendance} registrado`);
    }
    return true;
});
exports.existTypeAttendance = existTypeAttendance;
//# sourceMappingURL=attendance-validation.js.map