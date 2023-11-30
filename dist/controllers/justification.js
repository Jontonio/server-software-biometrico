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
exports.updateStatusJustification = exports.getStatusJustifications = exports.getTypeJustifications = exports.getJustifications = exports.getOneJustification = exports.registerStatusJustification = exports.registerTypeJustification = exports.registerJustification = void 0;
const Response_1 = require("../class/Response");
const models_1 = require("../models");
const InstitutionShift_1 = require("../models/InstitutionShift");
const TypeJustification_1 = require("../models/TypeJustification");
const StatusJustification_1 = require("../models/StatusJustification");
const switchJustification_1 = require("../email/switchJustification");
const registerJustification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        //add progress justification
        const newData = Object.assign(Object.assign({}, body), { 'StatusJustificationIdStatusJustification': 1 });
        const justification = yield models_1.Justification.create(newData);
        return res.status(201).json(new Response_1.ResponseServer('Justificación registrada correctamente', true, justification));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al registrar justificación', false));
    }
});
exports.registerJustification = registerJustification;
const registerTypeJustification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const typeJustification = yield TypeJustification_1.TypeJustification.create(body);
        return res.status(201).json(new Response_1.ResponseServer('Nuevo tipo de justificación registrada correctamente', true, typeJustification));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al registrar tipo de justificación', false));
    }
});
exports.registerTypeJustification = registerTypeJustification;
const registerStatusJustification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const typeJustification = yield StatusJustification_1.StatusJustification.create(body);
        return res.status(201).json(new Response_1.ResponseServer('Nuevo estado de justificación registrada correctamente', true, typeJustification));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al registrar estado de justificación', false));
    }
});
exports.registerStatusJustification = registerStatusJustification;
const getOneJustification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_justification } = req.params;
        const justification = yield models_1.Justification.findOne({
            where: { id_justification, status: true },
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
                },
                {
                    model: TypeJustification_1.TypeJustification
                },
                {
                    model: StatusJustification_1.StatusJustification
                }
            ]
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
                },
                {
                    model: TypeJustification_1.TypeJustification
                },
                {
                    model: StatusJustification_1.StatusJustification
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
const getTypeJustifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { offset = 0, limit = 5 } = req.query;
        const typeJustifications = yield TypeJustification_1.TypeJustification.findAndCountAll({
            offset: Number(offset),
            limit: Number(limit)
        });
        return res.status(200).json(new Response_1.ResponseServer('Lista de tipo de justificaciones', true, typeJustifications));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener tipo de justificaciones', false));
    }
});
exports.getTypeJustifications = getTypeJustifications;
const getStatusJustifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { offset = 0, limit = 5 } = req.query;
        const statusJustifications = yield StatusJustification_1.StatusJustification.findAndCountAll({
            offset: Number(offset),
            limit: Number(limit)
        });
        return res.status(200).json(new Response_1.ResponseServer('Lista de estado de justificaciones', true, statusJustifications));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener estado de justificaciones', false));
    }
});
exports.getStatusJustifications = getStatusJustifications;
const updateStatusJustification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { StatusJustificationIdStatusJustification, status_justification } = req.body;
        const { id_justification } = req.params;
        const justification = yield models_1.Justification.findOne({
            where: { id_justification },
            include: [
                {
                    model: models_1.InstitutionStaff,
                    include: [
                        {
                            model: models_1.Staff
                        }
                    ]
                },
                {
                    model: TypeJustification_1.TypeJustification
                }
            ]
        });
        yield (justification === null || justification === void 0 ? void 0 : justification.set({ StatusJustificationIdStatusJustification }).save());
        // get staff information 
        yield (0, switchJustification_1.switchStatusJustificationEmail)(status_justification, justification);
        return res.status(201).json(new Response_1.ResponseServer('Estado de justificación actualizado correctamente', true, justification));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al actualizar el estado de justificación', false));
    }
});
exports.updateStatusJustification = updateStatusJustification;
//# sourceMappingURL=justification.js.map