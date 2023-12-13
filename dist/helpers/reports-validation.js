"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchValidator = void 0;
const express_validator_1 = require("express-validator");
const searchValidator = () => {
    return [
        (0, express_validator_1.check)('table').not()
            .isEmpty()
            .withMessage('El parámetro nombre de la tabla es requerido')
            .bail(),
        (0, express_validator_1.check)('term').not()
            .isEmpty()
            .withMessage('El parámetro término de búsqueda es requerido')
    ];
};
exports.searchValidator = searchValidator;
//# sourceMappingURL=reports-validation.js.map