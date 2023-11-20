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
exports.existStaffAtTheInstitution = void 0;
const Response_1 = require("../class/Response");
const models_1 = require("../models");
const existStaffAtTheInstitution = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // verify is exist user on request 
        if (!req.user) {
            return res.status(401).json(new Response_1.ResponseServer(`Error en el servidor al verificar usuario`, false));
        }
        const { id_card, InstitutionShift } = req.body;
        const staffAtTheIE = yield models_1.InstitutionStaff.findOne({
            where: { StaffIdCard: id_card,
                InstitutionShiftIdInstitutionShift: InstitutionShift,
                status: true }
        });
        if (staffAtTheIE) {
            const staff = yield models_1.Staff.findByPk(id_card);
            return res.status(409).json(new Response_1.ResponseServer(`El personal ${staff === null || staff === void 0 ? void 0 : staff.get('names')} ${staff === null || staff === void 0 ? void 0 : staff.get('first_name')} ya se encuentra registrado en la institución con el turno`, false, staff));
        }
        next();
    }
    catch (e) {
        console.log(e);
        return res.status(500).json(new Response_1.ResponseServer(`Error en el servidor: ${e.message}`, false, null));
    }
});
exports.existStaffAtTheInstitution = existStaffAtTheInstitution;
//# sourceMappingURL=institutionStaff.middleware.js.map