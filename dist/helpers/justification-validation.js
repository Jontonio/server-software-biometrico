"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkURLFile = exports.checkTypeJustification = exports.justificationValidator = void 0;
const express_validator_1 = require("express-validator");
const types_1 = require("../resources/types");
const institution_staff_validation_1 = require("./institution-staff-validation");
const justificationValidator = () => {
    return [
        (0, express_validator_1.body)('type_justification').not()
            .isEmpty()
            .withMessage('El tipo de justificación es requerido')
            .bail()
            .isLength({ max: 100 })
            .withMessage('El tipo de justificación debe ser menos de 10 carácteres')
            .bail()
            .custom(exports.checkTypeJustification),
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
        (0, express_validator_1.body)('InstitutionStaffIdInstitutionStaff').not()
            .isEmpty()
            .withMessage(`El id del personal en la institución es requerido`)
            .bail()
            .custom((InstitutionStaffIdInstitutionStaff) => (0, institution_staff_validation_1.existInstitutionStaff)(InstitutionStaffIdInstitutionStaff))
    ];
};
exports.justificationValidator = justificationValidator;
const checkTypeJustification = (type_justification) => {
    if (!types_1.typeJustification.includes(type_justification)) {
        throw new Error(`El tipo de justificación debe contener almenos (${types_1.typeJustification})`);
    }
    return true;
};
exports.checkTypeJustification = checkTypeJustification;
const patternURL = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
const checkURLFile = (url_document) => {
    if (!url_document.match(patternURL)) {
        throw new Error(`El archivo de justificación debe ser la url del archivo`);
    }
    return true;
};
exports.checkURLFile = checkURLFile;
//# sourceMappingURL=justification-validation.js.map