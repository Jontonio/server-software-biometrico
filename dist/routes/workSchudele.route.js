"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerWorkSchudule = void 0;
const express_1 = require("express");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const work_schedule_middleware_1 = require("../middlewares/work-schedule.middleware");
exports.routerWorkSchudule = (0, express_1.Router)();
exports.routerWorkSchudule.post(`/register-work-schedule`, middlewares_1.validateJWT, middlewares_1.haveRole, (0, helpers_1.workScheduleValidator)(), work_schedule_middleware_1.existWorkScheduleTime, helpers_1.verifyError, controllers_1.workScheduleController.registerWorkSchedule);
exports.routerWorkSchudule.get(`/get-work-schedule`, middlewares_1.validateJWT, middlewares_1.haveRole, controllers_1.workScheduleController.getWorkSchedule);
//# sourceMappingURL=workSchudele.route.js.map