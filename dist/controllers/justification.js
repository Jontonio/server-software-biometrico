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
exports.getJustifications = exports.getOneJustification = exports.registerJustification = void 0;
const Response_1 = require("../class/Response");
const models_1 = require("../models");
const InstitutionShift_1 = require("../models/InstitutionShift");
const registerJustification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const justification = yield models_1.Justification.create(body);
        return res.status(200).json(new Response_1.ResponseServer('Justificación registrada correctamente', true, justification));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al registrar justificación', false));
    }
});
exports.registerJustification = registerJustification;
const getOneJustification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_justification } = req.params;
        const justification = yield models_1.Justification.findOne({
            where: { id_justification, status: true }
        });
        return res.status(200).json(new Response_1.ResponseServer('Justificación', true, justification));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener justificación', false));
    }
});
exports.getOneJustification = getOneJustification;
const getJustifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { offset = 0, limit = 5 } = req.query;
        const justifications = yield models_1.Justification.findAndCountAll({
            include: [
                {
                    model: models_1.InstitutionStaff,
                    include: [
                        {
                            model: models_1.Staff,
                            attributes: { exclude: ['createdAt', 'updatedAt'] }
                        },
                        {
                            model: models_1.TypeStaff,
                            attributes: { exclude: ['createdAt', 'updatedAt'] }
                        },
                        {
                            model: InstitutionShift_1.InstitutionShift,
                            include: [
                                {
                                    model: models_1.Institution
                                }
                            ],
                            attributes: { exclude: ['createdAt', 'updatedAt'] }
                        }
                    ],
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ],
            offset: Number(offset),
            limit: Number(limit)
        });
        return res.status(200).json(new Response_1.ResponseServer('Lista de justificaciones', true, justifications));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener justificaciones', false));
    }
});
exports.getJustifications = getJustifications;
//# sourceMappingURL=justification.js.map