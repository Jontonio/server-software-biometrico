"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerTypeAttendance = void 0;
const express_1 = require("express");
const helpers_1 = require("../helpers");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
exports.routerTypeAttendance = (0, express_1.Router)();
exports.routerTypeAttendance.post(`/register-type-Attendance`, middlewares_1.validateJWT, (0, helpers_1.TypeAttendanceValidator)(), helpers_1.verifyError, controllers_1.typeAttendanceController.registerTypeAttendance);
//# sourceMappingURL=typeAttendance.route.js.map