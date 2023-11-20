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
exports.deleteWorkScheduleIE = exports.updateWorkScheduleIE = exports.registerWorkScheduleIE = void 0;
const Response_1 = require("../class/Response");
const models_1 = require("../models");
const registerWorkScheduleIE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get data grom body
        const { body } = req;
        // register new work schedule institution
        const workScheduleIE = yield models_1.WorkScheduleInstitution.create(body);
        // return response message
        return res.status(201).json(new Response_1.ResponseServer('Horario laboral del personal en la institución registado correctamente', true, workScheduleIE));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al registrar horario laboral del personal en la institución ', false, null));
    }
});
exports.registerWorkScheduleIE = registerWorkScheduleIE;
const updateWorkScheduleIE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get data grom body
        const { id_work_schedule_institution } = req.params;
        const { body } = req;
        // register new work schedule institution
        const workScheduleIE = yield models_1.WorkScheduleInstitution.findOne({
            where: { id_work_schedule_institution, status: true }
        });
        const respUpdate = yield (workScheduleIE === null || workScheduleIE === void 0 ? void 0 : workScheduleIE.set(body).save());
        // return response message
        return res.status(200).json(new Response_1.ResponseServer('Horario laboral del personal en la institución actualizado correctamente', true, respUpdate));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al actualizar el horario laboral del personal en la institución ', false, null));
    }
});
exports.updateWorkScheduleIE = updateWorkScheduleIE;
const deleteWorkScheduleIE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get data grom body
        const { id_work_schedule_institution } = req.params;
        // register new work schedule institution
        const workScheduleIE = yield models_1.WorkScheduleInstitution.findOne({
            where: { id_work_schedule_institution, status: true }
        });
        const respDelete = yield (workScheduleIE === null || workScheduleIE === void 0 ? void 0 : workScheduleIE.set({ status: false }).save());
        // return response message
        return res.status(200).json(new Response_1.ResponseServer('Horario laboral del personal en la institución eliminado correctamente', true, respDelete));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al eliminar el horario laboral del personal en la institución ', false, null));
    }
});
exports.deleteWorkScheduleIE = deleteWorkScheduleIE;
//# sourceMappingURL=workScheduleIE.js.map