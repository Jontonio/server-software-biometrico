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
exports.existInstitutionShift = void 0;
const models_1 = require("../models");
const Response_1 = require("../class/Response");
const InstitutionShift_1 = require("../models/InstitutionShift");
const existInstitutionShift = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { shift, modular_code, name_IE, level_modality } = req.body;
    //find at the instituion
    const institutionShift = yield models_1.Institution.findOne({
        where: { modular_code },
        include: [
            {
                model: InstitutionShift_1.InstitutionShift,
                where: { ShiftIdShift: shift }
            }
        ]
    });
    if (institutionShift) {
        return res.status(400).json(new Response_1.ResponseServer(`La institución ${name_IE} - ${level_modality} ya se encuentra registrado con ese turno`, false, null));
    }
    next();
});
exports.existInstitutionShift = existInstitutionShift;
//# sourceMappingURL=institution.middleware.js.map