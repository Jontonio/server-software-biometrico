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
exports.getDetailedReport = exports.getReporteDetallado = exports.counterInformation = void 0;
const Response_1 = require("../class/Response");
const reports_1 = require("../utils/reports");
const conexion_1 = __importDefault(require("../db/conexion"));
const sequelize_1 = require("sequelize");
const query_1 = require("../utils/query");
const InstitutionShift_1 = require("../models/InstitutionShift");
const models_1 = require("../models");
const Shift_1 = require("../models/Shift");
const generateDias_1 = require("../utils/generateDias");
const moment_1 = __importDefault(require("moment"));
const counterInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = [];
        // get information from intitution
        const dataIE = {
            "label": "Institución",
            "countActives": yield (0, reports_1.countInstitution)(true),
            "countInactives": yield (0, reports_1.countInstitution)(false),
            "name": "building",
            "color": "blue"
        };
        // get information from biometric
        const dataBiometric = {
            "label": "Biométrico",
            "countActives": yield (0, reports_1.countBiometrico)(true),
            "countInactives": yield (0, reports_1.countBiometrico)(false),
            "name": "tablet",
            "color": "green"
        };
        // get information from staff
        const dataStaff = {
            "label": "Personal",
            "countActives": yield (0, reports_1.countStaff)(true),
            "countInactives": yield (0, reports_1.countStaff)(false),
            "name": "briefcase",
            "color": "orange",
        };
        // get information from staff
        const dataJustification = {
            "label": "Justificación",
            "countActives": yield (0, reports_1.countJustification)(true),
            "countInactives": yield (0, reports_1.countJustification)(false),
            "name": "folder",
            "color": "indigo",
        };
        list.push(dataIE, dataBiometric, dataStaff, dataJustification);
        // return response message
        return res.status(200).json(new Response_1.ResponseServer('Información registrada en el sistema SIREA', true, list));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener información de counter report', false, null));
    }
});
exports.counterInformation = counterInformation;
const getReporteDetallado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { year, month, id_institution_shift } = req.body;
        const resultado = yield conexion_1.default.query('CALL reporteDetallado(:anio, :mes, :id_institution_shift)', {
            replacements: {
                anio: year,
                mes: month,
                id_institution_shift: id_institution_shift
            },
            type: sequelize_1.QueryTypes.RAW,
        });
        // return response message
        return res.status(200).json(new Response_1.ResponseServer(`Reporte detallado del mes ${month} del año ${year}`, true, resultado));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener reporte detallado', false, null));
    }
});
exports.getReporteDetallado = getReporteDetallado;
const getDetailedReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { year, month, id_institution_shift } = req.body;
        const institutionShift = yield InstitutionShift_1.InstitutionShift.findOne({
            where: { id_institution_shift },
            include: [
                {
                    model: models_1.InstitutionStaff,
                    where: { status: true },
                    include: [
                        {
                            model: models_1.Staff,
                            attributes: { exclude: ['createdAt', 'updatedAt'] }
                        },
                        {
                            model: models_1.TypeStaff,
                            attributes: { exclude: ['createdAt', 'updatedAt'] }
                        }
                    ],
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
                {
                    model: models_1.Institution,
                    where: { status: true },
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                },
                {
                    model: Shift_1.Shift,
                    where: { status: true },
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ]
        });
        //TODO: require
        const idInstitutionShift = institutionShift === null || institutionShift === void 0 ? void 0 : institutionShift.get('id_institution_shift');
        const institution = institutionShift === null || institutionShift === void 0 ? void 0 : institutionShift.get('Institution');
        const shift = institutionShift === null || institutionShift === void 0 ? void 0 : institutionShift.get('Shift');
        const listStaffAtTheInstition = institutionShift === null || institutionShift === void 0 ? void 0 : institutionShift.get('InstitutionStaffs');
        const listStaffReports = [];
        const daysToMonth = (0, generateDias_1.getDaysToMonth)(year, month);
        for (const staff of listStaffAtTheInstition) {
            const id_institution_staff = staff === null || staff === void 0 ? void 0 : staff.get('id_institution_staff');
            const reportStaff = staff === null || staff === void 0 ? void 0 : staff.get('Staff');
            const reportConditionStaff = staff === null || staff === void 0 ? void 0 : staff.get('staff_condition');
            const reportWorkingHoursStaff = staff === null || staff === void 0 ? void 0 : staff.get('working_hours');
            const reportTypeStaff = staff === null || staff === void 0 ? void 0 : staff.get('TypeStaff');
            const resAttendances = yield (0, query_1.getDetailAttendances)(idInstitutionShift, id_institution_staff, year, month);
            const daysToMonthAttendances = [...daysToMonth];
            const reportsAttendances = daysToMonthAttendances.map((day) => {
                const attendance = resAttendances.find((t) => t.day === day.dayNumber);
                if (attendance) {
                    return Object.assign(Object.assign({}, day), { statusAttendance: attendance.statusAttendance, date_time: attendance.date_time });
                }
                else {
                    return Object.assign(Object.assign({}, day), { statusAttendance: null, date_time: null });
                }
            });
            const data = {
                reportStaff,
                reportTypeStaff,
                reportConditionStaff,
                reportWorkingHoursStaff,
                reportsAttendances
            };
            listStaffReports.push(data);
        }
        const dataReprot = {
            daysToMonth,
            date: (0, moment_1.default)().format('DD/MM/YYYY'),
            month: (0, moment_1.default)().month(month - 1).format('MMMM').toUpperCase(),
            year,
            institution,
            shift,
            listStaffReports
        };
        // return response message
        return res.status(200).json(new Response_1.ResponseServer(`Reporte detallado del mes ${month} del año ${year}`, true, dataReprot));
    }
    catch (e) {
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener reporte detallado', false, null));
    }
});
exports.getDetailedReport = getDetailedReport;
//# sourceMappingURL=report.js.map