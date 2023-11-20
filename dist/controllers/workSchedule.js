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
exports.getWorkSchedule = exports.registerWorkSchedule = void 0;
const Response_1 = require("../class/Response");
const models_1 = require("../models");
const registerWorkSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get data grom body
        const { body } = req;
        // register new work schedule
        const workSchedule = yield models_1.WorkSchedule.create(body);
        // return response message
        return res.status(201).json(new Response_1.ResponseServer('Horario laboral registrado correctamente', true, workSchedule));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al registrar horario laboral', false, null));
    }
});
exports.registerWorkSchedule = registerWorkSchedule;
const getWorkSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // register new work schedule
        const listWorkSchedule = yield models_1.WorkSchedule.findAll({
            where: { status: true }
        });
        const countWorkSchedule = yield models_1.WorkSchedule.count({
            where: { status: true }
        });
        // return response message
        return res.status(200).json(new Response_1.ResponseServer('Listas de horario laboral registrados', true, listWorkSchedule, countWorkSchedule));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener lista de horario laboral', false, null));
    }
});
exports.getWorkSchedule = getWorkSchedule;
//# sourceMappingURL=workSchedule.js.map