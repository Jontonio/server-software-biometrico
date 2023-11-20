"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerShift = void 0;
const express_1 = require("express");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const shift_validation_1 = require("../helpers/shift-validation");
exports.routerShift = (0, express_1.Router)();
exports.routerShift.post('/register-shift', middlewares_1.validateJWT, middlewares_1.haveRole, (0, shift_validation_1.shiftValidator)(), helpers_1.verifyError, controllers_1.shiftController.registerShift);
exports.routerShift.get('/get-shifts', middlewares_1.validateJWT, middlewares_1.haveRole, helpers_1.verifyError, controllers_1.shiftController.getShifts);
//# sourceMappingURL=shift.route.js.map