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
exports.searchInformation = void 0;
const Response_1 = require("../class/Response");
const models_1 = require("../models");
const sequelize_1 = require("sequelize");
const InstitutionShift_1 = require("../models/InstitutionShift");
const Shift_1 = require("../models/Shift");
const permitionsTables = [
    'institution',
    'staff-at-the-institution',
    'user'
];
const searchInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { table, term } = req.params;
        if (!permitionsTables.includes(table)) {
            return res.status(404).json(new Response_1.ResponseServer(`La tabla ${table} no están permitidas para las busquedas`, true));
        }
        switch (table) {
            case 'institution':
                yield searchInstitution(term, req, res);
                break;
            case 'staff-at-the-institution':
                yield searchStaffAtTheInstitution(term, req, res);
                break;
            default:
                break;
        }
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al subir archivo', false));
    }
});
exports.searchInformation = searchInformation;
const searchInstitution = (term, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { offset = 0, limit = 5 } = req.query;
    const institutions = yield models_1.Institution.findAndCountAll({
        distinct: true,
        attributes: { exclude: ['updatedAt'] },
        offset: Number(offset),
        limit: Number(limit),
        order: [['createdAt', 'DESC']],
        where: {
            [sequelize_1.Op.or]: [
                {
                    modular_code: { [sequelize_1.Op.startsWith]: term }
                },
                {
                    name_IE: { [sequelize_1.Op.substring]: term }
                }
            ],
            [sequelize_1.Op.and]: [{ status: true }]
        },
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
        ]
    });
    if (institutions.rows.length == 0) {
        return res.status(200).json(new Response_1.ResponseServer(`No se encontraron resultados para ${term}`, false, institutions));
    }
    return res.status(200).json(new Response_1.ResponseServer(`Resultados de búsqueda ${term}`, true, institutions));
});
const searchStaffAtTheInstitution = (term, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { offset = 0, limit = 5, id_institution_shift } = req.query;
    if (!id_institution_shift) {
        return res.status(500).json(new Response_1.ResponseServer(`Para realizar la busqueda de la I.E es necesario el Id de la institución en turno`, false));
    }
    // find one institution with modular code
    const institutionWithStaff = yield models_1.InstitutionStaff.findAndCountAll({
        where: { InstitutionShiftIdInstitutionShift: id_institution_shift },
        include: [
            {
                model: models_1.Staff,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                where: {
                    [sequelize_1.Op.or]: [
                        {
                            names: { [sequelize_1.Op.substring]: term }
                        },
                        {
                            id_card: { [sequelize_1.Op.substring]: term }
                        }
                    ],
                    [sequelize_1.Op.and]: [{ status: true }]
                },
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
    // if(institutionWithStaff.rows.length==0){
    //     return res.status(404).json( new ResponseServer(`No se encontraron resultados para ${term}`, false, institutionWithStaff ))
    // }
    return res.status(200).json(new Response_1.ResponseServer(`Resultados de búsqueda ${term}`, true, institutionWithStaff));
});
//# sourceMappingURL=search.js.map