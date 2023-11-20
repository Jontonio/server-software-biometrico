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
exports.verifyIdWorkScheduleIE = exports.workScheduleIEValidator = void 0;
const express_validator_1 = require("express-validator");
const work_schedule_valiation_1 = require("./work-schedule-valiation");
const institution_staff_validation_1 = require("./institution-staff-validation");
const types_1 = require("../resources/types");
const models_1 = require("../models");
const workScheduleIEValidator = () => {
    return [
        (0, express_validator_1.body)('day').not()
            .isEmpty()
            .withMessage(`El dia de trabajo es requerido [${types_1.days}]`)
            .bail()
            .custom(validateDay),
        (0, express_validator_1.body)('entry_tolerance').not()
            .isNumeric()
            .withMessage(`El tiempo de tolerancia de entrada del personal tiene que ser númerico`),
        (0, express_validator_1.body)('WorkScheduleIdWorkSchedule').not()
            .isEmpty()
            .withMessage(`El Id del horario laboral es requerido`)
            .bail()
            .isNumeric()
            .withMessage(`El Id del horario laboraltiene que ser númerico`)
            .bail()
            .custom(work_schedule_valiation_1.existWorkSchedule),
        (0, express_validator_1.body)('InstitutionStaffIdInstitutionStaff').not()
            .isEmpty()
            .withMessage(`El id del personal en la institución es requerido`)
            .bail()
            .isNumeric()
            .withMessage(`El id del personal en la institucióntiene que ser númerico`)
            .bail()
            .custom(institution_staff_validation_1.existInstitutionStaff)
    ];
};
exports.workScheduleIEValidator = workScheduleIEValidator;
const verifyIdWorkScheduleIE = () => {
    return [
        (0, express_validator_1.body)('id_work_schedule_institution').not()
            .isEmpty()
            .withMessage('El id del horario de trabajo del personal es requerido')
            .bail()
            .custom(existIdWorkSchuleIE)
    ];
};
exports.verifyIdWorkScheduleIE = verifyIdWorkScheduleIE;
const existIdWorkSchuleIE = (id_work_schedule_institution) => __awaiter(void 0, void 0, void 0, function* () {
    const existIdWorkSIE = yield models_1.WorkScheduleInstitution.findOne({
        where: { id_work_schedule_institution, status: true }
    });
    if (!existIdWorkSIE) {
        throw new Error(`El id del horario de trabajo del personal no se encuentra registrado`);
    }
    return true;
});
const validateDay = (day) => {
    if (!types_1.days.includes(day)) {
        throw new Error(`El campo día laboral debe contener uno de los siguiente tipos [${types_1.days}]`);
    }
    return true;
};
//# sourceMappingURL=work-schedule-ie-valiation.js.map