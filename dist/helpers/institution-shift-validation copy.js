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
exports.existInstitutionIdShift = exports.checkIdInstitutionShift = void 0;
const express_validator_1 = require("express-validator");
const Shift_1 = require("../models/Shift");
const InstitutionShift_1 = require("../models/InstitutionShift");
// export const InstitutionShiftValidator = () => {
//     return[
//         body('shift').not()
//                      .isEmpty()
//                      .withMessage('El turno a crear es requerido')
//                      .bail()
//                      .custom( existShift )
//     ]
// }
const checkIdInstitutionShift = () => {
    return [
        (0, express_validator_1.check)('id_institution_shift').not()
            .isEmpty()
            .withMessage('El id de la institución con turno es requerido')
            .bail()
            .custom(exports.existInstitutionIdShift)
    ];
};
exports.checkIdInstitutionShift = checkIdInstitutionShift;
const existInstitutionShift = (shift) => __awaiter(void 0, void 0, void 0, function* () {
    if (!shift) {
        throw new Error('El turno es requerido');
    }
    const existShift = yield Shift_1.Shift.findOne({
        where: { shift }
    });
    if (existShift) {
        throw new Error(`El turno ${shift} ya se encuentra registrado en el sistema`);
    }
    return true;
});
const existInstitutionIdShift = (id_institution_shift) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id_institution_shift) {
        throw new Error('El id de la institución con turno es requerido');
    }
    const existIEShift = yield InstitutionShift_1.InstitutionShift.findOne({
        where: { id_institution_shift }
    });
    if (!existIEShift) {
        throw new Error(`El id de la institución con turno ${id_institution_shift} no se encuentra registrado en el sistema`);
    }
    return true;
});
exports.existInstitutionIdShift = existInstitutionIdShift;
//# sourceMappingURL=institution-shift-validation%20copy.js.map