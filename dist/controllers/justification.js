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
exports.getOneTypeJustification = exports.updateStatusJustification = exports.getStatusJustifications = exports.getTypeJustifications = exports.getJustifications = exports.getOneJustification = exports.registerStatusJustification = exports.registerTypeJustification = exports.registerJustification = void 0;
const Response_1 = require("../class/Response");
const models_1 = require("../models");
const InstitutionShift_1 = require("../models/InstitutionShift");
const TypeJustification_1 = require("../models/TypeJustification");
const StatusJustification_1 = require("../models/StatusJustification");
const switchJustification_1 = require("../email/switchJustification");
const ServerAPI_1 = require("../server/ServerAPI");
const Notification_1 = require("../class/Notification");
const institutionStaff_1 = require("./institutionStaff");
const moment_1 = __importDefault(require("moment"));
const notification = Notification_1.Notification.getInstance;
const registerJustification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const { InstitutionStaffIdInstitutionStaff, TypeJustificationIdTypeJustification } = body;
        //add progress justification
        const newData = Object.assign(Object.assign({}, body), { 'StatusJustificationIdStatusJustification': 1 });
        const justification = yield models_1.Justification.create(newData);
        const ieStaff = yield (0, institutionStaff_1.getOneInsitutionStaff)(InstitutionStaffIdInstitutionStaff);
        const staff = ieStaff === null || ieStaff === void 0 ? void 0 : ieStaff.get('Staff');
        const typeJustification = yield (0, exports.getOneTypeJustification)(TypeJustificationIdTypeJustification);
        notification.addJustifyNotification({
            id: Number(justification.get('id_justification')),
            msg: `${staff.names} registro una justificación de tipo ${typeJustification === null || typeJustification === void 0 ? void 0 : typeJustification.get('type_justification')}`,
            tableName: 'Justification',
            isRouting: true,
            time: (0, moment_1.default)().format('llll'),
            isRead: false
        });
        // Envía datos a los clientes conectados
        const server = ServerAPI_1.ServerAPI.getInstance;
        server.io.emit('addNewNotification', notification.getInfoNotification());
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
        const { offset = 0, limit = 5, id_status_justification = 1 } = req.query;
        const justifications = yield models_1.Justification.findAndCountAll({
            where: { StatusJustificationIdStatusJustification: id_status_justification },
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
const getOneTypeJustification = (id_type_justification) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const typeJustification = yield TypeJustification_1.TypeJustification.findOne({
            where: { id_type_justification },
            attributes: ['id_type_justification', 'type_justification']
        });
        return typeJustification;
    }
    catch (e) {
        throw new Error(`Error al obtener una tipo de justificación con id ${id_type_justification}`);
    }
});
exports.getOneTypeJustification = getOneTypeJustification;
//# sourceMappingURL=justification.js.map