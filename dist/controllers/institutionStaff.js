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
exports.deleteStaffAtTheInstitution = exports.getOneStaffAtTheInstitution = exports.getScheduleStaffAtTheInstitution = exports.updateStaffAtTheInstitution = exports.registerStaffAtTheInstitution = void 0;
const Response_1 = require("../class/Response");
const models_1 = require("../models");
const registerStaffAtTheInstitution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get data grom body
        const { body } = req;
        // // register new Staff at the Institution
        const staffAtTheInstitution = yield models_1.InstitutionStaff.create(body);
        // // return response message
        return res.status(201).json(new Response_1.ResponseServer(`Personal registrado correctamente en la institución`, true, staffAtTheInstitution));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al registrar personal en la institución', false, null));
    }
});
exports.registerStaffAtTheInstitution = registerStaffAtTheInstitution;
const updateStaffAtTheInstitution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get data grom body
        const { body } = req;
        const { id_institution_staff } = req.params;
        const IEStaff = yield models_1.InstitutionStaff.findOne({
            where: { id_institution_staff }
        });
        const resUpdateIEStaff = yield (IEStaff === null || IEStaff === void 0 ? void 0 : IEStaff.set(body).save());
        // // return response message
        return res.status(200).json(new Response_1.ResponseServer(`Información laboral del personal actualizada correctamente`, true, resUpdateIEStaff));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al actualizar personal en la institución', false));
    }
});
exports.updateStaffAtTheInstitution = updateStaffAtTheInstitution;
const getScheduleStaffAtTheInstitution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get data grom body
        const { id_institution_staff } = req.params;
        // register new Staff at the Institution
        const staffAtTheInstitution = yield models_1.InstitutionStaff.findOne({
            where: { id_institution_staff },
            include: [
                {
                    model: models_1.WorkScheduleInstitution
                }
            ]
        });
        // return response message
        return res.status(201).json(new Response_1.ResponseServer('Horario personal', true, staffAtTheInstitution));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener horario personal', false, null));
    }
});
exports.getScheduleStaffAtTheInstitution = getScheduleStaffAtTheInstitution;
const getOneStaffAtTheInstitution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get id card from params
        const { id_institution_staff, id_institution_shift } = req.params;
        // find one staff with id card 
        const staff = yield models_1.InstitutionStaff.findOne({
            where: { id_institution_staff, InstitutionShiftIdInstitutionShift: id_institution_shift },
            include: [
                {
                    model: models_1.Staff,
                },
                {
                    model: models_1.TypeStaff,
                },
                {
                    model: models_1.WorkScheduleInstitution,
                    include: [
                        {
                            model: models_1.WorkSchedule
                        }
                    ]
                }
            ],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        // return response menssage
        return res.status(200).json(new Response_1.ResponseServer(`Personal con Id ${id_institution_staff} en la institución obtenido`, true, staff));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener un personal', false, null));
    }
});
exports.getOneStaffAtTheInstitution = getOneStaffAtTheInstitution;
const deleteStaffAtTheInstitution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get id card from params
        const { id_institution_staff } = req.params;
        // find one staff with id card 
        const staff = yield models_1.InstitutionStaff.findByPk(id_institution_staff);
        const respStaff = staff === null || staff === void 0 ? void 0 : staff.set({ status: false }).save();
        // return response menssage
        return res.status(201).json(new Response_1.ResponseServer(`Personal con Id ${id_institution_staff} eliminado correctamente`, true, respStaff));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al eliminar personal en la institución', false, null));
    }
});
exports.deleteStaffAtTheInstitution = deleteStaffAtTheInstitution;
//# sourceMappingURL=institutionStaff.js.map