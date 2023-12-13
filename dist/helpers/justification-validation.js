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
exports.checkURLFile = exports.existStatusJustification = exports.existIdJustification = exports.existIdTypeJustification = exports.existTypeJustification = exports.checkIdJustification = exports.statusJustificationValidator = exports.typeJustificationValidator = exports.justificationValidator = void 0;
const express_validator_1 = require("express-validator");
const types_1 = require("../resources/types");
const institution_staff_validation_1 = require("./institution-staff-validation");
const TypeJustification_1 = require("../models/TypeJustification");
const StatusJustification_1 = require("../models/StatusJustification");
const models_1 = require("../models");
const justificationValidator = () => {
    return [
        (0, express_validator_1.body)('TypeJustificationIdTypeJustification').not()
            .isEmpty()
            .withMessage('El tipo de justificación es requerido')
            .bail()
            .custom((TypeJustificationIdTypeJustification) => (0, exports.existIdTypeJustification)(TypeJustificationIdTypeJustification))
            .bail(),
        (0, express_validator_1.body)('date_justification').not()
            .isEmpty()
            .withMessage(`La fecha de justificación para (${types_1.typeJustification}) es requerido`)
            .bail()
            .isISO8601()
            .withMessage('La fechaHora debe estar en formato ISO8601 (YYYY-MM-DDTHH:mm:ss)')
            .bail(),
        (0, express_validator_1.body)('url_document').not()
            .isEmpty()
            .withMessage(`El archivo de justificación es requerido`)
            .bail()
            .custom(exports.checkURLFile),
        (0, express_validator_1.body)('hourStartPer').optional()
            .isISO8601()
            .withMessage("El campo hora de inicio de permiso debe estar en formato ISO 8601"),
        (0, express_validator_1.body)('hourFinishPer').optional()
            .isISO8601()
            .withMessage("El campo hora de fin de permiso debe estar en formato ISO 8601"),
        (0, express_validator_1.body)('InstitutionStaffIdInstitutionStaff').not()
            .isEmpty()
            .withMessage(`El id del personal en la institución es requerido`)
            .bail()
            .custom((InstitutionStaffIdInstitutionStaff) => (0, institution_staff_validation_1.existInstitutionStaff)(InstitutionStaffIdInstitutionStaff))
    ];
};
exports.justificationValidator = justificationValidator;
const typeJustificationValidator = () => {
    return [
        (0, express_validator_1.body)('type_justification').not()
            .isEmpty()
            .withMessage('El tipo de justificación es requerido')
            .bail()
            .isLength({ max: 100 })
            .withMessage('El tipo de justificación debe ser menos de 10 carácteres')
            .bail()
            .custom(exports.existTypeJustification)
            .bail()
    ];
};
exports.typeJustificationValidator = typeJustificationValidator;
const statusJustificationValidator = () => {
    return [
        (0, express_validator_1.body)('status_justification').not()
            .isEmpty()
            .withMessage('El estado de justificación es requerido')
            .bail()
            .isLength({ max: 100 })
            .withMessage('El estado de justificación debe ser menos de 10 carácteres')
            .bail()
            .custom(exports.existStatusJustification)
            .bail()
    ];
};
exports.statusJustificationValidator = statusJustificationValidator;
const checkIdJustification = () => {
    return [
        (0, express_validator_1.check)('id_justification').not()
            .isEmpty()
            .withMessage('El id de la justificación es requerido')
            .bail()
            .custom(exports.existIdJustification)
            .bail()
    ];
};
exports.checkIdJustification = checkIdJustification;
const existTypeJustification = (type_justification) => __awaiter(void 0, void 0, void 0, function* () {
    if (!type_justification) {
        throw new Error('Es necesario el tipo de justificación a registrar');
    }
    const existType = yield TypeJustification_1.TypeJustification.findOne({
        where: { type_justification }
    });
    if (existType) {
        throw new Error(`El tipo de justificación ${type_justification} ya se encuentra registrado`);
    }
    return true;
});
exports.existTypeJustification = existTypeJustification;
const existIdTypeJustification = (id_type_justification) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id_type_justification) {
        throw new Error('Es necesario id el tipo de justificación a registrar');
    }
    const existType = yield TypeJustification_1.TypeJustification.findOne({
        where: { id_type_justification }
    });
    if (!existType) {
        throw new Error(`El id ${id_type_justification} del tipo de justificación no se encuentra registrado`);
    }
    return true;
});
exports.existIdTypeJustification = existIdTypeJustification;
const existIdJustification = (id_justification) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id_justification) {
        throw new Error('Es necesario id de la justificación');
    }
    const existType = yield models_1.Justification.findOne({
        where: { id_justification }
    });
    if (!existType) {
        throw new Error(`El id ${id_justification} de la justificación no se encuentra registrado`);
    }
    return true;
});
exports.existIdJustification = existIdJustification;
const existStatusJustification = (status_justification) => __awaiter(void 0, void 0, void 0, function* () {
    if (!status_justification) {
        throw new Error('Es necesario el estado de justificación a registrar');
    }
    const existType = yield StatusJustification_1.StatusJustification.findOne({
        where: { status_justification }
    });
    if (existType) {
        throw new Error(`El estado de justificación ${status_justification} ya se encuentra registrado`);
    }
    return true;
});
exports.existStatusJustification = existStatusJustification;
const patternURL = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
const checkURLFile = (url_document) => {
    if (!url_document.match(patternURL)) {
        throw new Error(`El archivo de justificación debe ser la url del archivo`);
    }
    return true;
};
exports.checkURLFile = checkURLFile;
//# sourceMappingURL=justification-validation.js.map