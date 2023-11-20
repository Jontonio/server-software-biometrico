"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUser = void 0;
const express_1 = require("express");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
exports.routerUser = (0, express_1.Router)();
exports.routerUser.get(`/get-users`, middlewares_1.validateJWT, middlewares_1.haveRole, controllers_1.userController.getUsers);
exports.routerUser.get(`/get-one-user/:id_user`, middlewares_1.validateJWT, middlewares_1.haveRole, (0, helpers_1.idValidator)(), helpers_1.verifyError, controllers_1.userController.getOneUser);
exports.routerUser.post(`/register-user`, middlewares_1.validateJWT, middlewares_1.haveRole, (0, helpers_1.userValidator)(), helpers_1.verifyError, controllers_1.userController.registerUser);
exports.routerUser.patch(`/update-user/:id_user`, middlewares_1.validateJWT, middlewares_1.haveRole, (0, helpers_1.idValidator)(), helpers_1.verifyError, controllers_1.userController.updateUser);
exports.routerUser.delete(`/delete-user/:id_user`, middlewares_1.validateJWT, middlewares_1.haveRole, middlewares_1.isAdminRole, (0, helpers_1.idValidator)(), helpers_1.verifyError, controllers_1.userController.deleteUser);
//# sourceMappingURL=user.route.js.map