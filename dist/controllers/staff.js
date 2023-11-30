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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDNIAPI = exports.getOneStaffWithInstitutions = exports.getListStaff = exports.getOneStaffWithAttendance = exports.getOneStaff = exports.updateStaff = exports.registerStaff = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("sequelize"));
const Response_1 = require("../class/Response");
const config_1 = require("../config/config");
const models_1 = require("../models");
const InstitutionShift_1 = require("../models/InstitutionShift");
const Shift_1 = require("../models/Shift");
const registerStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get body from request
        const { body } = req;
        const { id_card, working_hours, staff_condition, InstitutionShift, TypeStaff } = body;
        // register data
        const staff = yield models_1.Staff.create(body);
        const institutionStaff = yield models_1.InstitutionStaff.create({
            InstitutionShiftIdInstitutionShift: InstitutionShift,
            StaffIdCard: id_card,
            TypeStaffIdTypeStaff: TypeStaff,
            working_hours,
            staff_condition
        });
        return res.status(201).json(new Response_1.ResponseServer('Personal registrado correctamente', true, institutionStaff));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al registrar un personal', false, null));
    }
});
exports.registerStaff = registerStaff;
const updateStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get body from request
        const { body } = req;
        const { id_card } = req.params;
        // find one staff by id card
        const staff = yield models_1.Staff.findByPk(id_card);
        // update staff
        const resUpdateStaff = yield staff.set(body).save();
        // return response message 
        return res.status(201).json(new Response_1.ResponseServer('Datos personales actualizados correctamente', true, resUpdateStaff));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer(`Ocurrio un error al actualizar personal`, false, null));
    }
});
exports.updateStaff = updateStaff;
const getOneStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get id card from params
        const { id_card } = req.params;
        // find one staff with id card 
        const staff = yield models_1.Staff.findOne({
            where: { id_card }
        });
        if (!staff) {
            const message = `No se encontraron datos para el documento ${id_card}`;
            return res.status(200).json(new Response_1.ResponseServer(message, true, staff));
        }
        // return response menssage
        const message = `Datos obtenidos de ${staff === null || staff === void 0 ? void 0 : staff.get('names')} ${staff === null || staff === void 0 ? void 0 : staff.get('first_name')}`;
        return res.status(200).json(new Response_1.ResponseServer(message, true, staff));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener un personal', false, null));
    }
});
exports.getOneStaff = getOneStaff;
const getOneStaffWithAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get id card from params
        const { id_institution_staff, year, month, id_institution_shift } = req.body;
        // find one staff with about information
        const institutionStaff = yield models_1.InstitutionStaff.findOne({
            where: { id_institution_staff, InstitutionShiftIdInstitutionShift: id_institution_shift },
            include: [
                {
                    model: models_1.Staff
                },
                {
                    model: models_1.TypeStaff
                }
            ]
        });
        // if no exist staff at the institution  return error
        if (!institutionStaff) {
            return res.status(404).json(new Response_1.ResponseServer(`Personal con id ${id_institution_staff} en la institución no se encontró datos`, false, null));
        }
        const attendances = yield models_1.InstitutionStaff.findOne({
            where: { id_institution_staff },
            include: [
                {
                    model: models_1.Attendance,
                    where: {
                        [sequelize_1.Op.and]: [
                            sequelize_2.default.where(sequelize_2.default.fn('YEAR', sequelize_2.default.col('date_time')), year),
                            sequelize_2.default.where(sequelize_2.default.fn('MONTH', sequelize_2.default.col('date_time')), month)
                        ]
                    }
                }
            ],
        });
        const data = Object.assign(Object.assign({}, institutionStaff === null || institutionStaff === void 0 ? void 0 : institutionStaff.toJSON()), { 'Attendances': attendances ? attendances.get('Attendances') : [] });
        // return response message
        return res.status(200).json(new Response_1.ResponseServer(`Personal con id ${id_institution_staff} en la institución datos`, true, data));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener un personal', false, null));
    }
});
exports.getOneStaffWithAttendance = getOneStaffWithAttendance;
const getListStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get data from body
        const { modular_code } = req.body;
        // find all staff
        const listStaff = yield models_1.Staff.findAll({
            where: { '$Institution.modular_code$': modular_code, 'status': true },
            include: [models_1.TypeStaff, models_1.Institution, models_1.Attendance]
        });
        // return response message
        return res.status(200).json(new Response_1.ResponseServer('Lista de personal', true, listStaff, listStaff.length));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener lista de personal', false, null));
    }
});
exports.getListStaff = getListStaff;
const getOneStaffWithInstitutions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get data from body
        const { id_card, type_id_card } = req.body;
        // get one staff
        const staff = yield models_1.Staff.findOne({
            where: { id_card, type_id_card },
            include: [
                {
                    model: models_1.InstitutionStaff,
                    where: { status: true },
                    attributes: { exclude: ['createdAt', 'updatedAt', 'StaffIdCard', 'InstitutionModularCode'] },
                    include: [
                        {
                            model: InstitutionShift_1.InstitutionShift,
                            include: [
                                {
                                    model: models_1.Institution,
                                    attributes: { exclude: ['createdAt', 'updatedAt', 'address_IE', 'dependency_management'] }
                                },
                                {
                                    model: Shift_1.Shift,
                                    attributes: { exclude: ['createdAt', 'updatedAt', 'address_IE', 'dependency_management'] }
                                }
                            ],
                            attributes: { exclude: ['createdAt', 'updatedAt', 'address_IE', 'dependency_management'] }
                        }
                    ]
                }
            ],
            attributes: { exclude: ['createdAt', 'updatedAt', 'TypeStaffIdTypeStaff'] }
        });
        if (!staff) {
            return res.status(404).json(new Response_1.ResponseServer('El personal no cuenta con instituciones activas', false, null));
        }
        // return response messagem
        return res.status(200).json(new Response_1.ResponseServer('Lista de personal', true, staff));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener lista de personal', false, null));
    }
});
exports.getOneStaffWithInstitutions = getOneStaffWithInstitutions;
const searchDNIAPI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get ida card from body 
        const { id_card } = req.body;
        // get data from API
        const data = yield (yield fetch(`${config_1.globalConfig.URL_API_RENIEC}${id_card}`, {
            method: 'GET',
            headers: { 'Authorization': config_1.globalConfig.TOKEN_API_RENIEC }
        })).json();
        // verify if exist error
        if (data.error) {
            // return response message
            return res.status(404).json(new Response_1.ResponseServer('Número de DNI no se encuentra en el padrón de RENIEC', false, null));
        }
        // return response message
        return res.status(201).json(new Response_1.ResponseServer('Datos de la persona de RENIEC', true, formatData(data)));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener consulta de DNI API', false, null));
    }
});
exports.searchDNIAPI = searchDNIAPI;
const formatData = (persona) => {
    return {
        'names': persona.nombres,
        'first_name': persona.apellidoPaterno,
        'last_name': persona.apellidoMaterno,
    };
};
//# sourceMappingURL=staff.js.map