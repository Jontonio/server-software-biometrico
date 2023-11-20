"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAttendance = void 0;
const express_1 = require("express");
const helpers_1 = require("../helpers");
const controllers_1 = require("../controllers");
exports.routerAttendance = (0, express_1.Router)();
exports.routerAttendance.post(`/register-Attendance`, (0, helpers_1.attendanceValidator)(), helpers_1.verifyError, controllers_1.attendanceController.registerAttendance);
//# sourceMappingURL=attendance.route.js.map