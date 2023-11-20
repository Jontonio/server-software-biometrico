"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerTypeStaff = void 0;
const express_1 = require("express");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
exports.routerTypeStaff = (0, express_1.Router)();
exports.routerTypeStaff.post(`/register-type-staff`, middlewares_1.validateJWT, middlewares_1.haveRole, (0, helpers_1.TypeStaffValidator)(), helpers_1.verifyError, controllers_1.typeStaffController.registerTypeStaff);
exports.routerTypeStaff.get(`/list-type-staff`, middlewares_1.validateJWT, middlewares_1.haveRole, controllers_1.typeStaffController.getListTypeStaff);
//# sourceMappingURL=typeStaff.route.js.map