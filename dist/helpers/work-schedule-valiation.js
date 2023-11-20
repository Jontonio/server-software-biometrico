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
exports.existWorkSchedule = exports.checkIdWorkSchedule = exports.workScheduleValidator = void 0;
const express_validator_1 = require("express-validator");
const WorkSchedule_1 = require("../models/WorkSchedule");
const workScheduleValidator = () => {
    return [
        (0, express_validator_1.body)('arrival_time').not()
            .isEmpty()
            .withMessage('La hora de estrada de trabajo es requerido formato (HH:MM:SS)')
            .bail()
            .custom((arrival_time) => validateTime(arrival_time)),
        (0, express_validator_1.body)('departure_time').not()
            .isEmpty()
            .withMessage('La hora de salida de trabajo es requerido formato (HH:MM:SS)')
            .bail()
            .custom((departure_time) => validateTime(departure_time))
    ];
};
exports.workScheduleValidator = workScheduleValidator;
const checkIdWorkSchedule = () => {
    return [
        (0, express_validator_1.check)('id_work_schedule').not()
            .isEmpty()
            .withMessage('El id de horario laboral es requerido')
            .bail()
            .custom(exports.existWorkSchedule)
    ];
};
exports.checkIdWorkSchedule = checkIdWorkSchedule;
const validateTime = (time) => {
    // Use a regular expression to check if the input is a valid time format
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
    if (!timeRegex.test(time)) {
        throw new Error('Formato inválido de tiempo. Usar el siguiente formato HH:MM o HH:MM:SS.');
    }
    return true;
};
const existWorkSchedule = (id_work_schedule) => __awaiter(void 0, void 0, void 0, function* () {
    //verify if id work schedule is no empty 
    if (!id_work_schedule) {
        throw new Error('Es necesario el id del horario laboral de trabajo');
    }
    // get one work schedule 
    const workSchedule = yield WorkSchedule_1.WorkSchedule.findByPk(id_work_schedule);
    //verify if exist one work schedule
    if (!workSchedule) {
        throw new Error('El id del horario laboral de trabajo no se encuentra registrado');
    }
    return true;
});
exports.existWorkSchedule = existWorkSchedule;
//# sourceMappingURL=work-schedule-valiation.js.map