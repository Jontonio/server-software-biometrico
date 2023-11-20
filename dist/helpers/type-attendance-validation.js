"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeAttendanceValidator = void 0;
const express_validator_1 = require("express-validator");
const TypeAttendanceValidator = () => {
    return [
        (0, express_validator_1.body)('type_attendance').not()
            .isEmpty()
            .withMessage('El type_attendance es requerido')
    ];
};
exports.TypeAttendanceValidator = TypeAttendanceValidator;
//# sourceMappingURL=type-attendance-validation.js.map