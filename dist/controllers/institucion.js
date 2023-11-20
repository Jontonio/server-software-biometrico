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
exports.getOneResourceInstitution = exports.getOneInstitutionWithStaff = exports.deleteInstitution = exports.registerInstitution = exports.updateInstitution = exports.getOneInstitutionWithShift = exports.getOneInstitution = exports.getInstitutions = void 0;
const Response_1 = require("../class/Response");
const dataInstituciones_1 = require("../resources/dataInstituciones");
const models_1 = require("../models");
const InstitutionShift_1 = require("../models/InstitutionShift");
const Shift_1 = require("../models/Shift");
const getInstitutions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { offset = 0, limit = 5 } = req.query;
        // get list institutions  
        const institutions = yield models_1.Institution.findAll({
            where: { status: true },
            include: [
                {
                    model: InstitutionShift_1.InstitutionShift,
                    include: [
                        {
                            model: Shift_1.Shift,
                            attributes: { exclude: ['createdAt', 'updatedAt'] },
                        }
                    ],
                    order: [[InstitutionShift_1.InstitutionShift, 'createdAt', 'DESC']],
                },
            ],
            attributes: { exclude: ['updatedAt'] },
            offset: Number(offset),
            limit: Number(limit),
            order: [['createdAt', 'DESC']],
        });
        // return response message
        return res.status(200).json(new Response_1.ResponseServer('Lista de instituciones', true, institutions, institutions.length));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener instituciones', false, null));
    }
});
exports.getInstitutions = getInstitutions;
const getOneInstitution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get modular code from institution
        const { modular_code } = req.params;
        // find one institution with modular code
        const institution = yield models_1.Institution.findOne({
            where: { modular_code },
            include: [
                {
                    model: InstitutionShift_1.InstitutionShift,
                    include: [
                        {
                            model: Shift_1.Shift
                        }
                    ]
                }
            ]
        });
        return res.status(200).json(new Response_1.ResponseServer('Obtener una institución', true, institution));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener una institución', false, null));
    }
});
exports.getOneInstitution = getOneInstitution;
const getOneInstitutionWithShift = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get modular code from institution
        const { id_institution_shift } = req.params;
        // find one institution with modular code
        const institutionShift = yield InstitutionShift_1.InstitutionShift.findOne({
            where: { id_institution_shift },
            include: [
                {
                    model: Shift_1.Shift,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                },
                {
                    model: models_1.Institution,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        return res.status(200).json(new Response_1.ResponseServer('Obtener una institución con turno', true, institutionShift));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener una institución con turno', false, null));
    }
});
exports.getOneInstitutionWithShift = getOneInstitutionWithShift;
const updateInstitution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get modular code from params
        const { modular_code } = req.params;
        const { body } = req;
        // find one intitution with modular code
        const institution = yield models_1.Institution.findOne({
            where: { modular_code }
        });
        // update institution
        const respInstitution = yield institution.set(body).save();
        const institutionShift = yield models_1.Institution.findOne({
            where: { modular_code },
            include: [
                {
                    model: InstitutionShift_1.InstitutionShift,
                    where: { ShiftIdShift: body.shift }
                }
            ]
        });
        //TODO:pendiente actualización de datos
        // if(!institutionShift){
        //     const id_institution_shift = body.shift;
        //     const IEShift = await InstitutionShift.findByPk(id_institution_shift);
        //     IEShift?.set({ShiftIdShift: })
        // }
        // return response message
        return res.status(200).json(new Response_1.ResponseServer('Institución actualizada correctamente', true, respInstitution));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al actualizar la institución', false, null));
    }
});
exports.updateInstitution = updateInstitution;
const registerInstitution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get body data from request
        const { body } = req;
        const { modular_code, shift } = body;
        const existInstitution = yield models_1.Institution.findByPk(modular_code);
        // verif if exist institution, if exist create
        if (!existInstitution) {
            yield models_1.Institution.create(body);
        }
        // register new institution shift
        const resInstitutionShift = yield InstitutionShift_1.InstitutionShift.create({ ShiftIdShift: shift, InstitutionModularCode: modular_code });
        return res.status(201).json(new Response_1.ResponseServer('Institución registrada correctamente', true, resInstitutionShift));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al registrar institución', false, null));
    }
});
exports.registerInstitution = registerInstitution;
const deleteInstitution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get modular code from params
        const { modular_code } = req.params;
        // find one institution with modular code
        const institution = yield models_1.Institution.findOne({
            where: { modular_code }
        });
        // update institution
        const respInstitution = yield institution.set({ status: false }).save();
        // return message response
        return res.status(201).json(new Response_1.ResponseServer('Institución eliminada correctamente', true, respInstitution));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al eliminar institución', false, null));
    }
});
exports.deleteInstitution = deleteInstitution;
const getOneInstitutionWithStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { offset = 0, limit = 5 } = req.query;
        // get modular code from params
        const { id_institution_shift } = req.params;
        // find one institution with modular code
        const institutionWithStaff = yield models_1.InstitutionStaff.findAndCountAll({
            where: { InstitutionShiftIdInstitutionShift: id_institution_shift },
            include: [
                {
                    model: models_1.Staff,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                },
                {
                    model: models_1.WorkScheduleInstitution,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                },
                {
                    model: models_1.TypeStaff,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ],
            distinct: true,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            offset: Number(offset),
            limit: Number(limit)
        });
        return res.status(200).json(new Response_1.ResponseServer('Obtener institución con personal', true, institutionWithStaff));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener una institución', false, null));
    }
});
exports.getOneInstitutionWithStaff = getOneInstitutionWithStaff;
const getOneResourceInstitution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get modular code from params
        const { modular_code } = req.params;
        // filter from specific modular code
        const resp = dataInstituciones_1.institutionData.filter((institucion) => institucion.modular_code == modular_code);
        // verify resp size 
        if (resp.length == 0) {
            // return response message
            return res.status(200).json(new Response_1.ResponseServer(`No se encontro a la institución con código modular ${modular_code}`, false, resp ? Object.assign({}, resp) : null));
        }
        // return response message
        return res.status(200).json(new Response_1.ResponseServer(`Institución con código modular ${modular_code}`, true, Object.assign({}, resp[0])));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener insituciones', false, null));
    }
});
exports.getOneResourceInstitution = getOneResourceInstitution;
//# sourceMappingURL=institucion.js.map