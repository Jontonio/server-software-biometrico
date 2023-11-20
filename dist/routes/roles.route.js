"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerRoles = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
exports.routerRoles = (0, express_1.Router)();
exports.routerRoles.get('/get-roles', middlewares_1.validateJWT, middlewares_1.haveRole, controllers_1.roleController.getRoles);
//# sourceMappingURL=roles.route.js.map