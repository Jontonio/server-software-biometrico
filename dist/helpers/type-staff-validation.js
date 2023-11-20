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
exports.existIdTypeStaff = exports.TypeStaffValidator = void 0;
const express_validator_1 = require("express-validator");
const models_1 = require("../models");
const TypeStaffValidator = () => {
    return [
        (0, express_validator_1.body)('type_staff').not()
            .isEmpty()
            .withMessage('El tipo de personal es requerido')
            .bail()
            .isLength({ min: 3, max: 50 })
            .withMessage('El tipo de personal debe ser almenos de 3 dígitos')
    ];
};
exports.TypeStaffValidator = TypeStaffValidator;
const existIdTypeStaff = (id_type_staff) => __awaiter(void 0, void 0, void 0, function* () {
    // verify if exist id_type_staff
    if (!id_type_staff) {
        throw new Error('El id del tipo de personl es requerido');
    }
    // find one user by id_type_staff
    const existsTypeStaff = yield models_1.TypeStaff.findOne({
        where: { id_type_staff, status: true }
    });
    // verify if exist type staff 
    if (!existsTypeStaff) {
        throw new Error(`El id del tipo de personal ${id_type_staff} no se encuentra registrado`);
    }
    return true;
});
exports.existIdTypeStaff = existIdTypeStaff;
//# sourceMappingURL=type-staff-validation.js.map