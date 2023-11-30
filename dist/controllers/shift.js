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
exports.deleteInstitutionShift = exports.getShifts = exports.registerShift = void 0;
const Response_1 = require("../class/Response");
const Shift_1 = require("../models/Shift");
const InstitutionShift_1 = require("../models/InstitutionShift");
const registerShift = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const shift = yield Shift_1.Shift.create(body);
        // return response message
        return res.status(201).json(new Response_1.ResponseServer('Registro de turno correctamente', true, shift));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al registrar un nuevo turno', false, null));
    }
});
exports.registerShift = registerShift;
const getShifts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { offset = 0, limit = 5 } = req.params;
        const shifts = yield Shift_1.Shift.findAndCountAll({
            where: { status: true },
            offset: Number(offset),
            limit: Number(limit),
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        // return response message
        return res.status(200).json(new Response_1.ResponseServer('Lista de turnos registrados', true, shifts));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener turnos', false));
    }
});
exports.getShifts = getShifts;
const deleteInstitutionShift = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get id_institution_shift from params
        const { id_institution_shift } = req.params;
        // find one institution shift with modular id_institution_shift
        const institution = yield InstitutionShift_1.InstitutionShift.findOne({
            where: { id_institution_shift }
        });
        // update institution
        const respInstitution = yield institution.set({ status: false }).save();
        // return message response
        return res.status(200).json(new Response_1.ResponseServer('Institución con turno eliminada correctamente', true, respInstitution));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al eliminar institución con turno', false));
    }
});
exports.deleteInstitutionShift = deleteInstitutionShift;
//# sourceMappingURL=shift.js.map