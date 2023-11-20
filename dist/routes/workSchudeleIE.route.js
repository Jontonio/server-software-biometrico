"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerWorkSchuduleIE = void 0;
const express_1 = require("express");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const work_schedule_ie_valiation_1 = require("../helpers/work-schedule-ie-valiation");
exports.routerWorkSchuduleIE = (0, express_1.Router)();
exports.routerWorkSchuduleIE.post(`/register-work-schedule-ie`, middlewares_1.validateJWT, middlewares_1.haveRole, (0, helpers_1.workScheduleIEValidator)(), helpers_1.verifyError, controllers_1.workSIEController.registerWorkScheduleIE);
exports.routerWorkSchuduleIE.patch(`/update-work-schedule-ie/:id_work_schedule_institution`, middlewares_1.validateJWT, middlewares_1.haveRole, (0, work_schedule_ie_valiation_1.verifyIdWorkScheduleIE)(), helpers_1.verifyError, controllers_1.workSIEController.updateWorkScheduleIE);
exports.routerWorkSchuduleIE.delete(`/delete-work-schedule-ie/:id_work_schedule_institution`, middlewares_1.validateJWT, middlewares_1.haveRole, (0, work_schedule_ie_valiation_1.verifyIdWorkScheduleIE)(), helpers_1.verifyError, controllers_1.workSIEController.deleteWorkScheduleIE);
//# sourceMappingURL=workSchudeleIE.route.js.map