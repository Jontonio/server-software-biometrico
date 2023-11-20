"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeIdCardValidator = void 0;
const types_1 = require("../resources/types");
const Response_1 = require("../class/Response");
const typeIdCardValidator = (req, res, next) => {
    const { type_id_card } = req.body;
    if (!types_1.typesIdCard.includes(type_id_card)) {
        return res.status(400).json(new Response_1.ResponseServer(`El tipo de documento debe ser (${types_1.typesIdCard})`, false, null));
    }
    next();
};
exports.typeIdCardValidator = typeIdCardValidator;
//# sourceMappingURL=typeStaff.middleware.js.map