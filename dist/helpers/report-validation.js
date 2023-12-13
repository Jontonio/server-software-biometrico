"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkYear = void 0;
const express_validator_1 = require("express-validator");
const checkYear = () => {
    return [
        (0, express_validator_1.body)('year').not()
            .isEmpty()
            .withMessage('El año para generar el reporte de tipo de justificación es requerido')
    ];
};
exports.checkYear = checkYear;
//# sourceMappingURL=report-validation.js.map